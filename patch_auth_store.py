with open("src/store/useAuthStore.ts", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "  role: string;\n}",
    "  role: string;\n  subscriptionStatus?: string;\n  subscriptionPlan?: string;\n  subscriptionEndDate?: string;\n}"
)

with open("src/store/useAuthStore.ts", "w", encoding="utf-8") as f:
    f.write(content)
