import os

components = [
    'src/components/BilateralProjects.tsx',
    'src/components/LegalRegulatory.tsx',
    'src/components/DiplomaticVoices.tsx',
    'src/components/EnterpriseDirectory.tsx',
    'src/components/NewsletterHub.tsx'
]

for filepath in components:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Remove LanguageContext import
    content = content.replace("import { useLanguage } from '../context/LanguageContext';", "")
    
    # Add Locale type import
    content = content.replace("import React", "import React from 'react';\nimport { Locale } from '../types';\n//")
    content = content.replace("import React, { useState }", "import React, { useState } from 'react';\nimport { Locale } from '../types';\n//")
    
    # Update function signature
    content = content.replace("export default function BilateralProjects() {", "export default function BilateralProjects({ lang }: { lang: Locale }) {")
    content = content.replace("export default function LegalRegulatory() {", "export default function LegalRegulatory({ lang }: { lang: Locale }) {")
    content = content.replace("export default function DiplomaticVoices() {", "export default function DiplomaticVoices({ lang }: { lang: Locale }) {")
    content = content.replace("export default function EnterpriseDirectory() {", "export default function EnterpriseDirectory({ lang }: { lang: Locale }) {")
    content = content.replace("export default function NewsletterHub() {", "export default function NewsletterHub({ lang }: { lang: Locale }) {")
    
    # Remove useLanguage hook
    content = content.replace("  const { lang } = useLanguage();\n", "")
    
    with open(filepath, 'w') as f:
        f.write(content)

with open("src/pages/Home.tsx", "r") as f:
    content = f.read()

content = content.replace("<BilateralProjects />", "<BilateralProjects lang={lang} />")
content = content.replace("<LegalRegulatory />", "<LegalRegulatory lang={lang} />")
content = content.replace("<DiplomaticVoices />", "<DiplomaticVoices lang={lang} />")
content = content.replace("<EnterpriseDirectory />", "<EnterpriseDirectory lang={lang} />")
content = content.replace("<NewsletterHub />", "<NewsletterHub lang={lang} />")

with open("src/pages/Home.tsx", "w") as f:
    f.write(content)

print("Components fixed")
