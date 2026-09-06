with open("src/components/EnterpriseSidebar.tsx", "r") as f:
    content = f.read()

# Replace closing tags
def replace_close(target_next):
    global content
    find_str = "                  </div>\n                )}\n\n                {/* " + target_next
    replace_str = """                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* """ + target_next
    if find_str in content:
        content = content.replace(find_str, replace_str)
        print("Patched before " + target_next)
    else:
        print("Could not find closing before " + target_next)

replace_close("1. MARKET DATA INDICES")
replace_close("2. BELT & ROAD PROJECTS TRACKER")
replace_close("3. TRILINGUAL B2B LETTER GENERATOR")
replace_close("4. STRATEGIC INTELLIGENCE BRIEFS")

# The last one is before {/* Sidebar Footer */}
find_str = "                )}\n              </div>\n              {/* Sidebar Footer */}"
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
