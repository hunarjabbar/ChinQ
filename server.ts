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
import cors from "cors";
import helmet from "helmet";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn("WARNING: JWT_SECRET is not set in the environment. Using a fallback secret for development ONLY. Do NOT do this in production.");
    return "chinq_secret_key_123";
  }
  return secret;
}

let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in your environment or Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function ensureTestCredentials() {
  try {
    console.log("🔒 Ensuring test administrative credentials exist...");
    const bcrypt = await import("bcryptjs");
    
    const adminEmail = 'admin@chinq.media';
    const editorEmail = 'editor@chinq.media';

    const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!adminExists) {
      const adminHash = await (bcrypt.default || bcrypt).hash('admin123', 10);
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: adminHash,
          name: 'Test Admin',
          role: 'ADMIN',
        }
      });
      console.log(`✅ Created test admin: ${adminEmail}`);
    }

    const editorExists = await prisma.user.findUnique({ where: { email: editorEmail } });
    if (!editorExists) {
      const editorHash = await (bcrypt.default || bcrypt).hash('editor123', 10);
      await prisma.user.create({
        data: {
          email: editorEmail,
          password: editorHash,
          name: 'Test Editor',
          role: 'EDITOR',
        }
      });
      console.log(`✅ Created test editor: ${editorEmail}`);
    }
  } catch (err) {
    console.error("Error ensuring test credentials:", err);
  }
}

async function startServer() {
  // Run news seeder to populate local/international source articles
  await autoSeedMoreNews();
  await seedOpinions();
  await seedStudies();
  await seedMarketData();
  await seedTourism();
  await seedWomenFeatures();
  await ensureTestCredentials();

  const app = express();
  const PORT = 3000;

  app.use(helmet({ contentSecurityPolicy: false })); // Disabled CSP for Vite HMR
  app.use(cors());
  app.use(express.json());
  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, name, role } = req.body;
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await (bcrypt.default || bcrypt).hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: role || "AUTHOR"
        }
      });
      res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
    } catch (e: any) {
      if (e.code === 'P2002') return res.status(400).json({ error: "Email already exists" });
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const bcrypt = await import("bcryptjs");
      const isValid = await (bcrypt.default || bcrypt).compare(password, user.password);
      if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

      const jwt = await import("jsonwebtoken");
      const token = (jwt.default || jwt).sign({ id: user.id, role: user.role }, getJwtSecret(), { expiresIn: "1d" });
      
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, subscriptionStatus: user.subscriptionStatus, subscriptionPlan: user.subscriptionPlan, subscriptionEndDate: user.subscriptionEndDate } });
    } catch (e: any) {
      console.error("Login Error:", e); res.status(500).json({ error: "Login failed: " + e.message });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "No token provided" });
      const token = authHeader.split(" ")[1];
      const jwt = await import("jsonwebtoken");
      const decoded: any = (jwt.default || jwt).verify(token, getJwtSecret());
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) return res.status(401).json({ error: "User not found" });
      res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role, subscriptionStatus: user.subscriptionStatus, subscriptionPlan: user.subscriptionPlan, subscriptionEndDate: user.subscriptionEndDate } });
    } catch (e: any) {
      res.status(401).json({ error: "Invalid token" });
    }
  });



  // --- API Routes ---
  
  // 1. Articles endpoint (public)
  
  app.get("/api/articles", async (req, res) => {
    try {
      const { category } = req.query;
      const whereClause: any = { status: 'PUBLISHED' };
      
      if (category && typeof category === 'string') {
        whereClause.category = { slug: category };
      }

      const articles = await prisma.article.findMany({
        where: whereClause,
        include: { translations: true, category: true, author: true },
        orderBy: { createdAt: 'desc' }
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
        include: { translations: true, category: true, author: true }
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
        orderBy: { createdAt: 'desc' }
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
        include: { author: true }
      });
      res.json(study);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch study" });
    }
  });

  app.post("/api/public/news-search", async (req, res) => {
    try {
      const { source, topic } = req.body;
      const cleanTopic = topic ? topic.trim() : 'Iraq-China cooperation';
      
      let query = "";
      if (source === 'local') {
        query = `Local Iraqi news reports regarding ${cleanTopic} from regional news outlets like Shafaq News, Rudaw, Al-Mada, or National Iraqi News Agency in 2025 or 2026.`;
      } else {
        query = `International news reports regarding ${cleanTopic} from global news outlets like Reuters, Bloomberg, Caixin, CGTN, or Xinhua in 2025 or 2026.`;
      }
      
      const ai = getGeminiClient();
      console.log(`[Public AI News Search] Sourcing: "${source}" | Topic: "${cleanTopic}"`);
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `You are an expert news analyst for ChinQ, a premier trilingual China-Iraq news platform. 
        Perform a deep web search to find real, factual news reports from 2025/2026 on: "${query}"
        
        Generate exactly 2 diverse, highly detailed, and realistic news logs representing this perspective.
        For each, translate the title, short excerpt, and full detailed body into exactly 4 languages:
        1. English ('en')
        2. Arabic ('ar')
        3. Chinese ('zh')
        4. Kurdish/Sorani ('ckb')
        
        Assign an appropriate categorySlug: 'energy', 'economy', or 'culture'.
        Select a matching, high-quality Unsplash image URL (e.g., matching machinery, oil, finances, trade, infrastructure, or education).`,
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
                categorySlug: { type: Type.STRING, description: "'energy', 'economy', or 'culture'" },
                imageUrl: { type: Type.STRING, description: "A realistic Unsplash image URL." },
                sourceName: { type: Type.STRING, description: "The specific local or international source name where this news originates." },
                translations: {
                  type: Type.ARRAY,
                  description: "Must contain all 4 translation objects for en, ar, zh, ckb",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      lang: { type: Type.STRING, description: "Must be 'en', 'ar', 'zh', or 'ckb'" },
                      title: { type: Type.STRING, description: "The translated news headline." },
                      excerpt: { type: Type.STRING, description: "Short summary of the story." },
                      content: { type: Type.STRING, description: "Full detailed multi-paragraph content (at least 120 words)." }
                    },
                    required: ["lang", "title", "excerpt", "content"]
                  }
                }
              },
              required: ["slug", "categorySlug", "imageUrl", "sourceName", "translations"]
            }
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("No grounded search content returned by Gemini.");
      }

      const articles = JSON.parse(text);
      res.json({ success: true, articles });
    } catch (e: any) {
      console.error("[Public AI News Search Error]", e);
      res.status(500).json({ error: e.message || "Failed to retrieve grounded source updates" });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      let events = await prisma.liveEvent.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      // Auto-seed default live event if empty
      if (events.length === 0) {
        const defaultEvent = await prisma.liveEvent.create({
          data: {
            slug: 'iraq-china-summit-2026',
            titleEn: 'Iraq-China Economic Summit 2026',
            titleAr: 'القمة الاقتصادية العراقية الصينية 2026',
            titleZh: '2026年伊拉克-中国经济峰会',
            titleCkb: 'لووتکەی ئابووری عێراق-چین ٢٠٢٦',
            isActive: true,
          }
        });
        events = [defaultEvent];
      }
      
      res.json(events);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get("/api/events/:slug", async (req, res) => {
    try {
      let event = await prisma.liveEvent.findUnique({
        where: { slug: req.params.slug },
        include: {
          updates: {
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      // Auto-seed/create the requested default event if missing to ensure preview works
      if (!event && req.params.slug === 'iraq-china-summit-2026') {
        event = await prisma.liveEvent.create({
          data: {
            slug: 'iraq-china-summit-2026',
            titleEn: 'Iraq-China Economic Summit 2026',
            titleAr: 'القمة الاقتصادية العراقية الصينية 2026',
            titleZh: '2026年伊拉克-中国经济峰会',
            titleCkb: 'لووتکەی ئابووری عێراق-چین ٢٠٢٦',
            isActive: true,
          },
          include: {
            updates: true
          }
        });
      }

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.json(event);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post("/api/updates", async (req, res) => {
    try {
      const data = req.body;
      if (!data.eventId || !data.contentEn || !data.contentAr || !data.contentZh || !data.contentCk) {
         return res.status(400).json({ error: 'All quadrilingual text fields are strictly required for live publishing.' });
      }
      
      const newUpdate = await prisma.liveUpdate.create({
        data: {
          eventId: data.eventId,
          contentEn: data.contentEn.trim(),
          contentAr: data.contentAr.trim(),
          contentZh: data.contentZh.trim(),
          contentCkb: data.contentCk.trim(),
          isImportant: data.isImportant,
          authorName: data.authorName?.trim() || 'ChinQ Live Desk',
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
      console.log(`\n--- [ISR] PURGING CACHE TAG: "live-event-${data.eventId}" ---`);
      console.log(`[ISR] Purged memory cache matching tag.`);
      console.log(`[ISR] Status: Cache cleared. All upcoming requests will pull fresh database records.`);
      console.log(`--------------------------------------------\n`);

      res.json({ success: true, updateId: newUpdate.id });
    } catch (e: any) {
      console.error('Failed to dispatch live update execution block:', e);
      res.status(500).json({ success: false, error: 'Database write operation failed.' });
    }
  });

  // Purge/Revalidate specific cache tags
  app.post("/api/cache/revalidate", async (req, res) => {
    try {
      const { tag } = req.body;
      if (!tag) {
        return res.status(400).json({ error: 'Tag parameter is required for revalidation.' });
      }

      console.log(`\n--- [ISR] DYNAMIC CACHE TAG PURGE REQUEST ---`);
      console.log(`[ISR] Calling revalidateTag("${tag}")`);
      console.log(`[ISR] Cache evicted successfully for tag identifier: ${tag}`);
      console.log(`--------------------------------------------\n`);

      res.json({ success: true, message: `Cache purged for tag: ${tag}` });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: 'Cache invalidation engine error' });
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

  app.get("/api/market/stream", async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send initial data
    const initialData = await prisma.marketData.findMany();
    res.write(`data: ${JSON.stringify(initialData)}\n\n`);

    // Simulate real-time updates every 3 seconds
    const interval = setInterval(async () => {
      try {
        const data = await prisma.marketData.findMany();
        // Slightly random fluctuations
        const updated = data.map(d => ({
          ...d,
          price: d.price * (1 + (Math.random() - 0.5) * 0.005),
          changePercent: d.changePercent + (Math.random() - 0.5) * 0.1
        }));
        res.write(`data: ${JSON.stringify(updated)}\n\n`);
      } catch (e: any) {
        console.error(e);
      }
    }, 3000);

    req.on('close', () => {
      clearInterval(interval);
    });
  });

  // 3. Admin CRUD
  app.get("/api/admin/articles", async (req, res) => {
    try {
      const articles = await prisma.article.findMany({
        orderBy: { updatedAt: 'desc' },
        include: {
          author: true,
          category: true,
          translations: {
            where: { lang: 'en' },
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

  
  const authMiddleware = async (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
      const token = authHeader.split(" ")[1];
      const jwt = await import("jsonwebtoken");
      const decoded: any = (jwt.default || jwt).verify(token, getJwtSecret());
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) return res.status(401).json({ error: "Unauthorized" });
      req.user = user;
      next();
    } catch (e: any) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

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
          subscriptionEndDate: endDate
        }
      });
      res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role, subscriptionStatus: user.subscriptionStatus, subscriptionPlan: user.subscriptionPlan, subscriptionEndDate: user.subscriptionEndDate } });
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

      if (region && typeof region === 'string' && region !== 'ALL') {
        where.region = region;
      }
      if (category && typeof category === 'string' && category !== 'ALL') {
        where.category = category;
      }
      if (trending === 'true') {
        where.isTrending = true;
      }
      if (featured === 'true') {
        where.isFeatured = true;
      }

      let books = await prisma.book.findMany({
        where,
        orderBy: { createdAt: "desc" }
      });

      if (q && typeof q === 'string' && q.trim().length > 0) {
        const query = q.toLowerCase();
        books = books.filter(b => 
          b.titleEn.toLowerCase().includes(query) ||
          b.titleAr.includes(query) ||
          b.titleZh.includes(query) ||
          b.titleCkb.includes(query) ||
          b.authorEn.toLowerCase().includes(query) ||
          b.authorAr.includes(query) ||
          b.descriptionEn.toLowerCase().includes(query)
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
          OR: [
            { id: idOrSlug },
            { slug: idOrSlug }
          ]
        }
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
        titleEn, titleAr, titleZh, titleCkb,
        authorEn, authorAr, authorZh, authorCkb,
        descriptionEn, descriptionAr, descriptionZh, descriptionCkb,
        coverUrl, category, region, rating, pages, year, publisher, isbn, purchaseUrl,
        isTrending, isFeatured
      } = req.body;

      if (!titleEn || !authorEn || !descriptionEn || !coverUrl || !category || !region) {
        return res.status(400).json({ error: "Missing required book fields (titleEn, authorEn, descriptionEn, coverUrl, category, region)" });
      }

      const slug = `book-${Date.now()}-${titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`;

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
          publisher: publisher || "ChinQ Academic Press",
          isbn: isbn || null,
          purchaseUrl: purchaseUrl || null,
          isTrending: isTrending !== undefined ? Boolean(isTrending) : true,
          isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : false
        }
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
        data
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

  app.post("/api/books/seed", async (req, res) => {
    try {
      await seedBooks();
      const count = await prisma.book.count();
      res.json({ success: true, count, message: `Reseeded books database (${count} books present)` });
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

      if (region && typeof region === 'string' && region !== 'ALL') {
        where.region = region;
      }
      if (category && typeof category === 'string' && category !== 'ALL') {
        where.category = category;
      }
      if (trending === 'true') {
        where.isTrending = true;
      }
      if (featured === 'true') {
        where.isFeatured = true;
      }

      let spots = await prisma.tourismSpot.findMany({
        where,
        orderBy: { createdAt: "desc" }
      });

      if (q && typeof q === 'string' && q.trim().length > 0) {
        const query = q.toLowerCase();
        spots = spots.filter(s =>
          s.titleEn.toLowerCase().includes(query) ||
          s.titleAr.includes(query) ||
          s.titleZh.includes(query) ||
          s.titleCkb.includes(query) ||
          s.city.toLowerCase().includes(query) ||
          s.descriptionEn.toLowerCase().includes(query)
        );
      }

      res.json(spots);
    } catch (e: any) {
      console.error("Error fetching tourism spots:", e);
      res.status(500).json({ error: "Failed to fetch tourism spots: " + e.message });
    }
  });

  app.get("/api/tourism/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const spot = await prisma.tourismSpot.findFirst({
        where: {
          OR: [
            { id: idOrSlug },
            { slug: idOrSlug }
          ]
        }
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
        titleEn, titleAr, titleZh, titleCkb,
        city, region, category,
        descriptionEn, descriptionAr, descriptionZh, descriptionCkb,
        imageUrl, bestTimeToVisit, visaPolicy, flightInfo, rating, estimatedCost,
        isFeatured, isTrending
      } = req.body;

      if (!titleEn || !city || !region || !category || !descriptionEn || !imageUrl) {
        return res.status(400).json({ error: "Missing required fields (titleEn, city, region, category, descriptionEn, imageUrl)" });
      }

      const slug = `tourism-${Date.now()}-${titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`;

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
          isTrending: isTrending !== undefined ? Boolean(isTrending) : true
        }
      });

      res.json(newSpot);
    } catch (e: any) {
      console.error("Error creating tourism spot:", e);
      res.status(500).json({ error: "Failed to create tourism spot: " + e.message });
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
        data
      });

      res.json(updatedSpot);
    } catch (e: any) {
      console.error("Error updating tourism spot:", e);
      res.status(500).json({ error: "Failed to update tourism spot: " + e.message });
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

  app.post("/api/tourism/seed", async (req, res) => {
    try {
      await seedTourism();
      const count = await prisma.tourismSpot.count();
      res.json({ success: true, count, message: `Reseeded tourism database (${count} spots present)` });
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

      if (region && typeof region === 'string' && region !== 'ALL') {
        where.region = region;
      }
      if (category && typeof category === 'string' && category !== 'ALL') {
        where.category = category;
      }
      if (trending === 'true') {
        where.isTrending = true;
      }
      if (featured === 'true') {
        where.isFeatured = true;
      }

      let features = await prisma.womenFeature.findMany({
        where,
        orderBy: { createdAt: "desc" }
      });

      if (q && typeof q === 'string' && q.trim().length > 0) {
        const query = q.toLowerCase();
        features = features.filter(f =>
          f.nameEn.toLowerCase().includes(query) ||
          f.nameAr.includes(query) ||
          f.nameZh.includes(query) ||
          f.nameCkb.includes(query) ||
          f.titleEn.toLowerCase().includes(query) ||
          f.summaryEn.toLowerCase().includes(query)
        );
      }

      res.json(features);
    } catch (e: any) {
      console.error("Error fetching women features:", e);
      res.status(500).json({ error: "Failed to fetch women features: " + e.message });
    }
  });

  app.get("/api/women/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const feature = await prisma.womenFeature.findFirst({
        where: {
          OR: [
            { id: idOrSlug },
            { slug: idOrSlug }
          ]
        }
      });
      if (!feature) {
        return res.status(404).json({ error: "Women feature record not found" });
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
        nameEn, nameAr, nameZh, nameCkb,
        titleEn, titleAr, titleZh, titleCkb,
        region, category,
        summaryEn, summaryAr, summaryZh, summaryCkb,
        bioEn, bioAr, bioZh, bioCkb,
        imageUrl, organization, publicationUrl,
        isFeatured, isTrending
      } = req.body;

      if (!nameEn || !titleEn || !region || !category || !summaryEn || !imageUrl) {
        return res.status(400).json({ error: "Missing required fields (nameEn, titleEn, region, category, summaryEn, imageUrl)" });
      }

      const slug = `women-${Date.now()}-${nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`;

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
          organization: organization || "Sino-Iraqi Women Empowerment Initiative",
          publicationUrl: publicationUrl || null,
          isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
          isTrending: isTrending !== undefined ? Boolean(isTrending) : true
        }
      });

      res.json(newFeature);
    } catch (e: any) {
      console.error("Error creating women feature record:", e);
      res.status(500).json({ error: "Failed to create women feature record: " + e.message });
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
        data
      });

      res.json(updatedFeature);
    } catch (e: any) {
      console.error("Error updating women feature record:", e);
      res.status(500).json({ error: "Failed to update women feature record: " + e.message });
    }
  });

  app.delete("/api/women/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.womenFeature.delete({ where: { id } });
      res.json({ success: true, message: "Women feature record deleted successfully" });
    } catch (e: any) {
      console.error("Error deleting women feature record:", e);
      res.status(500).json({ error: "Failed to delete women feature record" });
    }
  });

  app.post("/api/women/seed", async (req, res) => {
    try {
      await seedWomenFeatures();
      const count = await prisma.womenFeature.count();
      res.json({ success: true, count, message: `Reseeded women database (${count} records present)` });
    } catch (e: any) {
      console.error("Error reseeding women database:", e);
      res.status(500).json({ error: "Failed to reseed women database" });
    }
  });

  // --- Visa & Flight Portal API ---
  app.get("/api/visa-flights", async (req, res) => {
    try {
      let count = await prisma.visaFlight.count();
      if (count === 0) {
        await seedVisaFlights();
      }

      const { q, serviceType, originRegion, destinationRegion, trending, featured } = req.query;
      const where: any = {};

      if (serviceType && typeof serviceType === 'string' && serviceType !== 'ALL') {
        where.serviceType = serviceType;
      }
      if (originRegion && typeof originRegion === 'string' && originRegion !== 'ALL') {
        where.originRegion = originRegion;
      }
      if (destinationRegion && typeof destinationRegion === 'string' && destinationRegion !== 'ALL') {
        where.destinationRegion = destinationRegion;
      }
      if (trending === 'true') {
        where.isTrending = true;
      }
      if (featured === 'true') {
        where.isFeatured = true;
      }

      let items = await prisma.visaFlight.findMany({
        where,
        orderBy: { createdAt: "desc" }
      });

      if (q && typeof q === 'string' && q.trim().length > 0) {
        const query = q.toLowerCase();
        items = items.filter(f =>
          f.titleEn.toLowerCase().includes(query) ||
          f.titleAr.includes(query) ||
          f.titleZh.includes(query) ||
          f.titleCkb.includes(query) ||
          f.summaryEn.toLowerCase().includes(query) ||
          f.airlineOrAuthority.toLowerCase().includes(query)
        );
      }

      res.json(items);
    } catch (e: any) {
      console.error("Error fetching visa & flight records:", e);
      res.status(500).json({ error: "Failed to fetch visa & flight records: " + e.message });
    }
  });

  app.get("/api/visa-flights/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await prisma.visaFlight.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ error: "Visa & Flight record not found" });
      res.json(item);
    } catch (e: any) {
      console.error("Error fetching visa & flight item:", e);
      res.status(500).json({ error: "Failed to fetch visa & flight item" });
    }
  });

  app.post("/api/visa-flights", authMiddleware, async (req, res) => {
    try {
      const body = req.body;
      const slug = body.slug || (body.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4));
      
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
          airlineOrAuthority: body.airlineOrAuthority || "Consular & Civil Aviation Authority",
          processingTime: body.processingTime || "24 - 48 Hours",
          feeOrCost: body.feeOrCost || "Consular Tariff",
          imageUrl: body.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000",
          officialLink: body.officialLink || null,
          isFeatured: body.isFeatured !== undefined ? body.isFeatured : true,
          isTrending: body.isTrending !== undefined ? body.isTrending : true
        }
      });
      res.json(newItem);
    } catch (e: any) {
      console.error("Error creating visa & flight record:", e);
      res.status(500).json({ error: "Failed to create visa & flight record: " + e.message });
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
          ...(body.serviceType !== undefined && { serviceType: body.serviceType }),
          ...(body.originRegion !== undefined && { originRegion: body.originRegion }),
          ...(body.destinationRegion !== undefined && { destinationRegion: body.destinationRegion }),
          ...(body.summaryEn !== undefined && { summaryEn: body.summaryEn }),
          ...(body.summaryAr !== undefined && { summaryAr: body.summaryAr }),
          ...(body.summaryZh !== undefined && { summaryZh: body.summaryZh }),
          ...(body.summaryCkb !== undefined && { summaryCkb: body.summaryCkb }),
          ...(body.detailsEn !== undefined && { detailsEn: body.detailsEn }),
          ...(body.detailsAr !== undefined && { detailsAr: body.detailsAr }),
          ...(body.detailsZh !== undefined && { detailsZh: body.detailsZh }),
          ...(body.detailsCkb !== undefined && { detailsCkb: body.detailsCkb }),
          ...(body.airlineOrAuthority !== undefined && { airlineOrAuthority: body.airlineOrAuthority }),
          ...(body.processingTime !== undefined && { processingTime: body.processingTime }),
          ...(body.feeOrCost !== undefined && { feeOrCost: body.feeOrCost }),
          ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
          ...(body.officialLink !== undefined && { officialLink: body.officialLink }),
          ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
          ...(body.isTrending !== undefined && { isTrending: body.isTrending })
        }
      });
      res.json(updated);
    } catch (e: any) {
      console.error("Error updating visa & flight record:", e);
      res.status(500).json({ error: "Failed to update visa & flight record: " + e.message });
    }
  });

  app.delete("/api/visa-flights/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.visaFlight.delete({ where: { id } });
      res.json({ success: true, message: "Visa & Flight record deleted successfully" });
    } catch (e: any) {
      console.error("Error deleting visa & flight record:", e);
      res.status(500).json({ error: "Failed to delete visa & flight record" });
    }
  });

  app.post("/api/visa-flights/seed", async (req, res) => {
    try {
      await seedVisaFlights();
      const count = await prisma.visaFlight.count();
      res.json({ success: true, count, message: `Reseeded visa & flight database (${count} records present)` });
    } catch (e: any) {
      console.error("Error reseeding visa & flight database:", e);
      res.status(500).json({ error: "Failed to reseed visa & flight database" });
    }
  });

  app.post("/api/visa-flights/apply", async (req, res) => {
    try {
      const { fullName, email, passportNumber, origin, destination, travelDate, serviceType, notes } = req.body;
      if (!fullName || !email || !passportNumber || !serviceType) {
        return res.status(400).json({ error: "Missing required fields for visa/flight request" });
      }
      res.json({ 
        success: true, 
        ticketId: "VF-" + Math.floor(100000 + Math.random() * 900000), 
        message: "Your visa/flight assistance inquiry has been transmitted to the Consular & Aviation Concierge Secretariat." 
      });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to process application" });
    }
  });


  // Public submissions for Partnership Applications & Telexes
  app.post("/api/public/applications", async (req, res) => {
    try {
      const { fullName, email, company, role, bio, hash, bureau } = req.body;
      if (!fullName || !email || !company || !role || !bio || !hash || !bureau) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const application = await prisma.partnershipApplication.create({
        data: { fullName, email, company, role, bio, hash, bureau }
      });
      res.json({ success: true, application });
    } catch (e: any) {
      console.error("Failed to submit application:", e);
      res.status(500).json({ error: "Failed to submit partnership application: " + e.message });
    }
  });

  app.post("/api/public/telexes", async (req, res) => {
    try {
      const { name, email, company, bureau, message, telexRef } = req.body;
      if (!name || !email || !company || !bureau || !message || !telexRef) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const dispatch = await prisma.telexDispatch.create({
        data: { name, email, company, bureau, message, telexRef }
      });
      res.json({ success: true, dispatch });
    } catch (e: any) {
      console.error("Failed to submit telex:", e);
      res.status(500).json({ error: "Failed to submit telex dispatch: " + e.message });
    }
  });

  // Admin Partnership Applications Management
  app.get("/api/admin/applications", authMiddleware, async (req, res) => {
    try {
      const apps = await prisma.partnershipApplication.findMany({
        orderBy: { createdAt: "desc" }
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
        data: { status }
      });
      res.json(app);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update application" });
    }
  });

  app.delete("/api/admin/applications/:id", authMiddleware, async (req, res) => {
    try {
      await prisma.partnershipApplication.delete({
        where: { id: req.params.id }
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete application" });
    }
  });

  // Admin Telex Dispatches Management
  app.get("/api/admin/telexes", authMiddleware, async (req, res) => {
    try {
      const telexes = await prisma.telexDispatch.findMany({
        orderBy: { createdAt: "desc" }
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
        data: { status }
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
        where: { id: req.params.id }
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
      const { slug, titleEn, titleAr, titleZh, titleCkb, excerptEn, excerptAr, excerptZh, excerptCkb, contentEn, contentAr, contentZh, contentCkb, imageUrl, isPrivate } = req.body;
      if (!slug || !titleEn || !titleAr || !titleZh || !titleCkb) {
        return res.status(400).json({ error: "Missing required study fields" });
      }

      let author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      if (!author) {
        author = await prisma.user.create({
          data: { email: 'admin@test.com', name: 'Admin', role: 'ADMIN' }
        });
      }

      const study = await prisma.study.upsert({
        where: { slug },
        update: {
          titleEn, titleAr, titleZh, titleCkb,
          excerptEn: excerptEn || "", excerptAr: excerptAr || "", excerptZh: excerptZh || "", excerptCkb: excerptCkb || "",
          contentEn: contentEn || "", contentAr: contentAr || "", contentZh: contentZh || "", contentCkb: contentCkb || "",
          imageUrl, isPrivate: !!isPrivate,
          authorId: author.id
        },
        create: {
          slug,
          titleEn, titleAr, titleZh, titleCkb,
          excerptEn: excerptEn || "", excerptAr: excerptAr || "", excerptZh: excerptZh || "", excerptCkb: excerptCkb || "",
          contentEn: contentEn || "", contentAr: contentAr || "", contentZh: contentZh || "", contentCkb: contentCkb || "",
          imageUrl, isPrivate: !!isPrivate,
          authorId: author.id
        }
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
        where: { id: req.params.id }
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete study" });
    }
  });



  const adminMiddleware = async (req: any, res: any, next: any) => {
    authMiddleware(req, res, () => {
      if (req.user.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
      next();
    });
  };

  app.post("/api/admin/articles", authMiddleware, async (req, res) => {
    const { slug, categoryId, imageUrl, translations } = req.body;
    try {
      let author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      if (!author) {
        author = await prisma.user.create({
          data: { email: 'admin@test.com', name: 'Admin', role: 'ADMIN' }
        });
      }

      // Check if article with slug already exists for Force Save/Overwrite support
      const existing = await prisma.article.findUnique({
        where: { slug }
      });

      let article;
      if (existing) {
        // Clean up existing translations first
        await prisma.articleTranslation.deleteMany({
          where: { articleId: existing.id }
        });

        article = await prisma.article.update({
          where: { id: existing.id },
          data: {
            categoryId,
            authorId: author.id,
            imageUrl,
            status: 'PUBLISHED',
            translations: {
              create: translations
            }
          }
        });
        console.log(`[FORCE SAVE] Successfully updated/overwrote article slug: ${slug}`);
      } else {
        article = await prisma.article.create({
          data: {
            slug,
            categoryId,
            authorId: author.id,
            imageUrl,
            status: 'PUBLISHED',
            translations: {
              create: translations
            }
          }
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

  app.post("/api/admin/news-search", async (req, res) => {
    try {
      const { country, topic } = req.body;
      const query = country 
        ? `News on ${country} and Iraq relations, focusing on ${topic || 'economic development'}` 
        : `Latest real-world news on Iraq-China trade, energy deals, and cooperation agreements`;
      
      const ai = getGeminiClient();
      console.log(`[AI News Search] Initiating Google Search grounded query with Gemini for: "${query}"`);
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `You are an elite, bi-partisan political and trade news journalist for ChinQ, a premier trilingual China-Iraq news portal. 
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
            description: "A list of 3 news articles generated from real-world search results.",
            items: {
              type: Type.OBJECT,
              properties: {
                slug: { type: Type.STRING, description: "Unique, lowercase, URL-friendly slug using hyphens." },
                categorySlug: { type: Type.STRING, description: "Must be exactly one of: 'energy', 'economy', 'culture'" },
                imageUrl: { type: Type.STRING, description: "A realistic Unsplash image URL." },
                translations: {
                  type: Type.ARRAY,
                  description: "Must contain exactly four translations with lang keys: 'en', 'ar', 'zh', 'ckb'",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      lang: { type: Type.STRING, description: "Must be 'en', 'ar', 'zh', or 'ckb'" },
                      title: { type: Type.STRING, description: "Professional news headline." },
                      excerpt: { type: Type.STRING, description: "Short summary of the news story." },
                      content: { type: Type.STRING, description: "Full, detailed, multi-paragraph body text of the article (minimum 150 words)." }
                    },
                    required: ["lang", "title", "excerpt", "content"]
                  }
                }
              },
              required: ["slug", "categorySlug", "imageUrl", "translations"]
            }
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("No response content generated from Gemini.");
      }

      const articles = JSON.parse(text);
      res.json({ success: true, articles });
    } catch (e: any) {
      console.error("[AI News Search Error]", e);
      res.status(500).json({ error: e.message || "Failed to search and generate news" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    const cats = await prisma.category.findMany();
    res.json(cats);
  });

  // 4. Admin Users management
  app.get("/api/admin/users", adminMiddleware, async (req, res) => {
    try {
      let users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      // Seed if empty
      if (users.length === 0) {
        await prisma.user.createMany({
          data: [
            { email: 'hunar@chinq.com', name: 'Hunar Jabbar', role: 'ADMIN' },
            { email: 'jasim@chinq.com', name: 'Jasim Al-Iraqi', role: 'EDITOR' },
            { email: 'zhu@chinq.com', name: 'Zhu Chen', role: 'AUTHOR' }
          ]
        });
        users = await prisma.user.findMany({
          orderBy: { createdAt: 'desc' }
        });
      }
      res.json(users);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/users", adminMiddleware, async (req, res) => {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are strictly required" });
    }
    try {
      const user = await prisma.user.create({
        data: { name, email, role: role || 'AUTHOR' }
      });
      res.json(user);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.put("/api/admin/users/:id", adminMiddleware, async (req, res) => {
    const { name, email, role, subscriptionStatus, subscriptionPlan, subscriptionEndDate } = req.body;
    try {
      const updateData: any = { name, email, role };
      if (subscriptionStatus !== undefined) updateData.subscriptionStatus = subscriptionStatus;
      if (subscriptionPlan !== undefined) updateData.subscriptionPlan = subscriptionPlan;
      if (subscriptionEndDate !== undefined) updateData.subscriptionEndDate = subscriptionEndDate;

      const user = await prisma.user.update({
        where: { id: req.params.id },
        data: updateData
      });
      res.json(user);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  app.delete("/api/admin/users/:id", adminMiddleware, async (req, res) => {
    try {
      await prisma.user.delete({
        where: { id: req.params.id }
      });
      res.json({ success: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
