with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

if "import { SubscriptionCard } from '../components/SubscriptionCard';" not in content:
    content = "import { SubscriptionCard } from '../components/SubscriptionCard';\n" + content

old_c_to_a = """        {/* ENTERPRISE CALL TO ACTION */}
        <div className="p-8 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#2a2a2a] text-white text-center relative overflow-hidden group border border-[#111111]/20 shadow-xl rounded-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-[#990000]/90 to-[#770000]/90 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-[#990000] rounded-full group-hover:bg-white transition-colors duration-500"></span>
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 group-hover:text-white transition-colors duration-500">
                ChinQ Enterprise
              </div>
              <span className="w-1.5 h-1.5 bg-[#990000] rounded-full group-hover:bg-white transition-colors duration-500"></span>
            </div>
            
            <div className="text-xl font-serif font-bold italic mb-6 leading-tight group-hover:text-white text-gray-100 transition-colors duration-500 max-w-[200px]">
              Secure Administration & Broadcasting
            </div>
            
            <Link 
              to={`/${lang}/admin`} 
              className="relative overflow-hidden block w-full bg-white text-[#111111] text-xs font-black uppercase tracking-widest py-3.5 px-6 hover:bg-[#111111] hover:text-white transition-all duration-300 shadow-md group-hover:shadow-2xl cursor-pointer text-center border border-transparent hover:border-white/20 rounded-sm"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Launch Portal
                <span className="text-[10px] opacity-70">→</span>
              </span>
            </Link>
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#990000]/10 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-700"></div>
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-[#990000]/20 transition-colors duration-700"></div>
        </div>"""

new_c_to_a = """        {/* ENTERPRISE CALL TO ACTION */}
        <SubscriptionCard />"""

content = content.replace(old_c_to_a, new_c_to_a)

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(content)
