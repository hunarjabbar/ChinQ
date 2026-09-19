import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Colors
    content = content.replace("#111111", "#1A1A1A")
    content = content.replace("#222222", "#2B2A29")
    content = content.replace("#333333", "#3B3A39")
    content = content.replace("#DDDDDD", "#E5E5E5")
    content = content.replace("#EEEEEE", "#F5F5F5")

    # Typography adjustments for mathematical scales & elegance
    # We want text-lg to mean something specific, but tailwind already handles this.
    # Let's ensure headers are using font-serif and body is sans.
    # Replace overly aggressive tracking on non-caps:
    
    # Increase padding/margins based on guidelines: "Padding Math: Container outer padding must always equal or exceed the inner padding"
    content = content.replace("py-16", "py-24") # Increase major section padding
    content = content.replace("py-12", "py-20")
    content = content.replace("mb-8", "mb-12")

    # Fix ghost card issue (mixing 1px border and wide shadow)
    # Remove shadow-lg or shadow-md if there's a border, or make shadow very subtle
    content = content.replace("shadow-lg", "shadow-sm hover:shadow-md")
    content = content.replace("shadow-xs hover:shadow-md", "shadow-sm hover:shadow-md")
    content = content.replace("shadow-xs hover:shadow-sm", "hover:shadow-sm")

    # Remove extreme border radii, ensure max is rounded-xl (12px)
    content = content.replace("rounded-2xl", "rounded-xl")
    content = content.replace("rounded-3xl", "rounded-xl")

    with open(filepath, 'w') as f:
        f.write(content)

for root, _, files in os.walk("src"):
    for file in files:
        if file.endswith((".tsx", ".ts")):
            process_file(os.path.join(root, file))

print("Style refactoring complete")
