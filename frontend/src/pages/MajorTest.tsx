import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { ClipboardList, ArrowRight, RotateCcw, ArrowLeft } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import QuizAssessment from "../components/QuizAssessment";
import MajorDetailsHub from "../components/MajorDetailsHub";



const MATCH_INFO = {
  TECH: {
    title: "နည်းပညာနှင့် အီလက်ထရောနစ်",
    description: "သင်သည် ခိုင်မာသော ယုတ္တိတွေးခေါ်မှုစွမ်းရည် ရှိပြီး ဆော့ဖ်ဝဲလ်အင်ဂျင်နီယာပညာ၊ ဒစ်ဂျစ်တယ်စနစ်များ၊ မိုက်ခရိုကွန်ထရိုလာများ၊ ထိန်းချုပ်မှုစနစ်များနှင့် အလိုအလျောက် စက်ရုပ်နည်းပညာများကို စိတ်ဝင်စားသူဖြစ်သည်။",
    majors: ["ကွန်ပျူတာအင်ဂျင်နီယာနှင့် သတင်းအချက်အလက်နည်းပညာ", "အီလက်ထရောနစ်အင်ဂျင်နီယာ", "မက္ကာထရိုနစ်အင်ဂျင်နီယာ"],
    careers: ["ဆော့ဖ်ဝဲလ် ဗိသုကာပညာရှင် (Software Architect)", "စက်ရုပ်နှင့် အလိုအလျောက်စနစ် အင်ဂျင်နီယာ (Robotics & Automation Engineer)", "ကွန်ပျူတာစနစ် အင်ဂျင်နီယာ (Computer Systems Engineer)"],
    color: "bg-blue-600 dark:bg-blue-500",
  },
  INFRASTRUCTURE: {
    title: "မြို့ပြ အခြေခံအဆောက်အအုံနှင့် ဗိသုကာပညာ",
    description: "သင်သည် အဆောက်အအုံပုံစံကြမ်းများ၊ တည်ဆောက်ပုံ ခိုင်ခံ့မှုတွက်ချက်မှုများ၊ ဒဏ်ခံနိုင်ရည်နှင့် ပတ်ဝန်းကျင်ဆိုင်ရာ ဒီဇိုင်းများအပေါ် စိတ်ဝင်စားသူဖြစ်သည်။",
    majors: ["မြို့ပြအင်ဂျင်နီယာ", "စက်မှုအင်ဂျင်နီယာ", "ဗိသုကာပညာ"],
    careers: ["ပရောဂျက် ဗိသုကာပညာရှင် (Project Architect)", "တည်ဆောက်ရေး အင်ဂျင်နီယာ (Structural Engineer)", "ဘူမိနည်းပညာ လေ့လာဆန်းစစ်သူ (Geotechnical Analyst)"],
    color: "bg-purple-600 dark:bg-purple-500",
  },
  ENERGY: {
    title: "စွမ်းအင်နှင့် ပါဝါစနစ်များ",
    description: "သင်သည် ဗို့အားမြင့် လျှပ်စစ်လိုင်းများ၊ လျှပ်စစ်ဓာတ်အား ဖြန့်ဖြူးမှု ဘေးကင်းလုံခြုံရေးတို့ကို စိတ်ဝင်စားသူဖြစ်သည်။",
    majors: ["လျှပ်စစ်စွမ်းအား အင်ဂျင်နီယာ"],
    careers: ["စွမ်းအားစနစ် စီမံရေးဆွဲသူ (Power Systems Planner)", "လျှပ်စစ်ဓာတ်အားခွဲရုံ အင်ဂျင်နီယာ (Substation Engineer)"],
    color: "bg-emerald-600 dark:bg-emerald-500",
  },
};


const CATEGORY_LABEL_MAP: { [key: string]: string } = {
  "Tech & Electronics": "နည်းပညာနှင့် အီလက်ထရောနစ်",
  "Infrastructure": "အခြေခံအဆောက်အအုံ",
  "Process & Energy": "စွမ်းအားစနစ်နှင့် စွမ်းအင်",
  "Architecture": "ဗိသုကာပညာ",
};

const FALLBACK_MAJORS = [
  {
    id: 1,
    majorCode: "CE",
    name: "Civil Engineering",
    myanmarName: "မြို့ပြအင်ဂျင်နီယာ",
    cutoffMark: 279,
    category: "Infrastructure",
    description: "မြို့ပြအင်ဂျင်နီယာဘာသာရပ်သည် လမ်းများ၊ တံတားများ၊ အဆောက်အအုံများနှင့် ဆည်မြောင်းများကဲ့သို့သော အခြေခံအဆောက်အအုံများကို ဒီဇိုင်းဆွဲခြင်း၊ တည်ဆောက်ခြင်းနှင့် ထိန်းသိမ်းခြင်းကို အဓိကသင်ကြားပေးသော ပညာရပ်ဖြစ်သည်။",
    topSkills: ["Structural Analysis", "AutoCAD & Revit", "Project Management", "Geotechnical Engineering"],
    seniorTips: "လက်တွေ့လုပ်ငန်းခွင်ဆင်းရတာ စိတ်ဝင်စားဖို့ကောင်းသလို၊ သီအိုရီပိုင်း တွက်ချက်မှုတွေကိုလည်း အခြေခံပိုင်ပိုင်နိုင်နိုင် လေ့လာထားဖို့ အကြံပြုချင်ပါတယ်။ Site visit တွေ သေချာလိုက်ခဲ့ပါ!",
    activitiesPhotos: ["/images/civil_engineering_activity.png"],
    careerRoadmap: ["Year 1: Foundation of Math & Mechanics", "Year 2: Surveying & Fluid Dynamics", "Year 3: Concrete & Structural Design", "Year 4: Geotechnical & Transport Engineering", "Year 5: Graduation Thesis & Internships"]
  },
  {
    id: 2,
    majorCode: "ARCHI",
    name: "Architecture",
    myanmarName: "ဗိသုကာ",
    cutoffMark: 275,
    category: "Architecture",
    description: "ဗိသုကာပညာရပ်သည် အဆောက်အအုံများ၏ အလှအပဆိုင်ရာ ဒီဇိုင်းပုံစံများ ရေးဆွဲခြင်း၊ နေရာလွတ်စီမံခန့်ခွဲမှုနှင့် ရေရှည်တည်တံ့သော ဗိသုကာပညာရပ်များကို ပေါင်းစပ်သင်ယူရသည့် အနုပညာနှင့် သိပ္ပံပညာရပ် ဖြစ်သည်။",
    topSkills: ["3D Modeling", "Spatial Design", "SketchUp & Lumion", "Architectural Drawing"],
    seniorTips: "ဒီဇိုင်းဆွဲတဲ့အခါ တီထွင်ဖန်တီးနိုင်စွမ်းရှိဖို့ လိုသလို ကျောင်းက Studio တွေမှာ သူငယ်ချင်းတွေနဲ့ ညမအိပ်ဘဲ ပရောဂျက်လုပ်ရတဲ့အတွေ့အကြုံက ဘဝတစ်လျှောက်လုံးအတွက် အမှတ်တရဖြစ်စေမှာပါ။",
    activitiesPhotos: ["/images/architecture_activity.png"],
    careerRoadmap: ["Year 1: Architectural Sketching & Forms", "Year 2: History of Architecture & Space Planning", "Year 3: Structural Building Technology", "Year 4: Urban Planning & Landscape Design", "Year 5: Thesis Design Studio"]
  },
  {
    id: 3,
    majorCode: "CEIT",
    name: "Computer Engineering & Information Technology (CEIT)",
    myanmarName: "ကွန်ပျူတာအင်ဂျင်နီယာနှင့် သတင်းအချက်အလက်နည်းပညာ",
    cutoffMark: 269,
    category: "Tech & Electronics",
    description: "ကွန်ပျူတာဟာ့ဒ်ဝဲလ်၊ ဆော့ဖ်ဝဲလ်စနစ်များနှင့် ကွန်ရက်နည်းပညာရပ်များကို ပေါင်းစပ်လေ့လာသည့် ဘာသာရပ်ဖြစ်သည်။ ကျောင်းသားများသည် ဆော့ဖ်ဝဲလ်တည်ဆောက်မှု၊ ဆိုက်ဘာလုံခြုံရေး၊ ဒေတာဘေ့စ်နှင့် ဝဘ်နည်းပညာများကို သင်ယူရသည်။",
    topSkills: ["Web Development", "Data Structures & Algorithms", "Database Management", "Embedded Systems"],
    seniorTips: "ပရိုဂရမ်းမင်းကို စာအုပ်ထဲကတင်မကဘဲ လက်တွေ့ project တွေ ကိုယ်တိုင်ရေးကြည့်ဖို့ တိုက်တွန်းချင်ပါတယ်။ Github သုံးတတ်အောင် စောစောလေ့လာထားပါ။",
    activitiesPhotos: ["/images/tech_lab_activity.png"],
    careerRoadmap: ["Year 1: Introduction to Programming (Python/C++)", "Year 2: Data Structures & OOP", "Year 3: Operating Systems & Computer Networks", "Year 4: Software Engineering & Cybersecurity", "Year 5: Final Year Capstone Project"]
  },
  {
    id: 4,
    majorCode: "EC",
    name: "Electronics Engineering (EC)",
    myanmarName: "အီလက်ထရောနစ်အင်ဂျင်နီယာ",
    cutoffMark: 256,
    category: "Tech & Electronics",
    description: "အီလက်ထရောနစ်ပတ်လမ်းများ၊ ဆီမီးကွန်ဒက်တာကိရိယာများ၊ အချက်ပြလှိုင်းများခွဲခြမ်းစိတ်ဖြာမှုနှင့် မြှုပ်နှံစနစ်များ (Embedded Systems) ကို အဓိကထားလေ့လာသော နည်းပညာရပ်ဖြစ်သည်။",
    topSkills: ["Circuit Design", "Embedded Systems", "PCB Design", "Microcontrollers"],
    seniorTips: "Arduino သို့မဟုတ် Raspberry Pi နဲ့ ကိုယ်တိုင် အိမ်မှာ hardware ပရောဂျက်လေးတွေ လုပ်ကြည့်ပါ။ Circuit design ဆွဲတတ်ဖို့ အရမ်းအရေးကြီးပါတယ်။",
    activitiesPhotos: ["/images/tech_lab_activity.png"],
    careerRoadmap: ["Year 1: Basic Electrical Circuits", "Year 2: Analog & Digital Electronics", "Year 3: Microprocessor Systems", "Year 4: Signal Processing & VLSI Design", "Year 5: Embedded Systems Capstone Project"]
  },
  {
    id: 5,
    majorCode: "EP",
    name: "Electrical Power Engineering (EP)",
    myanmarName: "လျှပ်စစ်စွမ်းအားအင်ဂျင်နီယာ",
    cutoffMark: 254,
    category: "Process & Energy",
    description: "လျှပ်စစ်စွမ်းအားထုတ်လုပ်ခြင်း၊ ပို့လွှတ်ခြင်း၊ ဖြန့်ဖြူးခြင်းနှင့် လျှပ်စစ်ဓာတ်အားစနစ်များ ဘေးကင်းလုံခြုံမှုရှိစေရန် ထိန်းချုပ်ခြင်းဆိုင်ရာ နည်းပညာရပ်များကို သင်ယူရသော ဘာသာရပ် ဖြစ်သည်။",
    topSkills: ["Power Grid Analysis", "Electrical Safety", "Power Electronics", "Renewable Energy"],
    seniorTips: "High voltage စနစ်တွေနဲ့ အလုပ်လုပ်ရမှာဖြစ်လို့ Safety protocol တွေကို စနစ်တကျ သင်ယူထားဖို့ လိုအပ်ပါတယ်။ လျှပ်စစ်ဓာတ်အားပေးစက်ရုံ လေ့လာရေးခရီးစဉ်တွေကို မလွတ်တမ်းလိုက်ပါ။",
    activitiesPhotos: ["/images/tech_lab_activity.png"],
    careerRoadmap: ["Year 1: Electrical Fundamentals", "Year 2: AC/DC Machines & Power Systems", "Year 3: High Voltage Engineering", "Year 4: Renewable Power Integration", "Year 5: Power Transmission Thesis"]
  },
  {
    id: 6,
    majorCode: "ME",
    name: "Mechanical Engineering",
    myanmarName: "စက်မှုအင်ဂျင်နီယာ",
    cutoffMark: 246,
    category: "Infrastructure",
    description: "စက်ပစ္စည်းကိရိယာများနှင့် အပူစွမ်းအင်သုံးစနစ်များ၏ ဒီဇိုင်း၊ ထုတ်လုပ်မှုနှင့် ထိန်းသိမ်းမှုတို့ကို အဓိကထားသည့် အကျယ်ပြန့်ဆုံးသော နယ်ပယ်တစ်ခု ဖြစ်သည်။",
    topSkills: ["SolidWorks & CAD", "Thermodynamics", "Fluid Mechanics", "Machine Design"],
    seniorTips: "Physics နဲ့ Math အခြေခံ ကောင်းဖို့လိုပါတယ်။ လက်တွေ့ ကားအင်ဂျင်တွေ၊ စက်ရုံတွေမှာ စက်ပစ္စည်းတွေ ဘယ်လိုအလုပ်လုပ်လဲဆိုတာကို သေချာလေ့လာဆန်းစစ်ပါ။",
    activitiesPhotos: ["/images/civil_engineering_activity.png"],
    careerRoadmap: ["Year 1: Engineering Graphics & CAD", "Year 2: Mechanics of Materials & Fluid Dynamics", "Year 3: Machine Element Design", "Year 4: HVAC & Control Systems", "Year 5: Mechanical Design Thesis"]
  },
  {
    id: 7,
    majorCode: "MC",
    name: "Mechatronics Engineering (MC)",
    myanmarName: "မက္ကာထရိုနစ်အင်ဂျင်နီယာ",
    cutoffMark: 240,
    category: "Tech & Electronics",
    description: "စက်မှုအင်ဂျင်နီယာပညာ၊ အီလက်ထရောနစ်နှင့် ကွန်ပျူတာထိန်းချုပ်မှုစနစ်များကို ပေါင်းစပ်ထားသော စက်ရုပ်နည်းပညာနှင့် အလိုအလျောက်ထိန်းချုပ်မှုစနစ်များဆိုင်ရာ နวัตกรรมဘာသာရပ် ဖြစ်သည်။",
    topSkills: ["Robotics & Automation", "PLC Programming", "Control Systems", "Sensor Technology"],
    seniorTips: "Hardware နဲ့ Software နှီးနွှယ်နေတဲ့ ဘာသာရပ်ဖြစ်လို့ နှစ်ခုစလုံးကို ဟန်ချက်ညီညီ လေ့လာပါ။ Robot တွေ ကိုယ်တိုင် တည်ဆောက်ပြီး စမ်းသပ်ကြည့်ပါ။",
    activitiesPhotos: ["/images/tech_lab_activity.png"],
    careerRoadmap: ["Year 1: Basic Electronics & Mechanical CAD", "Year 2: Digital Systems & Microcontrollers", "Year 3: Sensors and Actuators & Dynamics", "Year 4: Robotics & Automation (PLC)", "Year 5: Robotic Prototype Graduation Project"]
  }
];

interface BackendMajor {
  id: number;
  majorCode: string;
  name: string;
  myanmarName: string;
  cutoffMark: number;
  category: string;
  isEligible: boolean;
  isRecommended: boolean;
  description: string;
  topSkills: string[];
  seniorTips: string;
  activitiesPhotos: string[];
  careerRoadmap: string[];
}

interface MatchmakingResults {
  topMatches: BackendMajor[];
  otherEligible: BackendMajor[];
  ineligible: BackendMajor[];
  aiInsight?: string;
}

const DuolingoCard = ({ major, type, onClick }: { major: BackendMajor; type: "TOP" | "ELIGIBLE" | "LOCKED"; onClick?: () => void }) => {
  const isLocked = type === "LOCKED";
  const isTop = type === "TOP";

  let cardClasses = "";
  if (isTop) {
    cardClasses = "bg-green-500 text-white border-green-600 shadow-[0_6px_0_#15803d]";
  } else if (isLocked) {
    cardClasses = "bg-slate-100 text-slate-400 border-slate-200 shadow-[0_6px_0_#cbd5e1] opacity-75";
  } else {
    cardClasses = "bg-white text-slate-800 border-slate-200 shadow-[0_6px_0_#cbd5e1]";
  }

  return (
    <div onClick={onClick} className={`p-6 border-2 rounded-3xl ${cardClasses} hover:-translate-y-1 transition-all duration-150 flex flex-col justify-between relative overflow-hidden cursor-pointer`}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full border ${
            isTop 
              ? "bg-green-600 text-white border-green-700" 
              : isLocked 
                ? "bg-slate-200 text-slate-500 border-slate-300" 
                : "bg-green-50 text-green-700 border-green-200"
          }`}>
            {CATEGORY_LABEL_MAP[major.category] || major.category}
          </span>
          <span className={`text-xs font-mono font-bold tracking-wider ${isTop ? "text-green-100" : isLocked ? "text-slate-400" : "text-slate-500"}`}>
            🏆 REQ: {major.cutoffMark}
          </span>
        </div>

        <h3 className={`text-xl font-black mb-1.5 tracking-tight ${isTop ? "text-white" : isLocked ? "text-slate-400 line-through" : "text-slate-800"}`}>
          {major.myanmarName}
        </h3>
        <p className={`text-xs font-bold tracking-widest uppercase ${isTop ? "text-green-100/90" : "text-slate-400"}`}>
          {major.name}
        </p>
      </div>

      {isLocked && (
        <div className="mt-5 pt-3 border-t border-dashed border-slate-300 text-center">
          <p className="text-xs font-black text-red-500 uppercase tracking-widest">
            ဝင်ခွင့်အမှတ် မမီသေးပါ ❌
          </p>
        </div>
      )}
    </div>
  );
};

export default function MajorTest() {
  const [searchParams, setSearchParams] = useSearchParams();
  const historyId = searchParams.get("history_id");
  const [isHistoricalView, setIsHistoricalView] = useState(false);
  const [historicalRecordDate, setHistoricalRecordDate] = useState("");

  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 = landing, -2 = pre-quiz gateway, 0 = quiz, 5 = results
  const [marks, setMarks] = useState({
    english: "",
    math: "",
    physics: "",
    chemistry: ""
  });

  const getHistoricalRecord = (id: string) => {
    try {
      const historyRaw = localStorage.getItem("pathfinder_history");
      const historyList = historyRaw ? JSON.parse(historyRaw) : [];
      return historyList.find((item: any) => item.id === id) || null;
    } catch (e) {
      return null;
    }
  };

  const totalScore = Object.values(marks).reduce((sum, val) => sum + (val === "" ? 0 : parseInt(val, 10)), 0);
  const scoreToDisplay = isHistoricalView && getHistoricalRecord(historyId || "")
    ? (getHistoricalRecord(historyId || "")?.totalScore || totalScore)
    : totalScore;

  const [quizScores, setQuizScores] = useState<{
    INFRASTRUCTURE: number;
    TECH: number;
    ENERGY: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [backendResults, setBackendResults] = useState<MatchmakingResults | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<BackendMajor | null>(null);

  const handleQuizComplete = async (scores: NonNullable<typeof quizScores>) => {
    setQuizScores(scores);
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:3000/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalScore: totalScore,
          quizScores: scores,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setBackendResults(data.data);
      } else {
        console.error("API Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setIsLoading(false);
      setCurrentStep(5); // Go to results view
    }
  };

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (historyId) {
      const record = getHistoricalRecord(historyId);
      if (record) {
        setBackendResults(record.results);
        setQuizScores(record.quizScores);
        setHistoricalRecordDate(record.date);
        setIsHistoricalView(true);
        setCurrentStep(5);
      }
    } else {
      setIsHistoricalView(false);
      setHistoricalRecordDate("");
    }
  }, [historyId]);

  useEffect(() => {
    if (backendResults && quizScores && !isHistoricalView) {
      try {
        const existingHistoryRaw = localStorage.getItem("pathfinder_history");
        let historyList = existingHistoryRaw ? JSON.parse(existingHistoryRaw) : [];
        
        const isDuplicate = historyList.length > 0 && 
          historyList[0].totalScore === totalScore &&
          JSON.stringify(historyList[0].quizScores) === JSON.stringify(quizScores) &&
          historyList[0].results.aiInsight === backendResults.aiInsight;
          
        if (!isDuplicate) {
          const newRecord = {
            id: Date.now().toString(),
            date: new Date().toLocaleString("my-MM", { hour12: true }) || new Date().toLocaleString(),
            totalScore,
            quizScores,
            results: backendResults
          };
          historyList = [newRecord, ...historyList].slice(0, 5);
          localStorage.setItem("pathfinder_history", JSON.stringify(historyList));
        }
      } catch (e) {
        console.error("Failed to save history:", e);
      }
    }
  }, [backendResults, quizScores]);

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

  const isMarksValid = marks.english !== "" && marks.math !== "" && marks.physics !== "" && marks.chemistry !== "";

  const handleStart = () => {
    setCurrentStep(-2); // Go to Pre-Quiz Gateway first
  };

  const handleBack = () => {
    if (currentStep === -2) {
      setCurrentStep(-1); // Back to Landing
    } else {
      setCurrentStep(-1);
    }
  };

  // Calculate results
  const getResults = () => {
    if (!quizScores) return [];
    const total = Object.values(quizScores).reduce((sum, val) => sum + val, 0) || 1;
    const percentages = Object.keys(quizScores).map((key) => ({
      category: key as "INFRASTRUCTURE" | "TECH" | "ENERGY",
      percentage: Math.round((quizScores[key as keyof typeof quizScores] / total) * 100),
    }));

    percentages.sort((a, b) => b.percentage - a.percentage);
    return percentages;
  };

  const results = getResults();
  const topResult = results[0];
  const matchedData = topResult ? MATCH_INFO[topResult.category] : null;

  // Local fallback matchmaking results if backend API fails
  let resultsToDisplay = backendResults;
  if (!resultsToDisplay && quizScores) {
    const rawTopCategory = Object.keys(quizScores).reduce((a, b) => 
      (quizScores[a as keyof typeof quizScores] ?? 0) > (quizScores[b as keyof typeof quizScores] ?? 0) ? a : b
    );

    const categoryMap: { [key: string]: string } = {
      "TECH": "Tech & Electronics",
      "INFRASTRUCTURE": "Infrastructure",
      "ENERGY": "Process & Energy"
    };

    const topCategory = categoryMap[rawTopCategory] || rawTopCategory;

    const matches = FALLBACK_MAJORS.map((major) => {
      const isEligible = totalScore >= major.cutoffMark;
      const isRecommended = major.category === topCategory;
      return {
        ...major,
        isEligible,
        isRecommended,
      };
    });

    resultsToDisplay = {
      topMatches: matches.filter((m) => m.isEligible && m.isRecommended),
      otherEligible: matches.filter((m) => m.isEligible && !m.isRecommended),
      ineligible: matches.filter((m) => !m.isEligible),
    };
  }

  if (currentStep === 5 && resultsToDisplay) {
    return (
      <div className="w-full min-h-[calc(100vh-4rem)] p-4 md:p-8 lg:p-12 bg-slate-50 text-slate-800 flex justify-center items-start animate-in fade-in duration-500">
        <div className="w-full max-w-5xl space-y-8">

          {/* Historical View Banner */}
          {isHistoricalView && (
            <div className="bg-amber-50 border-2 border-amber-500 rounded-3xl p-5 md:p-6 shadow-[0_6px_0_#d97706] flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⏳</span>
                <div>
                  <h4 className="font-black text-amber-800 text-sm md:text-base">
                    မှတ်တမ်းဟောင်းကို ကြည့်ရှုနေပါသည်
                  </h4>
                  <p className="text-xs font-bold text-amber-600/90 mt-0.5">
                    စစ်ဆေးခဲ့သည့်ရက်စွဲ - {historicalRecordDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSearchParams({})}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-black text-xs px-5 py-3 rounded-xl border-b-4 border-green-700 active:border-b-0 active:translate-y-[4px] hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>ယခုစစ်ဆေးမှုသို့ ပြန်သွားရန်</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          )}
          
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-4 pb-4">
            <div className="size-20 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-4xl shadow-[0_6px_0_#22c55e] animate-bounce">
              🎓
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                ဂုဏ်ယူပါတယ်! ရလဒ်ထွက်လာပါပြီ 🎉
              </h1>
              <p className="text-slate-500 font-semibold text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                သင်၏ ဝါသနာ၊ ရမှတ်များနှင့် တွက်ချက်မှုများအရ သင့်တော်သော အနာဂတ်လမ်းကြောင်းများကို ရွေးချယ်ပေးထားပါသည်။
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stats Card 1 */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-[0_6px_0_#cbd5e1] flex items-center gap-4 hover:-translate-y-0.5 transition-all">
              <div className="size-14 bg-green-500 rounded-2xl flex items-center justify-center text-2xl shadow-[0_4px_0_#15803d] text-white shrink-0">
                ⭐
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                  တက္ကသိုလ်ဝင်တန်းရမှတ်
                </span>
                <span className="text-2xl font-black text-slate-800">
                  {scoreToDisplay} <span className="text-sm font-bold text-slate-400">/ ၄၀၀</span>
                </span>
              </div>
            </div>

            {/* Stats Card 2 */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-[0_6px_0_#cbd5e1] flex items-center gap-4 hover:-translate-y-0.5 transition-all">
              <div className="size-14 bg-amber-500 rounded-2xl flex items-center justify-center text-2xl shadow-[0_4px_0_#b45309] text-white shrink-0">
                🔥
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                  စိတ်ဝင်စားမှုအများဆုံးနယ်ပယ်
                </span>
                <span className="text-lg font-black text-slate-800 line-clamp-1">
                  {matchedData ? matchedData.title : "မရှိပါ"}
                </span>
              </div>
            </div>
          </div>

          {/* AI Career Mentor */}
          {resultsToDisplay?.aiInsight && (
            <div className="bg-white border-2 border-green-500 rounded-[2rem] p-6 md:p-10 shadow-[0_6px_0_#22c55e] relative overflow-hidden mt-8">
              {/* Decorative background circle */}
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-green-50 rounded-full pointer-events-none"></div>
              
              <div className="relative z-10 space-y-4">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧭</span>
                  <h4 className="font-bold text-slate-800 tracking-tight text-lg">
                    AI Career Mentor
                  </h4>
                </div>
                {/* Body */}
                <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
                  {resultsToDisplay.aiInsight}
                </p>
              </div>
            </div>
          )}

          {/* Top Matches Section */}
          {resultsToDisplay.topMatches.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 tracking-tight">
                <span>🎯</span> TOP MATCHES (အကိုက်ညီဆုံး မေဂျာများ)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resultsToDisplay.topMatches.map((major) => (
                  <DuolingoCard key={major.majorCode} major={major} type="TOP" onClick={() => setSelectedMajor(major)} />
                ))}
              </div>
            </div>
          )}

          {/* Other Eligible Section */}
          {resultsToDisplay.otherEligible.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 tracking-tight">
                <span>✅</span> OTHER ELIGIBLE MAJORS (လျှောက်ထားနိုင်သော အခြားမေဂျာများ)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resultsToDisplay.otherEligible.map((major) => (
                  <DuolingoCard key={major.majorCode} major={major} type="ELIGIBLE" onClick={() => setSelectedMajor(major)} />
                ))}
              </div>
            </div>
          )}

          {/* Ineligible (Locked) Section */}
          {resultsToDisplay.ineligible.length > 0 && (
            <div className="space-y-4 opacity-75">
              <h2 className="text-xl font-black text-slate-400 flex items-center gap-2 tracking-tight">
                <span>🔒</span> LOCKED MAJORS (ဝင်ခွင့်ရမှတ် မပြည့်မီသော မေဂျာများ)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resultsToDisplay.ineligible.map((major) => (
                  <DuolingoCard key={major.majorCode} major={major} type="LOCKED" onClick={() => setSelectedMajor(major)} />
                ))}
              </div>
            </div>
          )}
          
          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t-2 border-slate-200">
            <Link to="/major" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-black text-sm px-8 py-4 rounded-2xl border-b-4 border-green-700 active:border-b-0 active:translate-y-[4px] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md">
                <span>🎓 မေဂျာများအားလုံး အသေးစိတ်လေ့လာရန်</span>
                <ArrowRight className="size-4" />
              </button>
            </Link>
            <button 
              onClick={handleStart} 
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-600 font-black text-sm px-8 py-4 rounded-2xl border-2 border-slate-200 border-b-4 border-slate-300 hover:-translate-y-0.5 active:translate-y-[2px] active:border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="size-4" />
              <span>မေးခွန်းများကို ထပ်မံဖြေဆိုရန်</span>
            </button>
          </div>

        </div>
      
          {selectedMajor && (
            <MajorDetailsHub
              major={selectedMajor}
              onClose={() => setSelectedMajor(null)}
            />
          )}
</div>
    );
  }

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-8 bg-[#F8FAFC]">
      <div className="w-full max-w-2xl bg-white border-2 border-slate-250/80 rounded-3xl shadow-[0_8px_0_#cbd5e1] overflow-hidden relative transition-all duration-300">
        
        {/* Loading View */}
        {isLoading ? (
          <div className="p-12 text-center flex flex-col items-center gap-4 animate-in fade-in duration-300 bg-white">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-black text-green-600 font-mono uppercase tracking-widest animate-pulse">
              တွက်ချက်နေပါသည်...
            </p>
          </div>
        ) : (
          <>
            {/* Landing View */}
            {currentStep === -1 && (
              <div className="p-6 md:p-12 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300 bg-white">
                <div className="w-16 h-16 rounded-2xl bg-green-50 border-2 border-green-100 flex items-center justify-center text-green-600 shadow-none">
                  <ClipboardList className="size-8" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-black tracking-tight md:text-4xl text-slate-800">
                    သင်နှင့် အကိုက်ညီဆုံး မေဂျာကို ရှာဖွေပါ 🎓
                  </h1>
                  <p className="text-slate-500 font-semibold text-sm md:text-base max-w-md mx-auto leading-relaxed">
                    သင်၏ ဝါသနာ၊ ပြဿနာဖြေရှင်းပုံစနစ်များနှင့် အားသာချက်များအပေါ် မူတည်ပြီး အနာဂတ်အတွက် အလားအလာကောင်းမွန်သော ပညာရေးလမ်းကြောင်းများနှင့် အသက်မွေးဝမ်းကျောင်းများကို ရှာဖွေလိုက်ပါ။
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-lg mt-2 text-left">
                  {[
                    { title: "မေးခွန်း ၁၅ ခု", desc: "လွယ်ကူပြီး ရိုးရှင်းသော", icon: "🧠" },
                    { title: "အချိန်နှင့်တပြေးညီ အမှတ်စနစ်", desc: "လှပသေသပ်သော အမှတ်ခွဲခြမ်းမှု", icon: "⭐" },
                    { title: "ကိုက်ညီသော အသက်မွေးဝမ်းကျောင်းများ", desc: "အကြံပြုချက်များ", icon: "🏆" },
                  ].map((f, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100/60 flex items-center gap-3.5 shadow-none">
                      <span className="text-2xl shrink-0">{f.icon}</span>
                      <div>
                        <h3 className="font-bold text-xs text-slate-800 tracking-tight leading-snug">{f.title}</h3>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleStart} 
                  className="w-full sm:w-auto px-8 py-4 text-base font-black rounded-2xl bg-green-500 text-white border-b-4 border-green-700 hover:-translate-y-0.5 active:translate-y-[4px] active:border-b-0 transition-all mt-4 cursor-pointer shadow-md"
                >
                  <span>စစ်ဆေးမှု စတင်ရန်</span>
                </button>
              </div>
            )}

            {/* Pre-Quiz Gateway View */}
            {currentStep === -2 && (
              <div className="p-6 md:p-10 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300 bg-white">
                {/* Header progress info */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold border-b-2 border-slate-100 pb-4">
                  <button 
                    onClick={handleBack} 
                    className="flex items-center gap-1.5 hover:text-slate-800 transition-colors group cursor-pointer font-black uppercase tracking-wider"
                  >
                    <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    <span>နောက်သို့</span>
                  </button>
                  <span className="uppercase tracking-widest font-black text-[10px] text-slate-400">စစ်ဆေးမှု စတင်ခြင်း</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                    တက္ကသိုလ်ဝင်တန်း ရမှတ်များ ဖြည့်စွက်ရန် 📝
                  </h2>
                  <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                    သင်၏ အင်ဂျင်နီယာမေဂျာများ လျှောက်ထားနိုင်ခွင့်ကို တွက်ချက်ရန် တက္ကသိုလ်ဝင်တန်း (Grade-12) ဘာသာရပ်အလိုက် ရမှတ်များကို ဖြည့်စွက်ပေးပါ။ ရမှတ်များသည် ၀ မှ ၁၀၀ အတွင်း ဖြစ်ရပါမည်။
                  </p>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-2 gap-4 my-2">
                  {[
                    { id: "english" as const, name: "အင်္ဂလိပ်စာ" },
                    { id: "math" as const, name: "သင်္ချာ" },
                    { id: "physics" as const, name: "ရူပဗေဒ" },
                    { id: "chemistry" as const, name: "ဓာတုဗေဒ" }
                  ].map((subject) => (
                    <div key={subject.id} className="space-y-1.5">
                      <label htmlFor={subject.id} className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                        {subject.name}
                      </label>
                      <input
                        id={subject.id}
                        type="text"
                        inputMode="numeric"
                        placeholder="0 - 100"
                        value={marks[subject.id]}
                        onChange={(e) => handleMarkChange(subject.id, e.target.value)}
                        className="w-full h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white text-sm font-mono font-bold text-slate-800 placeholder:text-slate-300 outline-none focus:border-green-500 transition-all"
                      />
                    </div>
                  ))}
                </div>

                {/* Total Score Display */}
                <div className="border-2 border-slate-200 bg-slate-50 p-5 rounded-3xl flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">စုစုပေါင်းရမှတ်</span>
                    <span className="text-2xl font-black text-slate-800">
                      {totalScore} <span className="text-sm font-bold text-slate-400">/ ၄၀၀</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">အခြေအနေ</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 inline-block ${
                      isMarksValid 
                        ? "bg-green-50 border-green-200 text-green-700" 
                        : "bg-red-50 border-red-200 text-red-700"
                    }`}>
                      {isMarksValid ? "အဆင်သင့်" : "ရမှတ်များ ဖြည့်ရန်ကျန်သေးသည်"}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={async () => {
                    if (user) {
                      await saveMarks(marks);
                    }
                    setCurrentStep(0);
                  }}
                  disabled={!isMarksValid}
                  className="w-full py-4 text-base font-black rounded-2xl bg-green-500 text-white border-b-4 border-green-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-[4px] active:border-b-0 disabled:pointer-events-none disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>စစ်ဆေးမှုကို ဆက်လက်လုပ်ဆောင်ရန်</span>
                  <ArrowRight className="size-4.5" />
                </button>
              </div>
            )}

            {/* Quiz Questions View */}
            {currentStep === 0 && (
              <QuizAssessment 
                onComplete={handleQuizComplete} 
                onBack={() => setCurrentStep(-2)} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
