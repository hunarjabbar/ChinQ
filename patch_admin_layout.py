import re

with open("src/components/AdminLayout.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Filter navItems based on user role
nav_items_start = content.find("const navItems = [")
nav_items_end = content.find("];", nav_items_start) + 2
old_nav_items = content[nav_items_start:nav_items_end]

new_nav_items = """const navItems = [
    { name: 'Dashboard', href: `/${lang}/admin`, icon: LayoutDashboard },
    { name: 'Articles', href: `/${lang}/admin/articles`, icon: FileText },
    { name: 'Women Leadership', href: `/${lang}/admin/women`, icon: UserIcon },
    { name: 'Tourism Portal', href: `/${lang}/admin/tourism`, icon: Compass },
    { name: 'Books Library', href: `/${lang}/admin/books`, icon: BookOpen },
    { name: 'Podcasts', href: `/${lang}/admin/podcasts`, icon: Mic },
    { name: 'Visa & Flights', href: `/${lang}/admin/visa-flights`, icon: Plane },
    { name: 'Market Data', href: `/${lang}/admin/market`, icon: Activity },
    { name: 'IQD & e-CNY Payments', href: `/${lang}/admin/payments`, icon: Coins },
    { name: 'Live Command', href: `/${lang}/admin?tab=live`, icon: Radio },
    { name: 'Sourcing Desk', href: `/${lang}/admin/sourcing`, icon: Ship, },
    { name: 'Partners', href: `/${lang}/admin/partners`, icon: Briefcase },
    { name: 'Live Streams', href: `/${lang}/admin/live-events`, icon: Video },
    { name: 'Media Library', href: `/${lang}/admin/media`, icon: ImageIcon },
    { name: 'User Management', href: `/${lang}/admin/users`, icon: Users, adminOnly: true },
    { name: 'System Settings', href: `/${lang}/admin/settings`, icon: Settings, adminOnly: true },
  ].filter(item => !item.adminOnly || user?.role === 'ADMIN');"""

content = content.replace(old_nav_items, new_nav_items)

# Add Error Boundary
content = content.replace(
    "import { LayoutDashboard,",
    "import { ErrorBoundary } from './ErrorBoundary';\nimport { LayoutDashboard,"
)

old_main = """<div className="w-full max-w-(--container-width) mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-10 lg:py-12 flex-1 overflow-y-auto">
          {children}
        </div>"""
new_main = """<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 flex-1 overflow-y-auto">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>"""
content = content.replace(old_main, new_main)

# Adjust padding/margin on aside if needed (global alignment)
content = content.replace(
    'className="w-full max-w-(--container-width) mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between h-full"',
    'className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-full"'
)

with open("src/components/AdminLayout.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Patched AdminLayout.tsx")
