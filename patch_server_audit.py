import re

with open("server.app.ts", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add audit middleware
audit_middleware = """  app.use(express.json());

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
              userEmail: user.email,
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
"""
content = content.replace("  app.use(express.json());", audit_middleware)

# 2. Add API endpoint for fetching logs
audit_endpoint = """
  app.get("/api/admin/audit-logs", adminMiddleware, async (req, res) => {
    try {
      const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100
      });
      res.json(logs);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch audit logs" });
    }
  });
"""

# Inject before login endpoint
content = content.replace('  app.post("/api/auth/login", loginLimiter, async (req, res) => {', audit_endpoint + '\n  app.post("/api/auth/login", loginLimiter, async (req, res) => {')

with open("server.app.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Patched server.app.ts with Audit Logs")
