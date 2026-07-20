with open("server.ts", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('jwt.sign(', '(jwt.default || jwt).sign(')
content = content.replace('jwt.verify(', '(jwt.default || jwt).verify(')
content = content.replace('bcrypt.hash(', '(bcrypt.default || bcrypt).hash(')
content = content.replace('bcrypt.compare(', '(bcrypt.default || bcrypt).compare(')

with open("server.ts", "w", encoding="utf-8") as f:
    f.write(content)
