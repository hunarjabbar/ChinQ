import fs from 'fs';
let code = fs.readFileSync('src/pages/JoinUs.tsx', 'utf8');

// modify handleSubmit
code = code.replace(
  /const res = await fetch\('\/api\/public\/applications', \{[\s\S]*?\}\);/m,
  `let fileUrl = '';
      if (file) {
        // Read file as base64
        fileUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      }

      const res = await fetch('/api/public/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          bio: formData.bio,
          hash: randomHash,
          bureau: assignedBureau,
          fileUrl
        })
      });`
);
fs.writeFileSync('src/pages/JoinUs.tsx', code);

let serverCode = fs.readFileSync('server.ts', 'utf8');
serverCode = serverCode.replace(
  'const { fullName, email, company, role, bio, hash, bureau } = req.body;',
  'const { fullName, email, company, role, bio, hash, bureau, fileUrl } = req.body;'
);
serverCode = serverCode.replace(
  'data: { fullName, email, company, role, bio, hash, bureau },',
  'data: { fullName, email, company, role, bio, hash, bureau, fileUrl },'
);
fs.writeFileSync('server.ts', serverCode);
