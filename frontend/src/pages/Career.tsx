import { useState, useMemo } from "react";
import { TrendingUp, DollarSign, Search, Award, Target, BookOpen, ChevronRight, BarChart3 } from "lucide-react";

interface CareerItem {
  id: number;
  title: string;
  category: "Infrastructure" | "Tech & Electronics" | "Process & Energy" | "Materials & Science";
  salary: number; // in USD
  growth: number; // in %
  recommendedMajor: string;
  responsibilities: string[];
  skills: string[];
  description: string;
}

const CAREERS: CareerItem[] = [
  {
    id: 1,
    title: "Software Architect",
    category: "Tech & Electronics",
    salary: 115000,
    growth: 22,
    recommendedMajor: "Computer Engineering & IT",
    responsibilities: [
      "Design scalable, secure, and distributed cloud applications",
      "Draft interface specifications for hardware-software integration",
      "Collaborate with development teams to review database and system models"
    ],
    skills: ["System Architecture", "React & Node.js", "Cloud Computing (AWS/GCP)", "Data Structures"],
    description: "Designs and maintains large-scale software applications and digital infrastructures, bridging high-level architectures with developer workflows.",
  },
  {
    id: 2,
    title: "Project Architect",
    category: "Infrastructure",
    salary: 92000,
    growth: 12,
    recommendedMajor: "Architecture",
    responsibilities: [
      "Draft comprehensive layout plans, building elevations, and construction details",
      "Consult on sustainable building codes and environmental design considerations",
      "Coordinate blueprints directly with civil engineers and project site managers"
    ],
    skills: ["Sustainable Design", "Revit & AutoCAD", "Spatial Layouts", "Zoning Codes"],
    description: "Oversees physical structural plans from design conception through building completion, emphasizing sustainability, structural safety, and visual aesthetics.",
  },
  {
    id: 3,
    title: "Structural Engineer",
    category: "Infrastructure",
    salary: 89000,
    growth: 10,
    recommendedMajor: "Civil Engineering",
    responsibilities: [
      "Calculate load-bearing weights and structural capacities for concrete and steel",
      "Supervise foundation construction, soil testing, and concrete pour compliance",
      "Review structural health profiles of bridges, high-rises, and dam facilities"
    ],
    skills: ["SAP2000 / ETABS", "Concrete Design", "Soil Mechanics", "Project Management"],
    description: "Evaluates and coordinates structural stability metrics to ensure roads, bridges, tunnels, and buildings can withstand environmental forces.",
  },
  {
    id: 4,
    title: "Robotics & Automation Engineer",
    category: "Tech & Electronics",
    salary: 98000,
    growth: 18,
    recommendedMajor: "Mechatronic Engineering",
    responsibilities: [
      "Program PLC devices and microcontrollers for assembly line automation",
      "Integrate mechanical actuators with sensors and central feedback loops",
      "Optimize robotic movements, speed, and safety zones in factories"
    ],
    skills: ["PLC Programming", "Control Systems", "Sensor Actuation", "ROS / MATLAB"],
    description: "Integrates electronics, computing modules, and mechanical gears to build automated machinery and robotics for modern industrial pipelines.",
  },
  {
    id: 5,
    title: "Power Systems Planner",
    category: "Process & Energy",
    salary: 94000,
    growth: 8,
    recommendedMajor: "Electrical Power Engineering",
    responsibilities: [
      "Analyze grid load distributions and substation transmission safety",
      "Plan layout mappings for high-voltage towers and distribution lines",
      "Coordinate integration of solar and renewable grid connections"
    ],
    skills: ["Power Grid Design", "High-Voltage Safety", "Power Electronics", "ETAP Systems"],
    description: "Maintains municipal power distribution grids, analyzing high-voltage safety controls and integrating renewable energies.",
  },
  {
    id: 6,
    title: "Chemical Process Engineer",
    category: "Process & Energy",
    salary: 96000,
    growth: 9,
    recommendedMajor: "Chemical Engineering",
    responsibilities: [
      "Scale up chemical formulas from laboratory tubes to industrial reactors",
      "Monitor mass transfer, heat exchange, and fluid flow dynamics",
      "Ensure environmental waste compliance and safety shutoff processes"
    ],
    skills: ["Process Dynamics", "Heat & Mass Transfer", "Kinetics Simulation", "Safety Compliance"],
    description: "Optimizes raw materials processing, designing chemical production systems that manufacture consumer products and energy resources safely.",
  },
  {
    id: 7,
    title: "Telecom Network Engineer",
    category: "Tech & Electronics",
    salary: 91000,
    growth: 11,
    recommendedMajor: "Communication Engineering",
    responsibilities: [
      "Configure wireless network base stations, antennas, and fiber lines",
      "Test digital signal processing pipelines and routing throughputs",
      "Maintain data transmission security across cell towers and server rooms"
    ],
    skills: ["RF Engineering", "Fiber Optics", "Signal Processing", "Network Security"],
    description: "Develops and maintains wireless networks and fiber optic links to guarantee fast and stable communications data pipelines.",
  },
  {
    id: 8,
    title: "Subsea Drilling Specialist",
    category: "Process & Energy",
    salary: 112000,
    growth: 7,
    recommendedMajor: "Petroleum Engineering",
    responsibilities: [
      "Create 3D fluid simulations of petroleum and gas reservoirs",
      "Supervise drill path safety and pressure balances on offshore platforms",
      "Analyze well logs and diagnostic flow measurements"
    ],
    skills: ["Reservoir Modeling", "Drilling Dynamics", "Well Logging", "Fluid Hydraulics"],
    description: "Manages oil and gas exploration and drilling procedures, designing safe extraction techniques from subterranean reservoirs.",
  },
  {
    id: 9,
    title: "Materials Selection Consultant",
    category: "Materials & Science",
    salary: 86000,
    growth: 8,
    recommendedMajor: "Metallurgical Engineering",
    responsibilities: [
      "Analyze alloy crystal structures to find corrosion weaknesses",
      "Define metallurgical specifications for high-stress industrial parts",
      "Consult on casting and foundry heat treatment schedules"
    ],
    skills: ["Physical Metallurgy", "Corrosion Prevention", "Alloy Analysis", "Foundry Casting"],
    description: "Tests and customizes metal alloys and composites to prevent structural failure in industrial machinery.",
  },
  {
    id: 10,
    title: "Geotechnical Analyst",
    category: "Materials & Science",
    salary: 82000,
    growth: 9,
    recommendedMajor: "Geology",
    responsibilities: [
      "Examine rock layers and soil samples to estimate bearing capacities",
      "Analyze landslide paths and earthquake fault line zones",
      "Write geotechnical reports to guide civil foundation design parameters"
    ],
    skills: ["Rock Mechanics", "GIS Mapping", "Stratigraphy", "Borehole Sampling"],
    description: "Conducts soil and rock geological surveys, identifying underground safety metrics for major civil construction works.",
  }
];

const getCareerCategoryStyles = (category: "Infrastructure" | "Tech & Electronics" | "Process & Energy" | "Materials & Science") => {
  switch (category) {
    case "Infrastructure":
      return {
        bg: "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/20 dark:border-purple-500/30",
        text: "text-purple-600 dark:text-purple-400"
      };
    case "Tech & Electronics":
      return {
        bg: "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 dark:border-blue-500/30",
        text: "text-blue-600 dark:text-blue-400"
      };
    case "Process & Energy":
      return {
        bg: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 dark:border-amber-500/30",
        text: "text-amber-600 dark:text-amber-400"
      };
    case "Materials & Science":
      return {
        bg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20 dark:border-emerald-500/30",
        text: "text-emerald-600 dark:text-emerald-400"
      };
    default:
      return {
        bg: "bg-muted border-border/30",
        text: "text-muted-foreground"
      };
  }
};

export default function Career() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCareer, setActiveCareer] = useState<CareerItem>(CAREERS[0]);

  const categories = ["All", "Infrastructure", "Tech & Electronics", "Process & Energy", "Materials & Science"];

  const filteredCareers = useMemo(() => {
    return CAREERS.filter((career) => {
      const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            career.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || career.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
      {/* Header section */}
      <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">
            Career Pathfinder
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze job salaries, projected outlook growth, and recommended academic majors for modern professions.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search careers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Main Content Layout (Stats and List) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Lists and Charts */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-border/60 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Careers Grid/List */}
          {filteredCareers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCareers.map((c) => {
                const styles = getCareerCategoryStyles(c.category);
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveCareer(c)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col gap-3 group relative ${
                      activeCareer.id === c.id
                        ? "border-primary bg-primary/[0.03] dark:bg-primary/[0.05]"
                        : "border-border hover:border-border-hover hover:bg-muted/10"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm text-foreground">{c.title}</h3>
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${styles.bg} ${styles.text}`}>
                        {c.category}
                      </span>
                    </div>
                    
                    {/* Stats row */}
                    <div className="grid grid-cols-2 gap-2 mt-auto pt-2 border-t border-border/30 text-[11px] font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="size-3 text-emerald-600 dark:text-emerald-400" />
                        <span>${c.salary.toLocaleString()}/yr</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="size-3 text-primary" />
                        <span className="text-foreground">+{c.growth}% Growth</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No careers match your search criteria.
            </div>
          )}

          {/* Interactive CSS Bar Chart */}
          <div className="border border-border/80 bg-muted/20 rounded-xl p-5 mt-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-4.5 text-primary" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Annual Salary Comparison</h3>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">*Median values</span>
            </div>

            <div className="space-y-3.5">
              {CAREERS.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveCareer(c)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <span className="w-28 text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {c.title}
                  </span>
                  
                  {/* Bar */}
                  <div className="flex-1 h-3.5 bg-muted rounded-full overflow-hidden relative border border-border/20">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500 ${
                        activeCareer.id === c.id ? "opacity-100 ring-2 ring-primary/20" : "opacity-50 group-hover:opacity-75"
                      }`}
                      style={{ width: `${(c.salary / 135000) * 100}%` }}
                    />
                  </div>

                  <span className="w-14 text-right text-xs font-bold text-foreground">
                    ${Math.round(c.salary / 1000)}k
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Career Detail Specifications */}
        {activeCareer && (
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-6 shadow-sm relative sticky top-24 self-start animate-in fade-in duration-300">
            {(() => {
              const styles = getCareerCategoryStyles(activeCareer.category);
              return (
                <>
                  <div className="space-y-1">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block ${styles.bg} ${styles.text}`}>
                      {activeCareer.category} Profile
                    </span>
                    <h2 className="text-xl font-bold text-foreground mt-2">{activeCareer.title}</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">{activeCareer.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-y border-border/60 py-4 text-center">
                    <div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Median Salary</span>
                      <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
                        ${activeCareer.salary.toLocaleString()}/yr
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Job Outlook</span>
                      <span className="text-base font-extrabold text-foreground mt-1 block">
                        +{activeCareer.growth}% (10-yr)
                      </span>
                    </div>
                  </div>

                  {/* Details list */}
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-muted-foreground flex items-center gap-1.5">
                        <BookOpen className="size-3.5 text-primary" />
                        <span>Recommended Major</span>
                      </h4>
                      <p className="font-semibold text-foreground bg-muted/50 p-2.5 rounded-lg border border-border/30">
                        {activeCareer.recommendedMajor}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-bold text-muted-foreground flex items-center gap-1.5">
                        <Target className="size-3.5 text-primary" />
                        <span>Core Skillset</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCareer.skills.map((skill, idx) => (
                          <span key={idx} className="bg-muted px-2 py-1 rounded-md border border-border/50 text-[10px] font-semibold text-foreground">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-bold text-muted-foreground flex items-center gap-1.5">
                        <Award className="size-3.5 text-primary" />
                        <span>Primary Responsibilities</span>
                      </h4>
                      <ul className="space-y-1.5 text-muted-foreground leading-relaxed">
                        {activeCareer.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <ChevronRight className="size-3 text-primary shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
}
