import re

with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace("import SearchPage from './pages/SearchPage'; from './pages/LivePortal';", "import SearchPage from './pages/SearchPage';")

with open("src/App.tsx", "w") as f:
    f.write(content)
