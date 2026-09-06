import re

with open("src/index.css", "r") as f:
    content = f.read()

content = content.replace("family=Inter:wght@400;500;600;700", "family=Plus+Jakarta+Sans:wght@400;500;600;700")
content = content.replace("--font-sans: \"Inter\", system-ui, sans-serif;", "--font-sans: \"Plus Jakarta Sans\", system-ui, sans-serif;")

# Let's add base styles for body to not use pure white and black
body_styles = """
body {
  font-family: var(--font-sans);
  background-color: #FAFAFA; /* Very subtle warm/neutral off-white */
  color: #1A1A1A; /* Not pure black */
}

/* Ensure headings have mathematical scales */
h1 { font-size: 3.052rem; line-height: 1.1; margin-bottom: 1.5rem; }
h2 { font-size: 2.441rem; line-height: 1.2; margin-bottom: 1.25rem; }
h3 { font-size: 1.953rem; line-height: 1.3; margin-bottom: 1rem; }
h4 { font-size: 1.563rem; line-height: 1.4; margin-bottom: 0.75rem; }
h5 { font-size: 1.25rem;  line-height: 1.4; margin-bottom: 0.5rem; }
p { font-size: 1rem; line-height: 1.6; max-width: 70ch; }
"""
content = re.sub(r'body\s*{[^}]*}', body_styles, content)

with open("src/index.css", "w") as f:
    f.write(content)
print("index.css patched")
