with open("server.ts", "r", encoding="utf-8") as f:
    content = f.read()

auth_routes = """
  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, name, role } = req.body;
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: role || "AUTHOR"
        }
      });
      res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
    } catch (e: any) {
      if (e.code === 'P2002') return res.status(400).json({ error: "Email already exists" });
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const bcrypt = await import("bcryptjs");
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

      const jwt = await import("jsonwebtoken");
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "chinq_secret_key_123", { expiresIn: "1d" });
      
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (e) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "No token provided" });
      const token = authHeader.split(" ")[1];
      const jwt = await import("jsonwebtoken");
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "chinq_secret_key_123");
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) return res.status(401).json({ error: "User not found" });
      res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (e) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

"""

content = content.replace("app.use(express.json());", "app.use(express.json());" + auth_routes)

with open("server.ts", "w", encoding="utf-8") as f:
    f.write(content)
