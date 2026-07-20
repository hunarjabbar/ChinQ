with open("src/components/AdminLayout.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "export function AdminLayout({ children }: { children: React.ReactNode }) {",
    "export function AdminLayout({ children, userRole }: { children: React.ReactNode, userRole?: string }) {"
)

restrict = """
  if (user && userRole && user.role !== userRole) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center font-sans">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-black text-[#111111] mb-2 uppercase tracking-wide">Access Denied</h2>
          <p className="text-sm text-gray-500 mb-6">You do not have the required permissions to view this section.</p>
          <button onClick={() => navigate(`/${lang}/admin`)} className="px-6 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#990000] transition-colors">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }
"""

content = content.replace(
    "return (\n    <div className=\"min-h-screen bg-[#F3F4F6]",
    restrict + "\n  return (\n    <div className=\"min-h-screen bg-[#F3F4F6]"
)

with open("src/components/AdminLayout.tsx", "w", encoding="utf-8") as f:
    f.write(content)

