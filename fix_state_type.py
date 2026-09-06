with open("src/components/EnterpriseSidebar.tsx", "r") as f:
    content = f.read()
content = content.replace("useState<'topics' | 'market' | 'projects' | 'b2b' | 'briefs'>('topics')", "useState<'topics' | 'market' | 'projects' | 'b2b' | 'briefs' | ''>('')")
with open("src/components/EnterpriseSidebar.tsx", "w") as f:
    f.write(content)
