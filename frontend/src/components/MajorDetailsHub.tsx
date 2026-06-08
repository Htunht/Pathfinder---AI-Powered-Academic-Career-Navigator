import React from "react";
import { 
  Home, 
  Cpu, 
  Zap, 
  Settings, 
  Bot, 
  HardHat,
  X,
  CheckCircle,
  GraduationCap
} from "lucide-react";

interface BackendMajor {
  id: number | string;
  majorCode: string;
  name: string;
  myanmarName: string;
  cutoffMark: number;
  category: string;
  description: string;
  topSkills: string[];
  seniorTips: string;
  activitiesPhotos: string[];
  careerRoadmap: string[];
  duration?: string;
  difficulty?: number;
  courses?: string[];
  jobs?: string[];
  icon?: React.ComponentType<{ className?: string }>;
}

interface MajorDetailsHubProps {
  major: BackendMajor;
  onClose: () => void;
}

const getMajorIcon = (majorCode: string, category: string) => {
  const code = (majorCode || "").toUpperCase();
  if (code.includes("ARCHI")) return Home;
  if (code.includes("CE") && !code.includes("CEIT")) return HardHat;
  if (code.includes("CPE") || code.includes("CEIT") || code.includes("IT")) return Cpu;
  if (code.includes("EC")) return Cpu; 
  if (code.includes("EP")) return Zap; 
  if (code.includes("ME") && !code.includes("MECHATRONIC") && !code.includes("MC")) return Settings; 
  if (code.includes("MC") || code.includes("MECHATRONIC")) return Bot; 
  
  if (category === "Architecture") return Home;
  return Cpu;
};

const getCategoryStyles = (category: string) => {
  const cat = (category || "").toLowerCase();
  if (cat.includes("infrastructure")) {
    return {
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      text: "text-blue-700",
      iconBg: "bg-blue-50 text-blue-700 border-blue-200",
      iconBorder: "border-blue-200"
    };
  } else if (cat.includes("architecture")) {
    return {
      bg: "bg-purple-50 text-purple-700 border-purple-200",
      text: "text-purple-700",
      iconBg: "bg-purple-50 text-purple-700 border-purple-200",
      iconBorder: "border-purple-200"
    };
  } else if (cat.includes("process") || cat.includes("energy")) {
    return {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      text: "text-emerald-700",
      iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconBorder: "border-emerald-200"
    };
  } else {
    return {
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      text: "text-blue-700",
      iconBg: "bg-blue-50 text-blue-700 border-blue-200",
      iconBorder: "border-blue-200"
    };
  }
};

const getCategoryMyanmarLabel = (category: string) => {
  const cat = (category || "").toLowerCase();
  if (cat.includes("infrastructure")) return "အခြေခံအဆောက်အအုံ";
  if (cat.includes("architecture")) return "ဗိသုကာ";
  if (cat.includes("process") || cat.includes("energy")) return "စွမ်းအားစနစ်နှင့် စွမ်းအင်";
  return "နည်းပညာနှင့် အီလက်ထရောနစ်";
};

export default function MajorDetailsHub({ major, onClose }: MajorDetailsHubProps) {
  console.log("MajorDetailsHub received major:", major);
  const IconComponent = major.icon || getMajorIcon(major.majorCode, major.category);
  const styles = getCategoryStyles(major.category);

  const displayName = major.myanmarName || major.name;
  const displayEnglishName = major.myanmarName ? major.name : "";

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border-3 border-slate-800 rounded-3xl w-full max-w-2xl shadow-[0_16px_0_#1e293b] overflow-hidden relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b-3 border-slate-800 flex items-start justify-between bg-slate-50/50">
          <div className="flex gap-3">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-3 border-slate-800 ${styles.iconBg} ${styles.iconBorder} shadow-[0_4px_0_#1e293b]`}>
              <IconComponent className="size-7 text-slate-800" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight tracking-tight">
                {displayName}
              </h2>
              {displayEnglishName && (
                <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mt-0.5">
                  {displayEnglishName}
                </p>
              )}
              <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border-2 border-slate-800 mt-2 inline-block ${styles.bg} ${styles.text} shadow-[0_2px_0_#1e293b]`}>
                {getCategoryMyanmarLabel(major.category)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl border-3 border-slate-800 hover:bg-slate-100 text-slate-800 hover:scale-105 active:translate-y-0.5 transition-all cursor-pointer bg-white shadow-[0_3px_0_#1e293b] active:shadow-none"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto">
          

          {/* Overview */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              💡 <span>ဌာန မိတ်ဆက်</span>
            </h4>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed bg-slate-50 border-2 border-slate-200/60 p-4 rounded-2xl">
              {major.description}
            </p>
          </div>

          {/* Top Skills Badges Grid */}
          {major.topSkills && major.topSkills.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                ⚡ <span>အဓိက ကျွမ်းကျင်ရမည့် စွမ်းရည်များ</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {major.topSkills.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2.5 bg-green-50 border-2 border-green-200 rounded-2xl p-3 px-4 shadow-[0_3px_0_#bbf7d0] hover:bg-green-100/60 transition-all duration-150"
                  >
                    <CheckCircle className="size-4.5 text-green-600 shrink-0" />
                    <span className="text-xs font-black text-green-800 truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Senior Note */}
          {major.seniorTips && (
            <div className="bg-green-50/70 border-3 border-green-400 rounded-3xl p-5 shadow-[0_6px_0_#bbf7d0] space-y-2 relative">
              <h4 className="text-xs font-black text-green-700 uppercase tracking-widest flex items-center gap-1.5">
                🎓 <span>စီနီယာ အကြံပြုချက် (Senior Advice)</span>
              </h4>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed pt-1">
                {major.seniorTips}
              </p>
            </div>
          )}


          {/* Fallback support for original courses and jobs from Major.tsx */}
          {(major.courses || major.jobs) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
              {major.courses && major.courses.length > 0 && (
                <div className="space-y-3.5">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    📚 <span>သင်ကြားရမည့် ဘာသာရပ်များ</span>
                  </h4>
                  <ul className="space-y-2">
                    {major.courses.map((course, idx) => (
                      <li key={idx} className="text-xs font-bold text-slate-600 bg-slate-50 border-2 border-slate-200/50 p-2.5 px-3 rounded-2xl">
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {major.jobs && major.jobs.length > 0 && (
                <div className="space-y-3.5">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    💼 <span>အလုပ်အကိုင် အခွင့်အလမ်းများ</span>
                  </h4>
                  <ul className="space-y-2">
                    {major.jobs.map((job, idx) => (
                      <li key={idx} className="text-xs font-bold text-slate-600 bg-slate-50 border-2 border-slate-200/50 p-2.5 px-3 rounded-2xl">
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t-3 border-slate-800 bg-slate-50/50 flex justify-end">
          <button 
            onClick={onClose} 
            className="bg-green-500 hover:bg-green-600 text-white font-black px-7 py-3 rounded-2xl border-3 border-slate-800 active:translate-y-1 active:shadow-none shadow-[0_4px_0_#1e293b] transition-all cursor-pointer text-sm font-sans"
          >
            ပိတ်ရန်
          </button>
        </div>
      </div>
    </div>
  );
}
