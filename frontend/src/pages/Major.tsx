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
  Mountain,
  Book,
  Calculator,
  Atom,
} from "lucide-react";
import { Button } from "../components/ui/button";

interface MajorItem {
  id: number;
  name: string;
  category: "Engineering" | "Architecture" | "Supporting";
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
  },
  {
    id: 14,
    name: "Geology",
    category: "Supporting",
    description: "Provides critical groundwork for Civil, Mining, and Petroleum engineering majors.",
    difficulty: 3.8,
    duration: "Supporting Curriculum",
    courses: [
      "Physical Geology",
      "Structural Geology",
      "Mineralogy",
      "Engineering Geology"
    ],
    jobs: [
      "Geotechnical Consultant",
      "Geological Analyst",
      "Exploration Support Specialist"
    ],
    icon: Mountain,
  },
  {
    id: 15,
    name: "Chemistry",
    category: "Supporting",
    description: "Foundation for Chemical, Metallurgical, and Textile engineering programs.",
    difficulty: 3.9,
    duration: "Supporting Curriculum",
    courses: [
      "General Chemistry",
      "Organic Chemistry",
      "Physical Chemistry",
      "Inorganic Chemistry"
    ],
    jobs: [
      "Chemical Lab Analyst",
      "Quality Assurance Specialist",
      "Process Safety Technician"
    ],
    icon: FlaskConical,
  },
  {
    id: 16,
    name: "English",
    category: "Supporting",
    description: "Technical report writing, presentation skills, and professional communication.",
    difficulty: 3.0,
    duration: "Supporting Curriculum",
    courses: [
      "Technical English",
      "Professional Communication",
      "Report Writing",
      "Presentation Skills"
    ],
    jobs: [
      "Technical Writer",
      "Communications Coordinator",
      "Professional Presenter"
    ],
    icon: Book,
  },
  {
    id: 17,
    name: "Mathematics",
    category: "Supporting",
    description: "The core computational foundation for all engineering disciplines.",
    difficulty: 4.3,
    duration: "Supporting Curriculum",
    courses: [
      "Calculus I & II",
      "Linear Algebra",
      "Differential Equations",
      "Numerical Methods"
    ],
    jobs: [
      "Data Analyst",
      "Quantitative Analyst",
      "Computational Modeler"
    ],
    icon: Calculator,
  },
  {
    id: 18,
    name: "Myanmar",
    category: "Supporting",
    description: "Professional correspondence, national cultural studies, and ethics.",
    difficulty: 2.8,
    duration: "Supporting Curriculum",
    courses: [
      "Professional Myanmar Language",
      "National Cultural Studies",
      "Professional Ethics",
      "Office Correspondence"
    ],
    jobs: [
      "Public Relations Assistant",
      "Administrative Coordinator",
      "Cultural Outreach Liaison"
    ],
    icon: Book,
  },
  {
    id: 19,
    name: "Physics",
    category: "Supporting",
    description: "Fundamental physical principles applied in Electrical, Mechanical, and Electronic tracks.",
    difficulty: 4.2,
    duration: "Supporting Curriculum",
    courses: [
      "Classical Mechanics",
      "Electromagnetism",
      "Thermodynamics & Waves",
      "Applied Physics Laboratory"
    ],
    jobs: [
      "Lab Assistant",
      "Technical Consultant",
      "Research Support Specialist"
    ],
    icon: Atom,
  }
];

const getCategoryStyles = (category: "Engineering" | "Architecture" | "Supporting") => {
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
    case "Supporting":
      return {
        bg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20 dark:border-emerald-500/30",
        text: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        iconBorder: "border-emerald-500/10"
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

export default function Major() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMajor, setSelectedMajor] = useState<MajorItem | null>(null);

  const categories = ["All", "Engineering", "Architecture", "Supporting"];

  const filteredMajors = useMemo(() => {
    return MAJORS.filter((major) => {
      const matchesSearch =
        major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        major.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || major.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
      {/* Header section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">
            Academic Majors & Departments
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Overview of academic departments and majors, compiled in alignment with the Myanmar Ministry of Science and Technology standards.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search majors or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Program General Information Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 border border-border/80 p-5 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
            <Clock className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-foreground">Estimated Program Duration</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              5 Years (Undergraduate Bachelor's Degree) for all Engineering and Architecture majors. Supporting courses provide required initial foundation.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
            <BookOpen className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-foreground">Academic System & Training</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Semester-based schedule with intensive practical workshop and field training, culminating in a comprehensive final-year capstone project.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-primary border-primary text-primary-foreground shadow-xs"
                : "border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid List */}
      {filteredMajors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMajors.map((major) => {
            const styles = getCategoryStyles(major.category);
            return (
              <div
                key={major.id}
                onClick={() => setSelectedMajor(major)}
                className="bg-card hover:bg-muted/10 border border-border/80 rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col gap-4 relative group"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border group-hover:scale-105 transition-transform ${styles.iconBg} ${styles.iconBorder}`}>
                    <major.icon className="size-5" />
                  </div>
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${styles.bg} ${styles.text}`}>
                    {major.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-foreground leading-tight">{major.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{major.description}</p>
                </div>

                {/* Stats Footer */}
                <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
                  <span className="flex items-center gap-1">
                    <span>Difficulty:</span>
                    <span className="text-foreground font-bold">{major.difficulty}/5</span>
                  </span>
                  <span>{major.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center gap-3">
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
          <div className="bg-card border border-border rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            {(() => {
              const styles = getCategoryStyles(selectedMajor.category);
              return (
                <>
                  <div className="p-6 border-b border-border/60 flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${styles.iconBg} ${styles.iconBorder}`}>
                        <selectedMajor.icon className="size-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground leading-tight">{selectedMajor.name}</h2>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border inline-block mt-1 ${styles.bg} ${styles.text}`}>
                          {selectedMajor.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMajor(null)}
                      className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
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
                    <div className="grid grid-cols-2 gap-3 bg-muted/30 p-3.5 rounded-xl border border-border/40">
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
                            <li key={idx} className="text-xs font-medium text-foreground bg-muted/40 p-2 rounded-lg border border-border/30">
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Careers / Outcomes */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Briefcase className="size-3.5 text-primary" />
                          <span>{selectedMajor.category === "Supporting" ? "Practical Application" : "Popular Careers"}</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedMajor.jobs.map((job, idx) => (
                            <li key={idx} className="text-xs font-medium text-foreground bg-muted/40 p-2 rounded-lg border border-border/30">
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
              <Button onClick={() => setSelectedMajor(null)} className="rounded-xl px-5">
                Close Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
