import { Link } from "react-router";
import { ClipboardList, GraduationCap, Briefcase, BookOpen, ArrowRight, Sparkles, Compass } from "lucide-react";
import { Button } from "../components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const cards = [
    {
      title: "Major Test",
      path: user ? "/major-test" : "/signup",
      description: user 
        ? "Take our interactive 5-question matching quiz to find what fields fit your interests and work style."
        : "Sign up now to take our interactive 5-question matching quiz and find what fields fit your interests.",
      icon: ClipboardList,
      color: "border-primary/20 text-primary hover:border-primary",
      cta: user ? "Take Assessment" : "Sign Up to Start",
    },
    {
      title: "Majors Explorer",
      path: "/major",
      description: "Search and filter through undergraduate majors, examining required coursework and popular paths.",
      icon: GraduationCap,
      color: "border-primary/20 text-primary hover:border-primary",
      cta: "Browse Majors",
    },
    {
      title: "Career Outlooks",
      path: "/career",
      description: "Explore high-growth careers, check median salaries, 10-year job growth, and necessary degrees.",
      icon: Briefcase,
      color: "border-primary/20 text-primary hover:border-primary",
      cta: "Explore Careers",
    },
    {
      title: "Student Resources",
      path: "/resources",
      description: "Download academic trackers, resume blueprints, or consult our directories for scholarship details.",
      icon: BookOpen,
      color: "border-primary/20 text-primary hover:border-primary",
      cta: "View Resources",
    },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col gap-16 items-center justify-center animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary animate-pulse">
          <Sparkles className="size-3.5" />
          <span>New: React Compiler Enabled (Oxc + Rolldown)</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none text-foreground text-center">
          Chart Your Academic & Career Future
        </h1>
        
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
          Empowering students to identify academic strengths, compare market projections, and prepare tools to succeed in future roles.
        </p>

        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto mt-4">
          {user ? (
            <Link to="/major-test" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto py-6 rounded-none gap-2 font-semibold bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all">
                <Compass className="size-4.5" />
                <span>Start Quiz</span>
              </Button>
            </Link>
          ) : (
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto py-6 rounded-none gap-2 font-semibold bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all">
                <Compass className="size-4.5" />
                <span>Sign Up to Take Quiz</span>
              </Button>
            </Link>
          )}
          <Link to="/major" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto py-6 rounded-none border-border/80 hover:-translate-y-0.5 hover:bg-muted font-semibold transition-all">
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
            className={`p-6 rounded-none border ${c.color} bg-card hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 flex flex-col gap-4 group`}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-none bg-background border border-border/60 flex items-center justify-center shadow-xs">
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
        <div className="w-full rounded-none border border-border bg-card hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-200">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none border border-primary/20 bg-primary/10 text-xs font-mono font-bold text-primary">
              <Sparkles className="size-3" />
              <span>Personalized Experience</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Ready to save your progress?</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed">
              Create a free account to store your quiz results, save recommended majors, and track your career exploration journey.
            </p>
          </div>
          <Link to="/signup" className="w-full md:w-auto shrink-0">
            <Button size="lg" className="w-full md:w-auto py-6 px-8 rounded-none font-bold gap-2 bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-200">
              <span>Create Free Account</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
}
