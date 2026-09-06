import re

with open("src/pages/Home.tsx", "r") as f:
    content = f.read()

imports = """
import BilateralProjects from '../components/BilateralProjects';
import LegalRegulatory from '../components/LegalRegulatory';
import DiplomaticVoices from '../components/DiplomaticVoices';
import EnterpriseDirectory from '../components/EnterpriseDirectory';
import NewsletterHub from '../components/NewsletterHub';
"""

if "import BilateralProjects" not in content:
    content = content.replace("import TourismSection from '../components/TourismSection';", "import TourismSection from '../components/TourismSection';\n" + imports)

insertion_content = """
      <TourismSection />
      
      <BilateralProjects />
      <LegalRegulatory />
      <DiplomaticVoices />
      <EnterpriseDirectory />
      <NewsletterHub />
"""

if "<BilateralProjects />" not in content:
    content = content.replace("<TourismSection />", insertion_content)

with open("src/pages/Home.tsx", "w") as f:
    f.write(content)
print("Home.tsx patched")
