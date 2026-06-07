import React, { useState } from 'react';
import QuizAssessment from './QuizAssessment';

const MajorTest = () => {
const [quizFinished, setQuizFinished] = useState(false);
const [results, setResults] = useState<any>(null);
const [isLoading, setIsLoading] = useState(false);

// မှတ်ချက် - ဒီအမှတ် (Total Score) ကို Pre-Quiz Gateway (Modal) ကနေ ရလာတဲ့ State ထဲက ယူရပါမည်။
// ယခု ယာယီစမ်းသပ်ရန် ၂၈၀ ဟု သတ်မှတ်ထားပါသည်။
const studentTotalScore = 280;

const handleQuizComplete = async (finalScores: any) => {
setIsLoading(true);
setQuizFinished(true);

    try {
      // Backend သို့ Data လှမ်းပို့ခြင်း
      const response = await fetch('http://localhost:3000/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalScore: studentTotalScore,
          quizScores: finalScores
        })
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        console.error("Error from API:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch matches:", error);
    } finally {
      setIsLoading(false);
    }

};

// ၁။ တွက်ချက်နေစဉ် ပြသရန် (Loading State)
if (isLoading) {
return (
<div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center font-mono">
<div className="w-16 h-16 border-4 border-zinc-800 border-t-white rounded-full animate-spin mb-4"></div>
<p className="tracking-widest text-zinc-400">ANALYZING PROFILE...</p>
</div>
);
}

// ၂။ ရလဒ်များရလာပါက UI တွင် ပြသရန် (Result Dashboard)
if (results) {
return (
<div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans">
<div className="max-w-5xl mx-auto">

          <h1 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight border-b-2 border-zinc-800 pb-6">
            သင်နှင့် အကိုက်ညီဆုံး နယ်ပယ်များ
          </h1>

          {/* Top Matches Section */}
          {results.topMatches.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-mono text-green-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 block"></span> TOP MATCHES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.topMatches.map((major: any) => (
                  <ResultCard key={major.majorCode} major={major} status="TOP_MATCH" />
                ))}
              </div>
            </div>
          )}

          {/* Other Eligible Section */}
          {results.otherEligible.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-mono text-zinc-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-zinc-400 block"></span> OTHER ELIGIBLE MAJORS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.otherEligible.map((major: any) => (
                  <ResultCard key={major.majorCode} major={major} status="ELIGIBLE" />
                ))}
              </div>
            </div>
          )}

          {/* Ineligible (Locked) Section */}
          {results.ineligible.length > 0 && (
            <div className="mb-12 opacity-70">
              <h2 className="text-xl font-mono text-red-500/80 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500/80 block"></span> LOCKED (ဝင်ခွင့်မမီပါ)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.ineligible.map((major: any) => (
                  <ResultCard key={major.majorCode} major={major} status="LOCKED" />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );

}

// ၃။ ပုံမှန်အခြေအနေ (Quiz ဖြေဆိုရန်)
return <QuizAssessment onComplete={handleQuizComplete} />;
};

// --- Reusable UI Card Component ---
const ResultCard = ({ major, status }: { major: any, status: string }) => {
const isLocked = status === "LOCKED";

// High-contrast border & colors based on status
const borderColor = status === "TOP_MATCH" ? "border-green-500" : isLocked ? "border-red-900/50" : "border-zinc-700";
const badgeColor = status === "TOP_MATCH" ? "bg-green-500 text-black" : isLocked ? "bg-red-900/30 text-red-400" : "bg-zinc-800 text-zinc-300";

return (
<div className={`p-6 border-2 ${borderColor} ${isLocked ? "bg-[#050505]" : "bg-[#111] hover:-translate-y-1 hover:border-white"} transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}>

      {/* Background Accent for Top Matches */}
      {status === "TOP_MATCH" && <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>}

      <div>
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs font-mono px-3 py-1 uppercase tracking-widest font-bold ${badgeColor}`}>
            {major.category}
          </span>
          <span className="text-zinc-500 font-mono text-sm tracking-wider">
            REQ: {major.cutoffMark}
          </span>
        </div>

        <h3 className={`text-2xl font-bold mb-2 tracking-tight ${isLocked ? "text-zinc-600" : "text-white"}`}>
          {major.myanmarName}
        </h3>
        <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest">
          {major.name}
        </p>
      </div>

      {isLocked && (
        <div className="mt-6 pt-4 border-t border-red-900/30">
          <p className="text-xs font-mono text-red-500/70 uppercase">
            Insufficient Marks
          </p>
        </div>
      )}
    </div>

);
};

export default MajorTest;
