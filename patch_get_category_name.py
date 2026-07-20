import glob

files = ["src/pages/Home.tsx", "src/pages/CategoryPage.tsx"]

old_code = """      if (name === 'Energy') return 'وزە';
      if (name === 'Economy') return 'ئابووری';
      if (name === 'Culture') return 'کالچەر';
      return name;"""

new_code = """      if (name === 'Energy') return 'وزە';
      if (name === 'Economy') return 'ئابووری';
      if (name === 'Culture') return 'کالچەر';
      if (name === 'AI') return 'زیرەکی دەستکرد';
      if (name === 'Food & Beverage') return 'خۆراک و خواردنەوە';
      if (name === 'Expo') return 'پێشانگا';
      if (name === 'Business Statistics') return 'ئاماری بازرگانی';
      return name;"""

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace(old_code, new_code)
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)
