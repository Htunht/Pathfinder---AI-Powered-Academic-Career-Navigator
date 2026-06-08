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
import MajorDetailsHub from "../components/MajorDetailsHub";

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
  topSkills: string[];
  seniorTips: string;
  activitiesPhotos: string[];
  careerRoadmap: string[];
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
    topSkills: ["3D Modeling", "Spatial Design", "SketchUp & Lumion", "Architectural Drawing"],
    seniorTips: "ဒီဇိုင်းဆွဲတဲ့အခါ တီထွင်ဖန်တီးနိုင်စွမ်းရှိဖို့ လိုသလို ကျောင်းက Studio တွေမှာ သူငယ်ချင်းတွေနဲ့ ညမအိပ်ဘဲ ပရောဂျက်လုပ်ရတဲ့အတွေ့အကြုံက ဘဝတစ်လျှောက်လုံးအတွက် အမှတ်တရဖြစ်စေမှာပါ။",
    activitiesPhotos: ["/images/architecture_activity.png"],
    careerRoadmap: ["Year 1: Architectural Sketching & Forms", "Year 2: History of Architecture & Space Planning", "Year 3: Structural Building Technology", "Year 4: Urban Planning & Landscape Design", "Year 5: Thesis Design Studio"]
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
    topSkills: ["Structural Analysis", "AutoCAD & Revit", "Project Management", "Geotechnical Engineering"],
    seniorTips: "လက်တွေ့လုပ်ငန်းခွင်ဆင်းရတာ စိတ်ဝင်စားဖို့ကောင်းသလို၊ သီအိုရီပိုင်း တွက်ချက်မှုတွေကိုလည်း အခြေခံပိုင်ပိုင်နိုင်နိုင် လေ့လာထားဖို့ အကြံပြုချင်ပါတယ်။ Site visit တွေ သေချာလိုက်ခဲ့ပါ!",
    activitiesPhotos: ["/images/civil_engineering_activity.png"],
    careerRoadmap: ["Year 1: Foundation of Math & Mechanics", "Year 2: Surveying & Fluid Dynamics", "Year 3: Concrete & Structural Design", "Year 4: Geotechnical & Transport Engineering", "Year 5: Graduation Thesis & Internships"]
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
    topSkills: ["Power Grid Analysis", "Electrical Safety", "Power Electronics", "Renewable Energy"],
    seniorTips: "High voltage စနစ်တွေနဲ့ အလုပ်လုပ်ရမှာဖြစ်လို့ Safety protocol တွေကို စနစ်တကျ သင်ယူထားဖို့ လိုအပ်ပါတယ်။ လျှပ်စစ်ဓာတ်အားပေးစက်ရုံ လေ့လာရေးခရီးစဉ်တွေကို မလွတ်တမ်းလိုက်ပါ။",
    activitiesPhotos: ["/images/tech_lab_activity.png"],
    careerRoadmap: ["Year 1: Electrical Fundamentals", "Year 2: AC/DC Machines & Power Systems", "Year 3: High Voltage Engineering", "Year 4: Renewable Power Integration", "Year 5: Power Transmission Thesis"]
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
    topSkills: ["Circuit Design", "Embedded Systems", "PCB Design", "Microcontrollers"],
    seniorTips: "Arduino သို့မဟုတ် Raspberry Pi နဲ့ ကိုယ်တိုင် အိမ်မှာ hardware ပရောဂျက်လေးတွေ လုပ်ကြည့်ပါ။ Circuit design ဆွဲတတ်ဖို့ အရမ်းအရေးကြီးပါတယ်။",
    activitiesPhotos: ["/images/tech_lab_activity.png"],
    careerRoadmap: ["Year 1: Basic Electrical Circuits", "Year 2: Analog & Digital Electronics", "Year 3: Microprocessor Systems", "Year 4: Signal Processing & VLSI Design", "Year 5: Embedded Systems Capstone Project"]
  },
  {
    id: 7,
    name: "ကွန်ပျူတာအင်ဂျင်နီယာနှင့် သတင်းအချက်အလက်နည်းပညာ",
    category: "Engineering",
    description: "ကွန်ပျူတာ ဟာ့ဒ်ဝဲလ်၊ ဆော့ဖ်ဝဲလ်စနစ်များနှင့် သတင်းအချက်အလက်နည်းပညာရပ်များကို ပေါင်းစပ်လေ့လာသည်။ ကျောင်းသားများသည် ဒေတာစီမံခန့်ခွဲမှု၊ ကွန်ပျူတာကွန်ရက်များ၊ ဆော့ဖ်ဝဲလ်အင်ဂျင်နီယာပညာ၊ ဆိုက်ဘာလုံခြုံရေးနှင့် ဝဘ်နည်းပညာများကို သင်ယူရသည်။",
    difficulty: 4.8,
    duration: "၅ နှစ်",
    courses: [
      "ဒေတာတည်ဆောက်ပုံနှင့် အယ်လ်ဂိုရီသမ်များ (Data Structures & Algorithms)",
      "ဒေတာဘေ့စ် စီမံခန့်ခွဲမှုစနစ်များ",
      "ဆော့ဖ်ဝဲလ် အင်ဂျင်နီယာပညာ",
      "ကွန်ရက်စီမံခန့်ခွဲမှုနှင့် လုံခြုံရေး",
      "ဝဘ်နည်းပညာများနှင့် ဖွံ့ဖြိုးတိုးတက်မှု"
    ],
    jobs: [
      "ဆော့ဖ်ဝဲလ် အင်ဂျင်နီယာ",
      "Full-Stack Developer",
      "ကွန်ရက်အင်ဂျင်နီယာ",
      "အိုင်တီအကြံပေး",
      "ဒေတာဘေ့စ် စီမံခန့်ခွဲသူ (Database Administrator)"
    ],
    icon: Cpu,
    topSkills: ["Web Development", "Data Structures & Algorithms", "Database Management", "Embedded Systems"],
    seniorTips: "ပရိုဂရမ်းမင်းကို စာအုပ်ထဲကတင်မကဘဲ လက်တွေ့ project တွေ ကိုယ်တိုင်ရေးကြည့်ဖို့ တိုက်တွန်းချင်ပါတယ်။ Github သုံးတတ်အောင် စောစောလေ့လာထားပါ။",
    activitiesPhotos: ["/images/tech_lab_activity.png"],
    careerRoadmap: ["Year 1: Introduction to Programming (Python/C++)", "Year 2: Data Structures & OOP", "Year 3: Operating Systems & Computer Networks", "Year 4: Software Engineering & Cybersecurity", "Year 5: Final Year Capstone Project"]
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
    topSkills: ["SolidWorks & CAD", "Thermodynamics", "Fluid Mechanics", "Machine Design"],
    seniorTips: "Physics နဲ့ Math အခြေခံ ကောင်းဖို့လိုပါတယ်။ လက်တွေ့ ကားအင်ဂျင်တွေ၊ စက်ရုံတွေမှာ စက်ပစ္စည်းတွေ ဘယ်လိုအလုပ်လုပ်လဲဆိုတာကို သေချာလေ့လာဆန်းစစ်ပါ။",
    activitiesPhotos: ["/images/civil_engineering_activity.png"],
    careerRoadmap: ["Year 1: Engineering Graphics & CAD", "Year 2: Mechanics of Materials & Fluid Dynamics", "Year 3: Machine Element Design", "Year 4: HVAC & Control Systems", "Year 5: Mechanical Design Thesis"]
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
    topSkills: ["Robotics & Automation", "PLC Programming", "Control Systems", "Sensor Technology"],
    seniorTips: "Hardware နဲ့ Software နှီးနွှယ်နေတဲ့ ဘာသာရပ်ဖြစ်လို့ နှစ်ခုစလုံးကို ဟန်ချက်ညီညီ လေ့လာပါ။ Robot တွေ ကိုယ်တိုင် တည်ဆောက်ပြီး စမ်းသပ်ကြည့်ပါ။",
    activitiesPhotos: ["/images/tech_lab_activity.png"],
    careerRoadmap: ["Year 1: Basic Electronics & Mechanical CAD", "Year 2: Digital Systems & Microcontrollers", "Year 3: Sensors and Actuators & Dynamics", "Year 4: Robotics & Automation (PLC)", "Year 5: Robotic Prototype Graduation Project"]
  }
];const getCategoryStyles = (category: "Engineering" | "Architecture") => {
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
        <MajorDetailsHub
          major={selectedMajor as any}
          onClose={() => setSelectedMajor(null)}
        />
      )}
    </div>
  );
}
