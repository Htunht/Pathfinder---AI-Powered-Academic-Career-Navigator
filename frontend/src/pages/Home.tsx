import { Link } from "react-router";
import { ClipboardList, GraduationCap, Briefcase, BookOpen, ArrowRight, Sparkles, Compass } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";

export default function Home() {
  const [user] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const cards = [
    {
      title: "Major Test",
      path: user ? "/major-test" : "/signup",
      description: user 
        ? "Take our interactive 5-question matching quiz to find what fields fit your interests and work style."
        : "Sign up now to take our interactive 5-question matching quiz and find what fields fit your interests.",
      icon: ClipboardList,
      color: "from-blue-600/10 to-cyan-500/10 border-blue-500/10 hover:border-blue-500/30 text-blue-600 dark:text-blue-400",
      cta: user ? "Take Assessment" : "Sign Up to Start",
    },
    {
      title: "Majors Explorer",
      path: "/major",
      description: "Search and filter through undergraduate majors, examining required coursework and popular paths.",
      icon: GraduationCap,
      color: "from-emerald-600/10 to-teal-500/10 border-emerald-500/10 hover:border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
      cta: "Browse Majors",
    },
    {
      title: "Career Outlooks",
      path: "/career",
      description: "Explore high-growth careers, check median salaries, 10-year job growth, and necessary degrees.",
      icon: Briefcase,
      color: "from-purple-600/10 to-pink-500/10 border-purple-500/10 hover:border-purple-500/30 text-purple-600 dark:text-purple-400",
      cta: "Explore Careers",
    },
    {
      title: "Student Resources",
      path: "/resources",
      description: "Download academic trackers, resume blueprints, or consult our directories for scholarship details.",
      icon: BookOpen,
      color: "from-amber-600/10 to-orange-500/10 border-amber-500/10 hover:border-amber-500/30 text-amber-600 dark:text-amber-400",
      cta: "View Resources",
    },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col gap-16 items-center justify-center animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-semibold text-primary animate-pulse">
          <Sparkles className="size-3.5" />
          <span>New: React Compiler Enabled (Oxc + Rolldown)</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent text-center">
          Chart Your Academic & Career Future
        </h1>
        
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
          Empowering students to identify academic strengths, compare market projections, and prepare tools to succeed in future roles.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4">
          {user ? (
            <Link to="/major-test" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto py-6 rounded-xl gap-2 font-semibold shadow-md bg-primary text-primary-foreground hover:bg-primary/90">
                <Compass className="size-4.5" />
                <span>Start Quiz</span>
              </Button>
            </Link>
          ) : (
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto py-6 rounded-xl gap-2 font-semibold shadow-md bg-primary text-primary-foreground hover:bg-primary/90">
                <Compass className="size-4.5" />
                <span>Sign Up to Take Quiz</span>
              </Button>
            </Link>
          )}
          <Link to="/major" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto py-6 rounded-xl border-border/80 hover:bg-muted font-semibold">
              Explore Majors Directory
            </Button>
          </Link>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {cards.map((c, i) => (
          <Link
            key={i}
            to={c.path}
            className={`p-6 rounded-2xl border bg-gradient-to-tr ${c.color} shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4 group`}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-background/80 dark:bg-background/40 flex items-center justify-center border border-border/30 shadow-xs">
                <c.icon className="size-6 shrink-0" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="size-5" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                {c.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {c.description}
              </p>
            </div>

            <div className="mt-auto pt-2 text-xs font-bold flex items-center gap-1">
              <span>{c.cta}</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Sign Up CTA Section */}
      {!user && (
        <div className="w-full rounded-2xl border border-border/80 bg-gradient-to-tr from-primary/5 via-muted/30 to-primary/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs hover:shadow-md transition-all duration-300">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-xs font-semibold text-primary">
              <Sparkles className="size-3" />
              <span>Personalized Experience</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Ready to save your progress?</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed">
              Create a free account to store your quiz results, save recommended majors, and track your career exploration journey.
            </p>
          </div>
          <Link to="/signup" className="w-full md:w-auto shrink-0">
            <Button size="lg" className="w-full md:w-auto py-6 px-8 rounded-xl font-bold gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
              <span>Create Free Account</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
}
