with open("src/components/EnterpriseSidebar.tsx", "r") as f:
    content = f.read()

find_str = "                  </div>\n                )}\n\n              </div>\n\n              {/* Sidebar Footer */}"
replace_str = """                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar Footer */}"""

if find_str in content:
    content = content.replace(find_str, replace_str)
    print("Patched before Sidebar Footer")
else:
    print("Could not find closing before Sidebar Footer")

with open("src/components/EnterpriseSidebar.tsx", "w") as f:
    f.write(content)
