import re

with open("server.ts", "r") as f:
    content = f.read()

# First, ensure it's not present anywhere. 
# Oh wait, we see from the tail that it was removed completely! The block matched. 
# But the insertion point `// Vite middleware for development` wasn't found because it's `// --- Vite Middleware ---`.

newsletter_block = """
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

"""

content = content.replace("  // --- Vite Middleware ---", newsletter_block + "  // --- Vite Middleware ---")

with open("server.ts", "w") as f:
    f.write(content)
print("Fixed server.ts properly")
