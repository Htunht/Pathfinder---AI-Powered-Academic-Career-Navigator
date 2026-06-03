import { useState } from "react";
import { Link } from "react-router";
import { ClipboardList, Sparkles, Brain, Award, ArrowRight, RotateCcw, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";

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
    color: "from-blue-600 to-cyan-500",
  },
  BUSINESS: {
    title: "Business, Administration & Finance",
    description: "You are a natural coordinator and strategist. You love leading teams, analyzing risks, making financial decisions, and scaling projects. You think about market opportunities and organizational growth.",
    majors: ["Finance & Investment", "Business Administration", "Marketing Strategy", "Management Information Systems"],
    careers: ["Investment Banker", "Product Manager", "Management Consultant", "Startup Founder"],
    color: "from-emerald-600 to-teal-500",
  },
  ARTS: {
    title: "Arts, Design & Media",
    description: "You have a vibrant creative spirit. You perceive the world through aesthetics, storytelling, and user experience. You love visual representation, crafting design assets, and bringing ideas to life through artistic mediums.",
    majors: ["Graphic Design", "Digital Media & Film", "Architecture", "User Experience (UX) Design"],
    careers: ["UI/UX Designer", "Art Director", "Motion Designer", "Creative Strategist"],
    color: "from-purple-600 to-pink-500",
  },
  HUMANITIES: {
    title: "Humanities, Health & Social Sciences",
    description: "You possess deep empathy and human interest. You care about education, mental health, social structures, and communication. You want to understand human behavior and advocate for social impact and health wellness.",
    majors: ["Psychology", "International Relations", "Public Health", "Sociology & Policy"],
    careers: ["Clinical Psychologist", "Policy Advisor", "Healthcare Administrator", "Human Resources Director"],
    color: "from-amber-600 to-orange-500",
  },
};

export default function MajorTest() {
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 = landing, 0..4 = questions, 5 = results
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStart = () => {
    setAnswers([]);
    setCurrentStep(0);
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
      <div className="w-full max-w-2xl bg-card border border-border/80 rounded-2xl shadow-xl overflow-hidden relative transition-all duration-300">
        
        {/* Decorative subtle background colors */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Landing View */}
        {currentStep === -1 && (
          <div className="p-6 md:p-12 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary border border-primary/10 shadow-inner">
              <ClipboardList className="size-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">
                Find Your Perfect Major
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                Discover the academic paths and high-growth careers that align with your natural interests, problem-solving styles, and strengths.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg mt-2 text-left">
              {[
                { title: "5 Questions", desc: "Short & intuitive", icon: Brain },
                { title: "Real-time Scoring", desc: "Aesthetic breakdowns", icon: Sparkles },
                { title: "Matched Careers", desc: "Tailored insights", icon: Award },
              ].map((f, idx) => (
                <div key={idx} className="p-3 bg-muted/40 rounded-xl border border-border/40 flex items-center gap-2.5">
                  <f.icon className="size-5 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xs text-foreground">{f.title}</h3>
                    <p className="text-[10px] text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={handleStart} className="w-full sm:w-auto px-8 py-5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 gap-2 transition-all mt-4">
              <span>Start Assessment</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}

        {/* Quiz Questions View */}
        {currentStep >= 0 && currentStep < QUESTIONS.length && (
          <div className="p-6 md:p-10 flex flex-col gap-6 min-h-[420px] justify-between">
            {/* Header progress info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/40 pb-4">
              <button onClick={handleBack} className="flex items-center gap-1 hover:text-foreground transition-colors group">
                <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>
              <span className="font-semibold">Question {currentStep + 1} of {QUESTIONS.length}</span>
            </div>

            {/* Question Text */}
            <div className="space-y-4 my-2">
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 rounded-full" 
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl animate-in slide-in-from-bottom-2 duration-300">
                {QUESTIONS[currentStep].text}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-3.5 my-4">
              {QUESTIONS[currentStep].options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(opt.category)}
                  className="w-full text-left p-4 rounded-xl border border-border/80 hover:border-primary bg-background hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 flex items-start gap-3 group animate-in fade-in slide-in-from-bottom-3"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-7 h-7 rounded-lg bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0 transition-colors">
                    {opt.label}
                  </div>
                  <div className="text-sm font-medium text-foreground group-hover:text-foreground pt-0.5">
                    {opt.text}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-[11px] text-muted-foreground text-center italic">
              Your answer will immediately advance you to the next question.
            </div>
          </div>
        )}

        {/* Results View */}
        {currentStep === QUESTIONS.length && matchedData && (
          <div className="p-6 md:p-10 flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <CheckCircle2 className="size-3.5" />
                <span>Assessment Complete</span>
              </div>
              <h2 className="text-2xl font-black text-foreground tracking-tight md:text-3xl mt-2">
                Your Primary Fit
              </h2>
            </div>

            {/* Main Result Card */}
            <div className="bg-muted/40 rounded-xl p-5 border border-border/80 relative overflow-hidden flex flex-col gap-3">
              <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${matchedData.color}`} />
              <h3 className="text-lg font-bold text-foreground">{matchedData.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{matchedData.description}</p>
            </div>

            {/* Percentage Breakdowns */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Match Breakdown</h4>
              <div className="space-y-2">
                {results.map((res, i) => {
                  const data = MATCH_INFO[res.category];
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-foreground">{data.title.split(",")[0]}</span>
                        <span className="text-muted-foreground">{res.percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${data.color} rounded-full transition-all duration-1000`} 
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
              <div className="p-4 rounded-xl border border-border/60 bg-background/50">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Recommended Majors</h4>
                <ul className="space-y-1.5">
                  {matchedData.majors.map((m, idx) => (
                    <li key={idx} className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <div className="size-1.5 rounded-full bg-primary" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-border/60 bg-background/50">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Recommended Careers</h4>
                <ul className="space-y-1.5">
                  {matchedData.careers.map((c, idx) => (
                    <li key={idx} className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <div className="size-1.5 rounded-full bg-primary" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/major" className="flex-1">
                <Button className="w-full bg-primary text-primary-foreground rounded-xl py-5 font-semibold text-sm justify-center gap-1">
                  <span>Explore Majors</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Button onClick={handleStart} variant="outline" className="sm:w-auto px-5 py-5 rounded-xl text-sm font-semibold border-border gap-1.5 justify-center hover:bg-muted">
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
