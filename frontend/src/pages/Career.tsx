import { useState, useMemo } from "react";
import { Search } from "lucide-react";

interface CareerItem {
  id: number;
  title: string;
  category: "Infrastructure" | "Tech & Electronics" | "Process & Energy";
  salary: string; // e.g. "၆ သိန်း - ၁၅ သိန်း"
  growth: number; // in %
  recommendedMajor: string;
  responsibilities: string[];
  skills: string[];
  description: string;
}

const CAREERS: CareerItem[] = [
  {
    id: 1,
    title: "ဆော့ဖ်ဝဲလ် အင်ဂျင်နီယာ (Junior Software Engineer)",
    category: "Tech & Electronics",
    salary: "၆ သိန်း - ၁၅ သိန်း / လ",
    growth: 18,
    recommendedMajor: "ကွန်ပျူတာအင်ဂျင်နီယာနှင့် အိုင်တီ",
    responsibilities: [
      "စီနီယာအင်ဂျင်နီယာများနှင့်အတူ ဆော့ဖ်ဝဲလ်စနစ်များကို ရေးသားတည်ဆောက်ခြင်း",
      "ပရိုဂရမ်ကုဒ်များကို စမ်းသပ်စစ်ဆေးပြီး အမှားများ (Bugs) ကို ပြင်ဆင်ခြင်း",
      "စနစ်သစ်များ လိုအပ်ချက်နှင့်အညီ ဖြစ်စေရန် အဖွဲ့သားများနှင့် ပူးပေါင်းဆောင်ရွက်ခြင်း"
    ],
    skills: ["HTML/CSS/JavaScript", "React & Node.js", "SQL Databases", "Git / GitHub"],
    description: "ဝဘ်ဆိုက်များနှင့် မိုဘိုင်းလ်အက်ပလီကေးရှင်းများကို ရေးသားဖန်တီးခြင်း၊ စမ်းသပ်ခြင်းနှင့် ထိန်းသိမ်းခြင်းလုပ်ငန်းများကို ဆောင်ရွက်သည်။",
  },
  {
    id: 2,
    title: "ဆိုဒ် အင်ဂျင်နီယာ (Site Engineer)",
    category: "Infrastructure",
    salary: "၅ သိန်း - ၁၂ သိန်း / လ",
    growth: 10,
    recommendedMajor: "မြို့ပြအင်ဂျင်နီယာ",
    responsibilities: [
      "ဆောက်လုပ်ရေးလုပ်ငန်းများ ပုံစံကြမ်းအတိုင်း ဖြစ်စေရန် ကြီးကြပ်ကွပ်ကဲခြင်း",
      "ဆောက်လုပ်ရေးလုပ်သားများအား နေ့စဉ်အလုပ်တာဝန်များ ခွဲဝေပေးခြင်း",
      "ပစ္စည်းကိရိယာများနှင့် အရည်အသွေးများကို စစ်ဆေးမှတ်တမ်းတင်ခြင်း"
    ],
    skills: ["AutoCAD", "လုပ်ငန်းခွင်စီမံခန့်ခွဲမှု", "ဘေးကင်းလုံခြုံရေး လမ်းညွှန်ချက်များ", "ကွန်ကရစ်နည်းပညာ"],
    description: "ဆောက်လုပ်ရေးလုပ်ငန်းခွင်အတွင်း တည်ဆောက်မှုအစီအစဉ်များ၊ ဘေးကင်းလုံခြုံရေးနှင့် ပုံစံထုတ်ချက်များကို လက်တွေ့အကောင်အထည်ဖော်သည်။",
  },
  {
    id: 3,
    title: "ဒေတာ ဆန်းစစ်သူ (Junior Data Analyst)",
    category: "Tech & Electronics",
    salary: "၆ သိန်း - ၁၃ သိန်း / လ",
    growth: 15,
    recommendedMajor: "ကွန်ပျူတာအင်ဂျင်နီယာနှင့် အိုင်တီ",
    responsibilities: [
      "ကုမ္ပဏီဒေတာဘေ့စ်များမှ လိုအပ်သော အချက်အလက်များကို ရှာဖွေစုဆောင်းခြင်း",
      "ဒေတာများကို ရှင်းလင်းပြီး စာရင်းဇယားနှင့် ဇယားများ ဖန်တီးတင်ပြခြင်း",
      "လုပ်ငန်းဆောင်ရွက်မှု တိုးတက်စေမည့် လမ်းကြောင်းများကို ဆန်းစစ်အကြံပြုခြင်း"
    ],
    skills: ["Microsoft Excel", "SQL Queries", "Python Programming", "Power BI / Tableau"],
    description: "လုပ်ငန်းများ ပိုမိုတိုးတက်ကောင်းမွန်လာစေရန် ကိန်းဂဏန်းဒေတာများကို စုဆောင်းဆန်းစစ်ပြီး အစီရင်ခံစာများ တင်ပြသည်။",
  },
  {
    id: 4,
    title: "အိုင်တီ ပံ့ပိုးကူညီရေးအရာရှိ (IT Support Specialist)",
    category: "Tech & Electronics",
    salary: "၄ သိန်း - ၈ သိန်း / လ",
    growth: 8,
    recommendedMajor: "ကွန်ပျူတာအင်ဂျင်နီယာနှင့် အိုင်တီ",
    responsibilities: [
      "ဝန်ထမ်းများ၏ အိုင်တီပိုင်းဆိုင်ရာ အခက်အခဲများကို ကူညီဖြေရှင်းပေးခြင်း",
      "ကွန်ပျူတာစနစ်များနှင့် ဆော့ဖ်ဝဲလ်များကို တပ်ဆင်အပ်ဒိတ်လုပ်ခြင်း",
      "ရုံးတွင်းကွန်ရက်နှင့် ပရင်တာများ ချိတ်ဆက်မှုကို စစ်ဆေးပေးခြင်း"
    ],
    skills: ["ကွန်ပြူတာပြင်ဆင်ခြင်း", "Windows/Linux OS", "ကွန်ရက်အခြေခံ", "Customer Service"],
    description: "အဖွဲ့အစည်းအတွင်းရှိ ကွန်ပျူတာ ဟာ့ဒ်ဝဲလ်၊ ဆော့ဖ်ဝဲလ်နှင့် ကွန်ရက်ပြဿနာများကို ကူညီဖြေရှင်းပေးသည်။",
  },
  {
    id: 5,
    title: "ဗိသုကာလက်ထောက် (Junior Architect)",
    category: "Infrastructure",
    salary: "၅ သိန်း - ၁၀ သိန်း / လ",
    growth: 12,
    recommendedMajor: "ဗိသုကာပညာ",
    responsibilities: [
      "အဆောက်အအုံပုံစံများနှင့် အတွင်းပိုင်း 3D ဒီဇိုင်းများကို ရေးဆွဲခြင်း",
      "ဒီဇိုင်းပုံစံများအတွက် လိုအပ်သော ပစ္စည်းစာရင်းနှင့် အတိုင်းအတာများ ပြင်ဆင်ခြင်း",
      "ဖောက်သည်များနှင့် တွေ့ဆုံဆွေးနွေးရာတွင် အကူအညီပေးခြင်း"
    ],
    skills: ["SketchUp", "AutoCAD", "Autodesk Revit", "3D Rendering"],
    description: "ဗိသုကာပညာရှင်ကြီးများ၏ လမ်းညွှန်မှုအောက်တွင် အဆောက်အအုံပုံစံကြမ်းများနှင့် အတွင်းပိုင်းဒီဇိုင်းများကို ရေးဆွဲကူညီသည်။",
  },
  {
    id: 6,
    title: "လျှပ်စစ်လက်ထောက်အင်ဂျင်နီယာ (Junior Electrical Engineer)",
    category: "Process & Energy",
    salary: "၅ သိန်း - ၁၂ သိန်း / လ",
    growth: 11,
    recommendedMajor: "လျှပ်စစ်စွမ်းအား အင်ဂျင်နီယာ",
    responsibilities: [
      "လျှပ်စစ်စနစ်များနှင့် စက်ပစ္စည်းများ တပ်ဆင်မှုကို ကြီးကြပ်ခြင်း",
      "လျှပ်စစ်ချို့ယွင်းမှုများကို ရှာဖွေဖော်ထုတ်ပြီး ပြင်ဆင်ထိန်းသိမ်းခြင်း",
      "ဓာတ်အားလိုင်းများ၏ ဘေးကင်းမှုကို စနစ်တကျ မှတ်တမ်းတင်ခြင်း"
    ],
    skills: ["လျှပ်စစ်ဒီဇိုင်း", "PLC အခြေခံ", "AutoCAD Electrical", "ဘေးကင်းလုံခြုံရေးစည်းမျဉ်းများ"],
    description: "လျှပ်စစ်ဓာတ်အား ဖြန့်ဖြူးရေးစနစ်များ၊ လျှပ်စစ်ပတ်လမ်းများနှင့် ရုံး/စက်ရုံ လျှပ်စစ်လိုင်းများကို တပ်ဆင်ထိန်းသိမ်းသည်။",
  },
  {
    id: 7,
    title: "စက်ရုံလည်ပတ်ရေးအရာရှိ (Operations Supervisor)",
    category: "Process & Energy",
    salary: "၅ သိန်း - ၁၀ သိန်း / လ",
    growth: 9,
    recommendedMajor: "ဓာတုအင်ဂျင်နီယာ",
    responsibilities: [
      "နေ့စဉ် ကုန်ထုတ်လုပ်မှုအစီအစဉ်များ ချောမွေ့စွာ လည်ပတ်နိုင်စေရန် စောင့်ကြည့်ခြင်း",
      "ထွက်ရှိလာသော ထုတ်ကုန်များ၏ အရည်အသွေးကို စစ်ဆေးခြင်း",
      "ဘေးကင်းလုံခြုံရေးစည်းမျဉ်းများကို လုပ်သားများ လိုက်နာစေရန် ကြီးကြပ်ခြင်း"
    ],
    skills: ["လုပ်ငန်းစဉ်ထိန်းချုပ်မှု", "အရည်အသွေးစစ်ဆေးခြင်း", "စက်ရုံဘေးကင်းရေး", "Microsoft Office"],
    description: "စက်ရုံများအတွင်း ကုန်ကြမ်းများ ထုတ်လုပ်မှုလုပ်ငန်းစဉ် တသမတ်တည်းဖြစ်စေရန်နှင့် စံချိန်စံညွှန်းမီစေရန် စောင့်ကြည့်ကြီးကြပ်သည်။",
  }
];

const CATEGORY_MAP = {
  "Infrastructure": "အခြေခံအဆောက်အအုံ",
  "Tech & Electronics": "နည်းပညာနှင့် အီလက်ထရောနစ်",
  "Process & Energy": "စွမ်းအားစနစ်နှင့် စွမ်းအင်"
};

const CATEGORY_EMOJI = {
  "Infrastructure": "🏗️",
  "Tech & Electronics": "💻",
  "Process & Energy": "⚡"
};

const getCareerCategoryStyles = (category: "Infrastructure" | "Tech & Electronics" | "Process & Energy") => {
  switch (category) {
    case "Infrastructure":
      return {
        bg: "bg-purple-50 border-purple-200",
        text: "text-purple-600"
      };
    case "Tech & Electronics":
      return {
        bg: "bg-blue-50 border-blue-200",
        text: "text-blue-600"
      };
    case "Process & Energy":
      return {
        bg: "bg-amber-50 border-amber-200",
        text: "text-amber-600"
      };
    default:
      return {
        bg: "bg-slate-50 border-slate-200",
        text: "text-slate-600"
      };
  }
};

export default function Career() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCareer, setActiveCareer] = useState<CareerItem>(CAREERS[0]);

  const categories = [
    { id: "All", label: "အားလုံး" },
    { id: "Infrastructure", label: "အခြေခံအဆောက်အအုံ" },
    { id: "Tech & Electronics", label: "နည်းပညာနှင့် အီလက်ထရောနစ်" },
    { id: "Process & Energy", label: "စွမ်းအားစနစ်နှင့် စွမ်းအင်" }
  ];

  const filteredCareers = useMemo(() => {
    return CAREERS.filter((career) => {
      const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            career.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || career.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Handle active selection fallback if activeCareer is filtered out
  const displayedActiveCareer = useMemo(() => {
    if (filteredCareers.some(c => c.id === activeCareer.id)) {
      return activeCareer;
    }
    return filteredCareers[0] || null;
  }, [filteredCareers, activeCareer]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
      {/* Header section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-[0_4px_0_#e2e8f0]">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
            💼 အလုပ်အကိုင် လမ်းညွှန် (Careers Directory)
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-bold">
            တက္ကသိုလ်ကျောင်းသားလူငယ်များအတွက် လက်တွေ့ကျပြီး သင့်လျော်သော အလုပ်အကိုင်များနှင့် စတင်လစာနှုန်းထားများကို လေ့လာဆန်းစစ်ပါ။
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="အလုပ်အကိုင်များ ရှာဖွေရန်..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-2xl border-2 border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-green-500 shadow-[0_3px_0_#e2e8f0] transition-all"
          />
        </div>
      </div>

      {/* Main Content Layout - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Job Cards list */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-2xl border-2 transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-green-500 border-green-600 text-white shadow-[0_3px_0_#15803d]"
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 shadow-[0_3px_0_#e2e8f0] active:translate-y-[2px] active:shadow-none"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Careers list */}
          {filteredCareers.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredCareers.map((c) => {
                const styles = getCareerCategoryStyles(c.category);
                const isSelected = displayedActiveCareer?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveCareer(c)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col gap-3 group relative ${
                      isSelected
                        ? "border-green-500 bg-green-50/20 shadow-[0_4px_0_#15803d]"
                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-[0_5px_0_#cbd5e1] hover:border-slate-300 shadow-[0_4px_0_#e2e8f0]"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-black text-sm text-slate-800 group-hover:text-green-600 transition-colors">
                        {CATEGORY_EMOJI[c.category]} {c.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5 items-center mt-1">
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border-2 ${styles.bg} ${styles.text}`}>
                        {CATEGORY_MAP[c.category]}
                      </span>
                      <span className="text-[10px] font-black text-slate-500">
                        💵 {c.salary}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-sm font-bold text-slate-400 bg-white border-2 border-dashed border-slate-200 rounded-2xl shadow-[0_4px_0_#e2e8f0]">
              ရှာဖွေမှုနှင့် ကိုက်ညီသော အလုပ်အကိုင် မရှိပါ။
            </div>
          )}
        </div>

        {/* Right Column: Sticky Detail Panel */}
        <div className="lg:col-span-2">
          {displayedActiveCareer ? (
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col gap-6 shadow-[0_6px_0_#cbd5e1] relative sticky top-24 self-start animate-in fade-in duration-300">
              {(() => {
                const styles = getCareerCategoryStyles(displayedActiveCareer.category);
                return (
                  <>
                    {/* Header: Title and Category badge */}
                    <div className="space-y-3">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border-2 inline-block ${styles.bg} ${styles.text}`}>
                        {CATEGORY_EMOJI[displayedActiveCareer.category]} {CATEGORY_MAP[displayedActiveCareer.category]} ဆိုင်ရာ အလုပ်အကိုင်
                      </span>
                      <h2 className="text-2xl font-black text-slate-800 mt-2">{displayedActiveCareer.title}</h2>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-400 flex items-center gap-1.5">
                        📝 အကျဉ်းချုပ် ဖော်ပြချက် (Description)
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                        {displayedActiveCareer.description}
                      </p>
                    </div>

                    {/* Two Column details: Starting Salary & Recommended Major */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Starting Salary */}
                      <div className="border-2 border-slate-200 rounded-2xl bg-white p-4 shadow-[0_3px_0_#cbd5e1] flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          💵 စတင်လစာ (Starting Salary)
                        </span>
                        <span className="text-xl font-black text-emerald-600">
                          {displayedActiveCareer.salary}
                        </span>
                      </div>

                      {/* Recommended Major */}
                      <div className="border-2 border-slate-200 rounded-2xl bg-white p-4 shadow-[0_3px_0_#cbd5e1] flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          🎓 အကြံပြုထားသော မေဂျာ (Recommended Major)
                        </span>
                        <span className="text-base font-black text-slate-800">
                          {displayedActiveCareer.recommendedMajor}
                        </span>
                      </div>
                    </div>

                    {/* Key Duties (Bulleted) */}
                    <div className="space-y-2.5">
                      <h4 className="font-bold text-slate-400 flex items-center gap-1.5">
                        📌 အဓိက တာဝန်ဝတ္တရားများ (Key Duties)
                      </h4>
                      <ul className="space-y-2 text-slate-600 leading-relaxed font-medium">
                        {displayedActiveCareer.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 bg-slate-50/30 p-2.5 rounded-xl border border-slate-100">
                            <span className="text-green-500 shrink-0 mt-0.5 font-bold">✓</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Skills (Tags) */}
                    <div className="space-y-2.5">
                      <h4 className="font-bold text-slate-400 flex items-center gap-1.5">
                        ⚡ လိုအပ်သော ကျွမ်းကျင်မှုများ (Required Skills)
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {displayedActiveCareer.skills.map((skill, idx) => (
                          <span key={idx} className="bg-slate-50 px-3.5 py-1.5 rounded-full border-2 border-slate-200 text-xs font-bold text-slate-600 shadow-[0_2px_0_#cbd5e1]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-3 bg-white border-2 border-dashed border-slate-200 rounded-3xl shadow-[0_4px_0_#cbd5e1] p-8">
              <span className="text-4xl">🔍</span>
              <h3 className="font-black text-lg text-slate-800">အသေးစိတ်ကြည့်ရှုရန် ရွေးချယ်ပါ</h3>
              <p className="text-sm font-bold text-slate-500 max-w-xs leading-relaxed">
                အလုပ်အကိုင်တစ်ခုချင်းစီ၏ အသေးစိတ်အချက်အလက်များကို ကြည့်ရှုရန် ဘယ်ဘက်စာရင်းမှ ရွေးချယ်ပေးပါ။
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
