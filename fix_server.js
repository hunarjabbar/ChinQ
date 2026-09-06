import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

const mwCode = `
  const editorOrAdminMiddleware = async (req: any, res: any, next: any) => {
    authMiddleware(req, res, () => {
      if (req.user.role !== "ADMIN" && req.user.role !== "EDITOR")
        return res.status(403).json({ error: "Forbidden" });
      next();
    });
  };

  const adminMiddleware = async (req: any, res: any, next: any) => {
    authMiddleware(req, res, () => {
      if (req.user.role !== "ADMIN")
        return res.status(403).json({ error: "Forbidden" });
      next();
    });
  };
`;

code = code.replace(/  const editorOrAdminMiddleware = async \(req: any, res: any, next: any\) => \{[\s\S]*?  const adminMiddleware = async \(req: any, res: any, next: any\) => \{[\s\S]*?    \}\);\n  \};\n/m, '');

code = code.replace(
  /  const authMiddleware = async \(req: any, res: any, next: any\) => \{[\s\S]*?    \}\n  \};\n/,
  match => match + mwCode
);

fs.writeFileSync('server.ts', code);
