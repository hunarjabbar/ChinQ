with open("prisma/seed.ts", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("symbol: 'CNY_USD', name: 'CNY/USD', price: 7.23", "symbol: 'CNY_IQD', name: 'CNY/IQD', price: 181.12")
content = content.replace("symbol: 'IQD_USD', name: 'IQD/USD', price: 1310.0", "symbol: 'USD_IQD', name: 'USD/IQD', price: 1310.0")

with open("prisma/seed.ts", "w", encoding="utf-8") as f:
    f.write(content)
