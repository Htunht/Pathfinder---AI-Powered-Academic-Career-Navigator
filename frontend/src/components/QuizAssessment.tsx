import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { quizQuestions } from "./quizQuestions";

interface QuizAssessmentProps {
  onComplete: (scores: {
    INFRASTRUCTURE: number;
    TECH: number;
    ENERGY: number;
  }) => void;
  onBack: () => void;
}

export default function QuizAssessment({ onComplete, onBack }: QuizAssessmentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<("INFRASTRUCTURE" | "TECH" | "ENERGY")[]>([]);
  const [scores, setScores] = useState({
    INFRASTRUCTURE: 0,
    TECH: 0,
    ENERGY: 0,
  });

  const handleOptionClick = (category: "INFRASTRUCTURE" | "TECH" | "ENERGY") => {
    // ၁။ ရွေးချယ်လိုက်တဲ့ Category အတွက် အမှတ် ၁ မှတ် တိုးပေးမယ်
    const newScores = { ...scores, [category]: scores[category] + 1 };
    setScores(newScores);
    setHistory((prev) => [...prev, category]);

    // ၂။ နောက်မေးခွန်းကို ကူးမယ်၊ ၁၅ ပုဒ်ပြည့်သွားရင် onComplete ကို ခေါ်ပြီး Data ပို့မယ်
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(newScores); // Backend ဆီ ပို့ဖို့ Parent Component ဆီ ရမှတ်တွေ လှမ်းပို့ပါပြီ
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevCategory = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setScores((prev) => ({
        ...prev,
        [prevCategory]: Math.max(0, prev[prevCategory] - 1),
      }));
      setCurrentIndex((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  const currentQuestion = quizQuestions[currentIndex];
  const progressPercentage = ((currentIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="w-full bg-white text-slate-800 flex flex-col items-center justify-center p-6 md:p-12 font-sans select-none animate-in fade-in duration-500">
      
      {/* Quiz Container */}
      <div className="w-full max-w-2xl">
        
        {/* Progress Bar (Sleek & Gamified) */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold mb-3">
            <button 
              onClick={handleBack} 
              className="flex items-center gap-1.5 hover:text-slate-800 transition-colors group cursor-pointer text-xs font-black uppercase tracking-wider"
            >
              <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>နောက်သို့</span>
            </button>
            <span className="font-mono">မေးခွန်း {currentIndex + 1} / {quizQuestions.length}</span>
            <span className="font-mono">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full h-4 bg-slate-150 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-300 ease-out shadow-[inset_0_-2px_0_#15803d]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-10 min-h-[80px] flex items-center animate-fade-in" key={currentIndex}>
          <h2 className="text-xl md:text-2xl font-black leading-snug tracking-tight text-slate-800">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option.category)}
              className="w-full text-left p-4 rounded-2xl border-2 border-slate-200 bg-white hover:-translate-y-0.5 active:translate-y-[4px] active:shadow-none transition-all duration-150 shadow-[0_4px_0_#cbd5e1] group relative cursor-pointer flex items-center gap-4"
            >
              <div className="size-8 rounded-xl bg-slate-50 border-2 border-slate-150 flex items-center justify-center font-black text-sm text-slate-400 group-hover:bg-green-50 group-hover:border-green-200 group-hover:text-green-600 transition-colors">
                {index + 1}
              </div>
              
              <span className="text-sm md:text-base font-bold text-slate-700 group-hover:text-slate-900 transition-colors leading-relaxed">
                {option.text}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic score summary footer in mono */}
        <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex flex-col sm:flex-row justify-between items-start sm:items-center border-t-2 border-slate-100 pt-5 mt-8 gap-2">
          <span>အချိန်နှင့်တပြေးညီ အမှတ်စနစ်</span>
          <span className="flex flex-wrap gap-x-3 gap-y-1 font-bold text-[10px]">
            <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">အဆောက်အအုံ: {scores.INFRASTRUCTURE}</span>
            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">နည်းပညာ: {scores.TECH}</span>
            <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200">စွမ်းအင်: {scores.ENERGY}</span>
          </span>
        </div>

      </div>
    </div>
  );
}
