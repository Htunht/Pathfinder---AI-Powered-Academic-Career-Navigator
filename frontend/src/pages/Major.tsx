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
  Compass,
} from "lucide-react";
import { Button } from "../components/ui/button";

interface MajorItem {
  id: number;
  name: string;
  category: "Engineering" | "Architecture";
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
    name: "ဗိသုကာပညာ",
    category: "Architecture",
    description: "အဆောက်အအုံများနှင့် ပတ်ဝန်းကျင်ဆိုင်ရာ ဒီဇိုင်းများ ရေးဆွဲခြင်းဆိုင်ရာ အနုပညာနှင့် သိပ္ပံပညာရပ်ကို အဓိကထားသည်။ ကျောင်းသားများသည် နေရာလွတ်ဒီဇိုင်း၊ မြို့ပြစီမံကိန်း၊ ဗိသုကာသမိုင်းနှင့် ရေရှည်တည်တံ့သော အဆောက်အအုံနည်းပညာများကို သင်ယူရသည်။",
    difficulty: 4.8,
    duration: "၅ နှစ်",
    courses: [
      "ဗိသုကာ ဒီဇိုင်း",
      "ဗိသုကာပညာ သမိုင်း",
      "ဆောက်လုပ်ရေးပစ္စည်းများနှင့် တည်ဆောက်မှု",
      "ဗိသုကာဆိုင်ရာ ပတ်ဝန်းကျင်သိပ္ပံ",
      "မြို့ပြ စီမံကိန်း ရေးဆွဲခြင်း"
    ],
    jobs: [
      "ဗိသုကာပညာရှင်",
      "မြို့ပြစီမံကိန်း ရေးဆွဲသူ",
      "အိမ်တွင်းဒီဇိုင်းပညာရှင် (Interior Designer)",
      "ပရောဂျက်မန်နေဂျာ",
      "ရှုခင်းဗိသုကာပညာရှင် (Landscape Architect)"
    ],
    icon: Home,
  },
  {
    id: 2,
    name: "ဓာတုအင်ဂျင်နီယာ",
    category: "Engineering",
    description: "ကုန်ကြမ်းပစ္စည်းများကို တန်ဖိုးရှိသော ထုတ်ကုန်များအဖြစ် ဘေးကင်းပြီး ရေရှည်တည်တံ့စွာ ပြောင်းလဲရန် ရုပ်ပိုင်းဆိုင်ရာသိပ္ပံ၊ ဇီဝသိပ္ပံတို့ကို သင်္ချာနှင့် ပေါင်းစပ်သင်ကြားသည်။",
    difficulty: 4.6,
    duration: "၅ နှစ်",
    courses: [
      "ဓာတုဖြစ်စဉ် အခြေခံမူများ",
      "အရည်စက်မှုပညာ (Fluid Mechanics)",
      "အပူနှင့် ဒြပ်ထု လွှဲပြောင်းခြင်း",
      "ဓာတုတုံ့ပြန်မှု အင်ဂျင်နီယာပညာ",
      "စက်ရုံဒီဇိုင်း"
    ],
    jobs: [
      "ဓာတုဖြစ်စဉ် အင်ဂျင်နီယာ",
      "ရေနံချက်စက်ရုံ အင်ဂျင်နီယာ",
      "အရည်အသွေးထိန်းချုပ်မှု မန်နေဂျာ",
      "စားသောက်ကုန် ထုတ်လုပ်မှု အင်ဂျင်နီယာ"
    ],
    icon: FlaskConical,
  },
  {
    id: 3,
    name: "မြို့ပြအင်ဂျင်နီယာ",
    category: "Engineering",
    description: "လမ်းများ၊ တံတားများနှင့် ဆည်များကဲ့သို့သော အခြေခံအဆောက်အအုံများအပါအဝင် ရုပ်ပိုင်းဆိုင်ရာနှင့် သဘာဝပတ်ဝန်းကျင် တည်ဆောက်မှုများကို ဒီဇိုင်းဆွဲခြင်း၊ တည်ဆောက်ခြင်းနှင့် ထိန်းသိမ်းခြင်းတို့ကို လုပ်ဆောင်သည်။",
    difficulty: 4.5,
    duration: "၅ နှစ်",
    courses: [
      "တည်ဆောက်ပုံ ခွဲခြမ်းစိတ်ဖြာခြင်း",
      "အရည်စက်မှုပညာ (Fluid Mechanics)",
      "မြေဆီလွှာစက်မှုပညာနှင့် ဖောင်ဒေးရှင်းအင်ဂျင်နီယာပညာ",
      "သံကူကွန်ကရစ် ဒီဇိုင်း",
      "ပတ်ဝန်းကျင်ထိန်းသိမ်းရေး အင်ဂျင်နီယာပညာ"
    ],
    jobs: [
      "မြို့ပြအင်ဂျင်နီယာ",
      "တည်ဆောက်ရေး အင်ဂျင်နီယာ",
      "လုပ်ငန်းခွင် မန်နေဂျာ (Site Manager)",
      "ဘူမိနည်းပညာ အင်ဂျင်နီယာ",
      "အခြေခံအဆောက်အအုံဆိုင်ရာ အကြံပေး"
    ],
    icon: HardHat,
  },
  {
    id: 4,
    name: "ဆက်သွယ်ရေးအင်ဂျင်နီယာ",
    category: "Engineering",
    description: "ဆက်သွယ်ရေးကွန်ရက်များ၊ အချက်အလက်ပေးပို့ခြင်း၊ ဝိုင်ယာလက်စနစ်များနှင့် ခေတ်မီဆက်သွယ်ရေးအတွက် လိုအပ်သော အခြေခံအဆောက်အအုံများကို အဓိကထားလေ့လာသည်။",
    difficulty: 4.5,
    duration: "၅ နှစ်",
    courses: [
      "အချက်ပြနှင့် စနစ်များ (Signals and Systems)",
      "ဒစ်ဂျစ်တယ် ဆက်သွယ်ရေး",
      "အင်တင်နာနှင့် လှိုင်းပျံ့နှံ့မှု",
      "မိုဘိုင်းဆက်သွယ်ရေးစနစ်များ",
      "ဖိုင်ဘာအော်ပတစ်ကွန်ရက်များ"
    ],
    jobs: [
      "ဆက်သွယ်ရေး အင်ဂျင်နီယာ",
      "ကွန်ရက် စီမံခန့်ခွဲသူ (Network Administrator)",
      "ရေဒီယိုကြိမ်နှုန်း (RF) အင်ဂျင်နီယာ",
      "စနစ်အင်ဂျင်နင်ယာ (Systems Engineer)"
    ],
    icon: Radio,
  },
  {
    id: 5,
    name: "လျှပ်စစ်စွမ်းအား အင်ဂျင်နီယာ",
    category: "Engineering",
    description: "လျှပ်စစ်စွမ်းအား ဓာတ်အားပေးစနစ် ဘေးကင်းရေးနှင့် ပြန်လည်ပြည့်ဖြိုးမြဲစွမ်းအင်များကို အဓိကထား၍ လျှပ်စစ်စွမ်းအင် ထုတ်လုပ်ခြင်း၊ ပို့လွှတ်ခြင်း၊ ဖြန့်ဖြူးခြင်းနှင့် အသုံးပြုခြင်းတို့ကို လေ့လာသည်။",
    difficulty: 4.6,
    duration: "၅ နှစ်",
    courses: [
      "လျှပ်စစ်စက်ကိရိယာများ (Electrical Machines)",
      "ဓာတ်အားစနစ် ခွဲခြမ်းစိတ်ဖြာခြင်း",
      "ဗို့အားမြင့် အင်ဂျင်နီယာပညာ",
      "ပါဝါအီလက်ထရောနစ်",
      "ဓာတ်အားစနစ် ကာကွယ်ရေးစနစ်"
    ],
    jobs: [
      "ဓာတ်အားလိုင်း အင်ဂျင်နီယာ",
      "လျှပ်စစ်ဒီဇိုင်း အင်ဂျင်နီယာ",
      "ထိန်းသိမ်းရေး အင်ဂျင်နီယာ",
      "ပြန်လည်ပြည့်ဖြိုးမြဲစွမ်းအင် အကြံပေး"
    ],
    icon: Zap,
  },
  {
    id: 6,
    name: "အီလက်ထရောနစ်အင်ဂျင်နီယာ",
    category: "Engineering",
    description: "အလိုအလျောက်စနစ်နှင့် လူသုံးကုန်အီလက်ထရောနစ်ပစ္စည်းများတွင် အသုံးပြုသည့် အီလက်ထရောနစ်ပတ်လမ်းများ၊ ဆီမီးကွန်ဒက်တာ ကိရိယာများ၊ မြှုပ်နှံစနစ်များ (Embedded Systems) နှင့် မိုက်ခရိုပရိုဆက်ဆာများကို အဓိကထားလေ့လာသည်။",
    difficulty: 4.7,
    duration: "၅ နှစ်",
    courses: [
      "အင်နာလော့နှင့် ဒစ်ဂျစ်တယ် ပတ်လမ်းဒီဇိုင်း",
      "မိုက်ခရိုပရိုဆက်ဆာနှင့် မိုက်ခရိုကွန်ထရိုလာများ",
      "လျှပ်စစ်သံလိုက်စက်ကွင်းများ",
      "အီလက်ထရောနစ်ပတ်လမ်း ခွဲခြမ်းစိတ်ဖြာခြင်း"
    ],
    jobs: [
      "အီလက်ထရောနစ် အင်ဂျင်နီယာ",
      "မြှုပ်နှံစနစ်များ ရေးဆွဲသူ (Embedded Systems Developer)",
      "ဟာ့ဒ်ဝဲလ်ဒီဇိုင်း အင်ဂျင်နီယာ",
      "အလိုအလျောက်စနစ် ကျွမ်းကျင်သူ"
    ],
    icon: Cpu,
  },
  {
    id: 7,
    name: "ကွန်ပျူတာအင်ဂျင်နီယာနှင့် အိုင်တီ",
    category: "Engineering",
    description: "စမတ်ကွန်ပျူတာစနစ်များ၊ ကွန်ရက်များနှင့် အဆင့်မြင့်ဆော့ဖ်ဝဲလ်များကို ဒီဇိုင်းဆွဲရန် ဟာ့ဒ်ဝဲလ်အင်ဂျင်နီယာပညာနှင့် ဆော့ဖ်ဝဲလ်ဖွံ့ဖြိုးတိုးတက်ရေးတို့ကို ပေါင်းစပ်သင်ကြားပေးသည်။",
    difficulty: 4.8,
    duration: "၅ နှစ်",
    courses: [
      "ဒေတာတည်ဆောက်ပုံနှင့် အယ်လ်ဂိုရီသမ်များ (Data Structures & Algorithms)",
      "ဒေတာဘေ့စ် စီမံခန့်ခွဲမှုစနစ်များ",
      "ကွန်ပျူတာ တည်ဆောက်ပုံစနစ်",
      "လုပ်ငန်းလည်ပတ်မှုစနစ်များ (Operating Systems)",
      "ဆော့ဖ်ဝဲလ် အင်ဂျင်နီယာပညာ"
    ],
    jobs: [
      "ဆော့ဖ်ဝဲလ် အင်ဂျင်နီယာ",
      "Full-Stack Developer",
      "ကွန်ရက်အင်ဂျင်နီယာ",
      "အိုင်တီအကြံပေး",
      "ဒေတာဘေ့စ် စီမံခန့်ခွဲသူ (Database Administrator)"
    ],
    icon: Cpu,
  },
  {
    id: 8,
    name: "စက်မှုအင်ဂျင်နီယာ",
    category: "Engineering",
    description: "စက်မှုနှင့် အပူစွမ်းအင်သုံးစနစ်များ၏ ဒီဇိုင်း၊ ခွဲခြမ်းစိတ်ဖြာမှု၊ ထုတ်လုပ်မှုနှင့် ထိန်းသိမ်းမှုတို့ကို အဓိကထားသည့် အကျယ်ပြန့်ဆုံးသော နယ်ပယ်တစ်ခုဖြစ်သည်။",
    difficulty: 4.7,
    duration: "၅ နှစ်",
    courses: [
      "သာမိုဒိုင်းနမစ် (Thermodynamics)",
      "အရည်စက်မှုပညာ (Fluid Mechanics)",
      "စက်ကိရိယာများဆိုင်ရာ စက်မှုပညာ",
      "စက်ဒီဇိုင်း",
      "အပူလွှဲပြောင်းခြင်း"
    ],
    jobs: [
      "စက်မှုအင်ဂျင်နီယာ",
      "HVAC အင်ဂျင်နီယာ (လေအေးပေးစနစ်)",
      "စက်ရုံထိန်းသိမ်းရေး အင်ဂျင်နီယာ",
      "မော်တော်ယာဉ် အင်ဂျင်နီယာ"
    ],
    icon: Settings,
  },
  {
    id: 9,
    name: "မက္ကာထရောနစ်အင်ဂျင်နီယာ",
    category: "Engineering",
    description: "အလိုအလျောက်စနစ်နှင့် စက်ရုပ်စက်ပစ္စည်းများကို ဒီဇိုင်းဆွဲရန် စက်မှုအင်ဂျင်နီယာ၊ အီလက်ထရောနစ်၊ ကွန်ပျူတာအင်ဂျင်နီယာနှင့် ထိန်းချုပ်မှုစနစ်များကို ပေါင်းစပ်ထားသော နယ်ပယ်တစ်ခု ဖြစ်သည်။",
    difficulty: 4.8,
    duration: "၅ နှစ်",
    courses: [
      "စက်ရုပ်နည်းပညာနှင့် အလိုအလျောက်စနစ်",
      "ထိန်းချုပ်မှုစနစ်များ",
      "ဆင်ဆာနှင့် လှုပ်ရှားကိရိယာများ (Sensors & Actuators)",
      "PLC ပရိုဂရမ်ရေးဆွဲခြင်း",
      "မိုက်ခရိုကွန်ထရိုလာ အသုံးပြုမှုများ"
    ],
    jobs: [
      "အလိုအလျောက်စနစ် အင်ဂျင်နီယာ",
      "စက်ရုပ်နည်းပညာ ကျွမ်းကျင်သူ",
      "ထိန်းချုပ်မှုစနစ် အင်ဂျင်နီယာ",
      "တိုင်းတာမှုနှင့် ထိန်းချုပ်မှု အင်ဂျင်နီယာ"
    ],
    icon: Bot,
  },
  {
    id: 10,
    name: "သတ္တုဗေဒအင်ဂျင်နီယာ",
    category: "Engineering",
    description: "သတ္တုဒြပ်စင်များ၊ ၎င်းတို့၏ သတ္တုဒြပ်ပေါင်းများနှင့် ၎င်းတို့၏ အရောအနှောများ (သတ္တုစပ်များ) ၏ ရုပ်ပိုင်းဆိုင်ရာနှင့် ဓာတုဗေဒဆိုင်ရာ အပြုအမူများကို လေ့လာသည်။",
    difficulty: 4.4,
    duration: "၅ နှစ်",
    courses: [
      "ရုပ်ပိုင်းဆိုင်ရာ သတ္တုဗေဒ",
      "သတ္တုထုတ်ယူခြင်းပညာ",
      "ကုန်ကြမ်းသိပ္ပံ",
      "သတ္တုသွန်းလောင်းခြင်း အင်ဂျင်နီယာပညာ",
      "သတ္တုချေးတက်ခြင်း ကာကွယ်ရေး အင်ဂျင်နီယာပညာ"
    ],
    jobs: [
      "သတ္တုဗေဒအင်ဂျင်နီယာ",
      "ကုန်ကြမ်းအင်ဂျင်နီယာ",
      "အရည်အသွေး အာမခံချက် အင်ဂျင်နီယာ",
      "ဂဟေဆက်ခြင်း အင်ဂျင်နီယာ"
    ],
    icon: Flame,
  },
  {
    id: 11,
    name: "သတ္တုတွင်းအင်ဂျင်နီယာ",
    category: "Engineering",
    description: "ဘေးကင်းရေး၊ စီးပွားရေးအရ တွက်ခြေကိုက်မှုနှင့် ပတ်ဝန်းကျင်ရေရှည်တည်တံ့မှုတို့ကို အဓိကထား၍ မြေအောက်၊ မြေပြင် သို့မဟုတ် မြေတွင်းမှ သတ္တုသယံဇာတများ ထုတ်ယူခြင်းကို လုပ်ဆောင်သည်။",
    difficulty: 4.5,
    duration: "၅ နှစ်",
    courses: [
      "မြေပြင်သတ္တုတွင်း တူးဖော်ခြင်း",
      "မြေအောက်သတ္တုတွင်း တည်းဆောက်မှုနည်းပညာ",
      "ကျောက်စက်မှုပညာ (Rock Mechanics)",
      "သတ္တုသန့်စင်ခြင်း",
      "မိုင်းတွင်းဘေးကင်းရေးနှင့် စီမံခန့်ခွဲမှု"
    ],
    jobs: [
      "သတ္တုတွင်းအင်ဂျင်နီယာ",
      "မိုင်းတွင်းမန်နေဂျာ",
      "တူးဖော်ရေး အင်ဂျင်နီယာ",
      "ဘူမိနည်းပညာဆိုင်ရာ အကြံပေး"
    ],
    icon: Pickaxe,
  },
  {
    id: 12,
    name: "ရေနံအင်ဂျင်နီယာ",
    category: "Engineering",
    description: "ရေနံနှင့် သဘာဝဓာတ်ငွေ့ သယံဇာတများကို ရှာဖွေခြင်း၊ တူးဖော်ခြင်း၊ ထုတ်ယူခြင်းနှင့် ထုတ်လုပ်ခြင်းတို့ကို အဓိကထား လုပ်ဆောင်သည်။",
    difficulty: 4.7,
    duration: "၅ နှစ်",
    courses: [
      "တူးဖော်ရေး အင်ဂျင်နီယာပညာ",
      "ရေနံသိုလှောင်ကန် အင်ဂျင်နီယာပညာ (Reservoir)",
      "ရေနံထုတ်လုပ်မှု အင်ဂျင်နီယာပညာ",
      "တွင်းမှတ်တမ်းဆန်းစစ်ခြင်း (Well Logging)",
      "တွင်းစမ်းသပ်ခြင်း"
    ],
    jobs: [
      "ရေနံအင်ဂျင်နီယာ",
      "ရေနံသိုလှောင်ကန် အင်ဂျင်နီယာ",
      "တူးဖော်ရေး ကြီးကြပ်သူ",
      "ထုတ်လုပ်မှု လေ့လာဆန်းစစ်သူ"
    ],
    icon: Flame,
  },
  {
    id: 13,
    name: "အထည်အလိပ်အင်ဂျင်နီယာ",
    category: "Engineering",
    description: "ချည်မျှင်၊ အထည်အလိပ်နှင့် အဝတ်အထည်များ ထုတ်လုပ်မှု လုပ်ငန်းစဉ်များ၊ ထုတ်ကုန်များနှင့် စက်ပစ္စည်းများ၏ ဒီဇိုင်း၊ ထုတ်လုပ်မှုနှင့် ထိန်းချုပ်မှုတို့တွင် အင်ဂျင်နီယာဆိုင်ရာ အခြေခံမူများကို အသုံးချသည်။",
    difficulty: 4.2,
    duration: "၅ နှစ်",
    courses: [
      "ချည်မျှင်သိပ္ပံ",
      "ချည်ငင်ထုတ်လုပ်မှုပညာ",
      "အထည်ယက်လုပ်မှုပညာ",
      "အထည်အလိပ်ဓာတုဗေဒနှင့် ဆေးဆိုးခြင်းလုပ်ငန်းစဉ်",
      "အထည်ချုပ်နည်းပညာ"
    ],
    jobs: [
      "အထည်အလိပ် အင်ဂျင်နီယာ",
      "ထုတ်လုပ်မှု မန်နေဂျာ",
      "အရည်အသွေးထိန်းချုပ်မှု ကျွမ်းကျင်သူ",
      "အဝတ်အထည် ထုတ်ကုန်ရေးဆွဲသူ"
    ],
    icon: Scissors,
  }
];

const getCategoryStyles = (category: "Engineering" | "Architecture") => {
  switch (category) {
    case "Engineering":
      return {
        bg: "bg-blue-50 text-blue-700 border-blue-200",
        text: "text-blue-700",
        iconBg: "bg-blue-50 text-blue-700 border-blue-200",
        iconBorder: "border-blue-200"
      };
    case "Architecture":
      return {
        bg: "bg-purple-50 text-purple-700 border-purple-200",
        text: "text-purple-700",
        iconBg: "bg-purple-50 text-purple-700 border-purple-200",
        iconBorder: "border-purple-200"
      };
    default:
      return {
        bg: "bg-slate-50 border-slate-200 text-slate-600",
        text: "text-slate-600",
        iconBg: "bg-slate-50 border-slate-200 text-slate-600",
        iconBorder: "border-slate-200"
      };
  }
};

const getCategoryColorStyles = (isActive: boolean) => {
  if (isActive) {
    return "border-green-500 bg-green-50 text-green-700 shadow-[0_4px_0_#15803d]";
  } else {
    return "bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:-translate-y-0.5 hover:shadow-[0_4px_0_#cbd5e1] shadow-[0_3px_0_#cbd5e1]";
  }
};

const getDifficultyDetails = (difficulty: number) => {
  if (difficulty >= 4.5) {
    return {
      label: "ခက်ခဲ/အဆင့်မြင့်",
      color: "bg-rose-50 text-rose-700 border-rose-200",
    };
  } else if (difficulty >= 3.8) {
    return {
      label: "အလယ်အလတ်",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    };
  } else {
    return {
      label: "ပုံမှန်",
      color: "bg-green-50 text-green-700 border-green-200",
    };
  }
};

export default function Major() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMajor, setSelectedMajor] = useState<MajorItem | null>(null);

  const filteredMajors = useMemo(() => {
    return MAJORS.filter((major) => {
      const matchesSearch =
        major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        major.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        major.courses.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
        major.jobs.some(j => j.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        selectedCategory === "All" || major.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 md:gap-8">
      
      {/* Header section with gamified background */}
      <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-slate-200 p-6 md:p-8 flex flex-col gap-4 shadow-[0_6px_0_#cbd5e1]">
        <div className="space-y-1.5 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
            ပညာရေး မေဂျာများနှင့် ဌာနများ 🎓
          </h1>
          <p className="text-sm font-semibold text-slate-500 leading-relaxed">
            ပညာရေးဌာနများနှင့် မေဂျာများ၏ ခြုံငုံသုံးသပ်ချက်။ အောက်ပါကဏ္ဍတစ်ခုကို ရွေးချယ်ပါ သို့မဟုတ် သင်တန်းများနှင့် အသက်မွေးဝမ်းကျောင်းများကို ရှာဖွေပါ။
          </p>
        </div>

        {/* Integrated Search and Info */}
        <div className="flex flex-col sm:flex-row gap-3 items-center w-full mt-1">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="မေဂျာ၊ သင်တန်း သို့မဟုတ် အလုပ်များဖြင့် ရှာဖွေပါ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-10 pr-10 rounded-2xl border-2 border-slate-200 bg-white text-sm placeholder:text-slate-400 outline-none focus:border-green-500 focus:shadow-[0_3px_0_#15803d] transition-all shadow-[0_3px_0_#cbd5e1]"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 border-2 border-slate-200 px-4 h-12 rounded-2xl shrink-0 w-full sm:w-auto justify-center font-mono">
            <Clock className="size-4 text-green-500" />
            <span>၅ နှစ်သင်တန်း ဘွဲ့ဒီဂရီများ</span>
          </div>
        </div>
      </div>

      {/* Visual Category Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { id: "All", name: "မေဂျာအားလုံး", desc: "အားလုံးကို ကြည့်ရန်", count: MAJORS.length, color: "slate", icon: Compass },
          { id: "Engineering", name: "အင်ဂျင်နီယာ", desc: "ဒီဇိုင်းနှင့် တည်ဆောက်ရေး", count: MAJORS.filter(m => m.category === "Engineering").length, color: "blue", icon: Cpu },
          { id: "Architecture", name: "ဗိသုကာ", desc: "နေရာလွတ် ဒီဇိုင်းပုံစံများ", count: MAJORS.filter(m => m.category === "Architecture").length, color: "purple", icon: Home },
        ].map((cat) => {
          const isActive = selectedCategory === cat.id;
          const colorStyles = getCategoryColorStyles(isActive);
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-5 rounded-3xl border-2 text-left flex flex-col justify-between gap-4 transition-all duration-150 cursor-pointer select-none active:translate-y-1 active:shadow-none ${colorStyles}`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`p-2.5 rounded-2xl bg-white border-2 border-slate-100 text-slate-500 shadow-none ${isActive ? "text-green-600 border-green-200 bg-green-55" : ""}`}>
                  <cat.icon className="size-5" />
                </div>
                <span className={`text-[10px] font-mono font-bold border px-2 py-0.5 rounded-full ${isActive ? "bg-green-100 border-green-300 text-green-700" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
                  {cat.count}
                </span>
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-base tracking-tight">{cat.name}</h3>
                <p className="text-xs font-bold text-slate-400 mt-1 line-clamp-1">{cat.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Grid List */}
      {filteredMajors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMajors.map((major) => {
            const styles = getCategoryStyles(major.category);
            const difficulty = getDifficultyDetails(major.difficulty);
            return (
              <div
                key={major.id}
                onClick={() => setSelectedMajor(major)}
                className="bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 cursor-pointer flex flex-row sm:flex-col items-center sm:items-start gap-4 relative group hover:-translate-y-1 hover:shadow-[0_6px_0_#cbd5e1] shadow-[0_4px_0_#cbd5e1] transition-all duration-150"
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 shrink-0 transition-all duration-300 group-hover:scale-105 ${styles.iconBg} ${styles.iconBorder}`}>
                  <major.icon className="size-5.5" />
                </div>

                {/* Info Area */}
                <div className="flex-1 min-w-0 space-y-2 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${styles.bg} ${styles.text}`}>
                      {major.category === "Engineering" ? "အင်ဂျင်နီယာ" : "ဗိသုကာ"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-black hidden sm:inline">
                      {major.duration}
                    </span>
                  </div>

                  <h3 className="font-black text-sm md:text-base text-slate-800 tracking-tight group-hover:text-green-600 transition-colors truncate">
                    {major.name}
                  </h3>

                  {/* Badges / Stats (Only visible on desktop/tablet) */}
                  <div className="hidden sm:flex items-center gap-1.5 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono font-bold">
                    <span>{major.duration}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-full border ${difficulty.color} font-black text-[9px] uppercase tracking-wider`}>
                      {difficulty.label}
                    </span>
                  </div>

                  {/* Mobile Stats (Visual layout on mobile) */}
                  <div className="flex sm:hidden items-center gap-1.5 text-[10px] text-slate-400 font-mono font-bold">
                    <span>{major.duration}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-full border ${difficulty.color} font-black text-[9px] uppercase tracking-wider`}>
                      {difficulty.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center flex flex-col items-center gap-3 border-2 border-slate-200 rounded-3xl bg-white shadow-[0_4px_0_#e2e8f0]">
          <Info className="size-10 text-slate-400" />
          <h3 className="font-black text-lg text-slate-800">ရှာမတွေ့ပါ ❌</h3>
          <p className="text-sm font-semibold text-slate-500 max-w-xs">
            "{searchTerm}" နှင့် ကိုက်ညီသော ဌာန သို့မဟုတ် မေဂျာ မရှိပါ။ ထပ်မံ ကြိုးစားရှာဖွေကြည့်ပါ။
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedMajor && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border-2 border-slate-200 rounded-3xl w-full max-w-xl shadow-[0_12px_0_#cbd5e1] overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            {(() => {
              const styles = getCategoryStyles(selectedMajor.category);
              return (
                <>
                  <div className="p-6 border-b-2 border-slate-100 flex items-start justify-between bg-slate-50/50">
                    <div className="flex gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 ${styles.iconBg} ${styles.iconBorder}`}>
                        <selectedMajor.icon className="size-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-800 leading-tight tracking-tight">{selectedMajor.name}</h2>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border mt-1.5 inline-block ${styles.bg} ${styles.text}`}>
                          {selectedMajor.category === "Engineering" ? "အင်ဂျင်နီယာ" : "ဗိသုကာ"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMajor(null)}
                      className="p-2 rounded-xl border-2 border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all cursor-pointer bg-white"
                    >
                      <X className="size-4.5" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 flex flex-col gap-5 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">💡 ခြုံငုံသုံးသပ်ချက်</h4>
                      <p className="text-sm font-semibold text-slate-600 leading-relaxed">{selectedMajor.description}</p>
                    </div>

                    {/* Stats badges */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 font-mono">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ကြာမြင့်ချိန်</span>
                        <span className="text-sm font-black text-slate-800">{selectedMajor.duration}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ခက်ခဲမှုအဆင့်</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-black text-slate-800">{selectedMajor.difficulty}/၅</span>
                          <div className="flex text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3 ${
                                  i < Math.floor(selectedMajor.difficulty)
                                    ? "fill-current"
                                    : "text-slate-300"
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
                      <div className="space-y-3.5">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          📚 <span>အဓိက ဘာသာရပ်များ</span>
                        </h4>
                        <ul className="space-y-2">
                          {selectedMajor.courses.map((course, idx) => (
                            <li key={idx} className="text-xs font-bold text-slate-600 bg-slate-50 border-2 border-slate-100/50 p-2.5 px-3 rounded-2xl">
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Careers / Outcomes */}
                      <div className="space-y-3.5">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          💼 <span>လူကြိုက်များသော အလုပ်အကိုင်များ</span>
                        </h4>
                        <ul className="space-y-2">
                          {selectedMajor.jobs.map((job, idx) => (
                            <li key={idx} className="text-xs font-bold text-slate-600 bg-slate-50 border-2 border-slate-100/50 p-2.5 px-3 rounded-2xl">
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
            <div className="p-4 border-t-2 border-slate-100 bg-slate-50/50 flex justify-end">
              <button 
                onClick={() => setSelectedMajor(null)} 
                className="bg-green-500 hover:bg-green-600 text-white font-black px-6 py-3 rounded-2xl border-b-4 border-green-700 active:border-b-0 active:translate-y-[4px] transition-all cursor-pointer text-sm shadow-sm font-sans"
              >
                ပိတ်ရန်
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
