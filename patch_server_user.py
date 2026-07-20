with open("server.ts", "r", encoding="utf-8") as f:
    content = f.read()

old_str = "user: { id: user.id, email: user.email, name: user.name, role: user.role }"
new_str = "user: { id: user.id, email: user.email, name: user.name, role: user.role, subscriptionStatus: user.subscriptionStatus, subscriptionPlan: user.subscriptionPlan, subscriptionEndDate: user.subscriptionEndDate }"

content = content.replace(old_str, new_str)

with open("server.ts", "w", encoding="utf-8") as f:
    f.write(content)
