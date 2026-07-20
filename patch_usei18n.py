with open("src/hooks/useI18n.ts", "r", encoding="utf-8") as f:
    content = f.read()

import re
en = re.search(r"en: \{([^}]*)\}", content).group(1)
ar = re.search(r"ar: \{([^}]*)\}", content).group(1)
zh = re.search(r"zh: \{([^}]*)\}", content).group(1)
ckb = re.search(r"ckb: \{([^}]*)\}", content).group(1)

content = content.replace("en: {" + en + "}", "en: {" + en + "    ai: 'AI',\n    foodBeverage: 'Food & Beverage',\n    expo: 'Expo',\n    businessStats: 'Business Statistics',\n  }")
content = content.replace("ar: {" + ar + "}", "ar: {" + ar + "    ai: 'الذكاء الاصطناعي',\n    foodBeverage: 'الأغذية والمشروبات',\n    expo: 'معرض',\n    businessStats: 'إحصاءات الأعمال',\n  }")
content = content.replace("zh: {" + zh + "}", "zh: {" + zh + "    ai: '人工智能',\n    foodBeverage: '餐饮',\n    expo: '博览会',\n    businessStats: '商业统计',\n  }")
content = content.replace("ckb: {" + ckb + "}", "ckb: {" + ckb + "    ai: 'زیرەکی دەستکرد',\n    foodBeverage: 'خۆراک و خواردنەوە',\n    expo: 'پێشانگا',\n    businessStats: 'ئاماری بازرگانی',\n  }")

with open("src/hooks/useI18n.ts", "w", encoding="utf-8") as f:
    f.write(content)
