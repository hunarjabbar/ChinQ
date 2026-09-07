import re

with open("server.app.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Replace editorOrAdminMiddleware with adminMiddleware for /api/admin/users endpoints
content = content.replace(
    'app.get("/api/admin/users", editorOrAdminMiddleware, async (req, res) => {',
    'app.get("/api/admin/users", adminMiddleware, async (req, res) => {'
)
content = content.replace(
    'app.post("/api/admin/users", editorOrAdminMiddleware, async (req, res) => {',
    'app.post("/api/admin/users", adminMiddleware, async (req, res) => {'
)
content = content.replace(
    'app.put("/api/admin/users/:id", editorOrAdminMiddleware, async (req, res) => {',
    'app.put("/api/admin/users/:id", adminMiddleware, async (req, res) => {'
)
content = content.replace(
    'app.post("/api/admin/users/:id/renew", editorOrAdminMiddleware, async (req, res) => {',
    'app.post("/api/admin/users/:id/renew", adminMiddleware, async (req, res) => {'
)
content = content.replace(
    'app.delete("/api/admin/users/:id", editorOrAdminMiddleware, async (req, res) => {',
    'app.delete("/api/admin/users/:id", adminMiddleware, async (req, res) => {'
)

with open("server.app.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Patched server.app.ts")
