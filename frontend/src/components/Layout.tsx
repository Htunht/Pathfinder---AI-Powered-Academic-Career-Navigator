import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { GraduationCap, Briefcase, ClipboardList, Menu, X, ArrowRight, LogOut, History, Users, Compass } from "lucide-react";
import { authClient } from "@/lib/auth-client";


export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (historyDrawerOpen) {
      try {
        const existingHistoryRaw = localStorage.getItem("pathfinder_history");
        const list = existingHistoryRaw ? JSON.parse(existingHistoryRaw) : [];
        setHistoryList(list);
      } catch (e) {
        console.error("Failed to load history list:", e);
      }
    }
  }, [historyDrawerOpen]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    localStorage.setItem("theme", "light");
  }, []);


  const navItems = [
    ...(user ? [{ name: "မေဂျာ ဉာဏ်စမ်း", path: "/major-test", icon: ClipboardList }] : []),
    { name: "မေဂျာများ", path: "/major", icon: GraduationCap },
    { name: "အလုပ်အကိုင်", path: "/career", icon: Briefcase },
    { name: "Mentorship Hub", path: "/mentorship", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* Pinned Gamified NavBar */}
      <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-slate-100 shadow-[0_4px_0_#f1f5f9]">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-green-500 text-white shadow-[0_3px_0_#15803d] transition-all duration-300 group-hover:scale-105 group-hover:rotate-12">
              <Compass className="size-5" strokeWidth={2.5} />
            </div>
            <span className="font-black text-xl tracking-tight text-slate-800">
              DU WAN KYAL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-xl transition-all duration-150 select-none border-2 border-transparent ${
                    isActive
                      ? "text-green-600 bg-green-50 border-green-500/20"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                     <item.icon className={`size-4 transition-transform duration-300 ${isActive ? "scale-105 text-green-600" : "opacity-85"}`} />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4 relative">
                <button
                  onClick={() => setHistoryDrawerOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-2 border-transparent transition-all cursor-pointer"
                >
                  <History className="size-4" />
                  <span>မှတ်တမ်း</span>
                </button>
                <Link to="/major-test">
                  <button className="gap-2 bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600 shadow-[0_3px_0_#15803d] rounded-xl px-4 py-2 hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-none transition-all duration-150 text-sm flex items-center cursor-pointer">
                    <span>ဉာဏ်စမ်းစတင်ရန်</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 border-2 border-green-500 text-green-700 font-bold text-sm cursor-pointer select-none transition-all duration-300"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl border-2 border-slate-200 bg-white p-2 shadow-[0_6px_0_#cbd5e1] animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-2 text-xs border-b border-slate-100 mb-1">
                        <p className="font-bold text-slate-800 truncate">{user.name}</p>
                        <p className="text-slate-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={async () => {
                          await authClient.signOut();
                          setProfileDropdownOpen(false);
                          navigate("/");
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer font-bold"
                      >
                        <LogOut className="size-4" />
                        <span>အကောင့်မှထွက်ရန်</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mr-2">
                  ဝင်ရန်
                </Link>
                <Link to="/signup">
                  <button className="rounded-xl border-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-bold text-sm px-4 py-2 shadow-[0_3px_0_#cbd5e1] hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-none transition-all cursor-pointer">
                    အကောင့်ဖွင့်ရန်
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-850 hover:bg-slate-50 border-2 border-transparent transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="container mx-auto px-6 py-8 flex flex-col gap-4 border-b-2 border-slate-150 bg-white">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-2xl text-base font-bold transition-all border-2 border-transparent ${
                    isActive
                      ? "text-green-600 bg-green-50 border-green-500/20"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`
                }
              >
                <item.icon className="size-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
            <hr className="border-slate-100 my-2" />
            <div className="flex flex-col gap-2 w-full">
              {user ? (
                <>
                  <div className="px-3 py-2 border-2 border-slate-100 rounded-2xl bg-slate-50/50 mb-2">
                    <p className="font-bold text-slate-800 text-sm truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setHistoryDrawerOpen(true);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl text-base font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-2 border-transparent transition-all mb-2 cursor-pointer"
                  >
                    <History className="size-5" />
                    <span>မှတ်တမ်း</span>
                  </button>
                  <Link to="/major-test" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <button className="w-full justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600 shadow-[0_3px_0_#15803d] rounded-xl py-3 flex items-center cursor-pointer">
                      <span>ဉာဏ်စမ်းစတင်ရန်</span>
                      <ArrowRight className="size-4" />
                    </button>
                  </Link>
                  <button
                    onClick={async () => {
                      await authClient.signOut();
                      setMobileMenuOpen(false);
                      navigate("/");
                    }}
                    className="w-full justify-center gap-2 rounded-xl py-3 font-bold text-red-500 hover:bg-red-50 border-2 border-transparent transition-all mt-1 flex items-center cursor-pointer"
                  >
                    <LogOut className="size-4" />
                    <span>အကောင့်မှထွက်ရန်</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <button className="w-full justify-center gap-2 rounded-xl py-3 font-bold border-2 border-transparent text-slate-600 hover:bg-slate-50 flex items-center cursor-pointer">
                      ဝင်ရန်
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <button className="w-full justify-center gap-2 rounded-xl py-3 font-bold border-2 border-slate-200 bg-white text-slate-600 shadow-[0_3px_0_#cbd5e1] flex items-center cursor-pointer">
                      အကောင့်ဖွင့်ရန်
                    </button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-100 bg-slate-50/50 py-8 mt-auto text-slate-500">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Compass className="size-4 text-green-500" strokeWidth={2.5} />
            <p className="text-xs font-bold text-slate-400">
              &copy; {new Date().getFullYear()} DU WAN KYAL. မူပိုင်ခွင့်အားလုံး ရရှိပြီးဖြစ်သည်။
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            <Link to="/major-test" className="hover:text-green-600 transition-colors">မေဂျာ ဉာဏ်စမ်း</Link>
            <span>&bull;</span>
            <Link to="/major" className="hover:text-green-600 transition-colors">မေဂျာများ လမ်းညွှန်</Link>
            <span>&bull;</span>
            <Link to="/career" className="hover:text-green-600 transition-colors">အလုပ်အကိုင် ရှာဖွေသူ</Link>
            <span>&bull;</span>
            <Link to="/mentorship" className="hover:text-green-600 transition-colors">Mentorship Hub</Link>
          </div>
        </div>
      </footer>

      {/* History Drawer */}
      {historyDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setHistoryDrawerOpen(false)}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
          ></div>

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-white border-l-2 border-slate-200 shadow-[0_0_20px_rgba(0,0,0,0.05)] flex flex-col h-full animate-in slide-in-from-right duration-300 z-10">
            {/* Header */}
            <div className="p-6 border-b-2 border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧭</span>
                <span className="font-black text-lg text-slate-800">ဉာဏ်စမ်းမှတ်တမ်းများ</span>
              </div>
              <button
                onClick={() => setHistoryDrawerOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 border-2 border-transparent transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {historyList.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="text-4xl">📭</div>
                  <p className="text-sm font-bold text-slate-400">
                    မှတ်တမ်း မရှိသေးပါ။
                  </p>
                </div>
              ) : (
                historyList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setHistoryDrawerOpen(false);
                      navigate(`/major-test?history_id=${item.id}`);
                    }}
                    className="p-5 border-2 border-slate-200 rounded-2xl bg-white hover:border-green-500 shadow-[0_4px_0_#cbd5e1] hover:shadow-[0_4px_0_#22c55e] active:translate-y-[2px] active:shadow-[0_2px_0_#22c55e] transition-all cursor-pointer space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 font-mono">
                        {item.date}
                      </span>
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700">
                        {item.totalScore} မှတ်
                      </span>
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-slate-800">
                        ဝါသနာနယ်ပယ် - {
                          item.quizScores.TECH > item.quizScores.INFRASTRUCTURE && item.quizScores.TECH > item.quizScores.ENERGY 
                            ? "နည်းပညာ" 
                            : item.quizScores.INFRASTRUCTURE > item.quizScores.ENERGY 
                              ? "အခြေခံအဆောက်အအုံ" 
                              : "စွမ်းအားစနစ်"
                        }
                      </h4>
                      <p className="text-xs font-bold text-slate-400 line-clamp-2 mt-1">
                        {item.results.aiInsight || "အကြံပြုချက် မရှိပါ"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
