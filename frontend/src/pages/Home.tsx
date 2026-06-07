import { Link } from "react-router";
import { ClipboardList, GraduationCap, Briefcase, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const cards = [
    {
      title: "🎯 မေဂျာ ရွေးချယ်မှု စစ်ဆေးခြင်း",
      path: user ? "/major-test" : "/signup",
      description: user 
        ? "သင့်ဝါသနာနှင့် အလုပ်လုပ်ပုံပုံစံနှင့် ကိုက်ညီမည့် နယ်ပယ်များကို ရှာဖွေရန် မေးခွန်း ၁၅ ခုပါသော ဉာဏ်စမ်းမေးခွန်းကို ဖြေဆိုပါ။"
        : "သင့်ဝါသနာနှင့် ကိုက်ညီမည့် နယ်ပယ်များကို ရှာဖွေရန် အကောင့်ဖွင့်ပြီး မေးခွန်း ၁၅ ခုပါသော ဉာဏ်စမ်းမေးခွန်းကို ဖြေဆိုပါ။",
      icon: ClipboardList,
      color: "border-slate-200 text-slate-500",
      cta: user ? "စစ်ဆေးမှု စတင်ရန်" : "စတင်ရန် အကောင့်ဖွင့်ပါ",
    },
    {
      title: "🎓 မေဂျာများ ရှာဖွေလေ့လာရန်",
      path: "/major",
      description: "ဘွဲ့ကြိုသင်တန်း မေဂျာများကို ရှာဖွေပြီး လိုအပ်သော သင်ရိုးညွှန်းတမ်းများနှင့် လူကြိုက်များသော လမ်းကြောင်းများကို လေ့လာပါ။",
      icon: GraduationCap,
      color: "border-slate-200 text-slate-500",
      cta: "မေဂျာများ လေ့လာရန်",
    },
    {
      title: "💼 အလုပ်အကိုင် အလားအလာများ",
      path: "/career",
      description: "တိုးတက်မှု အလားအလာရှိသော အသက်မွေးဝမ်းကျောင်းများ၊ ပျှမ်းမျှလစာများ၊ ၁၀ နှစ်တာ အလုပ်အကိုင် တိုးတက်မှုနှုန်းနှင့် လိုအပ်သော ဘွဲ့ဒီဂရီများကို လေ့လာပါ။",
      icon: Briefcase,
      color: "border-slate-200 text-slate-500",
      cta: "အလုပ်အကိုင်များ လေ့လာရန်",
    },
    {
      title: "📚 ကျောင်းသား အရင်းအမြစ်များ",
      path: "/resources",
      description: "ပညာရေးဆိုင်ရာ ခြေရာခံကိရိယာများ၊ ကိုယ်ရေးအကျဉ်း (Resume) ပုံစံကြမ်းများကို ဒေါင်းလုဒ်လုပ်ပါ သို့မဟုတ် ပညာသင်ဆု အချက်အလက်များကို ရှာဖွေပါ။",
      icon: BookOpen,
      color: "border-slate-200 text-slate-500",
      cta: "အရင်းအမြစ်များ ကြည့်ရှုရန်",
    },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col gap-16 items-center justify-center animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-100 border-2 border-green-500/20 text-xs font-bold text-green-700 animate-pulse">
          <Sparkles className="size-3.5" />
          <span>အသစ် - React Compiler ကို အသုံးပြုထားသည်</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-slate-900 text-center">
          သင်၏ ပညာရေးနှင့် အနာဂတ် အလုပ်အကိုင် လမ်းကြောင်းကို ပုံဖော်ပါ 🚀
        </h1>
        
        <p className="text-slate-500 font-semibold text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
          ကျောင်းသားများ မိမိတို့၏ ပညာရေး အားသာချက်များကို ရှာဖွေဖော်ထုတ်ရန်၊ အလုပ်အကိုင် ဈေးကွက်ခန့်မှန်းချက်များကို နှိုင်းယှဉ်ရန်နှင့် အနာဂတ်တွင် အောင်မြင်မှုရရှိရန် လိုအပ်သော ကိရိယာများကို ပြင်ဆင်နိုင်ရန် ကူညီပေးလျက်ရှိသည်။
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
          {user ? (
            <Link to="/major-test" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-black text-base px-8 py-4 rounded-2xl border-b-4 border-green-700 hover:-translate-y-0.5 active:translate-y-[4px] active:border-b-0 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md">
                <span>🎯 ဉာဏ်စမ်းမေးခွန်း စတင်ရန်</span>
                <ArrowRight className="size-4.5" />
              </button>
            </Link>
          ) : (
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-black text-base px-8 py-4 rounded-2xl border-b-4 border-green-700 hover:-translate-y-0.5 active:translate-y-[4px] active:border-b-0 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md">
                <span>🎯 ဉာဏ်စမ်းမေးခွန်း ဖြေဆိုရန် အကောင့်ဖွင့်ပါ</span>
                <ArrowRight className="size-4.5" />
              </button>
            </Link>
          )}
          <Link to="/major" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-600 font-black text-base px-8 py-4 rounded-2xl border-2 border-slate-200 border-b-4 border-slate-300 hover:-translate-y-0.5 active:translate-y-[2px] active:border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_0_#cbd5e1]">
              မေဂျာများ လမ်းညွှန်ကို လေ့လာပါ
            </button>
          </Link>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {cards.map((c, i) => (
          <Link
            key={i}
            to={c.path}
            className={`p-6 rounded-3xl border-2 ${c.color} bg-white hover:-translate-y-1 hover:shadow-[0_8px_0_#cbd5e1] shadow-[0_6px_0_#cbd5e1] transition-all duration-200 flex flex-col gap-4 group cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-green-50 border-2 border-green-100 flex items-center justify-center text-green-600 shadow-none">
                <c.icon className="size-6 shrink-0" />
              </div>
              <div className="text-slate-300 group-hover:text-green-500 transition-colors">
                <ArrowRight className="size-5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-slate-800 leading-snug group-hover:text-green-600 transition-colors">
                {c.title}
              </h3>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                {c.description}
              </p>
            </div>

            <div className="mt-auto pt-2 text-xs font-black text-green-600 uppercase tracking-widest flex items-center gap-1.5">
              <span>{c.cta}</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Sign Up CTA Section */}
      {!user && (
        <div className="w-full bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-[0_6px_0_#cbd5e1] flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-200">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 border-2 border-green-500/20 text-xs font-bold text-green-700">
              <Sparkles className="size-3" />
              <span>စိတ်ကြိုက်အတွေ့အကြုံ</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
              သင်၏ တိုးတက်မှုများကို သိမ်းဆည်းရန် အဆင်သင့်ဖြစ်ပြီလား?
            </h2>
            <p className="text-slate-500 font-semibold text-sm md:text-base max-w-xl leading-relaxed">
              သင်၏ ဉာဏ်စမ်းမေးခွန်း အဖြေများကို သိမ်းဆည်းရန်၊ အကြံပြုထားသော မေဂျာများကို မှတ်သားထားရန်နှင့် အလုပ်အကိုင် လေ့လာရေးခရီးစဉ်ကို ခြေရာခံရန် အခမဲ့အကောင့်တစ်ခု ဖွင့်လိုက်ပါ။
            </p>
          </div>
          <Link to="/signup" className="w-full md:w-auto shrink-0">
            <button className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-black text-base px-8 py-4 rounded-2xl border-b-4 border-green-700 hover:-translate-y-0.5 active:translate-y-[4px] active:border-b-0 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md">
              <span>အခမဲ့ အကောင့်ဖွင့်ရန်</span>
              <ArrowRight className="size-4" />
            </button>
          </Link>
        </div>
      )}

    </div>
  );
}
