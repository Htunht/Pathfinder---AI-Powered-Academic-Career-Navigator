import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { GraduationCap, Compass, Briefcase, BookOpen, ClipboardList, Menu, X, ArrowRight, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";


export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();
  const user = session?.user;


  const navItems = [
    ...(user ? [{ name: "Major Test", path: "/major-test", icon: ClipboardList }] : []),
    { name: "Major", path: "/major", icon: GraduationCap },
    { name: "Career", path: "/career", icon: Briefcase },
    { name: "Resources", path: "/resources", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      {/* Pinned Glassmorphic NavBar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary/60 text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Compass className="size-5 transition-transform duration-500 group-hover:rotate-45" />
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary to-primary/30 rounded-xl blur-xs opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Pathfinder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 select-none ${
                    isActive
                      ? "text-primary bg-primary/5 dark:bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`size-4 transition-transform duration-300 ${isActive ? "scale-105 text-primary" : "opacity-80"}`} />
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full bg-primary animate-in fade-in zoom-in duration-300" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4 relative">
                <Link to="/major-test">
                  <Button size="sm" className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 font-semibold">
                    <span>Start Quiz</span>
                    <ArrowRight className="size-3.5 group-hover/button:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-primary/20 to-primary/10 border border-primary/20 hover:border-primary/40 text-primary font-bold text-sm cursor-pointer select-none transition-all duration-300"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-background p-2 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-2 text-xs border-b border-border/50 mb-1">
                        <p className="font-bold text-foreground truncate">{user.name}</p>
                        <p className="text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={async () => {
                          await authClient.signOut();
                          setProfileDropdownOpen(false);
                          navigate("/");
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <LogOut className="size-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mr-2">
                  Log In
                </Link>
                <Link to="/signup">
                  <Button variant="outline" size="sm" className="rounded-xl border-border/80 hover:bg-muted font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="container mx-auto px-6 py-8 flex flex-col gap-4 border-b border-border bg-background">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "text-primary bg-primary/5 dark:bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                <item.icon className="size-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
            <hr className="border-border my-2" />
            <div className="flex flex-col gap-2 w-full">
              {user ? (
                <>
                  <div className="px-3 py-2 border border-border/60 rounded-xl bg-muted/30 mb-2">
                    <p className="font-bold text-foreground text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link to="/major-test" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button className="w-full justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-5 font-semibold">
                      <span>Start Quiz</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      await authClient.signOut();
                      setMobileMenuOpen(false);
                      navigate("/");
                    }}
                    className="w-full justify-center gap-2 rounded-xl py-5 font-semibold text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="size-4" />
                    <span>Log Out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="ghost" className="w-full justify-center gap-2 rounded-xl py-5 font-semibold">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full justify-center gap-2 rounded-xl py-5 font-semibold">
                      Sign Up
                    </Button>
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
      <footer className="border-t border-border bg-muted/30 py-8 mt-auto">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Compass className="size-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Pathfinder Academy. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/major-test" className="hover:text-foreground transition-colors">Major Test</Link>
            <span>&bull;</span>
            <Link to="/major" className="hover:text-foreground transition-colors">Majors Directory</Link>
            <span>&bull;</span>
            <Link to="/career" className="hover:text-foreground transition-colors">Career Finder</Link>
            <span>&bull;</span>
            <Link to="/resources" className="hover:text-foreground transition-colors">Resources</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
