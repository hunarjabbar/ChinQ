import fs from "fs";
import path from "path";

const distServer = path.join(process.cwd(), "dist", "server.cjs");

if (fs.existsSync(distServer)) {
  try {
    // @ts-ignore
    await import("./dist/server.cjs");
  } catch (err) {
    console.error("Failed to start bundled server:", err);
    process.exit(1);
  }
} else {
  try {
    // @ts-ignore
    await import("./server.app.js");
  } catch {
    // @ts-ignore
    await import("./server.app.ts");
  }
}

