import os
import re

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # We need to replace ChinQ, CHINQ, chinq where appropriate,
        # but avoid touching things that might break if we are not careful.
        # But honestly, a case-insensitive replace of "ChinQ" to "Iraq-China Daily"
        # in text content is fine, except for things like "chinq.post" or "chinq_token".

        # Let's handle emails: "chinq.post" -> "iraqi-chineseagency.com" (or we leave emails alone, but let's change them)
        content = content.replace("chinq.post", "iraqi-chineseagency.com")
        content = content.replace("chinq.media", "iraqi-chineseagency.com")
        
        # tokens/localStorage
        content = content.replace("chinq_token", "iraq_china_daily_token")
        
        # CSS classes / IDs / package names if any
        content = content.replace('"name": "chinq"', '"name": "iraq-china-daily"')
        content = content.replace(">chinq<", ">iraq-china-daily<")
        content = content.replace(">ChinQ", ">Iraq-China Daily")
        content = content.replace("ChinQ", "Iraq-China Daily")
        content = content.replace("CHINQ", "IRAQ-CHINA DAILY")
        content = content.replace("chinq", "iraq-china-daily")

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

# Walk the directory
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'dist' in root:
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.json', '.html', '.css', '.js', '.prisma')):
            process_file(os.path.join(root, file))

print("Rename complete!")
