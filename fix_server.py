with open("server.ts", "r") as f:
    content = f.read()

newsletter_block = """
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

# Remove the incorrectly placed one
content = content.replace(newsletter_block, "")
# And also the extra blank lines if any, but replacing the block itself is enough.

# Now place it BEFORE Vite middleware / catch-all
insertion = """
  // Newsletter
""" + newsletter_block

content = content.replace("  // Vite middleware for development", insertion + "\n  // Vite middleware for development")

with open("server.ts", "w") as f:
    f.write(content)
print("Fixed server.ts")
