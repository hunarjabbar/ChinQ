with open("src/components/EnterpriseSidebar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("investment: '$4.9 Billion USD'", "investment: 'IQD 6.4 Trillion'")
content = content.replace("investment: '$2.1 Billion USD'", "investment: 'IQD 2.7 Trillion'")
content = content.replace("investment: '$850 Million USD'", "investment: 'IQD 1.1 Trillion'")
content = content.replace("Importers bypass USD hedging fees", "Importers bypass USD/IQD hedging fees")

with open("src/components/EnterpriseSidebar.tsx", "w", encoding="utf-8") as f:
    f.write(content)
