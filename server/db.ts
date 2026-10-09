import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

if (!process.env.DATABASE_URL) {
  const isProd = process.env.NODE_ENV === "production" || process.env.PORT;
  process.env.DATABASE_URL = isProd ? "file:/tmp/dev2.db" : "file:./prisma/dev2.db";
}

if (process.env.DATABASE_URL?.includes("/tmp/")) {
  try {
    const targetDb = "/tmp/dev2.db";
    const sourceDb = path.join(process.cwd(), "prisma/dev2.db");
    if (!fs.existsSync(targetDb) && fs.existsSync(sourceDb)) {
      fs.copyFileSync(sourceDb, targetDb);
      console.log("[PrismaDB] Copied prisma/dev2.db to /tmp/dev2.db for writable Cloud Run execution.");
    }
  } catch (e) {
    console.error("[PrismaDB] Error setting up /tmp database copy:", e);
  }
}

const prisma = new PrismaClient();
export { prisma };
