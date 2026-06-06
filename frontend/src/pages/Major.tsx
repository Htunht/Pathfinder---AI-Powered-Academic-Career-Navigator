import { useState, useMemo } from "react";
import {
  Search,
  X,
  BookOpen,
  Briefcase,
  Star,
  Info,
  Clock,
  Home,
  FlaskConical,
  HardHat,
  Radio,
  Zap,
  Cpu,
  Settings,
  Bot,
  Flame,
  Pickaxe,
  Scissors,
  Compass,
} from "lucide-react";
import { Button } from "../components/ui/button";

interface MajorItem {
  id: number;
  name: string;
  category: "Engineering" | "Architecture";
  description: string;
  difficulty: number; // Out of 5
  duration: string;
  courses: string[];
  jobs: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const MAJORS: MajorItem[] = [
  {
    id: 1,
    name: "Architecture",
    category: "Architecture",
    description: "Focuses on the art and science of designing buildings and environments. Students learn spatial design, urban planning, architectural history, and sustainable building technologies.",
    difficulty: 4.8,
    duration: "5 Years",
    courses: [
      "Architectural Design",
      "History of Architecture",
      "Building Materials & Construction",
      "Environmental Science in Architecture",
      "Urban Planning"
    ],
    jobs: [
      "Architect",
      "Urban Planner",
      "Interior Designer",
      "Project Manager",
      "Landscape Architect"
    ],
    icon: Home,
  },
  {
    id: 2,
    name: "Chemical Engineering",
    category: "Engineering",
    description: "Combines physical sciences and life sciences with mathematics to transform raw materials into valuable products safely and sustainably.",
    difficulty: 4.6,
    duration: "5 Years",
    courses: [
      "Chemical Process Principles",
      "Fluid Mechanics",
      "Heat & Mass Transfer",
      "Chemical Reaction Engineering",
      "Plant Design"
    ],
    jobs: [
      "Chemical Process Engineer",
      "Petroleum Refinery Engineer",
      "Quality Control Manager",
      "Food & Beverage Process Engineer"
    ],
    icon: FlaskConical,
  },
  {
    id: 3,
    name: "Civil Engineering",
    category: "Engineering",
    description: "Deals with the design, construction, and maintenance of the physical and naturally built environment, including infrastructure like roads, bridges, and dams.",
    difficulty: 4.5,
    duration: "5 Years",
    courses: [
      "Structural Analysis",
      "Fluid Mechanics",
      "Soil Mechanics & Foundation Engineering",
      "Reinforced Concrete Design",
      "Environmental Engineering"
    ],
    jobs: [
      "Civil Engineer",
      "Structural Engineer",
      "Site Manager",
      "Geotechnical Engineer",
      "Infrastructure Consultant"
    ],
    icon: HardHat,
  },
  {
    id: 4,
    name: "Communication Engineering",
    category: "Engineering",
    description: "Focuses on telecommunication networks, data transmission, wireless systems, and the infrastructure needed to support modern communications.",
    difficulty: 4.5,
    duration: "5 Years",
    courses: [
      "Signal and Systems",
      "Digital Communications",
      "Antenna and Wave Propagation",
      "Mobile Communication Systems",
      "Fiber Optic Networks"
    ],
    jobs: [
      "Telecom Engineer",
      "Network Administrator",
      "Radio Frequency (RF) Engineer",
      "Systems Engineer"
    ],
    icon: Radio,
  },
  {
    id: 5,
    name: "Electrical Power Engineering",
    category: "Engineering",
    description: "Concentrates on the generation, transmission, distribution, and utilization of electrical energy, emphasizing power grid safety and renewable energy sources.",
    difficulty: 4.6,
    duration: "5 Years",
    courses: [
      "Electrical Machines",
      "Power System Analysis",
      "High Voltage Engineering",
      "Power Electronics",
      "Power System Protection"
    ],
    jobs: [
      "Power Grid Engineer",
      "Electrical Design Engineer",
      "Maintenance Engineer",
      "Renewable Energy Consultant"
    ],
    icon: Zap,
  },
  {
    id: 6,
    name: "Electronic Engineering",
    category: "Engineering",
    description: "Focuses on electronic circuits, semiconductor devices, embedded systems, and microprocessors used in automation and consumer electronics.",
    difficulty: 4.7,
    duration: "5 Years",
    courses: [
      "Analog & Digital Circuit Design",
      "Microprocessor & Microcontrollers",
      "Electromagnetic Fields",
      "Electronic Circuit Analysis"
    ],
    jobs: [
      "Electronics Engineer",
      "Embedded Systems Developer",
      "Hardware Design Engineer",
      "Automation Specialist"
    ],
    icon: Cpu,
  },
  {
    id: 7,
    name: "Computer Engineering & IT",
    category: "Engineering",
    description: "Bridges hardware engineering and software development to design smart computer systems, networks, and advanced software solutions.",
    difficulty: 4.8,
    duration: "5 Years",
    courses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Computer Architecture",
      "Operating Systems",
      "Software Engineering"
    ],
    jobs: [
      "Software Engineer",
      "Full-Stack Developer",
      "Network Engineer",
      "IT Consultant",
      "Database Administrator"
    ],
    icon: Cpu,
  },
  {
    id: 8,
    name: "Mechanical Engineering",
    category: "Engineering",
    description: "One of the broadest disciplines, focusing on the design, analysis, manufacturing, and maintenance of mechanical and thermal systems.",
    difficulty: 4.7,
    duration: "5 Years",
    courses: [
      "Thermodynamics",
      "Fluid Mechanics",
      "Mechanics of Machines",
      "Machine Design",
      "Heat Transfer"
    ],
    jobs: [
      "Mechanical Engineer",
      "HVAC Engineer",
      "Plant Maintenance Engineer",
      "Automotive Engineer"
    ],
    icon: Settings,
  },
  {
    id: 9,
    name: "Mechatronic Engineering",
    category: "Engineering",
    description: "An interdisciplinary field combining mechanical engineering, electronics, computer engineering, and control systems to design automated and robotic machinery.",
    difficulty: 4.8,
    duration: "5 Years",
    courses: [
      "Robotics and Automation",
      "Control Systems",
      "Sensors and Actuators",
      "PLC Programming",
      "Microcontroller Applications"
    ],
    jobs: [
      "Automation Engineer",
      "Robotics Specialist",
      "Control Systems Engineer",
      "Instrumentation Engineer"
    ],
    icon: Bot,
  },
  {
    id: 10,
    name: "Metallurgical Engineering",
    category: "Engineering",
    description: "Studies the physical and chemical behavior of metallic elements, their intermetallic compounds, and their mixtures (alloys).",
    difficulty: 4.4,
    duration: "5 Years",
    courses: [
      "Physical Metallurgy",
      "Extraction Metallurgy",
      "Material Science",
      "Foundry Engineering",
      "Corrosion Engineering"
    ],
    jobs: [
      "Metallurgical Engineer",
      "Materials Engineer",
      "Quality Assurance Engineer",
      "Welding Engineer"
    ],
    icon: Flame,
  },
  {
    id: 11,
    name: "Mining Engineering",
    category: "Engineering",
    description: "Covers the extraction of minerals from underneath, above, or within the ground, focusing on safety, economic viability, and environmental sustainability.",
    difficulty: 4.5,
    duration: "5 Years",
    courses: [
      "Surface Mining",
      "Underground Mining Technology",
      "Rock Mechanics",
      "Mineral Processing",
      "Mine Safety & Management"
    ],
    jobs: [
      "Mining Engineer",
      "Mine Manager",
      "Drilling Engineer",
      "Geotechnical Consultant"
    ],
    icon: Pickaxe,
  },
  {
    id: 12,
    name: "Petroleum Engineering",
    category: "Engineering",
    description: "Focuses on the exploration, drilling, extraction, and production of oil and natural gas resources.",
    difficulty: 4.7,
    duration: "5 Years",
    courses: [
      "Drilling Engineering",
      "Reservoir Engineering",
      "Petroleum Production Engineering",
      "Well Logging",
      "Well Testing"
    ],
    jobs: [
      "Petroleum Engineer",
      "Reservoir Engineer",
      "Drilling Supervisor",
      "Production Analyst"
    ],
    icon: Flame,
  },
  {
    id: 13,
    name: "Textile Engineering",
    category: "Engineering",
    description: "Applies engineering principles to the design, production, and control of fiber, textile, and apparel processes, products, and machinery.",
    difficulty: 4.2,
    duration: "5 Years",
    courses: [
      "Fiber Science",
      "Yarn Manufacturing",
      "Fabric Manufacturing",
      "Textile Chemistry & Wet Processing",
      "Garment Manufacturing Technology"
    ],
    jobs: [
      "Textile Engineer",
      "Production Manager",
      "Quality Control Specialist",
      "Apparel Product Developer"
    ],
    icon: Scissors,
  }
];

const getCategoryStyles = (category: "Engineering" | "Architecture") => {
  switch (category) {
    case "Engineering":
      return {
        bg: "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 dark:border-blue-500/30",
        text: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/10 text-blue-600 dark:text-blue-400",
        iconBorder: "border-blue-500/10"
      };
    case "Architecture":
      return {
        bg: "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/20 dark:border-purple-500/30",
        text: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/10 text-purple-600 dark:text-purple-400",
        iconBorder: "border-purple-500/10"
      };
    default:
      return {
        bg: "bg-muted border-border/30",
        text: "text-muted-foreground",
        iconBg: "bg-primary/5 dark:bg-primary/10 border-primary/5 text-primary",
        iconBorder: "border-primary/5"
      };
  }
};

const getCategoryColorStyles = (color: string, isActive: boolean) => {
  if (isActive) {
    switch (color) {
      case "blue":
        return "bg-blue-500/10 border-blue-500/50 dark:border-blue-400/50 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/10";
      case "purple":
        return "bg-purple-500/10 border-purple-500/50 dark:border-purple-400/50 text-purple-600 dark:text-purple-400 ring-2 ring-purple-500/10";
      case "emerald":
        return "bg-emerald-500/10 border-emerald-500/50 dark:border-emerald-400/50 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/10";
      default:
        return "bg-primary/10 border-primary text-primary ring-2 ring-primary/10";
    }
  } else {
    return "bg-card border-border/80 hover:bg-muted/30 text-muted-foreground hover:text-foreground hover:border-border-hover";
  }
};

const getDifficultyDetails = (difficulty: number) => {
  if (difficulty >= 4.5) {
    return {
      label: "Rigorous",
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 dark:border-rose-500/30",
    };
  } else if (difficulty >= 3.8) {
    return {
      label: "Moderate",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 dark:border-amber-500/30",
    };
  } else {
    return {
      label: "Standard",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/30",
    };
  }
};

export default function Major() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMajor, setSelectedMajor] = useState<MajorItem | null>(null);

  const filteredMajors = useMemo(() => {
    return MAJORS.filter((major) => {
      const matchesSearch =
        major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        major.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        major.courses.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
        major.jobs.some(j => j.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        selectedCategory === "All" || major.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 md:gap-8">
      
      {/* Header section with gradient background */}
      <div className="relative rounded-none overflow-hidden bg-card border border-border p-6 md:p-8 flex flex-col gap-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1.5 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-foreground">
            Academic Majors & Departments
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Overview of academic departments and majors. Select a category below or use search to find courses and careers.
          </p>
        </div>

        {/* Integrated Search and Info */}
        <div className="flex flex-col sm:flex-row gap-3 items-center w-full mt-1">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by major, courses, or jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-10 rounded-none border border-border bg-background text-sm placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-xs"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/50 border border-border px-3.5 h-10 rounded-none shrink-0 w-full sm:w-auto justify-center font-mono">
            <Clock className="size-4 text-primary" />
            <span>5-Year Degree Programs</span>
          </div>
        </div>
      </div>

      {/* Visual Category Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { id: "All", name: "All Majors", desc: "Browse everything", count: MAJORS.length, color: "slate", icon: Compass },
          { id: "Engineering", name: "Engineering", desc: "Design & build", count: MAJORS.filter(m => m.category === "Engineering").length, color: "blue", icon: Cpu },
          { id: "Architecture", name: "Architecture", desc: "Design spaces", count: MAJORS.filter(m => m.category === "Architecture").length, color: "purple", icon: Home },
        ].map((cat) => {
          const isActive = selectedCategory === cat.id;
          const colorStyles = getCategoryColorStyles(cat.color, isActive);
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-none border text-left flex flex-col justify-between gap-4 transition-all duration-200 cursor-pointer select-none ${colorStyles}`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`p-2 rounded-none bg-background border border-border/40 shadow-xs text-foreground ${isActive ? "text-primary border-primary/20" : ""}`}>
                  <cat.icon className="size-4.5" />
                </div>
                <span className="text-[10px] font-mono font-bold bg-background/60 border border-border/30 px-2 py-0.5 rounded-none text-foreground/80">
                  {cat.count}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-tight text-foreground">{cat.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{cat.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Grid List */}
      {filteredMajors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMajors.map((major) => {
            const styles = getCategoryStyles(major.category);
            const difficulty = getDifficultyDetails(major.difficulty);
            return (
              <div
                key={major.id}
                onClick={() => setSelectedMajor(major)}
                className="bg-card hover:bg-muted/10 border border-border/80 rounded-none p-4 cursor-pointer flex flex-row sm:flex-col items-center sm:items-start gap-4 relative group hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:border-foreground transition-all duration-200"
              >
                {/* Icon Container */}
                <div className={`w-11 h-11 rounded-none flex items-center justify-center border shrink-0 transition-all duration-300 group-hover:scale-105 ${styles.iconBg} ${styles.iconBorder}`}>
                  <major.icon className="size-5" />
                </div>

                {/* Info Area */}
                <div className="flex-1 min-w-0 space-y-1.5 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-none border ${styles.bg} ${styles.text}`}>
                      {major.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono font-semibold hidden sm:inline">
                      {major.duration}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm md:text-base text-foreground tracking-tight group-hover:text-primary transition-colors truncate">
                    {major.name}
                  </h3>

                  {/* Badges / Stats (Only visible on desktop/tablet) */}
                  <div className="hidden sm:flex items-center gap-1.5 pt-1.5 border-t border-border/40 text-[10px] text-muted-foreground font-mono font-semibold">
                    <span>{major.duration}</span>
                    <span>•</span>
                    <span className={`px-1.5 py-0.5 rounded-none border ${difficulty.color} font-bold text-[9px] uppercase tracking-wider`}>
                      {difficulty.label}
                    </span>
                  </div>

                  {/* Mobile Stats (Visual layout on mobile) */}
                  <div className="flex sm:hidden items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                    <span className="font-semibold">
                      {major.duration}
                    </span>
                    <span>•</span>
                    <span className={`px-1.5 py-0.5 rounded-none border ${difficulty.color} font-bold text-[9px] uppercase tracking-wider`}>
                      {difficulty.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center flex flex-col items-center gap-3 border border-border/60 rounded-none bg-muted/10">
          <Info className="size-10 text-muted-foreground" />
          <h3 className="font-bold text-lg text-foreground">No Departments Found</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            We couldn't find any departments or majors matching "{searchTerm}". Try refining your query.
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedMajor && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border-2 border-foreground rounded-none w-full max-w-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            {(() => {
              const styles = getCategoryStyles(selectedMajor.category);
              return (
                <>
                  <div className="p-6 border-b border-border/60 flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className={`w-12 h-12 rounded-none flex items-center justify-center shrink-0 border ${styles.iconBg} ${styles.iconBorder}`}>
                        <selectedMajor.icon className="size-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground leading-tight tracking-tight">{selectedMajor.name}</h2>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border inline-block mt-1 ${styles.bg} ${styles.text}`}>
                          {selectedMajor.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMajor(null)}
                      className="p-1.5 rounded-none border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                    >
                      <X className="size-4.5" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Overview</h4>
                      <p className="text-sm text-foreground leading-relaxed">{selectedMajor.description}</p>
                    </div>

                    {/* Stats badges */}
                    <div className="grid grid-cols-2 gap-3 bg-muted/30 p-3.5 rounded-none border border-border/45 font-mono">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Est. Duration</span>
                        <span className="text-sm font-bold text-foreground">{selectedMajor.duration}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Difficulty Level</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-foreground">{selectedMajor.difficulty}/5</span>
                          <div className="flex text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3 ${
                                  i < Math.floor(selectedMajor.difficulty)
                                    ? "fill-current"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detail lists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Courses */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="size-3.5 text-primary" />
                          <span>Core Courses</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedMajor.courses.map((course, idx) => (
                            <li key={idx} className="text-xs font-medium text-foreground bg-muted/40 p-2 rounded-none border border-border/30">
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Careers / Outcomes */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Briefcase className="size-3.5 text-primary" />
                          <span>Popular Careers</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedMajor.jobs.map((job, idx) => (
                            <li key={idx} className="text-xs font-medium text-foreground bg-muted/40 p-2 rounded-none border border-border/30">
                              {job}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Modal Footer */}
            <div className="p-4 border-t border-border/60 bg-muted/30 flex justify-end">
              <Button onClick={() => setSelectedMajor(null)} className="rounded-none px-5 cursor-pointer">
                Close Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
