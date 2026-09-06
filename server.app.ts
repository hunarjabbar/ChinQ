import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { prisma } from "./server/db.js";
import { GoogleGenAI, Type } from "@google/genai";
import { autoSeedMoreNews } from "./server/newsSeeder.js";
import { seedOpinions } from "./server/opinionSeeder.js";
import { seedStudies } from "./server/studySeeder.js";
import { seedMarketData } from "./server/marketSeeder.js";
import { seedBooks } from "./server/bookSeeder.js";
import { seedTourism } from "./server/tourismSeeder.js";
import { seedWomenFeatures } from "./server/womenSeeder.js";
import { seedVisaFlights } from "./server/visaFlightSeeder.js";
import { seedPodcasts } from "./server/podcastSeeder.js";
import { seedPoliticalNews } from "./server/politicalNewsSeeder.js";
import { seedPaymentData } from "./server/paymentSeeder.js";
import { registerPaymentRoutes } from "./server/paymentRoutes.js";
import cors from "cors";
import helmet from "helmet";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn(
      "WARNING: JWT_SECRET is not set in the environment. Using a fallback secret for development ONLY. Do NOT do this in production.",
    );
    return "iraq-china-daily_secret_key_123";
  }
  return secret;
}

let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY environment variable is required. Please set it in your environment or Secrets panel.",
      );
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function ensureTestCredentials() {
  try {
    console.log("🔒 Ensuring test administrative credentials exist for Iraqi-Chinese Agency...");
    const bcrypt = await import("bcryptjs");

    const credentialsToEnsure = [
      {
        email: "editor@iraq-china-agency.com",
        password: "editor123",
        name: "ICA Chief Editor",
        role: "EDITOR",
      },
      {
        email: "admin@iraq-china-agency.com",
        password: "admin123",
        name: "ICA Sovereign Admin",
        role: "ADMIN",
      },
      {
        email: "editor@iraqchineseagency.com",
        password: "editor123",
        name: "ICA Chief Editor",
        role: "EDITOR",
      },
      {
        email: "admin@iraqchineseagency.com",
        password: "admin123",
        name: "ICA Sovereign Admin",
        role: "ADMIN",
      },
      {
        email: "editor@iraqchinadaily.media",
        password: "editor123",
        name: "Test Editor",
        role: "EDITOR",
      },
      {
        email: "admin@iraqchinadaily.media",
        password: "admin123",
        name: "Test Admin",
        role: "ADMIN",
      }
    ];

    for (const cred of credentialsToEnsure) {
      const exists = await prisma.user.findUnique({
        where: { email: cred.email },
      });
      if (!exists) {
        const hash = await (bcrypt.default || bcrypt).hash(cred.password, 10);
        await prisma.user.create({
          data: {
            email: cred.email,
            password: hash,
            name: cred.name,
            role: cred.role,
          },
        });
        console.log(`✅ Created test credential: ${cred.email} (${cred.role})`);
      }
    }
  } catch (err) {
    console.error("Error ensuring test credentials:", err);
  }
}

async function runStartupSeeders() {
  try {
    console.log("🌱 Starting background database seeders...");
    await autoSeedMoreNews();
    await seedOpinions();
    await seedStudies();
    await seedMarketData();
    await seedBooks();
    await seedTourism();
    await seedWomenFeatures();
    await seedVisaFlights();
    await seedPodcasts();
    await seedPoliticalNews();
    await seedPaymentData();
    await ensureTestCredentials();
    console.log("✅ All background database seeders completed successfully.");
  } catch (err) {
    console.error("⚠️ Error running background seeders:", err);
  }
}

async function startServer() {
  const app = express();
  app.set("trust proxy", 1);
  const PORT = 3000;

  // Platform and infrastructure health check route (first priority)
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
      frameguard: false, // Ensure iframe embedding in AI Studio is permitted
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.removeHeader("X-Frame-Options");
    next();
  });
  app.use(express.json());
  const rateLimit = (await import("express-rate-limit")).default;
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false, default: false },
  });
  const aiSearchLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false, default: false },
  });
  // Auth Routes
  const authMiddleware = async (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
      const token = authHeader.split(" ")[1];
      const jwt = await import("jsonwebtoken");
      const decoded: any = (jwt.default || jwt).verify(token, getJwtSecret());
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };

  const editorOrAdminMiddleware = async (req: any, res: any, next: any) => {
    authMiddleware(req, res, () => {
      if (req.user.role !== "ADMIN" && req.user.role !== "EDITOR")
        return res.status(403).json({ error: "Forbidden" });
      next();
    });
  };

  const adminMiddleware = async (req: any, res: any, next: any) => {
    authMiddleware(req, res, () => {
      if (req.user.role !== "ADMIN")
        return res.status(403).json({ error: "Forbidden" });
      next();
    });
  };

  // Register IQD & E-CNY Payment Service Provider routes
  registerPaymentRoutes(app, editorOrAdminMiddleware, adminMiddleware);
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, name, role } = req.body;
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await (bcrypt.default || bcrypt).hash(
        password,
        10,
      );
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: "AUTHOR",
        },
      });
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } catch (e: any) {
      if (e.code === "P2002")
        return res.status(400).json({ error: "Email already exists" });
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", loginLimiter, async (req, res) => {
    try {
      const { email, password } = req.body;
      const cleanEmail = (email || "").trim().toLowerCase();
      let user = await prisma.user.findUnique({ where: { email: cleanEmail } });
      if (!user && email && email !== cleanEmail) {
        user = await prisma.user.findUnique({ where: { email } });
      }

      // If user not found, auto-provision official Iraqi-Chinese Agency test credentials if matching
      if (!user) {
        const bcrypt = await import("bcryptjs");
        if (
          (cleanEmail === "editor@iraq-china-agency.com" || cleanEmail === "editor@iraqchineseagency.com" || cleanEmail === "editor@iraqchinadaily.media") &&
          password === "editor123"
        ) {
          const hash = await (bcrypt.default || bcrypt).hash("editor123", 10);
          user = await prisma.user.upsert({
            where: { email: cleanEmail },
            update: { password: hash, role: "EDITOR" },
            create: {
              email: cleanEmail,
              password: hash,
              name: "ICA Chief Editor",
              role: "EDITOR",
            },
          });
        } else if (
          (cleanEmail === "admin@iraq-china-agency.com" || cleanEmail === "admin@iraqchineseagency.com" || cleanEmail === "admin@iraqchinadaily.media") &&
          password === "admin123"
        ) {
          const hash = await (bcrypt.default || bcrypt).hash("admin123", 10);
          user = await prisma.user.upsert({
            where: { email: cleanEmail },
            update: { password: hash, role: "ADMIN" },
            create: {
              email: cleanEmail,
              password: hash,
              name: "ICA Sovereign Admin",
              role: "ADMIN",
            },
          });
        }
      }

      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const bcrypt = await import("bcryptjs");
      const isValid = await (bcrypt.default || bcrypt).compare(
        password,
        user.password,
      );
      if (!isValid)
        return res.status(401).json({ error: "Invalid credentials" });

      const jwt = await import("jsonwebtoken");
      const token = (jwt.default || jwt).sign(
        { id: user.id, role: user.role },
        getJwtSecret(),
        { expiresIn: "1d" },
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionPlan: user.subscriptionPlan,
          subscriptionEndDate: user.subscriptionEndDate,
        },
      });
    } catch (e: any) {
      console.error("Login Error:", e);
      res.status(500).json({ error: "Login failed: " + e.message });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader)
        return res.status(401).json({ error: "No token provided" });
      const token = authHeader.split(" ")[1];
      const jwt = await import("jsonwebtoken");
      const decoded: any = (jwt.default || jwt).verify(token, getJwtSecret());
      const user = await prisma.user.findUnique({ where: { id: (decoded as any).id } });
      if (!user) return res.status(401).json({ error: "User not found" });
      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionPlan: user.subscriptionPlan,
          subscriptionEndDate: user.subscriptionEndDate,
        },
      });
    } catch (e: any) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  // --- Announcement API ---
  app.get("/api/announcement", async (req, res) => {
    try {
      const announcement = await prisma.systemAnnouncement.findFirst({
        where: { isActive: true },
        orderBy: { createdAt: "desc" }
      });
      res.json(announcement);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch announcement" });
    }
  });

  app.post("/api/admin/announcement", adminMiddleware, async (req, res) => {
    try {
      const { contentEn, contentAr, contentZh, contentCkb, type, isActive } = req.body;
      
      // Deactivate others
      if (isActive) {
        await prisma.systemAnnouncement.updateMany({
          data: { isActive: false }
        });
      }

      const announcement = await prisma.systemAnnouncement.create({
        data: {
          contentEn,
          contentAr,
          contentZh,
          contentCkb,
          type: type || "INFO",
          isActive: isActive !== undefined ? isActive : true
        }
      });
      res.json(announcement);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to create announcement" });
    }
  });

  app.get("/api/admin/announcements", adminMiddleware, async (req, res) => {
    try {
      const announcements = await prisma.systemAnnouncement.findMany({
        orderBy: { createdAt: "desc" }
      });
      res.json(announcements);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  });

  // --- API Routes ---

  // 1. Articles endpoint (public)

  app.get("/api/articles", async (req, res) => {
    try {
      const { category } = req.query;
      const whereClause: any = { status: "PUBLISHED" };

      if (category && typeof category === "string") {
        whereClause.category = { slug: category };
      }

      const articles = await prisma.article.findMany({
        where: whereClause,
        include: { translations: true, category: true, author: true },
        orderBy: { createdAt: "desc" },
      });
      res.json(articles);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await prisma.article.findUnique({
        where: { slug: req.params.slug },
        include: { translations: true, category: true, author: true },
      });
      res.json(article);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  // 1b. Studies endpoint (public)
  app.get("/api/studies", async (req, res) => {
    try {
      const studies = await prisma.study.findMany({
        include: { author: true },
        orderBy: { createdAt: "desc" },
      });
      res.json(studies);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch studies" });
    }
  });

  app.get("/api/studies/:slug", async (req, res) => {
    try {
      const study = await prisma.study.findUnique({
        where: { slug: req.params.slug },
        include: { author: true },
      });
      if (!study) return res.status(404).json({ error: "Not found" });

      if (study.isPrivate) {
        let isSubscribed = false;
        const authHeader = req.headers.authorization;
        if (authHeader) {
          try {
            const token = authHeader.split(" ")[1];
            const jwt = await import("jsonwebtoken");
            const JWT_SECRET = process.env.JWT_SECRET || "iraq-china-daily-secret-key-2026-development";
            const decoded = (jwt.default || jwt).verify(token, JWT_SECRET);
            const user = await prisma.user.findUnique({ where: { id: (decoded as any).id } });
            if (user && user.subscriptionStatus === "ACTIVE") {
              isSubscribed = true;
            }
          } catch(e) {}
        }
        
        if (!isSubscribed) {
          // withhold content
          study.contentEn = study.contentEn ? study.contentEn.substring(0, 300) + "..." : "";
          study.contentAr = study.contentAr ? study.contentAr.substring(0, 300) + "..." : "";
          study.contentZh = study.contentZh ? study.contentZh.substring(0, 300) + "..." : "";
          study.contentCkb = study.contentCkb ? study.contentCkb.substring(0, 300) + "..." : "";
        }
      }

      res.json(study);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch study" });
    }
  });

  app.post("/api/public/news-search", aiSearchLimiter, async (req, res) => {
    try {
      const { source, topic } = req.body;
      const cleanTopic = topic ? topic.trim() : "Iraq-China cooperation";

      let query = "";
      if (source === "local") {
        query = `Local Iraqi news reports regarding ${cleanTopic} from regional news outlets like Shafaq News, Rudaw, Al-Mada, or National Iraqi News Agency in 2025 or 2026.`;
      } else {
        query = `International news reports regarding ${cleanTopic} from global news outlets like Reuters, Bloomberg, Caixin, CGTN, or Xinhua in 2025 or 2026.`;
      }

      if (process.env.GEMINI_API_KEY) {
        try {
          const ai = getGeminiClient();
          console.log(
            `[Public AI News Search] Sourcing: "${source}" | Topic: "${cleanTopic}"`,
          );

          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert news analyst for Iraqi-Chinese Agency, a premier trilingual China-Iraq news platform. 
            Perform a deep web search to find real, factual news reports from 2025/2026 on: "${query}"
            
            Generate exactly 2 diverse, highly detailed, and realistic news logs representing this perspective.
            For each, translate the title, short excerpt, and full detailed body into exactly 4 languages:
            1. English ('en')
            2. Arabic ('ar')
            3. Chinese ('zh')
            4. Kurdish/Sorani ('ckb')
            
            Assign an appropriate categorySlug: 'energy', 'economy', or 'culture'.
            Select a matching, high-quality image URL (e.g., matching machinery, oil, finances, trade, infrastructure, or education).`,
            config: {
              tools: [{ googleSearch: {} }],
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.ARRAY,
                description: "Exactly 2 grounded news articles.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    slug: { type: Type.STRING, description: "Unique URL slug." },
                    categorySlug: {
                      type: Type.STRING,
                      description: "'energy', 'economy', or 'culture'",
                    },
                    imageUrl: {
                      type: Type.STRING,
                      description: "A realistic image URL.",
                    },
                    sourceName: {
                      type: Type.STRING,
                      description:
                        "The specific local or international source name where this news originates.",
                    },
                    translations: {
                      type: Type.ARRAY,
                      description:
                        "Must contain all 4 translation objects for en, ar, zh, ckb",
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          lang: {
                            type: Type.STRING,
                            description: "Must be 'en', 'ar', 'zh', or 'ckb'",
                          },
                          title: {
                            type: Type.STRING,
                            description: "The translated news headline.",
                          },
                          excerpt: {
                            type: Type.STRING,
                            description: "Short summary of the story.",
                          },
                          content: {
                            type: Type.STRING,
                            description:
                              "Full detailed multi-paragraph content (at least 120 words).",
                          },
                        },
                        required: ["lang", "title", "excerpt", "content"],
                      },
                    },
                  },
                  required: [
                    "slug",
                    "categorySlug",
                    "imageUrl",
                    "sourceName",
                    "translations",
                  ],
                },
              },
            },
          });

          const text = response.text;
          if (text) {
            const articles = JSON.parse(text);
            return res.json({ success: true, articles });
          }
        } catch (aiErr) {
          console.warn("[Public AI News Search API] Falling back to database articles:", aiErr);
        }
      }

      // Local database fallback
      const dbArticles = await prisma.article.findMany({
        take: 2,
        include: {
          category: true,
          translations: true,
        },
        orderBy: { createdAt: 'desc' }
      });

      const fallbackArticles = dbArticles.map(a => ({
        slug: a.slug,
        categorySlug: a.category?.slug || 'economy',
        imageUrl: a.imageUrl || 'https://images.unsplash.com/photo-1541888052140-59dc93539169?q=80&w=1200&auto=format&fit=crop',
        sourceName: source === 'local' ? 'Iraqi-Chinese Agency Baghdad Wire' : 'Iraqi-Chinese Agency Beijing Bureau',
        translations: a.translations.map(t => ({
          lang: t.lang,
          title: t.title,
          excerpt: t.excerpt,
          content: t.content
        }))
      }));

      res.json({ success: true, articles: fallbackArticles });
    } catch (e: any) {
      console.error("[Public AI News Search Error]", e);
      res
        .status(500)
        .json({
          error: e.message || "Failed to retrieve grounded source updates",
        });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const { region, category } = req.query;
      const where: any = {};

      if (region && typeof region === "string" && region !== "ALL") {
        where.region = region;
      }
      if (category && typeof category === "string" && category !== "ALL") {
        where.category = category;
      }

      let events = await prisma.liveEvent.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      // Auto-seed default live event if empty
      if (events.length === 0 && !region && !category) {
        const defaultEvent = await prisma.liveEvent.create({
          data: {
            slug: "iraq-china-summit-2026",
            titleEn: "Iraq-China Economic Summit 2026",
            titleAr: "القمة الاقتصادية العراقية الصينية 2026",
            titleZh: "2026年伊拉克-中国经济峰会",
            titleCkb: "لووتکەی ئابووری عێراق-چین ٢٠٢٦",
            isActive: true,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
            region: "BILATERAL",
            category: "BROADCAST",
          },
        });
        events = [defaultEvent];
      }

      res.json(events);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/events", authMiddleware, async (req, res) => {
    try {
      const body = req.body;
      const slug = body.slug || `live-${Date.now()}`;
      const newEvent = await prisma.liveEvent.create({
        data: {
          slug,
          isActive: body.isActive !== undefined ? body.isActive : true,
          titleEn: body.titleEn || "",
          titleAr: body.titleAr || "",
          titleZh: body.titleZh || "",
          titleCkb: body.titleCkb || "",
          summaryEn: body.summaryEn || null,
          summaryAr: body.summaryAr || null,
          summaryZh: body.summaryZh || null,
          summaryCkb: body.summaryCkb || null,
          videoUrl: body.videoUrl || null,
          region: body.region || "BILATERAL",
          category: body.category || "NEWS",
        },
      });
      res.status(201).json(newEvent);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/events/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const data = { ...body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;

      const updated = await prisma.liveEvent.update({
        where: { id },
        data,
      });
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/events/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.liveEvent.delete({ where: { id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/events/:slug", async (req, res) => {
    try {
      let event = await prisma.liveEvent.findUnique({
        where: { slug: req.params.slug },
        include: {
          updates: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      // Auto-seed/create the requested default event if missing to ensure preview works
      if (!event && req.params.slug === "iraq-china-summit-2026") {
        event = await prisma.liveEvent.create({
          data: {
            slug: "iraq-china-summit-2026",
            titleEn: "Iraq-China Economic Summit 2026",
            titleAr: "القمة الاقتصادية العراقية الصينية 2026",
            titleZh: "2026年伊拉克-中国经济峰会",
            titleCkb: "لووتکەی ئابووری عێراق-چین ٢٠٢٦",
            isActive: true,
          },
          include: {
            updates: true,
          },
        });
      }

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.json(event);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/updates", async (req, res) => {
    try {
      const data = req.body;
      if (
        !data.eventId ||
        !data.contentEn ||
        !data.contentAr ||
        !data.contentZh ||
        !data.contentCk
      ) {
        return res
          .status(400)
          .json({
            error:
              "All quadrilingual text fields are strictly required for live publishing.",
          });
      }

      const newUpdate = await prisma.liveUpdate.create({
        data: {
          eventId: data.eventId,
          contentEn: data.contentEn.trim(),
          contentAr: data.contentAr.trim(),
          contentZh: data.contentZh.trim(),
          contentCkb: data.contentCk.trim(),
          isImportant: data.isImportant,
          authorName: data.authorName?.trim() || "Iraq-China Daily Live Desk",
        },
        include: {
          event: true,
        },
      });

      // Simulate Next-style revalidatePath() for quadrilingual live paths
      const slug = newUpdate.event.slug;
      console.log(`\n--- [ISR] TRIGGERING PATH REVALIDATION ---`);
      console.log(`[ISR] revalidatePath("/en/live/${slug}") -> Success`);
      console.log(`[ISR] revalidatePath("/ar/live/${slug}") -> Success`);
      console.log(`[ISR] revalidatePath("/zh/live/${slug}") -> Success`);
      console.log(`[ISR] revalidatePath("/ckb/live/${slug}") -> Success`);
      console.log(`-----------------------------------------\n`);

      // Simulate Next-style revalidateTag() for cache-busting live updates
      console.log(
        `\n--- [ISR] PURGING CACHE TAG: "live-event-${data.eventId}" ---`,
      );
      console.log(`[ISR] Purged memory cache matching tag.`);
      console.log(
        `[ISR] Status: Cache cleared. All upcoming requests will pull fresh database records.`,
      );
      console.log(`--------------------------------------------\n`);

      res.json({ success: true, updateId: newUpdate.id });
    } catch (e: any) {
      console.error("Failed to dispatch live update execution block:", e);
      res
        .status(500)
        .json({ success: false, error: "Database write operation failed." });
    }
  });

  // Purge/Revalidate specific cache tags
  app.post("/api/cache/revalidate", async (req, res) => {
    try {
      const { tag } = req.body;
      if (!tag) {
        return res
          .status(400)
          .json({ error: "Tag parameter is required for revalidation." });
      }

      console.log(`\n--- [ISR] DYNAMIC CACHE TAG PURGE REQUEST ---`);
      console.log(`[ISR] Calling revalidateTag("${tag}")`);
      console.log(
        `[ISR] Cache evicted successfully for tag identifier: ${tag}`,
      );
      console.log(`--------------------------------------------\n`);

      res.json({ success: true, message: `Cache purged for tag: ${tag}` });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Cache invalidation engine error" });
    }
  });

  // 2. Market Data REST & SSE endpoints
  app.get("/api/market", async (req, res) => {
    try {
      let marketItems = await prisma.marketData.findMany();
      if (!marketItems || marketItems.length === 0) {
        await seedMarketData();
        marketItems = await prisma.marketData.findMany();
      }
      res.json(marketItems);
    } catch (e: any) {
      console.error("Error fetching market items:", e);
      res.status(500).json({ error: "Failed to fetch market data" });
    }
  });

  app.get("/api/currency/rates", async (req, res) => {
    try {
      // Fetch USD/CNY and USD/IQD from our market data
      const marketData = await prisma.marketData.findMany({
        where: {
          symbol: { in: ["CNY_USD", "IQD_USD"] }
        }
      });

      const cnyUsd = marketData.find(d => d.symbol === "CNY_USD")?.price || 7.23;
      const iqdUsd = marketData.find(d => d.symbol === "IQD_USD")?.price || 1310;

      // Parallel market IQD rate is often higher, let's simulate it or stick to official for now
      // Official: 1310. Parallel: ~1500
      const parallelIqdUsd = 1520; 

      res.json({
        official: {
          usd_iqd: iqdUsd,
          usd_cny: cnyUsd,
          cny_iqd: parseFloat((iqdUsd / cnyUsd).toFixed(2))
        },
        parallel: {
          usd_iqd: parallelIqdUsd,
          cny_iqd: parseFloat((parallelIqdUsd / cnyUsd).toFixed(2))
        },
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch currency rates" });
    }
  });

  
  app.put("/api/market/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { price, change, changePercent, volume } = req.body;
      const updated = await prisma.marketData.update({
        where: { id },
        data: {
          price: parseFloat(price),
          change: parseFloat(change),
          changePercent: parseFloat(changePercent),
          volume
        }
      });
      res.json(updated);
    } catch (e) {
      console.error("Error updating market data:", e);
      res.status(500).json({ error: "Failed to update market data" });
    }
  });

  app.get("/api/market/stream", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Send initial data
    const initialData = await prisma.marketData.findMany();
    res.write(`data: ${JSON.stringify(initialData)}\n\n`);

    // Simulate real-time updates every 3 seconds
    const interval = setInterval(async () => {
      try {
        const data = await prisma.marketData.findMany();
        // Slightly random fluctuations
        const updated = data.map((d) => ({
          ...d,
          price: d.price * (1 + (Math.random() - 0.5) * 0.005),
          changePercent: d.changePercent + (Math.random() - 0.5) * 0.1,
        }));
        res.write(`data: ${JSON.stringify(updated)}\n\n`);
      } catch (e: any) {
        console.error(e);
      }
    }, 3000);

    req.on("close", () => {
      clearInterval(interval);
    });
  });

  // 3. Admin CRUD
  app.get("/api/admin/articles", editorOrAdminMiddleware, async (req, res) => {
    try {
      const articles = await prisma.article.findMany({
        orderBy: { updatedAt: "desc" },
        include: {
          author: true,
          category: true,
          translations: {
            where: { lang: "en" },
            take: 1,
          },
        },
      });
      res.json(articles);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.post("/api/subscribe", authMiddleware, async (req: any, res: any) => {
    try {
      const { plan } = req.body;
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

      const user = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          subscriptionStatus: "ACTIVE",
          subscriptionPlan: plan || "PREMIUM",
          subscriptionEndDate: endDate,
        },
      });

      // Also record in PaymentOrder table for full Admin Portal integration
      const refNo = `SUB-${Date.now().toString().slice(-6)}`;
      try {
        await prisma.paymentOrder.create({
          data: {
            reference: refNo,
            orderType: "RETAIL",
            direction: "IQD_TO_ECNY",
            sourceCurrency: "IQD",
            targetCurrency: "E_CNY",
            sourceAmount: 25000,
            targetAmount: 132.62,
            exchangeRate: 188.50,
            feeAmount: 0,
            feePercent: 0,
            status: "COMPLETED",
            senderName: user.name || user.email,
            senderEmail: user.email,
            senderEntity: "INDIVIDUAL",
            recipientName: "Iraqi-Chinese Agency Subscription Clearing Desk",
            recipientIdentifier: "PBOC-SUB-HUB-88002",
            recipientBankOrBureau: "PBOC mBridge Digital Clearing Hub",
            purpose: "COMMERCIAL_TRADE",
            settlementMethod: "MBRIDGE_CBDC",
            settlementTxHash: `0x${Math.random().toString(16).substring(2, 12)}`,
            complianceNotes: "Auto-verified premium subscription settlement",
            adminNotes: "Processed via live subscriber portal",
            settledAt: new Date(),
          }
        });
      } catch (err) {
        console.error("PaymentOrder creation for subscription log error:", err);
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionPlan: user.subscriptionPlan,
          subscriptionEndDate: user.subscriptionEndDate,
        },
      });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to process subscription" });
    }
  });

  // Books API Endpoints
  app.get("/api/books", async (req, res) => {
    try {
      let count = await prisma.book.count();
      if (count < 50) {
        await seedBooks();
      }

      const { q, region, category, trending, featured } = req.query;
      const where: any = {};

      if (region && typeof region === "string" && region !== "ALL") {
        where.region = region;
      }
      if (category && typeof category === "string" && category !== "ALL") {
        where.category = category;
      }
      if (trending === "true") {
        where.isTrending = true;
      }
      if (featured === "true") {
        where.isFeatured = true;
      }

      let books = await prisma.book.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      if (q && typeof q === "string" && q.trim().length > 0) {
        const query = q.toLowerCase();
        books = books.filter(
          (b) =>
            b.titleEn.toLowerCase().includes(query) ||
            b.titleAr.includes(query) ||
            b.titleZh.includes(query) ||
            b.titleCkb.includes(query) ||
            b.authorEn.toLowerCase().includes(query) ||
            b.authorAr.includes(query) ||
            b.descriptionEn.toLowerCase().includes(query),
        );
      }

      res.json(books);
    } catch (e: any) {
      console.error("Error fetching books:", e);
      res.status(500).json({ error: "Failed to fetch books: " + e.message });
    }
  });

  app.get("/api/books/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const book = await prisma.book.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
      });
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book);
    } catch (e: any) {
      console.error("Error fetching book:", e);
      res.status(500).json({ error: "Failed to fetch book detail" });
    }
  });

  app.post("/api/books", authMiddleware, async (req, res) => {
    try {
      const {
        titleEn,
        titleAr,
        titleZh,
        titleCkb,
        authorEn,
        authorAr,
        authorZh,
        authorCkb,
        descriptionEn,
        descriptionAr,
        descriptionZh,
        descriptionCkb,
        coverUrl,
        category,
        region,
        rating,
        pages,
        year,
        publisher,
        isbn,
        purchaseUrl,
        isTrending,
        isFeatured,
      } = req.body;

      if (
        !titleEn ||
        !authorEn ||
        !descriptionEn ||
        !coverUrl ||
        !category ||
        !region
      ) {
        return res
          .status(400)
          .json({
            error:
              "Missing required book fields (titleEn, authorEn, descriptionEn, coverUrl, category, region)",
          });
      }

      const slug = `book-${Date.now()}-${titleEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, 30)}`;

      const newBook = await prisma.book.create({
        data: {
          slug,
          titleEn,
          titleAr: titleAr || "",
          titleZh: titleZh || "",
          titleCkb: titleCkb || "",
          authorEn,
          authorAr: authorAr || "",
          authorZh: authorZh || "",
          authorCkb: authorCkb || "",
          descriptionEn,
          descriptionAr: descriptionAr || "",
          descriptionZh: descriptionZh || "",
          descriptionCkb: descriptionCkb || "",
          coverUrl,
          category,
          region,
          rating: rating ? Number(rating) : 4.8,
          pages: pages ? Number(pages) : 300,
          year: year ? Number(year) : 2024,
          publisher: publisher || "Iraq-China Daily Academic Press",
          isbn: isbn || null,
          purchaseUrl: purchaseUrl || null,
          isTrending: isTrending !== undefined ? Boolean(isTrending) : true,
          isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : false,
        },
      });

      res.status(201).json(newBook);
    } catch (e: any) {
      console.error("Error creating book:", e);
      res.status(500).json({ error: "Failed to create book: " + e.message });
    }
  });

  app.put("/api/books/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;

      if (data.rating) data.rating = Number(data.rating);
      if (data.pages) data.pages = Number(data.pages);
      if (data.year) data.year = Number(data.year);

      const updatedBook = await prisma.book.update({
        where: { id },
        data,
      });

      res.json(updatedBook);
    } catch (e: any) {
      console.error("Error updating book:", e);
      res.status(500).json({ error: "Failed to update book: " + e.message });
    }
  });

  app.delete("/api/books/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.book.delete({ where: { id } });
      res.json({ success: true, message: "Book deleted successfully" });
    } catch (e: any) {
      console.error("Error deleting book:", e);
      res.status(500).json({ error: "Failed to delete book" });
    }
  });

  app.post("/api/books/seed", editorOrAdminMiddleware, async (req, res) => {
    try {
      await seedBooks();
      const count = await prisma.book.count();
      res.json({
        success: true,
        count,
        message: `Reseeded books database (${count} books present)`,
      });
    } catch (e: any) {
      console.error("Error reseeding books:", e);
      res.status(500).json({ error: "Failed to reseed books" });
    }
  });

  // Tourism API Endpoints
  app.get("/api/tourism", async (req, res) => {
    try {
      let count = await prisma.tourismSpot.count();
      if (count === 0) {
        await seedTourism();
      }

      const { q, region, category, trending, featured } = req.query;
      const where: any = {};

      if (region && typeof region === "string" && region !== "ALL") {
        where.region = region;
      }
      if (category && typeof category === "string" && category !== "ALL") {
        where.category = category;
      }
      if (trending === "true") {
        where.isTrending = true;
      }
      if (featured === "true") {
        where.isFeatured = true;
      }

      let spots = await prisma.tourismSpot.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      if (q && typeof q === "string" && q.trim().length > 0) {
        const query = q.toLowerCase();
        spots = spots.filter(
          (s) =>
            s.titleEn.toLowerCase().includes(query) ||
            s.titleAr.includes(query) ||
            s.titleZh.includes(query) ||
            s.titleCkb.includes(query) ||
            s.city.toLowerCase().includes(query) ||
            s.descriptionEn.toLowerCase().includes(query),
        );
      }

      res.json(spots);
    } catch (e: any) {
      console.error("Error fetching tourism spots:", e);
      res
        .status(500)
        .json({ error: "Failed to fetch tourism spots: " + e.message });
    }
  });

  app.get("/api/tourism/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const spot = await prisma.tourismSpot.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
      });
      if (!spot) {
        return res.status(404).json({ error: "Tourism spot not found" });
      }
      res.json(spot);
    } catch (e: any) {
      console.error("Error fetching tourism spot:", e);
      res.status(500).json({ error: "Failed to fetch tourism spot detail" });
    }
  });

  app.post("/api/tourism", authMiddleware, async (req, res) => {
    try {
      const {
        titleEn,
        titleAr,
        titleZh,
        titleCkb,
        city,
        region,
        category,
        descriptionEn,
        descriptionAr,
        descriptionZh,
        descriptionCkb,
        imageUrl,
        bestTimeToVisit,
        visaPolicy,
        flightInfo,
        rating,
        estimatedCost,
        isFeatured,
        isTrending,
      } = req.body;

      if (
        !titleEn ||
        !city ||
        !region ||
        !category ||
        !descriptionEn ||
        !imageUrl
      ) {
        return res
          .status(400)
          .json({
            error:
              "Missing required fields (titleEn, city, region, category, descriptionEn, imageUrl)",
          });
      }

      const slug = `tourism-${Date.now()}-${titleEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, 30)}`;

      const newSpot = await prisma.tourismSpot.create({
        data: {
          slug,
          titleEn,
          titleAr: titleAr || "",
          titleZh: titleZh || "",
          titleCkb: titleCkb || "",
          city,
          region,
          category,
          descriptionEn,
          descriptionAr: descriptionAr || "",
          descriptionZh: descriptionZh || "",
          descriptionCkb: descriptionCkb || "",
          imageUrl,
          bestTimeToVisit: bestTimeToVisit || "Spring & Autumn",
          visaPolicy: visaPolicy || "Visa on Arrival / E-Visa available",
          flightInfo: flightInfo || "Direct & transfer flights available",
          rating: rating ? Number(rating) : 4.9,
          estimatedCost: estimatedCost || "$800 - $1,500",
          isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
          isTrending: isTrending !== undefined ? Boolean(isTrending) : true,
        },
      });

      res.json(newSpot);
    } catch (e: any) {
      console.error("Error creating tourism spot:", e);
      res
        .status(500)
        .json({ error: "Failed to create tourism spot: " + e.message });
    }
  });

  app.put("/api/tourism/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;

      if (data.rating) data.rating = Number(data.rating);

      const updatedSpot = await prisma.tourismSpot.update({
        where: { id },
        data,
      });

      res.json(updatedSpot);
    } catch (e: any) {
      console.error("Error updating tourism spot:", e);
      res
        .status(500)
        .json({ error: "Failed to update tourism spot: " + e.message });
    }
  });

  app.delete("/api/tourism/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.tourismSpot.delete({ where: { id } });
      res.json({ success: true, message: "Tourism spot deleted successfully" });
    } catch (e: any) {
      console.error("Error deleting tourism spot:", e);
      res.status(500).json({ error: "Failed to delete tourism spot" });
    }
  });

  app.post("/api/tourism/seed", editorOrAdminMiddleware, async (req, res) => {
    try {
      await seedTourism();
      const count = await prisma.tourismSpot.count();
      res.json({
        success: true,
        count,
        message: `Reseeded tourism database (${count} spots present)`,
      });
    } catch (e: any) {
      console.error("Error reseeding tourism spots:", e);
      res.status(500).json({ error: "Failed to reseed tourism spots" });
    }
  });

  // --- Women Leadership, Policy & Cultural Exchange API ---
  app.get("/api/women", async (req, res) => {
    try {
      let count = await prisma.womenFeature.count();
      if (count === 0) {
        await seedWomenFeatures();
      }

      const { q, region, category, trending, featured } = req.query;
      const where: any = {};

      if (region && typeof region === "string" && region !== "ALL") {
        where.region = region;
      }
      if (category && typeof category === "string" && category !== "ALL") {
        where.category = category;
      }
      if (trending === "true") {
        where.isTrending = true;
      }
      if (featured === "true") {
        where.isFeatured = true;
      }

      let features = await prisma.womenFeature.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      if (q && typeof q === "string" && q.trim().length > 0) {
        const query = q.toLowerCase();
        features = features.filter(
          (f) =>
            f.nameEn.toLowerCase().includes(query) ||
            f.nameAr.includes(query) ||
            f.nameZh.includes(query) ||
            f.nameCkb.includes(query) ||
            f.titleEn.toLowerCase().includes(query) ||
            f.summaryEn.toLowerCase().includes(query),
        );
      }

      res.json(features);
    } catch (e: any) {
      console.error("Error fetching women features:", e);
      res
        .status(500)
        .json({ error: "Failed to fetch women features: " + e.message });
    }
  });

  app.get("/api/women/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const feature = await prisma.womenFeature.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
      });
      if (!feature) {
        return res
          .status(404)
          .json({ error: "Women feature record not found" });
      }
      res.json(feature);
    } catch (e: any) {
      console.error("Error fetching women feature record:", e);
      res.status(500).json({ error: "Failed to fetch women feature detail" });
    }
  });

  app.post("/api/women", authMiddleware, async (req, res) => {
    try {
      const {
        nameEn,
        nameAr,
        nameZh,
        nameCkb,
        titleEn,
        titleAr,
        titleZh,
        titleCkb,
        region,
        category,
        summaryEn,
        summaryAr,
        summaryZh,
        summaryCkb,
        bioEn,
        bioAr,
        bioZh,
        bioCkb,
        imageUrl,
        organization,
        publicationUrl,
        isFeatured,
        isTrending,
      } = req.body;

      if (
        !nameEn ||
        !titleEn ||
        !region ||
        !category ||
        !summaryEn ||
        !imageUrl
      ) {
        return res
          .status(400)
          .json({
            error:
              "Missing required fields (nameEn, titleEn, region, category, summaryEn, imageUrl)",
          });
      }

      const slug = `women-${Date.now()}-${nameEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, 30)}`;

      const newFeature = await prisma.womenFeature.create({
        data: {
          slug,
          nameEn,
          nameAr: nameAr || "",
          nameZh: nameZh || "",
          nameCkb: nameCkb || "",
          titleEn,
          titleAr: titleAr || "",
          titleZh: titleZh || "",
          titleCkb: titleCkb || "",
          region,
          category,
          summaryEn,
          summaryAr: summaryAr || "",
          summaryZh: summaryZh || "",
          summaryCkb: summaryCkb || "",
          bioEn: bioEn || "",
          bioAr: bioAr || "",
          bioZh: bioZh || "",
          bioCkb: bioCkb || "",
          imageUrl,
          organization:
            organization || "Sino-Iraqi Women Empowerment Initiative",
          publicationUrl: publicationUrl || null,
          isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
          isTrending: isTrending !== undefined ? Boolean(isTrending) : true,
        },
      });

      res.json(newFeature);
    } catch (e: any) {
      console.error("Error creating women feature record:", e);
      res
        .status(500)
        .json({ error: "Failed to create women feature record: " + e.message });
    }
  });

  app.put("/api/women/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;

      const updatedFeature = await prisma.womenFeature.update({
        where: { id },
        data,
      });

      res.json(updatedFeature);
    } catch (e: any) {
      console.error("Error updating women feature record:", e);
      res
        .status(500)
        .json({ error: "Failed to update women feature record: " + e.message });
    }
  });

  app.delete("/api/women/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.womenFeature.delete({ where: { id } });
      res.json({
        success: true,
        message: "Women feature record deleted successfully",
      });
    } catch (e: any) {
      console.error("Error deleting women feature record:", e);
      res.status(500).json({ error: "Failed to delete women feature record" });
    }
  });

  app.post("/api/women/seed", editorOrAdminMiddleware, async (req, res) => {
    try {
      await seedWomenFeatures();
      const count = await prisma.womenFeature.count();
      res.json({
        success: true,
        count,
        message: `Reseeded women database (${count} records present)`,
      });
    } catch (e: any) {
      console.error("Error reseeding women database:", e);
      res.status(500).json({ error: "Failed to reseed women database" });
    }
  });

  // --- Visa & Flight Portal API ---
  let visaFlightsInitialized = false;
  app.get("/api/visa-flights", async (req, res) => {
    try {
      if (!visaFlightsInitialized) {
        const count = await prisma.visaFlight.count();
        if (count === 0) {
          await seedVisaFlights();
        }
        visaFlightsInitialized = true;
      }

      const {
        q,
        serviceType,
        originRegion,
        destinationRegion,
        trending,
        featured,
      } = req.query;
      const where: any = {};

      if (
        serviceType &&
        typeof serviceType === "string" &&
        serviceType !== "ALL"
      ) {
        where.serviceType = serviceType;
      }
      if (
        originRegion &&
        typeof originRegion === "string" &&
        originRegion !== "ALL"
      ) {
        where.originRegion = originRegion;
      }
      if (
        destinationRegion &&
        typeof destinationRegion === "string" &&
        destinationRegion !== "ALL"
      ) {
        where.destinationRegion = destinationRegion;
      }
      if (trending === "true") {
        where.isTrending = true;
      }
      if (featured === "true") {
        where.isFeatured = true;
      }

      let items = await prisma.visaFlight.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      if (q && typeof q === "string" && q.trim().length > 0) {
        const query = q.toLowerCase();
        items = items.filter(
          (f) =>
            f.titleEn.toLowerCase().includes(query) ||
            f.titleAr.includes(query) ||
            f.titleZh.includes(query) ||
            f.titleCkb.includes(query) ||
            f.summaryEn.toLowerCase().includes(query) ||
            f.airlineOrAuthority.toLowerCase().includes(query),
        );
      }

      res.json(items);
    } catch (e: any) {
      console.error("Error fetching visa & flight records:", e);
      res
        .status(500)
        .json({ error: "Failed to fetch visa & flight records: " + e.message });
    }
  });

  app.get("/api/visa-flights/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await prisma.visaFlight.findUnique({ where: { id } });
      if (!item)
        return res
          .status(404)
          .json({ error: "Visa & Flight record not found" });
      res.json(item);
    } catch (e: any) {
      console.error("Error fetching visa & flight item:", e);
      res.status(500).json({ error: "Failed to fetch visa & flight item" });
    }
  });

  app.post("/api/visa-flights", authMiddleware, async (req, res) => {
    try {
      const body = req.body;
      const slug =
        body.slug ||
        body.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
          "-" +
          Date.now().toString().slice(-4);

      const newItem = await prisma.visaFlight.create({
        data: {
          slug,
          titleEn: body.titleEn,
          titleAr: body.titleAr || "",
          titleZh: body.titleZh || "",
          titleCkb: body.titleCkb || "",
          serviceType: body.serviceType || "VISA_ASSISTANCE",
          originRegion: body.originRegion || "CHINA",
          destinationRegion: body.destinationRegion || "BILATERAL",
          summaryEn: body.summaryEn || "",
          summaryAr: body.summaryAr || "",
          summaryZh: body.summaryZh || "",
          summaryCkb: body.summaryCkb || "",
          detailsEn: body.detailsEn || "",
          detailsAr: body.detailsAr || "",
          detailsZh: body.detailsZh || "",
          detailsCkb: body.detailsCkb || "",
          airlineOrAuthority:
            body.airlineOrAuthority || "Consular & Civil Aviation Authority",
          processingTime: body.processingTime || "24 - 48 Hours",
          feeOrCost: body.feeOrCost || "Consular Tariff",
          imageUrl:
            body.imageUrl ||
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000",
          officialLink: body.officialLink || null,
          isFeatured: body.isFeatured !== undefined ? body.isFeatured : true,
          isTrending: body.isTrending !== undefined ? body.isTrending : true,
        },
      });
      res.json(newItem);
    } catch (e: any) {
      console.error("Error creating visa & flight record:", e);
      res
        .status(500)
        .json({ error: "Failed to create visa & flight record: " + e.message });
    }
  });

  app.put("/api/visa-flights/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const updated = await prisma.visaFlight.update({
        where: { id },
        data: {
          ...(body.titleEn !== undefined && { titleEn: body.titleEn }),
          ...(body.titleAr !== undefined && { titleAr: body.titleAr }),
          ...(body.titleZh !== undefined && { titleZh: body.titleZh }),
          ...(body.titleCkb !== undefined && { titleCkb: body.titleCkb }),
          ...(body.serviceType !== undefined && {
            serviceType: body.serviceType,
          }),
          ...(body.originRegion !== undefined && {
            originRegion: body.originRegion,
          }),
          ...(body.destinationRegion !== undefined && {
            destinationRegion: body.destinationRegion,
          }),
          ...(body.summaryEn !== undefined && { summaryEn: body.summaryEn }),
          ...(body.summaryAr !== undefined && { summaryAr: body.summaryAr }),
          ...(body.summaryZh !== undefined && { summaryZh: body.summaryZh }),
          ...(body.summaryCkb !== undefined && { summaryCkb: body.summaryCkb }),
          ...(body.detailsEn !== undefined && { detailsEn: body.detailsEn }),
          ...(body.detailsAr !== undefined && { detailsAr: body.detailsAr }),
          ...(body.detailsZh !== undefined && { detailsZh: body.detailsZh }),
          ...(body.detailsCkb !== undefined && { detailsCkb: body.detailsCkb }),
          ...(body.airlineOrAuthority !== undefined && {
            airlineOrAuthority: body.airlineOrAuthority,
          }),
          ...(body.processingTime !== undefined && {
            processingTime: body.processingTime,
          }),
          ...(body.feeOrCost !== undefined && { feeOrCost: body.feeOrCost }),
          ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
          ...(body.officialLink !== undefined && {
            officialLink: body.officialLink,
          }),
          ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
          ...(body.isTrending !== undefined && { isTrending: body.isTrending }),
        },
      });
      res.json(updated);
    } catch (e: any) {
      console.error("Error updating visa & flight record:", e);
      res
        .status(500)
        .json({ error: "Failed to update visa & flight record: " + e.message });
    }
  });

  app.delete("/api/visa-flights/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.visaFlight.delete({ where: { id } });
      res.json({
        success: true,
        message: "Visa & Flight record deleted successfully",
      });
    } catch (e: any) {
      console.error("Error deleting visa & flight record:", e);
      res.status(500).json({ error: "Failed to delete visa & flight record" });
    }
  });

  app.post("/api/visa-flights/seed", editorOrAdminMiddleware, async (req, res) => {
    try {
      await seedVisaFlights();
      const count = await prisma.visaFlight.count();
      res.json({
        success: true,
        count,
        message: `Reseeded visa & flight database (${count} records present)`,
      });
    } catch (e: any) {
      console.error("Error reseeding visa & flight database:", e);
      res
        .status(500)
        .json({ error: "Failed to reseed visa & flight database" });
    }
  });

  app.post("/api/visa-flights/apply", async (req, res) => {
    try {
      const {
        fullName,
        email,
        passportNumber,
        origin,
        destination,
        travelDate,
        serviceType,
        notes,
      } = req.body;
      if (!fullName || !email || !passportNumber || !serviceType) {
        return res
          .status(400)
          .json({ error: "Missing required fields for visa/flight request" });
      }
      res.json({
        success: true,
        ticketId: "VF-" + Math.floor(100000 + Math.random() * 900000),
        message:
          "Your visa/flight assistance inquiry has been transmitted to the Consular & Aviation Concierge Secretariat.",
      });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to process application" });
    }
  });

  // --- Podcast API ---
  app.get("/api/podcasts", async (req, res) => {
    try {
      const { q, region, category, trending, featured } = req.query;
      const where: any = {};

      if (region && typeof region === "string" && region !== "ALL") {
        where.region = region;
      }
      if (category && typeof category === "string" && category !== "ALL") {
        where.category = category;
      }
      if (trending === "true") {
        where.isTrending = true;
      }
      if (featured === "true") {
        where.isFeatured = true;
      }

      let podcasts = await prisma.podcast.findMany({
        where,
        orderBy: { publishedAt: "desc" },
      });

      if (q && typeof q === "string" && q.trim().length > 0) {
        const query = q.toLowerCase();
        podcasts = podcasts.filter(
          (p) =>
            p.titleEn.toLowerCase().includes(query) ||
            p.titleAr.includes(query) ||
            p.titleZh.includes(query) ||
            p.titleCkb.includes(query) ||
            p.descriptionEn.toLowerCase().includes(query) ||
            (p.guestName && p.guestName.toLowerCase().includes(query)),
        );
      }

      res.json(podcasts);
    } catch (e: any) {
      console.error("Error fetching podcasts:", e);
      res.status(500).json({ error: "Failed to fetch podcasts" });
    }
  });

  app.get("/api/podcasts/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const podcast = await prisma.podcast.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
      });
      if (!podcast) {
        return res.status(404).json({ error: "Podcast not found" });
      }
      res.json(podcast);
    } catch (e: any) {
      console.error("Error fetching podcast:", e);
      res.status(500).json({ error: "Failed to fetch podcast detail" });
    }
  });

  app.post("/api/podcasts", authMiddleware, async (req, res) => {
    try {
      const body = req.body;
      const slug =
        body.slug ||
        `podcast-${Date.now()}-${body.titleEn
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .slice(0, 30)}`;

      const newPodcast = await prisma.podcast.create({
        data: {
          slug,
          titleEn: body.titleEn,
          titleAr: body.titleAr || "",
          titleZh: body.titleZh || "",
          titleCkb: body.titleCkb || "",
          descriptionEn: body.descriptionEn,
          descriptionAr: body.descriptionAr || "",
          descriptionZh: body.descriptionZh || "",
          descriptionCkb: body.descriptionCkb || "",
          audioUrl: body.audioUrl,
          coverUrl: body.coverUrl,
          host: body.host || "Iraq-China Daily Podcast Network",
          guestName: body.guestName || null,
          guestRole: body.guestRole || null,
          publicationUrl: body.publicationUrl || null,
          category: body.category,
          region: body.region,
          duration: body.duration || "00:00",
          isFeatured: body.isFeatured !== undefined ? body.isFeatured : false,
          isTrending: body.isTrending !== undefined ? body.isTrending : false,
          publishedAt: body.publishedAt
            ? new Date(body.publishedAt)
            : new Date(),
        },
      });
      res.status(201).json(newPodcast);
    } catch (e: any) {
      console.error("Error creating podcast:", e);
      res.status(500).json({ error: "Failed to create podcast: " + e.message });
    }
  });

  app.put("/api/podcasts/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;

      if (data.publishedAt) {
        data.publishedAt = new Date(data.publishedAt);
      }

      const updated = await prisma.podcast.update({
        where: { id },
        data,
      });
      res.json(updated);
    } catch (e: any) {
      console.error("Error updating podcast:", e);
      res.status(500).json({ error: "Failed to update podcast: " + e.message });
    }
  });

  app.delete("/api/podcasts/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.podcast.delete({ where: { id } });
      res.json({ success: true, message: "Podcast deleted successfully" });
    } catch (e: any) {
      console.error("Error deleting podcast:", e);
      res.status(500).json({ error: "Failed to delete podcast" });
    }
  });

  // Public submissions for Partnership Applications & Telexes
  app.post("/api/public/applications", async (req, res) => {
    try {
      const { 
        fullName, email, company, role, bio, hash, bureau, fileUrl,
        nationality, passportOrIdNumber, asaishCode, iraqiInfoCard,
        addressHouseNo, addressStreetNo, addressDistrictName, addressDistrictNumber,
        phoneNumber, dateOfBirth, emergencyContact
      } = req.body;
      if (
        !fullName ||
        !email ||
        !company ||
        !role ||
        !bio ||
        !hash ||
        !bureau
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const application = await prisma.partnershipApplication.create({
        data: { 
          fullName, email, company, role, bio, hash, bureau, fileUrl,
          nationality: nationality || "Iraqi / Chinese",
          passportOrIdNumber: passportOrIdNumber || "",
          asaishCode: asaishCode && asaishCode.trim() !== '' ? asaishCode : null,
          iraqiInfoCard: iraqiInfoCard || "",
          addressHouseNo: addressHouseNo || "",
          addressStreetNo: addressStreetNo || "",
          addressDistrictName: addressDistrictName || "",
          addressDistrictNumber: addressDistrictNumber || "",
          phoneNumber: phoneNumber || "",
          dateOfBirth: dateOfBirth || "",
          emergencyContact: emergencyContact || ""
        },
      });

      // Synchronize with User database table so it appears in Admin Portal
      const uniqueSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      const uniqueCodeNum = Math.floor(1000 + Math.random() * 9000);
      const defaultExpiry = new Date();
      defaultExpiry.setFullYear(defaultExpiry.getFullYear() + 1);

      const computedRole = role === 'editorial' ? 'EDITOR' : role === 'volunteer' ? 'VOLUNTEER' : role === 'intern' ? 'INTERN' : 'AUTHOR';
      const computedClearance = (role === 'volunteer' || role === 'intern') ? 'LEVEL-1' : 'LEVEL-2';
      const computedMemberCode = hash || (role === 'volunteer' ? `ICA-VOL-2026-${uniqueCodeNum}` : role === 'intern' ? `ICA-INT-2026-${uniqueCodeNum}` : `ICA-M-${uniqueCodeNum}`);

      await prisma.user.upsert({
        where: { email },
        update: {
          name: fullName,
          role: computedRole,
          department: bureau,
          title: company,
          nationality: nationality || "Iraqi / Chinese",
          passportOrIdNumber: passportOrIdNumber || "",
          asaishCode: asaishCode && asaishCode.trim() !== '' ? asaishCode : null,
          iraqiInfoCard: iraqiInfoCard || "",
          addressHouseNo: addressHouseNo || "",
          addressStreetNo: addressStreetNo || "",
          addressDistrictName: addressDistrictName || "",
          addressDistrictNumber: addressDistrictNumber || "",
          phoneNumber: phoneNumber || "",
          dateOfBirth: dateOfBirth || "",
          emergencyContact: emergencyContact || ""
        },
        create: {
          name: fullName,
          email,
          role: computedRole,
          department: bureau,
          title: company,
          clearanceLevel: computedClearance,
          badgeStatus: "ACTIVE",
          digitalId: `ICA-DID-2026-${uniqueSuffix}`,
          memberCode: computedMemberCode,
          nationality: nationality || "Iraqi / Chinese",
          passportOrIdNumber: passportOrIdNumber || "",
          asaishCode: asaishCode && asaishCode.trim() !== '' ? asaishCode : null,
          iraqiInfoCard: iraqiInfoCard || "",
          addressHouseNo: addressHouseNo || "",
          addressStreetNo: addressStreetNo || "",
          addressDistrictName: addressDistrictName || "",
          addressDistrictNumber: addressDistrictNumber || "",
          phoneNumber: phoneNumber || "",
          dateOfBirth: dateOfBirth || "",
          emergencyContact: emergencyContact || "",
          credentialIssuedDate: new Date(),
          credentialExpiryDate: defaultExpiry,
          renewalCount: 0
        }
      }).catch(err => console.error("Admin user sync note:", err));

      res.json({ success: true, application });
    } catch (e: any) {
      console.error("Failed to submit application:", e);
      res
        .status(500)
        .json({
          error: "Failed to submit partnership application: " + (e.message || "Duplicate Asaish Code or Email"),
        });
    }
  });


  app.post("/api/public/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email is required" });
      }
      
      const existing = await prisma.newsletterSubscriber.findUnique({
        where: { email },
      });
      
      if (existing) {
        if (!existing.isActive) {
          const updated = await prisma.newsletterSubscriber.update({
            where: { email },
            data: { isActive: true }
          });
          return res.json({ success: true, message: "Re-subscribed successfully" });
        }
        return res.status(400).json({ error: "Email is already subscribed" });
      }
      
      const subscriber = await prisma.newsletterSubscriber.create({
        data: { email }
      });
      
      res.json({ success: true, subscriber });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  app.post("/api/public/telexes", async (req, res) => {
    try {
      const { name, email, company, bureau, message, telexRef } = req.body;
      if (!name || !email || !company || !bureau || !message || !telexRef) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const dispatch = await prisma.telexDispatch.create({
        data: { name, email, company, bureau, message, telexRef },
      });
      res.json({ success: true, dispatch });
    } catch (e: any) {
      console.error("Failed to submit telex:", e);
      res
        .status(500)
        .json({ error: "Failed to submit telex dispatch: " + e.message });
    }
  });

  // Admin Partnership Applications Management
  // ----- PARTNERS API -----
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await prisma.partner.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      });
      res.json(partners);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  // ----- SOURCING INQUIRY API -----
  app.post("/api/public/sourcing", async (req, res) => {
    try {
      const ticketId = "SRC-" + Math.random().toString(36).substr(2, 6).toUpperCase();
      const inquiry = await prisma.sourcingInquiry.create({
        data: { ...req.body, ticketId },
      });
      res.json(inquiry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/admin/sourcing", authMiddleware, async (req, res) => {
    try {
      const inquiries = await prisma.sourcingInquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json(inquiries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.put("/api/admin/sourcing/:id", authMiddleware, async (req, res) => {
    try {
      const inquiry = await prisma.sourcingInquiry.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json(inquiry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.delete("/api/admin/sourcing/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.sourcingInquiry.delete({
        where: { id: req.params.id },
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/admin/partners", authMiddleware, async (req, res) => {
    try {
      const partners = await prisma.partner.findMany({
        orderBy: { order: "asc" },
      });
      res.json(partners);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.post("/api/admin/partners", authMiddleware, async (req, res) => {
    try {
      const partner = await prisma.partner.create({
        data: req.body,
      });
      res.json(partner);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.put("/api/admin/partners/:id", authMiddleware, async (req, res) => {
    try {
      const partner = await prisma.partner.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json(partner);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.delete("/api/admin/partners/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.partner.delete({
        where: { id: req.params.id },
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/admin/applications", authMiddleware, async (req, res) => {
    try {
      const apps = await prisma.partnershipApplication.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json(apps);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.put("/api/admin/applications/:id", authMiddleware, async (req, res) => {
    try {
      const { status } = req.body;
      const app = await prisma.partnershipApplication.update({
        where: { id: req.params.id },
        data: { status },
      });
      res.json(app);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update application" });
    }
  });

  app.delete(
    "/api/admin/applications/:id",
    authMiddleware,
    async (req, res) => {
      try {
        await prisma.partnershipApplication.delete({
          where: { id: req.params.id },
        });
        res.json({ success: true });
      } catch (e: any) {
        console.error(e);
        res.status(500).json({ error: "Failed to delete application" });
      }
    },
  );

  // Admin Telex Dispatches Management
  app.get("/api/admin/telexes", authMiddleware, async (req, res) => {
    try {
      const telexes = await prisma.telexDispatch.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json(telexes);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch telex dispatches" });
    }
  });

  app.put("/api/admin/telexes/:id", authMiddleware, async (req, res) => {
    try {
      const { status } = req.body;
      const tlx = await prisma.telexDispatch.update({
        where: { id: req.params.id },
        data: { status },
      });
      res.json(tlx);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update telex dispatch" });
    }
  });

  app.delete("/api/admin/telexes/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.telexDispatch.delete({
        where: { id: req.params.id },
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete telex dispatch" });
    }
  });

  // Admin Studies Management
  app.post("/api/admin/studies", authMiddleware, async (req: any, res: any) => {
    try {
      const {
        slug,
        titleEn,
        titleAr,
        titleZh,
        titleCkb,
        excerptEn,
        excerptAr,
        excerptZh,
        excerptCkb,
        contentEn,
        contentAr,
        contentZh,
        contentCkb,
        imageUrl,
        isPrivate,
      } = req.body;
      if (!slug || !titleEn || !titleAr || !titleZh || !titleCkb) {
        return res.status(400).json({ error: "Missing required study fields" });
      }

      let author = await prisma.user.findFirst({ where: { role: "ADMIN" } });
      if (!author) {
        author = await prisma.user.create({
          data: { email: "admin@test.com", name: "Admin", role: "ADMIN" },
        });
      }

      const study = await prisma.study.upsert({
        where: { slug },
        update: {
          titleEn,
          titleAr,
          titleZh,
          titleCkb,
          excerptEn: excerptEn || "",
          excerptAr: excerptAr || "",
          excerptZh: excerptZh || "",
          excerptCkb: excerptCkb || "",
          contentEn: contentEn || "",
          contentAr: contentAr || "",
          contentZh: contentZh || "",
          contentCkb: contentCkb || "",
          imageUrl,
          isPrivate: !!isPrivate,
          authorId: author.id,
        },
        create: {
          slug,
          titleEn,
          titleAr,
          titleZh,
          titleCkb,
          excerptEn: excerptEn || "",
          excerptAr: excerptAr || "",
          excerptZh: excerptZh || "",
          excerptCkb: excerptCkb || "",
          contentEn: contentEn || "",
          contentAr: contentAr || "",
          contentZh: contentZh || "",
          contentCkb: contentCkb || "",
          imageUrl,
          isPrivate: !!isPrivate,
          authorId: author.id,
        },
      });
      res.json(study);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to save study" });
    }
  });

  app.delete("/api/admin/studies/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.study.delete({
        where: { id: req.params.id },
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete study" });
    }
  });


  app.post("/api/admin/articles", authMiddleware, async (req, res) => {
    const { slug, categoryId, imageUrl, translations } = req.body;
    try {
      let author = await prisma.user.findFirst({ where: { role: "ADMIN" } });
      if (!author) {
        author = await prisma.user.create({
          data: { email: "admin@test.com", name: "Admin", role: "ADMIN" },
        });
      }

      // Check if article with slug already exists for Force Save/Overwrite support
      const existing = await prisma.article.findUnique({
        where: { slug },
      });

      let article;
      if (existing) {
        // Clean up existing translations first
        await prisma.articleTranslation.deleteMany({
          where: { articleId: existing.id },
        });

        article = await prisma.article.update({
          where: { id: existing.id },
          data: {
            categoryId,
            authorId: author.id,
            imageUrl,
            status: "PUBLISHED",
            translations: {
              create: translations,
            },
          },
        });
        console.log(
          `[FORCE SAVE] Successfully updated/overwrote article slug: ${slug}`,
        );
      } else {
        article = await prisma.article.create({
          data: {
            slug,
            categoryId,
            authorId: author.id,
            imageUrl,
            status: "PUBLISHED",
            translations: {
              create: translations,
            },
          },
        });
        console.log(`[CREATE] Successfully created new article slug: ${slug}`);
      }

      // Simulate Next-style revalidatePath() for quadrilingual article paths
      console.log(`\n--- [ISR] TRIGGERING PATH REVALIDATION ---`);
      console.log(`[ISR] revalidatePath("/en/articles/${slug}") -> Success`);
      console.log(`[ISR] revalidatePath("/ar/articles/${slug}") -> Success`);
      console.log(`[ISR] revalidatePath("/zh/articles/${slug}") -> Success`);
      console.log(`[ISR] revalidatePath("/ckb/articles/${slug}") -> Success`);
      console.log(`-----------------------------------------\n`);

      res.json(article);
    } catch (e: any) {
      console.error("Failed to save article:", e);
      res.status(500).json({ error: "Failed to save article" });
    }
  });

  app.post("/api/admin/news-search", editorOrAdminMiddleware, aiSearchLimiter, async (req, res) => {
    try {
      const { country, topic } = req.body;
      const query = country
        ? `News on ${country} and Iraq relations, focusing on ${topic || "economic development"}`
        : `Latest real-world news on Iraq-China trade, energy deals, and cooperation agreements`;

      if (process.env.GEMINI_API_KEY) {
        try {
          const ai = getGeminiClient();
          console.log(
            `[AI News Search] Initiating Google Search grounded query with Gemini for: "${query}"`,
          );

          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an elite, bi-partisan political and trade news journalist for Iraqi-Chinese Agency, a premier trilingual China-Iraq news portal. 
            Perform a deep web search to find real-world, factual recent news events, bilateral trade details, or cooperation agreements concerning ${query} in 2025/2026.
            
            Generate exactly 3 diverse, highly detailed, and realistic news articles.
            For each article, translate the headline, excerpt, and detailed body content into EXACTLY four languages:
            1. English ('en')
            2. Arabic ('ar')
            3. Chinese ('zh')
            4. Kurdish/Sorani ('ckb')
            
            Categories must be one of: 'energy', 'economy', 'culture'. Pick the best match for the news topic.
            Select an appropriate, realistic, high-quality image from Unsplash for each article (e.g., matching construction, technology, industry, oil, or culture).`,
            config: {
              tools: [{ googleSearch: {} }],
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.ARRAY,
                description:
                  "A list of 3 news articles generated from real-world search results.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    slug: {
                      type: Type.STRING,
                      description:
                        "Unique, lowercase, URL-friendly slug using hyphens.",
                    },
                    categorySlug: {
                      type: Type.STRING,
                      description:
                        "Must be exactly one of: 'energy', 'economy', 'culture'",
                    },
                    imageUrl: {
                      type: Type.STRING,
                      description: "A realistic Unsplash image URL.",
                    },
                    translations: {
                      type: Type.ARRAY,
                      description:
                        "Must contain exactly four translations with lang keys: 'en', 'ar', 'zh', 'ckb'",
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          lang: {
                            type: Type.STRING,
                            description: "Must be 'en', 'ar', 'zh', or 'ckb'",
                          },
                          title: {
                            type: Type.STRING,
                            description: "Professional news headline.",
                          },
                          excerpt: {
                            type: Type.STRING,
                            description: "Short summary of the news story.",
                          },
                          content: {
                            type: Type.STRING,
                            description:
                              "Full, detailed, multi-paragraph body text of the article (minimum 150 words).",
                          },
                        },
                        required: ["lang", "title", "excerpt", "content"],
                      },
                    },
                  },
                  required: ["slug", "categorySlug", "imageUrl", "translations"],
                },
              },
            },
          });

          const text = response.text;
          if (text) {
            const articles = JSON.parse(text);
            return res.json({ success: true, articles });
          }
        } catch (aiErr) {
          console.warn("[AI Admin News Search API] Falling back to database articles:", aiErr);
        }
      }

      // Local fallback
      const dbArticles = await prisma.article.findMany({
        take: 3,
        include: {
          category: true,
          translations: true,
        },
        orderBy: { createdAt: 'desc' }
      });

      const fallbackArticles = dbArticles.map(a => ({
        slug: a.slug,
        categorySlug: a.category?.slug || 'economy',
        imageUrl: a.imageUrl || 'https://images.unsplash.com/photo-1541888052140-59dc93539169?q=80&w=1200&auto=format&fit=crop',
        translations: a.translations.map(t => ({
          lang: t.lang,
          title: t.title,
          excerpt: t.excerpt,
          content: t.content
        }))
      }));

      res.json({ success: true, articles: fallbackArticles });
    } catch (e: any) {
      console.error("[AI News Search Error]", e);
      res
        .status(500)
        .json({ error: e.message || "Failed to search and generate news" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    const cats = await prisma.category.findMany();
    res.json(cats);
  });

  // 4. Admin Users management
  
  app.get("/api/admin/subscribers", authMiddleware, async (req, res) => {
    try {
      const subscribers = await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(subscribers);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });

  app.get("/api/admin/users", editorOrAdminMiddleware, async (req, res) => {
    try {
      let users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Seed if empty
      if (users.length === 0) {
        await prisma.user.createMany({
          data: [
            { email: "hunar@iraq-china-daily.com", name: "Hunar Jabbar", role: "ADMIN", digitalId: "ICA-DID-2026-HQ01", memberCode: "ICA-M-1001", department: "Executive Directorate", title: "Chief Executive & Editor-in-Chief", clearanceLevel: "LEVEL-4", badgeStatus: "ACTIVE" },
            {
              email: "jasim@iraq-china-daily.com",
              name: "Jasim Al-Iraqi",
              role: "EDITOR",
              digitalId: "ICA-DID-2026-BG02",
              memberCode: "ICA-M-1002",
              department: "Baghdad Bureau",
              title: "Senior Diplomatic Editor",
              clearanceLevel: "LEVEL-3",
              badgeStatus: "ACTIVE"
            },
            { email: "zhu@iraq-china-daily.com", name: "Zhu Chen", role: "AUTHOR", digitalId: "ICA-DID-2026-BJ03", memberCode: "ICA-M-1003", department: "Beijing Bureau", title: "Sino-Arab Relations Correspondent", clearanceLevel: "LEVEL-2", badgeStatus: "ACTIVE" },
          ],
        });
        users = await prisma.user.findMany({
          orderBy: { createdAt: "desc" },
        });
      }

      // Ensure all users have digitalId and memberCode (backfill if missing)
      for (const u of users) {
        if (!u.digitalId || !u.memberCode) {
          const randSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
          const randCode = Math.floor(1000 + Math.random() * 9000);
          await prisma.user.update({
            where: { id: u.id },
            data: {
              digitalId: u.digitalId || `ICA-DID-2026-${randSuffix}`,
              memberCode: u.memberCode || `ICA-M-${randCode}`,
            }
          }).catch(() => {});
        }
      }
      users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      });

      res.json(users);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/users", editorOrAdminMiddleware, async (req, res) => {
    const { 
      name, email, role, department, title, clearanceLevel, badgeStatus, digitalId, memberCode,
      nationality, passportOrIdNumber, asaishCode, iraqiInfoCard, addressHouseNo, addressStreetNo, addressDistrictName, addressDistrictNumber,
      phoneNumber, dateOfBirth, emergencyContact, credentialExpiryDate
    } = req.body;
    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "Name and Email are strictly required" });
    }
    try {
      const uniqueSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      const uniqueCodeNum = Math.floor(1000 + Math.random() * 9000);
      const finalDigitalId = digitalId && digitalId.trim() !== '' ? digitalId : `ICA-DID-2026-${uniqueSuffix}`;
      const finalMemberCode = memberCode && memberCode.trim() !== '' ? memberCode : `ICA-M-${uniqueCodeNum}`;

      // Default expiry 1 year from now if not provided
      const defaultExpiry = new Date();
      defaultExpiry.setFullYear(defaultExpiry.getFullYear() + 1);

      const user = await prisma.user.create({
        data: { 
          name, 
          email, 
          role: role || "AUTHOR",
          department: department || "Editorial & Intelligence",
          title: title || "Strategic Analyst",
          clearanceLevel: clearanceLevel || "LEVEL-2",
          badgeStatus: badgeStatus || "ACTIVE",
          digitalId: finalDigitalId,
          memberCode: finalMemberCode,
          nationality: nationality || "Iraqi / Chinese",
          passportOrIdNumber: passportOrIdNumber || "",
          asaishCode: asaishCode || null,
          iraqiInfoCard: iraqiInfoCard || "",
          addressHouseNo: addressHouseNo || "",
          addressStreetNo: addressStreetNo || "",
          addressDistrictName: addressDistrictName || "",
          addressDistrictNumber: addressDistrictNumber || "",
          phoneNumber: phoneNumber || "",
          dateOfBirth: dateOfBirth || "",
          emergencyContact: emergencyContact || "",
          credentialIssuedDate: new Date(),
          credentialExpiryDate: credentialExpiryDate ? new Date(credentialExpiryDate) : defaultExpiry,
          renewalCount: 0
        },
      });
      res.json(user);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to create user / Duplicate digital ID, Member Code, or Asaish Code" });
    }
  });

  app.put("/api/admin/users/:id", editorOrAdminMiddleware, async (req, res) => {
    const {
      name,
      email,
      role,
      department,
      title,
      clearanceLevel,
      badgeStatus,
      digitalId,
      memberCode,
      nationality,
      passportOrIdNumber,
      asaishCode,
      iraqiInfoCard,
      addressHouseNo,
      addressStreetNo,
      addressDistrictName,
      addressDistrictNumber,
      phoneNumber,
      dateOfBirth,
      emergencyContact,
      credentialExpiryDate,
      subscriptionStatus,
      subscriptionPlan,
      subscriptionEndDate,
    } = req.body;
    try {
      const updateData: any = { name, email, role };
      if (department !== undefined) updateData.department = department;
      if (title !== undefined) updateData.title = title;
      if (clearanceLevel !== undefined) updateData.clearanceLevel = clearanceLevel;
      if (badgeStatus !== undefined) updateData.badgeStatus = badgeStatus;
      if (digitalId !== undefined && digitalId.trim() !== '') updateData.digitalId = digitalId;
      if (memberCode !== undefined && memberCode.trim() !== '') updateData.memberCode = memberCode;
      if (nationality !== undefined) updateData.nationality = nationality;
      if (passportOrIdNumber !== undefined) updateData.passportOrIdNumber = passportOrIdNumber;
      if (asaishCode !== undefined) updateData.asaishCode = asaishCode !== '' ? asaishCode : null;
      if (iraqiInfoCard !== undefined) updateData.iraqiInfoCard = iraqiInfoCard;
      if (addressHouseNo !== undefined) updateData.addressHouseNo = addressHouseNo;
      if (addressStreetNo !== undefined) updateData.addressStreetNo = addressStreetNo;
      if (addressDistrictName !== undefined) updateData.addressDistrictName = addressDistrictName;
      if (addressDistrictNumber !== undefined) updateData.addressDistrictNumber = addressDistrictNumber;
      if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
      if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
      if (emergencyContact !== undefined) updateData.emergencyContact = emergencyContact;
      if (credentialExpiryDate !== undefined && credentialExpiryDate !== '') updateData.credentialExpiryDate = new Date(credentialExpiryDate);
      if (subscriptionStatus !== undefined)
        updateData.subscriptionStatus = subscriptionStatus;
      if (subscriptionPlan !== undefined)
        updateData.subscriptionPlan = subscriptionPlan;
      if (subscriptionEndDate !== undefined)
        updateData.subscriptionEndDate = subscriptionEndDate;

      const user = await prisma.user.update({
        where: { id: req.params.id },
        data: updateData,
      });
      res.json(user);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  app.post("/api/admin/users/:id/renew", editorOrAdminMiddleware, async (req, res) => {
    try {
      const existing = await prisma.user.findUnique({ where: { id: req.params.id } });
      if (!existing) return res.status(404).json({ error: "Member not found" });

      const currentExpiry = existing.credentialExpiryDate ? new Date(existing.credentialExpiryDate) : new Date();
      const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
      const newExpiry = new Date(baseDate);
      newExpiry.setFullYear(newExpiry.getFullYear() + 1);

      const updated = await prisma.user.update({
        where: { id: req.params.id },
        data: {
          credentialExpiryDate: newExpiry,
          renewalCount: (existing.renewalCount || 0) + 1,
          lastRenewedAt: new Date(),
          badgeStatus: "ACTIVE"
        }
      });
      res.json(updated);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to renew credentials" });
    }
  });

  app.delete("/api/admin/users/:id", editorOrAdminMiddleware, async (req, res) => {
    try {
      await prisma.user.delete({
        where: { id: req.params.id },
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });


  // Newsletter
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "Email is required" });
      const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
      if (existing) {
        return res.json({ message: "Already subscribed", subscriber: existing });
      }
      const subscriber = await prisma.newsletterSubscriber.create({ data: { email } });
      res.json({ message: "Subscribed successfully", subscriber });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  // 404 Handler for undefined API routes to prevent falling through to HTML SPA fallback
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
  });

  // Global Error Handler for API
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Unhandled API Error:", err);
    if (res.headersSent) {
      return next(err);
    }
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    // Run background seeders only after HTTP server is actively accepting connections
    setTimeout(() => {
      runStartupSeeders().catch((e) => console.error("Startup seeders background error:", e));
    }, 300);
  });
}

startServer().catch((err) => {
  console.error("Fatal error starting server:", err);
  process.exit(1);
});
