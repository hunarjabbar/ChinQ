import re

# metadata.json
with open("metadata.json", "r") as f:
    content = f.read()
content = content.replace("Iraq-China Daily News Portal", "Iraq-China Daily News Portal. Covering Bilateral Projects, Legal & Regulatory Intelligence, Executive & Diplomatic Voices, Verified Enterprise Directory, and Morning Briefings.")
with open("metadata.json", "w") as f:
    f.write(content)

# index.html
with open("index.html", "r") as f:
    content = f.read()

meta_desc = '<meta name="description" content="Iraq-China Daily News Portal. Featuring Bilateral Projects Pipeline, Legal & Regulatory Intelligence, Executive Voices, and Verified Enterprise Directory." />'

if "<meta name=\"description\"" not in content:
    content = content.replace("<title>", meta_desc + "\n    <title>")
    with open("index.html", "w") as f:
        f.write(content)

