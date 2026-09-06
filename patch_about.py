with open("src/pages/About.tsx", "r") as f:
    content = f.read()

replacement = """From a diplomatic perspective, it facilitates tighter academic and cultural alliances. Economically, its real-time market integrations, B2B directories, and energy indices streamline cross-border investments, joint ventures, and supply chain logistics. The platform now features five core pillars: a Bilateral Projects & Infrastructure Pipeline Tracker, a Legal & Regulatory Intelligence Desk, an Executive & Diplomatic Voices Spotlight, a Verified Enterprise & Supplier Directory, and an Executive Morning Briefing & Newsletter Hub."""

content = content.replace("From a diplomatic perspective, it facilitates tighter academic and cultural alliances. Economically, its real-time market integrations, B2B directories, and energy indices streamline cross-border investments, joint ventures, and supply chain logistics.", replacement)

with open("src/pages/About.tsx", "w") as f:
    f.write(content)
print("About patched")
