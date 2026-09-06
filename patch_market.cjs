const fs = require('fs');
const content = fs.readFileSync('server.ts', 'utf8');

const marketUpdateApi = `
  app.put("/api/market/:id", adminMiddleware, async (req, res) => {
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
`;

if (!content.includes('app.put("/api/market/:id"')) {
    const updatedContent = content.replace(
        'app.get("/api/market/stream", async (req, res) => {',
        marketUpdateApi + '\n  app.get("/api/market/stream", async (req, res) => {'
    );
    fs.writeFileSync('server.ts', updatedContent);
    console.log("Successfully patched server.ts");
} else {
    console.log("Already patched");
}
