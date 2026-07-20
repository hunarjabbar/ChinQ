import re

with open("prisma/seed.ts", "r", encoding="utf-8") as f:
    content = f.read()

new_cats = """
  const catAi = await prisma.category.create({
    data: { slug: 'ai', name: 'AI', nameEn: 'AI', nameAr: 'الذكاء الاصطناعي', nameZh: '人工智能' }
  });
  const catFood = await prisma.category.create({
    data: { slug: 'food-beverage', name: 'Food & Beverage', nameEn: 'Food & Beverage', nameAr: 'الأغذية والمشروبات', nameZh: '餐饮' }
  });
  const catExpo = await prisma.category.create({
    data: { slug: 'expo', name: 'Expo', nameEn: 'Expo', nameAr: 'معرض', nameZh: '博览会' }
  });
  const catStats = await prisma.category.create({
    data: { slug: 'business-statistics', name: 'Business Statistics', nameEn: 'Business Statistics', nameAr: 'إحصاءات الأعمال', nameZh: '商业统计' }
  });
"""

# Insert after existing categories
content = content.replace("  const catCulture = await prisma.category.create({", new_cats + "\n  const catCulture = await prisma.category.create({")

with open("prisma/seed.ts", "w", encoding="utf-8") as f:
    f.write(content)
