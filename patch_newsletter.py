import re

with open("server.ts", "r") as f:
    content = f.read()

newsletter_endpoint = """
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

if "/api/newsletter/subscribe" not in content:
    content = content.replace("app.listen(PORT, \"0.0.0.0\", () => {", newsletter_endpoint + "  app.listen(PORT, \"0.0.0.0\", () => {")

    with open("server.ts", "w") as f:
        f.write(content)
    print("Patched server.ts")
else:
    print("Already patched")
