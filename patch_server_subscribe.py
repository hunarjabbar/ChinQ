with open("server.ts", "r", encoding="utf-8") as f:
    content = f.read()

subscribe_route = """
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
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to process subscription" });
    }
  });
"""

content = content.replace('app.get("/api/articles",', subscribe_route + '\n  app.get("/api/articles",')

with open("server.ts", "w", encoding="utf-8") as f:
    f.write(content)
