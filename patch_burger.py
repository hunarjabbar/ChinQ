with open("src/components/EnterpriseSidebar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_trigger = """      {/* ENTERPRISE SIDEBAR TRIGGER FLOATING BADGE */}
      <motion.div 
        onClick={toggleSidebar}
        animate={{ 
          x: isOpen ? (isRtl ? sidebarWidth : -sidebarWidth) : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={cn(
          "fixed top-[180px] z-50 bg-[#990000] hover:bg-[#770000] text-white py-4 px-2.5 rounded-l-md shadow-2xl flex flex-col items-center gap-2 cursor-pointer border border-white/10 group select-none hover:scale-105 active:scale-95",
          isRtl ? "left-0 rounded-l-none rounded-r-md" : "right-0 rounded-r-none rounded-l-md"
        )}
      >
        {isOpen ? (
          <X className="w-4 h-4 text-yellow-400 animate-pulse" />
        ) : (
          <Briefcase className="w-4 h-4 animate-pulse text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
        )}
        <span className={cn(
          "text-[9px] font-black uppercase tracking-[0.25em] writing-mode-vertical whitespace-nowrap",
          isRtl ? "rotate-180" : ""
        )}>
          {isOpen ? (
            lang === 'ar' ? 'إغلاق' : lang === 'zh' ? '关闭' : lang === 'ckb' ? 'داخستن' : 'CLOSE'
          ) : (
            lang === 'ar' ? 'بوابة الأعمال' : lang === 'zh' ? '企业门户' : lang === 'ckb' ? 'ئینتەرپرایز' : 'ENTERPRISE'
          )}
        </span>
      </motion.div>"""

new_trigger = """      {/* ENTERPRISE SIDEBAR TRIGGER TOP CORNER HAMBURGER */}
      <motion.div 
        onClick={toggleSidebar}
        animate={{ 
          x: isOpen ? (isRtl ? sidebarWidth : -sidebarWidth) : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
        className={cn(
          "fixed top-4 z-50 bg-[#990000] hover:bg-[#770000] text-white p-3 rounded-md shadow-lg flex items-center justify-center cursor-pointer border border-[#990000]/20 group select-none hover:scale-105 active:scale-95",
          isRtl ? "left-4" : "right-4"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <Menu className="w-6 h-6 text-white transition-transform duration-300" />
        )}
      </motion.div>"""

content = content.replace(old_trigger, new_trigger)

with open("src/components/EnterpriseSidebar.tsx", "w", encoding="utf-8") as f:
    f.write(content)

