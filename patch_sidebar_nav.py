with open("src/components/EnterpriseSidebar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_nav = """                        { label: lang === 'ar' ? 'آراء' : lang === 'zh' ? '观点' : lang === 'ckb' ? 'بۆچوون' : 'Opinion', slug: 'opinion', desc: 'Editorials & Voices' }"""

new_nav = """                        { label: lang === 'ar' ? 'آراء' : lang === 'zh' ? '观点' : lang === 'ckb' ? 'بۆچوون' : 'Opinion', slug: 'opinion', desc: 'Editorials & Voices' },
                        { label: lang === 'ar' ? 'الذكاء الاصطناعي' : lang === 'zh' ? '人工智能' : lang === 'ckb' ? 'زیرەکی دەستکرد' : 'AI', slug: 'ai', desc: 'Artificial Intelligence' },
                        { label: lang === 'ar' ? 'الأغذية والمشروبات' : lang === 'zh' ? '餐饮' : lang === 'ckb' ? 'خۆراک و خواردنەوە' : 'Food & Beverage', slug: 'food-beverage', desc: 'Culinary Industry' },
                        { label: lang === 'ar' ? 'معرض' : lang === 'zh' ? '博览会' : lang === 'ckb' ? 'پێشانگا' : 'Expo', slug: 'expo', desc: 'Trade Fairs' },
                        { label: lang === 'ar' ? 'إحصاءات الأعمال' : lang === 'zh' ? '商业统计' : lang === 'ckb' ? 'ئاماری بازرگانی' : 'Business Statistics', slug: 'business-statistics', desc: 'Market Data' }"""

content = content.replace(old_nav, new_nav)

with open("src/components/EnterpriseSidebar.tsx", "w", encoding="utf-8") as f:
    f.write(content)
