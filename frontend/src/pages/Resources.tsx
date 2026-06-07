import { useState, useMemo } from "react";
import { BookOpen, Calendar, GraduationCap, FileText, Users, CheckSquare, Search, Download, ExternalLink, HelpCircle } from "lucide-react";

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
    title: "ပညာသင်နှစ် ပညာရေး စီမံချက်ရေးဆွဲသူ (Semester Academic Planner)",
    category: "Planning",
    description: "သင်တန်းလမ်းကြောင်းများ၊ ခရက်ဒစ်အရေအတွက်များနှင့် မေဂျာများအတွက် လိုအပ်ချက်များကို စီစဉ်ရန် ဘက်စုံသုံး Google Sheets / Excel ပုံစံကြမ်းဖြစ်သည်။",
    type: "Template",
    sizeOrLink: "၁.၂ MB .xlsx",
    icon: Calendar,
  },
  {
    id: 2,
    title: "ဘွဲ့ကြို ပညာသင်ဆု လမ်းညွှန် (Undergraduate Scholarship Index)",
    category: "Finance",
    description: "ပညာသင်ဆု ရှာဖွေရေး အင်ဂျင်များ၊ လျှောက်ထားရန် လိုအပ်ချက်များနှင့် ပိတ်ရက်များကို စုစည်းဖော်ပြထားသော လမ်းညွှန်စာရင်းဖြစ်သည်။",
    type: "Web Portal",
    sizeOrLink: "ပြင်ပ ဒေတာဘေ့စ်",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "တက်ကြွစွာ လေ့လာသင်ယူခြင်း လမ်းညွှန် (Active Learning & Study Guide)",
    category: "Study Tips",
    description: "Pomodoro နည်းလမ်း၊ Feynman နည်းလမ်းနှင့် မှတ်ဉာဏ်ထိန်းသိမ်းမှုဆိုင်ရာ လေ့လာနည်းများကို ဖော်ပြထားသော PDF စာအုပ်ငယ်ဖြစ်သည်။",
    type: "PDF Guide",
    sizeOrLink: "၄.၈ MB .pdf",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "ကိုယ်ရေးအကျဉ်းနှင့် ပို့ဖိုလီယို ရေးဆွဲမှု လမ်းညွှန် (Resume & Portfolio Blueprint)",
    category: "Career Prep",
    description: "အလုပ်သင်လျှောက်ထားရန် အကောင်းဆုံးဖြစ်အောင် ပြင်ဆင်ထားသည့် ကိုယ်ရေးအကျဉ်းပုံစံများ၊ စကားလုံးအသုံးအနှုန်းများနှင့် ဒစ်ဂျစ်တယ်ပို့ဖိုလီယို လမ်းညွှန်ချက်များ ဖြစ်သည်။",
    type: "PDF Guide",
    sizeOrLink: "၂.၁ MB .pdf",
    icon: FileText,
  },
  {
    id: 5,
    title: "ကျောင်းသားဟောင်းများ၏ လမ်းညွှန်မှု ကွန်ရက် (Alumni Mentorship Matchmaker)",
    category: "Career Prep",
    description: "အင်ဂျင်နီယာ၊ ဘဏ္ဍာရေး၊ ကျန်းမာရေးနှင့် ဒီဇိုင်းနယ်ပယ်များတွင် လုပ်ကိုင်နေသော ကျောင်းသားဟောင်းများနှင့် ချိတ်ဆက်ပြီး အကြံဉာဏ်များ ရယူပါ။",
    type: "Web Portal",
    sizeOrLink: "ပေါ်တယ်သို့ ဝင်ရောက်ရန်",
    icon: Users,
  },
  {
    id: 6,
    title: "ပညာရေး ထောက်ပံ့ကြေး ပြင်ဆင်မှု လမ်းညွှန် (Federal Student Aid Prep)",
    category: "Finance",
    description: "ထောက်ပံ့ကြေးအတွက် လိုအပ်သော အခွန်စာရွက်စာတမ်းများ၊ ကိုယ်ရေးအချက်အလက်များနှင့် လျှောက်ထားရန် လိုအပ်သော စာရင်းများဖြစ်သည်။",
    type: "Checklist",
    sizeOrLink: "ပုံနှိပ်ထုတ်ယူနိုင်သော စာရင်း",
    icon: CheckSquare,
  },
];

const CATEGORY_MAP = {
  "Planning": "စီမံကိန်း ရေးဆွဲခြင်း",
  "Finance": "ဘဏ္ဍာရေး",
  "Study Tips": "လေ့လာမှုဆိုင်ရာ အကြံပြုချက်များ",
  "Career Prep": "အလုပ်အကိုင် ပြင်ဆင်မှု"
};

const TYPE_MAP = {
  "Template": "ပုံစံကြမ်း",
  "PDF Guide": "PDF လမ်းညွှန်",
  "Web Portal": "ဝဘ်ပေါ်တယ်",
  "Checklist": "စစ်ဆေးရန်စာရင်း"
};

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: "အားလုံး" },
    { id: "Planning", label: "စီမံကိန်း ရေးဆွဲခြင်း" },
    { id: "Finance", label: "ဘဏ္ဍာရေး" },
    { id: "Study Tips", label: "လေ့လာမှုဆိုင်ရာ အကြံပြုချက်များ" },
    { id: "Career Prep", label: "အလုပ်အကိုင် ပြင်ဆင်မှု" }
  ];

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-[0_4px_0_#e2e8f0]">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
            📚 ကျောင်းသား အရင်းအမြစ်များ
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-bold">
            ပညာရေးစီမံချက်များ ဒေါင်းလုဒ်လုပ်ပါ၊ ပညာသင်ဆု အချက်အလက်များ ရှာဖွေပါ၊ လေ့လာမှုစွမ်းရည် မြှင့်တင်ရန်အတွက် အထောက်အကူပြု ကိရိယာများကို ရယူပါ။
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="အရင်းအမြစ်များ ရှာဖွေရန်..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-2xl border-2 border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-green-500 shadow-[0_3px_0_#e2e8f0] transition-all"
          />
        </div>
      </div>

      {/* Categories Bar */}
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

      {/* Grid Content */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-[0_4px_0_#cbd5e1] transition-all duration-200 flex flex-col gap-4 group hover:-translate-y-1 hover:shadow-[0_6px_0_#cbd5e1] hover:border-slate-300"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-green-50 border-2 border-green-200 text-green-600 flex items-center justify-center shrink-0 shadow-[0_2px_0_#bbf7d0] group-hover:scale-105 transition-transform duration-300">
                  <res.icon className="size-5" />
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border-2 border-slate-200/50">
                    {CATEGORY_MAP[res.category]}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-50 text-green-600 border-2 border-green-200/50">
                    {TYPE_MAP[res.type]}
                  </span>
                </div>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1.5">
                <h3 className="font-black text-base text-slate-800 leading-tight group-hover:text-green-600 transition-colors">{res.title}</h3>
                <p className="text-xs font-bold text-slate-500 leading-relaxed">{res.description}</p>
              </div>

              {/* Footer action */}
              <div className="mt-auto pt-4 border-t-2 border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">
                  ⚡ {res.sizeOrLink}
                </span>

                <button
                  className="rounded-xl gap-1.5 px-4 py-2 border-2 border-slate-200 bg-white text-slate-600 font-bold text-xs shadow-[0_2px_0_#e2e8f0] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none hover:bg-slate-50 transition-all flex items-center cursor-pointer select-none"
                  onClick={() => alert(`"${res.title}" အတွက် စမ်းသပ် ဒေါင်းလုဒ်လုပ်ခြင်း/ဝင်ရောက်ခြင်းကို စတင်နေပါသည်`)}
                >
                  {res.type === "Web Portal" ? (
                    <>
                      <span>ပေါ်တယ်သို့ ဝင်ရန်</span>
                      <ExternalLink className="size-3.5" />
                    </>
                  ) : (
                    <>
                      <span>ဒေါင်းလုဒ်လုပ်ရန်</span>
                      <Download className="size-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center gap-3 bg-white border-2 border-dashed border-slate-200 rounded-3xl shadow-[0_4px_0_#cbd5e1] p-8">
          <HelpCircle className="size-12 text-slate-400" />
          <h3 className="font-black text-lg text-slate-800">အရင်းအမြစ်များ ရှာမတွေ့ပါ</h3>
          <p className="text-sm font-bold text-slate-500 max-w-xs leading-relaxed">
            သင်ရှာဖွေထားသော အချက်အလက်များနှင့် ကိုက်ညီသည့် အရင်းအမြစ်များ မရှိပါ။ ထပ်မံ ကြိုးစားရှာဖွေကြည့်ပါ။
          </p>
        </div>
      )}
    </div>
  );
}
