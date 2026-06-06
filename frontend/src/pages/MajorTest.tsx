import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ClipboardList, Sparkles, Brain, Award, ArrowRight, RotateCcw, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { authClient } from "@/lib/auth-client";

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    text: string;
    category: "STEM" | "BUSINESS" | "ARTS" | "HUMANITIES";
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What describes your dream working environment?",
    options: [
      { label: "A", text: "A research lab or workstation solving complex technical puzzles.", category: "STEM" },
      { label: "B", text: "A bustling office pitching strategies and leading teams.", category: "BUSINESS" },
      { label: "C", text: "A creative studio designing visuals, models, or layouts.", category: "ARTS" },
      { label: "D", text: "A classroom, clinic, or community space helping people directly.", category: "HUMANITIES" },
    ],
  },
  {
    id: 2,
    text: "Which of these skills would you most like to master?",
    options: [
      { label: "A", text: "Writing code, analyzing data, or building machinery.", category: "STEM" },
      { label: "B", text: "Negotiating, budgeting, and scaling new ventures.", category: "BUSINESS" },
      { label: "C", text: "Illustrating concepts, producing media, or typography.", category: "ARTS" },
      { label: "D", text: "Counseling, teaching, or policy analysis.", category: "HUMANITIES" },
    ],
  },
  {
    id: 3,
    text: "In school or team projects, what role do you naturally assume?",
    options: [
      { label: "A", text: "The analyst - coding, testing, or calculating the formulas.", category: "STEM" },
      { label: "B", text: "The manager - organizing the plan, timeline, and pitch.", category: "BUSINESS" },
      { label: "C", text: "The designer - crafting the slide layout, style, and graphics.", category: "ARTS" },
      { label: "D", text: "The writer/mediator - editing, presenting human stories, or resolving conflict.", category: "HUMANITIES" },
    ],
  },
  {
    id: 4,
    text: "Which global issue interests you the most?",
    options: [
      { label: "A", text: "Harnessing clean energy, advancing medical tech, or AI safety.", category: "STEM" },
      { label: "B", text: "Optimizing global supply chains or fostering entrepreneurship.", category: "BUSINESS" },
      { label: "C", text: "Aesthetic renewal, digital media access, or creative storytelling.", category: "ARTS" },
      { label: "D", text: "Reducing inequality, improving mental health care, or reform education.", category: "HUMANITIES" },
    ],
  },
  {
    id: 5,
    text: "When you encounter a broken device or system, what is your reaction?",
    options: [
      { label: "A", text: "Disassemble it to diagnose the engineering flaw.", category: "STEM" },
      { label: "B", text: "Assess if it's cheaper to replace or hire an expert.", category: "BUSINESS" },
      { label: "C", text: "Redesign the case or interface to look and feel better.", category: "ARTS" },
      { label: "D", text: "Think about how the outage affects the people depending on it.", category: "HUMANITIES" },
    ],
  },
];

const MATCH_INFO = {
  STEM: {
    title: "Science, Technology, Engineering & Math",
    description: "You have a powerful analytical mind. You enjoy logical reasoning, data analysis, and building or configuring complex systems. You seek answers to 'how' things work and strive to develop innovative technical solutions.",
    majors: ["Computer Science", "Mechanical Engineering", "Biomedical Science", "Data Science"],
    careers: ["Software Engineer", "Data Scientist", "Research Scientist", "Biotech Analyst"],
    color: "bg-blue-600 dark:bg-blue-500",
  },
  BUSINESS: {
    title: "Business, Administration & Finance",
    description: "You are a natural coordinator and strategist. You love leading teams, analyzing risks, making financial decisions, and scaling projects. You think about market opportunities and organizational growth.",
    majors: ["Finance & Investment", "Business Administration", "Marketing Strategy", "Management Information Systems"],
    careers: ["Investment Banker", "Product Manager", "Management Consultant", "Startup Founder"],
    color: "bg-emerald-600 dark:bg-emerald-500",
  },
  ARTS: {
    title: "Arts, Design & Media",
    description: "You have a vibrant creative spirit. You perceive the world through aesthetics, storytelling, and user experience. You love visual representation, crafting design assets, and bringing ideas to life through artistic mediums.",
    majors: ["Graphic Design", "Digital Media & Film", "Architecture", "User Experience (UX) Design"],
    careers: ["UI/UX Designer", "Art Director", "Motion Designer", "Creative Strategist"],
    color: "bg-purple-600 dark:bg-purple-500",
  },
  HUMANITIES: {
    title: "Humanities, Health & Social Sciences",
    description: "You possess deep empathy and human interest. You care about education, mental health, social structures, and communication. You want to understand human behavior and advocate for social impact and health wellness.",
    majors: ["Psychology", "International Relations", "Public Health", "Sociology & Policy"],
    careers: ["Clinical Psychologist", "Policy Advisor", "Healthcare Administrator", "Human Resources Director"],
    color: "bg-amber-600 dark:bg-amber-500",
  },
};

const checkEligibility = (subjectMarks: { english: string; math: string; physics: string; chemistry: string }, majorName: string) => {
  const eng = subjectMarks.english === "" ? 0 : parseInt(subjectMarks.english, 10);
  const math = subjectMarks.math === "" ? 0 : parseInt(subjectMarks.math, 10);
  const phy = subjectMarks.physics === "" ? 0 : parseInt(subjectMarks.physics, 10);
  const chem = subjectMarks.chemistry === "" ? 0 : parseInt(subjectMarks.chemistry, 10);
  const total = eng + math + phy + chem;

  switch (majorName) {
    case "Computer Science":
    case "Computer Engineering & IT":
    case "Data Science":
      if (math < 80) return { eligible: false, reason: "Requires Math ≥ 80" };
      if (phy < 70) return { eligible: false, reason: "Requires Physics ≥ 70" };
      if (total < 310) return { eligible: false, reason: "Requires Total ≥ 310" };
      return { eligible: true };
    case "Mechanical Engineering":
    case "Electrical Power Engineering":
    case "Electronic Engineering":
    case "Mechatronic Engineering":
      if (math < 75) return { eligible: false, reason: "Requires Math ≥ 75" };
      if (phy < 75) return { eligible: false, reason: "Requires Physics ≥ 75" };
      if (total < 280) return { eligible: false, reason: "Requires Total ≥ 280" };
      return { eligible: true };
    case "Architecture":
      if (math < 70) return { eligible: false, reason: "Requires Math ≥ 70" };
      if (total < 270) return { eligible: false, reason: "Requires Total ≥ 270" };
      return { eligible: true };
    case "Biomedical Science":
      if (chem < 75) return { eligible: false, reason: "Requires Chemistry ≥ 75" };
      if (phy < 70) return { eligible: false, reason: "Requires Physics ≥ 70" };
      if (total < 290) return { eligible: false, reason: "Requires Total ≥ 290" };
      return { eligible: true };
    default:
      if (total < 200) return { eligible: false, reason: "Requires Total ≥ 200" };
      return { eligible: true };
  }
};

export default function MajorTest() {
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 = landing, -2 = pre-quiz gateway, 0..4 = questions, 5 = results
  const [answers, setAnswers] = useState<string[]>([]);
  const [marks, setMarks] = useState({
    english: "",
    math: "",
    physics: "",
    chemistry: ""
  });

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/marks", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.marks) {
            setMarks({
              english: data.marks.english?.toString() || "",
              math: data.marks.math?.toString() || "",
              physics: data.marks.physics?.toString() || "",
              chemistry: data.marks.chemistry?.toString() || "",
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch marks", error);
      }
    };

    if (user) {
      fetchMarks();
    }
  }, [user]);

  const saveMarks = async (updatedMarks: typeof marks) => {
    try {
      await fetch("http://localhost:3000/api/user/marks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          english: updatedMarks.english ? parseInt(updatedMarks.english, 10) : null,
          math: updatedMarks.math ? parseInt(updatedMarks.math, 10) : null,
          physics: updatedMarks.physics ? parseInt(updatedMarks.physics, 10) : null,
          chemistry: updatedMarks.chemistry ? parseInt(updatedMarks.chemistry, 10) : null,
        }),
      });
    } catch (error) {
      console.error("Failed to save marks", error);
    }
  };

  const handleMarkChange = (subject: keyof typeof marks, value: string) => {
    if (value !== "" && !/^\d+$/.test(value)) return;
    if (value !== "") {
      const numVal = parseInt(value, 10);
      if (numVal < 0 || numVal > 100) return;
    }
    setMarks((prev) => ({
      ...prev,
      [subject]: value,
    }));
  };

  const totalScore = Object.values(marks).reduce((sum, val) => sum + (val === "" ? 0 : parseInt(val, 10)), 0);
  const isMarksValid = marks.english !== "" && marks.math !== "" && marks.physics !== "" && marks.chemistry !== "";

  const handleStart = () => {
    setAnswers([]);
    setCurrentStep(-2); // Go to Pre-Quiz Gateway first
  };

  const handleSelectOption = (category: string) => {
    const updatedAnswers = [...answers, category];
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(QUESTIONS.length);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const updatedAnswers = [...answers];
      updatedAnswers.pop();
      setAnswers(updatedAnswers);
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-2); // Back to Pre-Quiz Gateway
    } else if (currentStep === -2) {
      setCurrentStep(-1); // Back to Landing
    } else {
      setCurrentStep(-1);
    }
  };

  // Calculate results
  const getResults = () => {
    const counts = { STEM: 0, BUSINESS: 0, ARTS: 0, HUMANITIES: 0 };
    answers.forEach((cat) => {
      counts[cat as keyof typeof counts] = (counts[cat as keyof typeof counts] || 0) + 1;
    });

    const total = answers.length || 1;
    const percentages = Object.keys(counts).map((key) => ({
      category: key as "STEM" | "BUSINESS" | "ARTS" | "HUMANITIES",
      percentage: Math.round((counts[key as keyof typeof counts] / total) * 100),
    }));

    percentages.sort((a, b) => b.percentage - a.percentage);
    return percentages;
  };

  const results = getResults();
  const topResult = results[0];
  const matchedData = topResult ? MATCH_INFO[topResult.category] : null;

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-8 bg-radial from-muted/20 via-background to-background">
      <div className="w-full max-w-2xl bg-card border-2 border-foreground rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] overflow-hidden relative transition-all duration-300">
        
        {/* Decorative subtle background colors */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Landing View */}
        {currentStep === -1 && (
          <div className="p-6 md:p-12 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-none bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
              <ClipboardList className="size-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tighter md:text-4xl text-foreground">
                Find Your Perfect Major
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed">
                Discover the academic paths and high-growth careers that align with your natural interests, problem-solving styles, and strengths.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg mt-2 text-left">
              {[
                { title: "5 Questions", desc: "Short & intuitive", icon: Brain },
                { title: "Real-time Scoring", desc: "Aesthetic breakdowns", icon: Sparkles },
                { title: "Matched Careers", desc: "Tailored insights", icon: Award },
              ].map((f, idx) => (
                <div key={idx} className="p-3 bg-muted/40 rounded-none border border-border/80 flex items-center gap-2.5">
                  <f.icon className="size-5 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xs text-foreground tracking-tight">{f.title}</h3>
                    <p className="text-[10px] text-muted-foreground font-mono">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={handleStart} className="w-full sm:w-auto px-8 py-5 text-sm font-semibold rounded-none bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] gap-2 transition-all mt-4">
              <span>Start Assessment</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
        {/* Pre-Quiz Gateway View */}
        {currentStep === -2 && (
          <div className="p-6 md:p-10 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Header progress info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-4 font-mono">
              <button onClick={handleBack} className="flex items-center gap-1 hover:text-foreground transition-colors group cursor-pointer">
                <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>
              <span className="font-bold">Gateway Verification</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">
                Enter Matriculation Marks
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Provide your Grade-12 matriculation subject marks to calculate your engineering eligibility status. Marks must be between 0 and 100.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 gap-4 my-2">
              {[
                { id: "english" as const, name: "English" },
                { id: "math" as const, name: "Mathematics" },
                { id: "physics" as const, name: "Physics" },
                { id: "chemistry" as const, name: "Chemistry" }
              ].map((subject) => (
                <div key={subject.id} className="space-y-1.5">
                  <label htmlFor={subject.id} className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    {subject.name}
                  </label>
                  <input
                    id={subject.id}
                    type="text"
                    inputMode="numeric"
                    placeholder="0 - 100"
                    value={marks[subject.id]}
                    onChange={(e) => handleMarkChange(subject.id, e.target.value)}
                    className="w-full h-10 px-3 rounded-none border border-border bg-background text-sm font-mono placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-xs"
                  />
                </div>
              ))}
            </div>

            {/* Total Score Display */}
            <div className="border border-border bg-muted/20 p-4 rounded-none flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Calculated Total</span>
                <span className="text-2xl font-black text-foreground tracking-tighter">
                  {totalScore} <span className="text-sm font-medium text-muted-foreground">/ 400</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Status</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-none border inline-block mt-0.5 ${
                  isMarksValid 
                    ? "bg-primary/10 border-primary/20 text-primary" 
                    : "bg-destructive/10 border-destructive/20 text-destructive"
                }`}>
                  {isMarksValid ? "Ready" : "Pending Marks"}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={async () => {
                if (user) {
                  await saveMarks(marks);
                }
                setCurrentStep(0);
              }}
              disabled={!isMarksValid}
              className="w-full py-6 text-sm font-semibold rounded-none bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] disabled:pointer-events-none disabled:opacity-50 gap-2 transition-all cursor-pointer"
            >
              <span>Continue to Assessment</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}

        {/* Quiz Questions View */}
        {currentStep >= 0 && currentStep < QUESTIONS.length && (
          <div className="p-6 md:p-10 flex flex-col gap-6 min-h-[420px] justify-between">
            {/* Header progress info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-4 font-mono">
              <button onClick={handleBack} className="flex items-center gap-1 hover:text-foreground transition-colors group cursor-pointer">
                <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>
              <span className="font-bold">Question {currentStep + 1} of {QUESTIONS.length}</span>
            </div>

            {/* Question Text */}
            <div className="space-y-4 my-2">
              <div className="h-2 w-full bg-muted border border-border rounded-none overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 rounded-none" 
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl animate-in slide-in-from-bottom-2 duration-300">
                {QUESTIONS[currentStep].text}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-3.5 my-4">
              {QUESTIONS[currentStep].options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(opt.category)}
                  className="w-full text-left p-4 rounded-none border border-border bg-background hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:border-foreground transition-all duration-200 flex items-start gap-3 group animate-in fade-in slide-in-from-bottom-3 cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-7 h-7 rounded-none bg-muted border border-border/60 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary flex items-center justify-center text-xs font-mono font-bold text-muted-foreground shrink-0 transition-colors">
                    {opt.label}
                  </div>
                  <div className="text-sm font-medium text-foreground pt-0.5 group-hover:text-foreground">
                    {opt.text}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-[11px] text-muted-foreground text-center font-mono">
              Your answer will immediately advance you to the next question.
            </div>
          </div>
        )}

        {/* Results View */}
        {currentStep === QUESTIONS.length && matchedData && (
          <div className="p-6 md:p-10 flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono border border-emerald-500/20">
                <CheckCircle2 className="size-3.5" />
                <span>Assessment Complete</span>
                <span>•</span>
                <span>Matriculation Score: {totalScore}/400</span>
              </div>
              <h2 className="text-2xl font-black text-foreground tracking-tighter md:text-3xl mt-2">
                Your Primary Fit
              </h2>
            </div>

            {/* Main Result Card */}
            <div className="bg-muted/40 rounded-none p-5 border border-border relative overflow-hidden flex flex-col gap-3">
              <div className={`absolute top-0 left-0 w-2 h-full ${matchedData.color}`} />
              <h3 className="text-lg font-bold text-foreground pl-1">{matchedData.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed pl-1">{matchedData.description}</p>
            </div>

            {/* Percentage Breakdowns */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">Match Breakdown</h4>
              <div className="space-y-2">
                {results.map((res, i) => {
                  const data = MATCH_INFO[res.category];
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold font-mono">
                        <span className="text-foreground">{data.title.split(",")[0]}</span>
                        <span>{res.percentage}%</span>
                      </div>
                      <div className="h-3 w-full bg-muted border border-border rounded-none overflow-hidden">
                        <div 
                          className={`h-full ${data.color} rounded-none transition-all duration-1000`} 
                          style={{ width: `${res.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="p-4 rounded-none border border-border bg-background/50">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 font-mono">Recommended Majors</h4>
                <ul className="space-y-2.5">
                  {matchedData.majors.map((m, idx) => {
                    const elig = checkEligibility(marks, m);
                    return (
                      <li key={idx} className="text-xs font-semibold text-foreground flex items-center justify-between gap-2 border-b border-border/30 pb-2 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-none bg-primary shrink-0" />
                          <span>{m}</span>
                        </div>
                        {elig.eligible ? (
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                            Eligible
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 border border-destructive/30 bg-destructive/10 text-destructive shrink-0" title={elig.reason}>
                            {elig.reason}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="p-4 rounded-none border border-border bg-background/50">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 font-mono">Recommended Careers</h4>
                <ul className="space-y-2">
                  {matchedData.careers.map((c, idx) => (
                    <li key={idx} className="text-xs font-semibold text-foreground flex items-center gap-2">
                      <div className="size-2 rounded-none bg-primary shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/major" className="flex-1">
                <Button className="w-full bg-primary text-primary-foreground rounded-none py-6 font-semibold text-sm justify-center hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all gap-1">
                  <span>Explore Majors</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Button onClick={handleStart} variant="outline" className="sm:w-auto px-5 py-6 rounded-none text-sm font-semibold border-border gap-1.5 justify-center hover:bg-muted">
                <RotateCcw className="size-4" />
                <span>Retake Quiz</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
