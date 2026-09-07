import os
import glob
import re

for filepath in glob.glob('src/pages/Admin*.tsx') + glob.glob('src/components/Admin*.tsx'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to ensure modals have: flex items-center justify-center min-h-screen p-4 overflow-y-auto
    # And the inner modal box has max-h-[90vh] overflow-y-auto
    
    # 1. Update the fixed inset-0 overlay
    # Many overlays look like <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    # If they are just fixed inset-0, we should ensure they have proper flex layout
    content = re.sub(
        r'<div className="fixed inset-0[^"]*z-50[^"]*flex items-center justify-center[^"]*">',
        lambda m: m.group(0).replace('items-center', 'items-center').replace('justify-center', 'justify-center'),
        content
    )
    
    # Let's fix AdminUsers.tsx specifically because I know it was lacking max-h-[90vh] overflow-y-auto
    if 'AdminUsers.tsx' in filepath:
        content = content.replace(
            '<div className="bg-white rounded-md shadow-2xl max-w-lg w-full overflow-hidden border-2 border-brand-800 text-start">',
            '<div className="bg-white rounded-md shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-brand-800 text-start flex flex-col">'
        )
        content = content.replace(
            '<div className="bg-white rounded-sm shadow-2xl max-w-2xl w-full overflow-hidden text-start">',
            '<div className="bg-white rounded-sm shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-start flex flex-col">'
        )
        # Also ensure modal body flex-1 shrink
        content = content.replace(
            '<div className="p-8 space-y-6 bg-paper-50">',
            '<div className="p-8 space-y-6 bg-paper-50 flex-1 overflow-y-auto">'
        )
        content = content.replace(
            '<div className="p-6 space-y-6 flex-1 bg-paper-50">',
            '<div className="p-6 space-y-6 flex-1 overflow-y-auto bg-paper-50">'
        )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Modals aligned.")
