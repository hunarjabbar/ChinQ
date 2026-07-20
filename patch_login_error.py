import re

with open("server.ts", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'res.status(500).json({ error: "Login failed" });',
    'console.error("Login Error:", e); res.status(500).json({ error: "Login failed: " + e.message });'
)

with open("server.ts", "w", encoding="utf-8") as f:
    f.write(content)
