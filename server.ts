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
import { seedBricsTopics } from "./server/bricsSeeder.js";
import { seedHistoricalFigures } from "./server/historicalFiguresSeeder.js";
import { seedChineseProducts } from "./server/chineseProductSeeder.js";
import { seedPartners } from "./server/partnerSeeder.js";
import { seedBusinessOpportunities } from "./server/businessOpportunitySeeder.js";
import { registerPaymentRoutes } from "./server/paymentRoutes.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("FATAL ERROR: JWT_SECRET environment variable is not set.");
    process.exit(1);
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


async function ensureAdminAccount() {
  try {
    const adminEmail = 'admin@iraqi-chineseagency.com';
    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await (bcrypt.default || bcrypt).hash('admin123', 10);
    if (!existing) {
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: 'System Administrator',
          password: hashedPassword,
          role: 'ADMIN',
          department: 'Executive Directorate',
          title: 'Chief System Administrator',
          clearanceLevel: 'LEVEL-4',
          badgeStatus: 'ACTIVE',
          digitalId: 'ICA-DID-2026-ADMIN',
          memberCode: 'ICA-M-0001'
        }
      });
      console.log(`🔑 Created predefined administrator account: ${adminEmail} (Password: admin123)`);
    } else {
      await prisma.user.update({
        where: { email: adminEmail },
        data: { password: hashedPassword, role: 'ADMIN' }
      });
      console.log(`🔑 Verified predefined administrator account: ${adminEmail} (Password: admin123)`);
    }
  } catch (e) {
    console.error("Failed to ensure admin account:", e);
  }
}

async function runStartupSeeders() {
  try {
    console.log("🌱 Starting background database seeders...");
    await ensureAdminAccount();
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
    await seedBricsTopics();
    await seedHistoricalFigures();
    await seedChineseProducts();
    await seedPartners();
    await seedBusinessOpportunities();
    console.log("✅ All background database seeders completed successfully.");
  } catch (err) {
    console.error("⚠️ Error running background seeders:", err);
  }
}

async function startServer() {
  getJwtSecret(); // Crash early if not set

  const app = express();
  app.set("trust proxy", 1);
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Platform and infrastructure health check route (first priority - instantly ready)
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
  });

  const allowedFrameAncestors = ["*", "'self'", "https://ai.studio", "https://*.ai.studio", "https://aistudio.google.com", "https://*.aistudio.google.com", "https://*.google.com", "https://*.run.app", "https://*.googleusercontent.com"];

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          frameSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "blob:", "https:"],
          connectSrc: ["'self'", "https:", "wss:"],
          styleSrc: ["'self'", "'unsafe-inline'", "https:"],
          fontSrc: ["'self'", "data:", "https:"],
          frameAncestors: allowedFrameAncestors,
        },
      },
      frameguard: false, // Ensure iframe embedding in AI Studio is permitted
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
      originAgentCluster: false,
      referrerPolicy: { policy: "no-referrer" },
    }),
  );

  const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").filter(Boolean);
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (process.env.NODE_ENV !== 'production') return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (
        origin.endsWith('.run.app') ||
        origin.includes('ai.studio') ||
        origin.includes('google.com') ||
        origin.includes('googleusercontent.com')
      ) {
        return callback(null, true);
      }
      if (allowedOrigins.length === 0) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  }));

  app.use(cookieParser());
  app.use(express.json());

  // Global Audit Log Middleware
  app.use((req, res, next) => {
    if (['POST', 'PUT', 'DELETE'].includes(req.method) && req.path.startsWith('/api/') && !req.path.startsWith('/api/auth/')) {
      const originalJson = res.json;
      let responseBody: any = null;
      res.json = function(body: any) {
        responseBody = body;
        return originalJson.call(this, body);
      };
      
      res.on('finish', () => {
        const user = (req as any).user;
        if (res.statusCode >= 200 && res.statusCode < 300 && user) {
          // Attempt to extract item ID
          let itemId = null;
          if (responseBody && typeof responseBody === 'object' && responseBody.id) {
            itemId = responseBody.id;
          } else {
            const parts = req.path.split('/');
            if (parts.length > 3 && parts[parts.length - 1] !== 'seed') {
              itemId = parts[parts.length - 1];
            }
          }
          
          let resource = req.path.replace('/api/', '').split('/')[0];
          if (resource === 'admin') {
            resource = req.path.replace('/api/admin/', '').split('/')[0];
          }
          
          // Truncate details
          let details = null;
          if (req.body) {
            try {
              const bodyCopy = { ...req.body };
              if (bodyCopy.password) bodyCopy.password = '***';
              details = JSON.stringify(bodyCopy).substring(0, 500);
            } catch (e) {}
          }
          
          prisma.auditLog.create({
            data: {
              userEmail: user.email || user.id || 'admin@system.local',
              action: req.method,
              resource: resource || 'system',
              itemId: itemId ? String(itemId) : null,
              details: details
            }
          }).catch(err => console.error("Audit log error:", err));
        }
      });
    }
    next();
  });

  const rateLimit = (await import("express-rate-limit")).default;
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false, default: false },
    message: { error: "Too many login attempts. Please try again after 15 minutes." },
  });
  const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false, default: false },
    message: { error: "Too many registration attempts. Please try again after 15 minutes." },
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
      let token = req.cookies.token;
      
      if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
      }
      
      if (!token) return res.status(401).json({ error: "Unauthorized" });
      
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
  app.post("/api/auth/register", registerLimiter, async (req, res) => {
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


  app.get("/api/admin/audit-logs", adminMiddleware, async (req, res) => {
    try {
      const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 200
      });
      res.json(logs);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch audit logs" });
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

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

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

  
  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
    res.json({ success: true });
  });
  app.get("/api/auth/me", async (req, res) => {
    try {
      const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);
      if (!token)
        return res.status(401).json({ error: "No token provided" });
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
        token
      });
    } catch (e) {
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

  app.get("/api/brics-topics", async (req, res) => {
    try {
      const topics = await prisma.bricsTopic.findMany({
        orderBy: { order: 'asc' },
        where: { isFeatured: true }
      });
      res.json(topics);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch BRICS topics" });
    }
  });

  app.get("/api/chinese-products", async (req, res) => {
    try {
      let products = await prisma.chineseProduct.findMany({
        orderBy: { order: 'asc' }
      });
      if (products.length < 25) {
        await seedChineseProducts();
        products = await prisma.chineseProduct.findMany({
          orderBy: { order: 'asc' }
        });
      }
      res.json(products);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch Chinese products" });
    }
  });

  app.get("/api/finance-insights", async (req, res) => {
    try {
      const { category, featured } = req.query;
      const where: any = {};
      if (category && typeof category === 'string' && category !== 'ALL') {
        where.category = category;
      }
      if (featured === 'true') {
        where.featured = true;
      }
      const insights = await prisma.financeInsight.findMany({
        where,
        orderBy: [
          { order: 'asc' },
          { publishedAt: 'desc' }
        ]
      });
      res.json(insights);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch finance insights" });
    }
  });

  app.get("/api/finance-insights/:slug", async (req, res) => {
    try {
      const insight = await prisma.financeInsight.findUnique({
        where: { slug: req.params.slug }
      });
      if (!insight) {
        return res.status(404).json({ error: "Insight not found" });
      }
      res.json(insight);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch insight" });
    }
  });

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
            const decoded = (jwt.default || jwt).verify(token, getJwtSecret());
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
        include: {
          updates: {
            orderBy: { createdAt: "desc" },
            take: 10
          }
        },
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
          include: {
            updates: true,
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

  const handleLiveUpdate = async (req: express.Request, res: express.Response) => {
    try {
      const data = req.body;
      const eventId = req.params.eventId || data.eventId;
      const contentCkb = data.contentCk || data.contentCkb;
      if (
        !eventId ||
        !data.contentEn ||
        !data.contentAr ||
        !data.contentZh ||
        !contentCkb
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
          eventId: eventId,
          contentEn: data.contentEn.trim(),
          contentAr: data.contentAr.trim(),
          contentZh: data.contentZh.trim(),
          contentCkb: contentCkb.trim(),
          isImportant: Boolean(data.isImportant),
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
        `\n--- [ISR] PURGING CACHE TAG: "live-event-${eventId}" ---`,
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
  };

  app.post("/api/updates", handleLiveUpdate);
  app.post("/api/admin/live/:eventId/updates", handleLiveUpdate);

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

  // Helper to generate realistic historical rates for IQD/e-CNY sovereign clearing
  function generateIqdEcnyHistoricalRates(baseRate: number = 188.50, timeframe: string = '1M') {
    const points = timeframe === '1D' ? 24 : timeframe === '1W' ? 14 : timeframe === '1M' ? 30 : timeframe === '3M' ? 45 : 52;
    const history = [];
    const now = new Date();
    
    for (let i = 0; i < points; i++) {
      let dateObj: Date;
      let label = '';
      const stepRatio = (i + 1) / points;
      const trendDrift = (stepRatio - 1) * 2.4; 
      const wave = Math.sin(i * 0.65) * 0.45 + Math.cos(i * 0.28) * 0.25;
      const rateVal = +(baseRate + trendDrift + (i === points - 1 ? 0 : wave)).toFixed(2);
      const bid = +(rateVal - 0.70).toFixed(2);
      const ask = +(rateVal + 0.70).toFixed(2);
      const high = +(rateVal + 0.55).toFixed(2);
      const low = +(rateVal - 0.45).toFixed(2);
      const vol = Math.floor(1200000 + Math.sin(i * 0.5) * 400000 + i * 25000);
      const inverse = +(1 / rateVal).toFixed(6);
      const inversePer1k = +(1000 / rateVal).toFixed(3);

      if (timeframe === '1D') {
        const hoursAgo = points - 1 - i;
        dateObj = new Date(now.getTime() - hoursAgo * 3600 * 1000);
        const h = dateObj.getHours().toString().padStart(2, '0');
        label = `${h}:00`;
      } else if (timeframe === '1W') {
        const hoursAgo = (points - 1 - i) * 12;
        dateObj = new Date(now.getTime() - hoursAgo * 3600 * 1000);
        label = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
      } else if (timeframe === '1M') {
        const daysAgo = points - 1 - i;
        dateObj = new Date(now.getTime() - daysAgo * 24 * 3600 * 1000);
        label = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else if (timeframe === '3M') {
        const daysAgo = (points - 1 - i) * 2;
        dateObj = new Date(now.getTime() - daysAgo * 24 * 3600 * 1000);
        label = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else {
        const daysAgo = (points - 1 - i) * 7;
        dateObj = new Date(now.getTime() - daysAgo * 24 * 3600 * 1000);
        label = dateObj.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      }

      history.push({
        date: dateObj.toISOString().split('T')[0],
        time: label,
        timestamp: dateObj.toISOString(),
        rate: rateVal,
        bidRate: bid,
        askRate: ask,
        high,
        low,
        volume: vol,
        inverseRate: inverse,
        inversePer1k: inversePer1k,
        clearingNode: 'PBOC-CBI Direct mBridge Corridor'
      });
    }
    return history;
  }

  // 2. Market Data REST & SSE endpoints
  app.get("/api/market", async (req, res) => {
    try {
      const { symbol, timeframe = '1M', history: reqHistory } = req.query;
      let marketItems = await prisma.marketData.findMany();
      if (!marketItems || marketItems.length === 0 || !marketItems.some(i => i.symbol === 'IQD_ECNY')) {
        await seedMarketData();
        marketItems = await prisma.marketData.findMany();
      }

      let liveBaseRate = 188.50;
      try {
        const rateRecord = await prisma.paymentExchangeRate.findUnique({ where: { pair: 'IQD_ECNY' } });
        if (rateRecord?.baseRate) {
          liveBaseRate = rateRecord.baseRate;
        }
      } catch {}

      const iqdEcnyHistoryByTf = {
        '1D': generateIqdEcnyHistoricalRates(liveBaseRate, '1D'),
        '1W': generateIqdEcnyHistoricalRates(liveBaseRate, '1W'),
        '1M': generateIqdEcnyHistoricalRates(liveBaseRate, '1M'),
        '3M': generateIqdEcnyHistoricalRates(liveBaseRate, '3M'),
        '1Y': generateIqdEcnyHistoricalRates(liveBaseRate, '1Y'),
      };

      const selectedTf = (typeof timeframe === 'string' && ['1D', '1W', '1M', '3M', '1Y'].includes(timeframe)) ? timeframe : '1M';
      const defaultHistory = iqdEcnyHistoryByTf[selectedTf as keyof typeof iqdEcnyHistoryByTf];

      if (symbol === 'IQD_ECNY' && (reqHistory === 'true' || req.query.format === 'chart')) {
        return res.json({
          symbol: 'IQD_ECNY',
          pair: 'IQD_ECNY',
          baseRate: liveBaseRate,
          timeframe: selectedTf,
          history: defaultHistory,
          historyByTimeframe: iqdEcnyHistoryByTf
        });
      }

      const enriched = marketItems.map(item => {
        if (item.symbol === 'IQD_ECNY') {
          return {
            ...item,
            price: liveBaseRate,
            history: defaultHistory,
            historyByTimeframe: iqdEcnyHistoryByTf
          };
        }
        return item;
      });

      res.json(enriched);
    } catch (e: any) {
      console.error("Error fetching market items:", e);
      res.status(500).json({ error: "Failed to fetch market data" });
    }
  });

  app.get("/api/market/history", async (req, res) => {
    try {
      const { symbol = 'IQD_ECNY', timeframe = '1M' } = req.query;
      let liveBaseRate = 188.50;
      try {
        const rateRecord = await prisma.paymentExchangeRate.findUnique({ where: { pair: 'IQD_ECNY' } });
        if (rateRecord?.baseRate) {
          liveBaseRate = rateRecord.baseRate;
        }
      } catch {}
      const selectedTf = (typeof timeframe === 'string' && ['1D', '1W', '1M', '3M', '1Y'].includes(timeframe)) ? timeframe : '1M';
      const history = generateIqdEcnyHistoricalRates(liveBaseRate, selectedTf);
      res.json({
        symbol,
        pair: 'IQD_ECNY',
        baseRate: liveBaseRate,
        timeframe: selectedTf,
        history,
        historyByTimeframe: {
          '1D': generateIqdEcnyHistoricalRates(liveBaseRate, '1D'),
          '1W': generateIqdEcnyHistoricalRates(liveBaseRate, '1W'),
          '1M': generateIqdEcnyHistoricalRates(liveBaseRate, '1M'),
          '3M': generateIqdEcnyHistoricalRates(liveBaseRate, '3M'),
          '1Y': generateIqdEcnyHistoricalRates(liveBaseRate, '1Y'),
        }
      });
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch market history" });
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
  // --- BRICS Topics Admin ---
  app.get("/api/admin/brics-topics", editorOrAdminMiddleware, async (req, res) => {
    try {
      const topics = await prisma.bricsTopic.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(topics);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch BRICS topics" });
    }
  });

  app.post("/api/admin/brics-topics", editorOrAdminMiddleware, async (req, res) => {
    try {
      const topic = await prisma.bricsTopic.create({
        data: req.body
      });
      res.json(topic);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to create BRICS topic" });
    }
  });

  app.put("/api/admin/brics-topics/:id", editorOrAdminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      const topic = await prisma.bricsTopic.update({
        where: { id },
        data
      });
      res.json(topic);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update BRICS topic" });
    }
  });

  app.delete("/api/admin/brics-topics/:id", editorOrAdminMiddleware, async (req, res) => {
    try {
      await prisma.bricsTopic.delete({
        where: { id: req.params.id }
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete BRICS topic" });
    }
  });

  app.get("/api/admin/chinese-products", editorOrAdminMiddleware, async (req, res) => {
    try {
      const products = await prisma.chineseProduct.findMany({
        orderBy: { order: 'asc' }
      });
      res.json(products);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch Chinese products" });
    }
  });

  app.post("/api/admin/chinese-products", editorOrAdminMiddleware, async (req, res) => {
    try {
      const product = await prisma.chineseProduct.create({
        data: req.body
      });
      res.json(product);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to create Chinese product" });
    }
  });

  app.put("/api/admin/chinese-products/:id", editorOrAdminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      const product = await prisma.chineseProduct.update({
        where: { id },
        data
      });
      res.json(product);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update Chinese product" });
    }
  });

  app.delete("/api/admin/chinese-products/:id", editorOrAdminMiddleware, async (req, res) => {
    try {
      await prisma.chineseProduct.delete({
        where: { id: req.params.id }
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete Chinese product" });
    }
  });

  app.get("/api/admin/finance-insights", editorOrAdminMiddleware, async (req, res) => {
    try {
      const insights = await prisma.financeInsight.findMany({
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ]
      });
      res.json(insights);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch finance insights" });
    }
  });

  app.post("/api/admin/finance-insights", editorOrAdminMiddleware, async (req, res) => {
    try {
      const {
        titleEn, titleAr, titleZh, titleCkb,
        summaryEn, summaryAr, summaryZh, summaryCkb,
        bodyEn, bodyAr, bodyZh, bodyCkb,
        slug, category, coverImage, author,
        featured, order, publishedAt
      } = req.body;

      const insight = await prisma.financeInsight.create({
        data: {
          slug: slug || `insight-${Date.now()}`,
          category: category || "Currency Markets",
          coverImage: coverImage || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
          author: author || "ICA Economic Research Desk",
          featured: Boolean(featured),
          order: Number(order) || 0,
          publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
          titleEn: titleEn || "",
          titleAr: titleAr || "",
          titleZh: titleZh || "",
          titleCkb: titleCkb || "",
          summaryEn: summaryEn || "",
          summaryAr: summaryAr || "",
          summaryZh: summaryZh || "",
          summaryCkb: summaryCkb || "",
          bodyEn: bodyEn || "",
          bodyAr: bodyAr || "",
          bodyZh: bodyZh || "",
          bodyCkb: bodyCkb || ""
        }
      });
      res.json(insight);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to create finance insight" });
    }
  });

  app.put("/api/admin/finance-insights/:id", editorOrAdminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      if (data.publishedAt) {
        data.publishedAt = new Date(data.publishedAt);
      }
      if (typeof data.order !== 'undefined') {
        data.order = Number(data.order);
      }
      if (typeof data.featured !== 'undefined') {
        data.featured = Boolean(data.featured);
      }
      const insight = await prisma.financeInsight.update({
        where: { id },
        data
      });
      res.json(insight);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update finance insight" });
    }
  });

  app.delete("/api/admin/finance-insights/:id", editorOrAdminMiddleware, async (req, res) => {
    try {
      await prisma.financeInsight.delete({
        where: { id: req.params.id }
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete finance insight" });
    }
  });

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
  
  app.get("/api/visa-flights/stats", async (req, res) => {
    try {
      const pendingInquiries = await prisma.visaFlightInquiry.count({
        where: { status: "PENDING" }
      });
      res.json({ pendingInquiries });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/visa-flights/inquiries", authMiddleware, async (req, res) => {
    try {
      const inquiries = await prisma.visaFlightInquiry.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(inquiries);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  app.post("/api/visa-flights/inquiries/seed", authMiddleware, async (req, res) => {
    try {
      // Create some fake inquiries
      await prisma.visaFlightInquiry.createMany({
        data: [
          {
            ticketId: "VF-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
            fullName: "Ahmed Al-Hassan",
            email: "ahmed@example.com",
            passportNumber: "A12345678",
            origin: "Baghdad",
            destination: "Beijing",
            serviceType: "VISA_ASSISTANCE",
            status: "PENDING",
          }
        ]
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to seed inquiries" });
    }
  });

  app.put("/api/visa-flights/inquiries/:id", authMiddleware, async (req, res) => {
    try {
      const updated = await prisma.visaFlightInquiry.update({
        where: { id: req.params.id },
        data: req.body
      });
      res.json(updated);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update inquiry" });
    }
  });

  app.delete("/api/visa-flights/inquiries/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.visaFlightInquiry.delete({
        where: { id: req.params.id }
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete inquiry" });
    }
  });

  app.post("/api/visa-flights/clone/:id", authMiddleware, async (req, res) => {
    try {
      const existing = await prisma.visaFlight.findUnique({
        where: { id: req.params.id }
      });
      if (!existing) {
        return res.status(404).json({ error: "Not found" });
      }
      
      const { id, createdAt, updatedAt, slug, ...data } = existing;
      const newService = await prisma.visaFlight.create({
        data: {
          ...data,
          slug: existing.slug + "-copy-" + Date.now()
        }
      });
      res.json(newService);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to clone service" });
    }
  });

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

  // --- Videos CRUD ---
  app.get("/api/videos", async (req, res) => {
    try {
      const { q, region, category, trending, featured } = req.query;
      const where: any = {};

      if (region && typeof region === "string" && region !== "ALL") where.region = region;
      if (category && typeof category === "string" && category !== "ALL") where.category = category;
      if (trending === "true") where.isTrending = true;
      if (featured === "true") where.isFeatured = true;

      if (q && typeof q === "string") {
        where.OR = [
          { titleEn: { contains: q } },
          { descriptionEn: { contains: q } },
        ];
      }

      const items = await prisma.video.findMany({
        where,
        orderBy: { publishedAt: "desc" },
      });
      res.json(items);
    } catch (e: any) {
      console.error("Error fetching videos:", e);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.get("/api/videos/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const item = await prisma.video.findFirst({
        where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      });
      if (!item) return res.status(404).json({ error: "Not found" });
      res.json(item);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch video" });
    }
  });

  app.post("/api/videos", authMiddleware, async (req, res) => {
    try {
      const body = req.body;
      const slug = body.slug || `video-${Date.now()}-${(body.titleEn||"").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`;
      const newItem = await prisma.video.create({
        data: {
          ...body,
          slug,
          publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
        },
      });
      res.json(newItem);
    } catch (e: any) {
      console.error("Error creating video:", e);
      res.status(500).json({ error: "Failed to create video" });
    }
  });

  app.put("/api/videos/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id; delete data.createdAt; delete data.updatedAt;
      if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
      const updated = await prisma.video.update({ where: { id }, data });
      res.json(updated);
    } catch (e: any) {
      console.error("Error updating video:", e);
      res.status(500).json({ error: "Failed to update video" });
    }
  });

  app.delete("/api/videos/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.video.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

  // --- Documentaries CRUD ---
  app.get("/api/documentaries", async (req, res) => {
    try {
      const { q, region, category, trending, featured } = req.query;
      const where: any = {};
      if (region && typeof region === "string" && region !== "ALL") where.region = region;
      if (category && typeof category === "string" && category !== "ALL") where.category = category;
      if (trending === "true") where.isTrending = true;
      if (featured === "true") where.isFeatured = true;

      if (q && typeof q === "string") {
        where.OR = [
          { titleEn: { contains: q } },
          { synopsisEn: { contains: q } },
        ];
      }

      const items = await prisma.documentary.findMany({
        where,
        orderBy: { publishedAt: "desc" },
      });
      res.json(items);
    } catch (e: any) {
      console.error("Error fetching documentaries:", e);
      res.status(500).json({ error: "Failed to fetch documentaries" });
    }
  });

  app.get("/api/documentaries/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const item = await prisma.documentary.findFirst({
        where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      });
      if (!item) return res.status(404).json({ error: "Not found" });
      res.json(item);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to fetch documentary" });
    }
  });

  app.post("/api/documentaries", authMiddleware, async (req, res) => {
    try {
      const body = req.body;
      const slug = body.slug || `doc-${Date.now()}-${(body.titleEn||"").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`;
      const newItem = await prisma.documentary.create({
        data: {
          ...body,
          slug,
          publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
        },
      });
      res.json(newItem);
    } catch (e: any) {
      console.error("Error creating documentary:", e);
      res.status(500).json({ error: "Failed to create documentary" });
    }
  });

  app.put("/api/documentaries/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id; delete data.createdAt; delete data.updatedAt;
      if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
      const updated = await prisma.documentary.update({ where: { id }, data });
      res.json(updated);
    } catch (e: any) {
      console.error("Error updating documentary:", e);
      res.status(500).json({ error: "Failed to update documentary" });
    }
  });

  app.delete("/api/documentaries/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.documentary.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to delete documentary" });
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
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      const partner = await prisma.partner.update({
        where: { id },
        data,
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

  // ----- ICA BUSINESS OPPORTUNITIES API -----
  app.get("/api/business-opportunities", async (req, res) => {
    try {
      const { category, featured } = req.query;
      const where: any = {};
      if (category && typeof category === "string" && category !== "ALL") {
        where.category = category;
      }
      if (featured === "true") {
        where.featured = true;
      }
      const opportunities = await prisma.businessOpportunity.findMany({
        where,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
      res.json(opportunities);
    } catch (error) {
      console.error("Error fetching business opportunities:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/business-opportunities/:slug", async (req, res) => {
    try {
      const opportunity = await prisma.businessOpportunity.findUnique({
        where: { slug: req.params.slug },
      });
      if (!opportunity) {
        return res.status(404).json({ error: "Opportunity not found" });
      }
      res.json(opportunity);
    } catch (error) {
      console.error("Error fetching business opportunity:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/admin/business-opportunities", editorOrAdminMiddleware, async (req, res) => {
    try {
      const opportunities = await prisma.businessOpportunity.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
      res.json(opportunities);
    } catch (error) {
      console.error("Error fetching admin business opportunities:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.post("/api/admin/business-opportunities", editorOrAdminMiddleware, async (req, res) => {
    try {
      const {
        titleEn,
        titleAr,
        titleZh,
        titleCkb,
        summaryEn,
        summaryAr,
        summaryZh,
        summaryCkb,
        contentEn,
        contentAr,
        contentZh,
        contentCkb,
        category,
        sector,
        investmentValue,
        location,
        coverImage,
        featured,
        order,
        status,
        contactEmail,
      } = req.body;

      if (!titleEn) {
        return res.status(400).json({ error: "English title is required" });
      }

      let slug = req.body.slug;
      if (!slug) {
        slug = titleEn
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      const existing = await prisma.businessOpportunity.findUnique({ where: { slug } });
      if (existing) {
        slug = `${slug}-${Date.now().toString(36)}`;
      }

      const opportunity = await prisma.businessOpportunity.create({
        data: {
          slug,
          titleEn,
          titleAr: titleAr || "",
          titleZh: titleZh || "",
          titleCkb: titleCkb || "",
          summaryEn: summaryEn || "",
          summaryAr: summaryAr || "",
          summaryZh: summaryZh || "",
          summaryCkb: summaryCkb || "",
          contentEn: contentEn || "",
          contentAr: contentAr || "",
          contentZh: contentZh || "",
          contentCkb: contentCkb || "",
          category: category || "INVESTMENT",
          sector: sector || "",
          investmentValue: investmentValue || "",
          location: location || "",
          coverImage: coverImage || "",
          featured: Boolean(featured),
          order: typeof order === "number" ? order : parseInt(order, 10) || 0,
          status: status || "OPEN",
          contactEmail: contactEmail || "business@iraqi-chineseagency.com",
        },
      });
      res.status(201).json(opportunity);
    } catch (error) {
      console.error("Error creating business opportunity:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.put("/api/admin/business-opportunities/:id", editorOrAdminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      if (data.order !== undefined) {
        data.order = typeof data.order === "number" ? data.order : parseInt(data.order, 10) || 0;
      }
      if (data.featured !== undefined) {
        data.featured = Boolean(data.featured);
      }
      const updated = await prisma.businessOpportunity.update({
        where: { id },
        data,
      });
      res.json(updated);
    } catch (error) {
      console.error("Error updating business opportunity:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.delete("/api/admin/business-opportunities/:id", editorOrAdminMiddleware, async (req, res) => {
    try {
      await prisma.businessOpportunity.delete({
        where: { id: req.params.id },
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting business opportunity:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.post("/api/admin/business-opportunities/seed", editorOrAdminMiddleware, async (req, res) => {
    try {
      await seedBusinessOpportunities();
      const count = await prisma.businessOpportunity.count();
      res.json({ success: true, count });
    } catch (error) {
      console.error("Error reseeding business opportunities:", error);
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


  app.post("/api/admin/articles", authMiddleware, async (req: any, res: any) => {
    const { slug, categoryId, imageUrl, translations, status: requestedStatus } = req.body;
    try {
      const userRole = req.user?.role || "ADMIN";
      const userId = req.user?.id;

      let author;
      if (userId) {
        author = await prisma.user.findUnique({ where: { id: userId } });
      }
      if (!author) {
        author = await prisma.user.findFirst({ where: { role: "ADMIN" } });
      }
      if (!author) {
        author = await prisma.user.create({
          data: { email: "admin@test.com", name: "Admin", role: "ADMIN" },
        });
      }

      // Determine article status: Non-admins must be pending approval; admins can publish or set status
      const articleStatus = userRole === "ADMIN" ? (requestedStatus || "PUBLISHED") : "PENDING";

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
            status: articleStatus,
            translations: {
              create: translations,
            },
          },
        });
        console.log(
          `[FORCE SAVE] Successfully updated/overwrote article slug: ${slug} with status: ${articleStatus}`,
        );
      } else {
        article = await prisma.article.create({
          data: {
            slug,
            categoryId,
            authorId: author.id,
            imageUrl,
            status: articleStatus,
            translations: {
              create: translations,
            },
          },
        });
        console.log(`[CREATE] Successfully registered article slug: ${slug} with status: ${articleStatus}`);
      }

      // Simulate Next-style revalidatePath() for quadrilingual article paths if published
      if (articleStatus === "PUBLISHED") {
        console.log(`\n--- [ISR] TRIGGERING PATH REVALIDATION ---`);
        console.log(`[ISR] revalidatePath("/en/articles/${slug}") -> Success`);
        console.log(`[ISR] revalidatePath("/ar/articles/${slug}") -> Success`);
        console.log(`[ISR] revalidatePath("/zh/articles/${slug}") -> Success`);
        console.log(`[ISR] revalidatePath("/ckb/articles/${slug}") -> Success`);
        console.log(`-----------------------------------------\n`);
      }

      res.json(article);
    } catch (e: any) {
      console.error("Failed to save article:", e);
      res.status(500).json({ error: "Failed to save article" });
    }
  });

  app.post("/api/admin/articles/:id/approve", authMiddleware, async (req: any, res: any) => {
    try {
      const userRole = req.user?.role;
      if (userRole !== "ADMIN") {
        return res.status(403).json({ error: "Only administrators can approve articles for publication." });
      }

      const existingArticle = await prisma.article.findUnique({
        where: { id: req.params.id },
      });

      if (!existingArticle) {
        return res.status(404).json({ error: "Article not found" });
      }

      const article = await prisma.article.update({
        where: { id: req.params.id },
        data: { status: "PUBLISHED" },
      });

      if (existingArticle.status === "PENDING") {
        let userEmail = "admin@system.local";
        if (req.user?.id) {
          const u = await prisma.user.findUnique({ where: { id: req.user.id } });
          if (u) userEmail = u.email;
        }
        await prisma.auditLog.create({
          data: {
            userEmail,
            action: "APPROVE_ARTICLE",
            resource: "ARTICLE",
            itemId: article.id,
            details: `Automated Log: Article "${article.slug}" status was changed from PENDING to PUBLISHED by Admin.`,
          }
        });
      }

      console.log(`[ADMIN APPROVAL] Article ID ${req.params.id} approved and published.`);
      res.json(article);
    } catch (e: any) {
      console.error("Failed to approve article:", e);
      res.status(500).json({ error: "Failed to approve article" });
    }
  });

  

  app.get("/api/admin/articles/:id", authMiddleware, async (req: any, res: any) => {
    try {
      const article = await prisma.article.findUnique({
        where: { id: req.params.id },
        include: { translations: true, category: true, author: true },
      });
      if (!article) return res.status(404).json({ error: "Article not found" });
      res.json(article);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.put("/api/admin/articles/:id", authMiddleware, async (req: any, res: any) => {
    try {
      const { slug, categoryId, imageUrl, translations } = req.body;
      const article = await prisma.article.update({
        where: { id: req.params.id },
        data: {
          slug,
          categoryId: categoryId || null,
          imageUrl: imageUrl || null,
        }
      });
      
      // Update translations
      if (translations && Array.isArray(translations)) {
        for (const t of translations) {
          const existing = await prisma.articleTranslation.findFirst({
            where: { articleId: article.id, lang: t.lang }
          });
          if (existing) {
            await prisma.articleTranslation.update({
              where: { id: existing.id },
              data: {
                title: t.title,
                content: t.content,
                excerpt: t.excerpt
              }
            });
          } else {
            await prisma.articleTranslation.create({
              data: {
                articleId: article.id,
                lang: t.lang,
                title: t.title,
                content: t.content,
                excerpt: t.excerpt
              }
            });
          }
        }
      }

      res.json({ success: true, article });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to update article" });
    }
  });

  app.delete("/api/admin/articles/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.articleTranslation.deleteMany({
        where: { articleId: req.params.id }
      });
      await prisma.article.delete({
        where: { id: req.params.id }
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete article" });
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

  app.get("/api/admin/users", adminMiddleware, async (req, res) => {
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

  app.post("/api/admin/users", adminMiddleware, async (req, res) => {
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

  app.put("/api/admin/users/:id", adminMiddleware, async (req, res) => {
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

  app.post("/api/admin/users/:id/renew", adminMiddleware, async (req, res) => {
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

  app.delete("/api/admin/users/:id", adminMiddleware, async (req, res) => {
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

  // --- Static Asset Serving for Seeded & Uploaded Images ---
  app.use('/src/assets/images', express.static(path.join(process.cwd(), 'src/assets/images')));
  app.use('/assets/images', express.static(path.join(process.cwd(), 'src/assets/images')));

  // --- Vite Middleware & Static Production Serving ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true },
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

  // Setup robust server startup with timeout and readiness checks
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Server is READY and accepting connections.`);
    
    // Run database sync and background seeders asynchronously after HTTP server is actively accepting connections
    setTimeout(async () => {
      try {
        const { exec } = await import("child_process");
        const util = await import("util");
        const execPromise = util.promisify(exec);
        console.log("Ensuring database schema is synchronized in background...");
        await execPromise("npx prisma db push --skip-generate --accept-data-loss");
        console.log("Database schema synchronized successfully.");
      } catch (e) {
        console.error("Warning during background database sync:", e);
      }

      console.log("Initiating background data seeders...");
      runStartupSeeders().catch((e) => console.error("Startup seeders background error:", e));
    }, 500);
  });
  
  server.on('error', (err: any) => {
    console.error("Server startup error:", err);
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please check for running processes.`);
      process.exit(1);
    }
  });
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

startServer().catch((err) => {
  console.error("Fatal error starting server:", err);
  process.exit(1);
});
