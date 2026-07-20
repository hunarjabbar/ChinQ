import os
import glob

def replace_in_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if "fetch('/api/admin" in content or 'fetch(`/api/admin' in content:
        # Add import if not present
        if "apiFetch" not in content:
            # compute relative path
            # if inside pages, ../lib/api
            # if inside components, ../lib/api
            content = "import { apiFetch } from '../lib/api';\n" + content
            content = content.replace("await fetch(", "await apiFetch(")
            
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
                print(f"Patched {filepath}")

for root, _, files in os.walk("src"):
    for file in files:
        if file.endswith(".tsx"):
            replace_in_file(os.path.join(root, file))

