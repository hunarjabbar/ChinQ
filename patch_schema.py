with open("prisma/schema.prisma", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "  articles  Article[]",
    "  articles  Article[]\n  stripeCustomerId String? @unique\n  subscriptionStatus String @default(\"INACTIVE\") // INACTIVE, ACTIVE, CANCELED, PAST_DUE\n  subscriptionPlan   String? // PREMIUM, ENTERPRISE\n  subscriptionEndDate DateTime?\n"
)

with open("prisma/schema.prisma", "w", encoding="utf-8") as f:
    f.write(content)
