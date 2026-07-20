with open("server.ts", "r", encoding="utf-8") as f:
    content = f.read()

old_put = """  app.put("/api/admin/users/:id", adminMiddleware, async (req, res) => {
    const { name, email, role } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: req.params.id },
        data: { name, email, role }
      });
      res.json(user);
    } catch (e) {"""

new_put = """  app.put("/api/admin/users/:id", adminMiddleware, async (req, res) => {
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
    } catch (e) {"""

content = content.replace(old_put, new_put)

with open("server.ts", "w", encoding="utf-8") as f:
    f.write(content)
