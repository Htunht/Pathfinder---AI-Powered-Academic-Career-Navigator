import { useState, useMemo } from "react";
import { BookOpen, Calendar, GraduationCap, FileText, Users, CheckSquare, Search, Download, ExternalLink, HelpCircle } from "lucide-react";
import { Button } from "../components/ui/button";

interface Resource {
  id: number;
  title: string;
  category: "Planning" | "Finance" | "Study Tips" | "Career Prep";
  description: string;
  type: "Template" | "PDF Guide" | "Web Portal" | "Checklist";
  sizeOrLink: string;
  icon: React.ComponentType<{ className?: string }>;
}

const RESOURCES: Resource[] = [
  {
    id: 1,
    title: "Semester Academic Planner",
    category: "Planning",
    description: "A comprehensive Google Sheets / Excel template to lay out course pathways, credit counts, and major prerequisites.",
    type: "Template",
    sizeOrLink: "1.2 MB .xlsx",
    icon: Calendar,
  },
  {
    id: 2,
    title: "Undergraduate Scholarship Index",
    category: "Finance",
    description: "A curated list of merit and demographic-specific scholarship search engines, application requirements, and deadlines.",
    type: "Web Portal",
    sizeOrLink: "External Database",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Active Learning & Study Guide",
    category: "Study Tips",
    description: "A research-backed PDF booklet covering the Pomodoro method, Feynman technique, and active spaced-repetition schedules.",
    type: "PDF Guide",
    sizeOrLink: "4.8 MB .pdf",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Resume & Portfolio Blueprint",
    category: "Career Prep",
    description: "Industry-standard resume templates, action-verb databases, and digital portfolio guidelines optimized for internships.",
    type: "PDF Guide",
    sizeOrLink: "2.1 MB .pdf",
    icon: FileText,
  },
  {
    id: 5,
    title: "Alumni Mentorship Matchmaker",
    category: "Career Prep",
    description: "Connect with graduates working in engineering, finance, health, and design fields for structured coffee chats.",
    type: "Web Portal",
    sizeOrLink: "Portal Access",
    icon: Users,
  },
  {
    id: 6,
    title: "Federal Student Aid (FAFSA) Prep",
    category: "Finance",
    description: "A concise checklist of required tax documents, personal identification, and application codes to register for aid.",
    type: "Checklist",
    sizeOrLink: "Printable Checklist",
    icon: CheckSquare,
  },
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Planning", "Finance", "Study Tips", "Career Prep"];

  const filteredResources = useMemo(() => {
    return RESOURCES.filter((res) => {
      const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            res.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
      {/* Header section */}
      <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Student Resources
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Download planners, access scholarship registries, and optimize study patterns with professional toolkits.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-border/60 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-card hover:bg-muted/10 border border-border/80 rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col gap-4 group"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/5 text-primary flex items-center justify-center shrink-0">
                  <res.icon className="size-5" />
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/30">
                    {res.category}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/10">
                    {res.type}
                  </span>
                </div>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-foreground leading-tight">{res.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{res.description}</p>
              </div>

              {/* Footer action */}
              <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-muted-foreground">
                  {res.sizeOrLink}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg gap-1 border-border/60 hover:bg-muted text-foreground transition-all cursor-pointer"
                  onClick={() => alert(`Starting simulated download/navigation for "${res.title}"`)}
                >
                  {res.type === "Web Portal" ? (
                    <>
                      <span className="text-[11px]">Open Portal</span>
                      <ExternalLink className="size-3" />
                    </>
                  ) : (
                    <>
                      <span className="text-[11px]">Download</span>
                      <Download className="size-3" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center gap-3">
          <HelpCircle className="size-10 text-muted-foreground" />
          <h3 className="font-bold text-lg text-foreground">No Resources Found</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            We couldn't find any resources matching your search. Try adjusting the query.
          </p>
        </div>
      )}
    </div>
  );
}
