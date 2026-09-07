import re

with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add import
import_audit = "import { AdminAuditLogs } from './pages/AdminAuditLogs';\n"
content = content.replace("import { AdminUsers } from './pages/AdminUsers';", import_audit + "import { AdminUsers } from './pages/AdminUsers';")

# Add route
route_audit = '          { path: "audit-logs", element: <AdminAuditLogs /> },\n'
content = content.replace('{ path: "users", element: <AdminUsers /> },', route_audit + '          { path: "users", element: <AdminUsers /> },')

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Patched App.tsx for Audit Logs")

with open("src/components/AdminLayout.tsx", "r", encoding="utf-8") as f:
    content2 = f.read()
    
# Import Activity or ClipboardList for the icon
if 'ClipboardList' not in content2:
    content2 = content2.replace("import { LayoutDashboard,", "import { LayoutDashboard, ClipboardList,")

nav_item = "{ name: 'Audit Logs', href: `/${lang}/admin/audit-logs`, icon: ClipboardList, adminOnly: true },\n"
content2 = content2.replace("{ name: 'System Settings'", nav_item + "    { name: 'System Settings'")

with open("src/components/AdminLayout.tsx", "w", encoding="utf-8") as f:
    f.write(content2)

print("Patched AdminLayout.tsx for Audit Logs")

