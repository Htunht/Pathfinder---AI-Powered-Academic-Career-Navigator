import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ExternalLink, MessageCircle, Zap } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
}

interface Mentor {
  id: number;
  name: string;
  major: string;
  majorBadge: string;
  emoji: string;
  gradYear: string;
  tags: string[];
  bio: string;
  contactUrl: string;
  contactLabel: string;
  accentColor: string;
  shadowColor: string;
  badgeBg: string;
  badgeText: string;
}

// ─── EC Mentor Data ───────────────────────────────────────────────────────────

const MENTORS: Mentor[] = [
  {
    id: 1,
    name: "Ko Aung Kyaw Zin",
    major: "Civil Engineering",
    majorBadge: "Civil",
    emoji: "🏗️",
    gradYear: "Year 4",
    tags: ["#Structures", "#AutoCAD", "#SiteMgmt"],
    bio: "တောင်ဆောက်တဲ့ပညာကို ချစ်တဲ့သူ။ ကောင်းကောင်း plan ချပြီး project ဖြေသည်ကိုသင်ပေးနိုင်သည်။",
    contactUrl: "https://t.me/htuna02",
    contactLabel: "Telegram",
    accentColor: "#f59e0b",
    shadowColor: "#b45309",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
  },
  {
    id: 2,
    name: "Ma Thin Zar Wai",
    major: "Architecture",
    majorBadge: "Archi",
    emoji: "🏛️",
    gradYear: "Year 4",
    tags: ["#Design", "#SketchUp", "#Portfolio"],
    bio: "ဒီဇိုင်းနဲ့ Art ကို ချစ်တဲ့ Architecture သူငယ်ချင်း။ Portfolio ရေးဆွဲခြင်းနဲ့ Studio Crit ဖြတ်သန်းနည်းများ ညွှန်ပေးနိုင်ပါသည်။",
    contactUrl: "https://t.me/htuna02",
    contactLabel: "Telegram",
    accentColor: "#ec4899",
    shadowColor: "#be185d",
    badgeBg: "bg-pink-50",
    badgeText: "text-pink-700",
  },
  {
    id: 3,
    name: "Ko Kyaw Swar Hein",
    major: "EC Engineering",
    majorBadge: "EC",
    emoji: "🔌",
    gradYear: "Year 4",
    tags: ["#Circuit", "#Arduino", "#Robotics"],
    bio: "Circuit ဒီဇိုင်းနဲ့ Embedded Systems မှာ ကျွမ်းကျင်သည်။ Final Year Project အတွက် hardware integration အကြံပြုနိုင်ပါသည်။",
    contactUrl: "https://t.me/htuna02",
    contactLabel: "Telegram",
    accentColor: "#3b82f6",
    shadowColor: "#1d4ed8",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
  },
  {
    id: 4,
    name: "Ko Pyae Phyo Aung",
    major: "EP Engineering",
    majorBadge: "EP",
    emoji: "⚡",
    gradYear: "Year 5",
    tags: ["#PowerSystems", "#MATLAB", "#PLC"],
    bio: "Electrical Power Systems နဲ့ Grid Engineering မှာ ရင်ကျက်သည်။ Internship နဲ့ Myanmar Power Sector ဆိုင်ရာ အချက်အလက်များ ဝေမျှနိုင်ပါသည်။",
    contactUrl: "https://t.me/htuna02",
    contactLabel: "Telegram",
    accentColor: "#f97316",
    shadowColor: "#c2410c",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
  },
  {
    id: 5,
    name: "Ma Yadanar Phyu",
    major: "ME Engineering",
    majorBadge: "ME",
    emoji: "⚙️",
    gradYear: "Year 4",
    tags: ["#SolidWorks", "#Thermodynamics", "#CNC"],
    bio: "Mechanical Design နဲ့ Manufacturing မှာ passion ရှိသည်။ SolidWorks modeling ကနေ Fabrication Process ထိ ကူညီနိုင်ပါသည်။",
    contactUrl: "https://t.me/htuna02",
    contactLabel: "Telegram",
    accentColor: "#8b5cf6",
    shadowColor: "#6d28d9",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
  },
  {
    id: 6,
    name: "Ko Htet Aung Lin",
    major: "Mechatronics Engineering",
    majorBadge: "MC",
    emoji: "🦾",
    gradYear: "Year 5",
    tags: ["#ROS", "#Python", "#Automation"],
    bio: "Robotics နဲ့ Automation Systems တွင် အတွေ့အကြုံ ရှိသည်။ ROS framework ကနေ Machine Learning integration ထိ လမ်းညွှန်နိုင်ပါသည်။",
    contactUrl: "https://t.me/htuna02",
    contactLabel: "Telegram",
    accentColor: "#10b981",
    shadowColor: "#047857",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
  },
  {
    id: 7,
    name: "Ma Kaythi Zaw",
    major: "IT / Computer Engineering",
    majorBadge: "IT",
    emoji: "💻",
    gradYear: "Year 4",
    tags: ["#WebDev", "#React", "#AI/ML"],
    bio: "Full-stack Developer နဲ့ AI enthusiast တစ်ယောက်ဖြစ်သည်။ Tech career path ပြင်ဆင်မှု၊ GitHub Portfolio နဲ့ Interview prep ကူညီနိုင်ပါသည်။",
    contactUrl: "https://t.me/htuna02",
    contactLabel: "Telegram",
    accentColor: "#22c55e",
    shadowColor: "#15803d",
    badgeBg: "bg-green-50",
    badgeText: "text-green-700",
  },
];

// ─── AI Mock Responses ────────────────────────────────────────────────────────

const AI_RESPONSES: Record<string, string> = {
  civil: "Civil Engineering မေဂျာနဲ့ ပတ်သတ်ပြီး Ko Aung Kyaw Zin ကို တိုက်ရိုက် ဆက်သွယ်ကြည့်ပါ! သူ AutoCAD, Structural Analysis နဲ့ Site Management တွင် ကျွမ်းကျင်သူဖြစ်ပြီး Telegram မှ ဆက်သွယ်နိုင်ပါသည်။ 🏗️",
  archi: "Architecture မေဂျာ ဝင်ချင်ရင် Ma Thin Zar Wai ကို ဆက်သွယ်ပါ! Portfolio ရေးဆွဲနည်းနဲ့ Studio Crit အကြောင်း Messenger မှ မေးမြန်းနိုင်ပါသည်။ 🏛️",
  ec: "EC (Electronics & Computer) Engineering ဆိုင်ရာ Ko Kyaw Swar Hein မှ Circuit Design, Arduino, Robotics အကြောင်း ကူညီနိုင်ပါသည်! 🔌",
  ep: "Electrical Power Engineering ဆိုင်ရာ Ko Pyae Phyo Aung ကို Telegram မှ ဆက်သွယ်ပြီး Power Systems နဲ့ MATLAB ဆိုင်ရာ အကြံပြုချက်များ ရယူပါ! ⚡",
  me: "Mechanical Engineering မေဂျာ ဖြစ်တဲ့ Ma Yadanar Phyu ကို Messenger မှ ဆက်သွယ်ပြီး SolidWorks Design နဲ့ Thermodynamics ကူညီနိုင်ပါသည်! ⚙️",
  mc: "Mechatronics Engineering ဆိုင်ရာ Ko Htet Aung Lin မှ ROS, Python Automation, Robotics Project များ အတွက် လမ်းညွှန်ပေးနိုင်ပါသည်! 🦾",
  it: "IT / Computer Engineering ဆိုင်ရာ Ma Kaythi Zaw ကို Telegram မှ ဆက်သွယ်ပြီး Web Dev, AI/ML, Tech Career ဆိုင်ရာ အကြံပြုချက်များ ရယူပါ! 💻",
  hello: "မင်္ဂလာပါ! 👋 ကျွန်တော်က AI DU WAN ဖြစ်ပါတယ်။ မေဂျာ ၇ ခု (Civil, Archi, EC, EP, ME, MC, IT) ဆိုင်ရာ EC Senior Mentor တွေနဲ့ ချိတ်ဆက်ဖို့ ကူညီပေးနိုင်ပါတယ်။ ဘာမေးချင်ပါသလဲ? 😊",
  default: "ကျေးဇူးပြု၍ မေးမြန်းသော မေဂျာ သို့မဟုတ် topic ကို ရှင်းလင်းစွာ ဖော်ပြပေးပါ။ ဥပမာ - \"Civil Engineering ဆိုင်ရာ EC ကို ဆက်သွယ်ချင်သည်\" သို့မဟုတ် \"IT မေဂျာ tips\" ဆိုပြီး မေးနိုင်ပါသည်! 🤖 \n\nEC Mentor တွေနဲ့ တိုက်ရိုက် ဆက်သွယ်ချင်ရင် အောက်မှာ ရှိတဲ့ Card တွေကို ကြည့်ပါ!",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("civil") || lower.includes("ဆောက်လုပ်")) return AI_RESPONSES.civil;
  if (lower.includes("archi") || lower.includes("ဗိသုကာ")) return AI_RESPONSES.archi;
  if (lower.includes(" ec ") || lower.includes("electronics") || lower.includes("circuit")) return AI_RESPONSES.ec;
  if (lower.includes(" ep ") || lower.includes("power") || lower.includes("electric")) return AI_RESPONSES.ep;
  if (lower.includes(" me ") || lower.includes("mechanic") || lower.includes("solid")) return AI_RESPONSES.me;
  if (lower.includes("mc") || lower.includes("mechatronic") || lower.includes("robot")) return AI_RESPONSES.mc;
  if (lower.includes(" it ") || lower.includes("computer") || lower.includes("web") || lower.includes("coding")) return AI_RESPONSES.it;
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("မင်္ဂလာ")) return AI_RESPONSES.hello;
  return AI_RESPONSES.default;
}

// ─── Framer Motion Variants ───────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 220, damping: 22 } },
};

const msgVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22 } },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Mentorship() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "ai",
      text: "မင်္ဂလာပါ! 👋 ကျွန်တော်က AI DU WAN ဖြစ်ပါတယ်။ မေဂျာ ၇ ခု (Civil, Archi, EC, EP, ME, MC, IT) ဆိုင်ရာ Senior Mentor တွေနဲ့ ချိတ်ဆက်ဖို့ ကူညီပေးနိုင်ပါတယ်။ ဘာမေးချင်ပါသလဲ? 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1100 + Math.random() * 600));

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      text: getAIResponse(text),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-10">

      {/* ── Hero Header ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-1"
      >
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3">
          🤝 <span>Mentorship Hub</span>
        </h1>
        <p className="text-sm font-bold text-slate-500 ml-1">
          AI မှ တဆင့် မေဂျာ ကိုက်ညီသော Senior EC Mentor တွေနဲ့ ချိတ်ဆက်ပါ
        </p>
      </motion.div>

      {/* ── AI Chatbot Section ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="bg-white border-4 border-slate-900 rounded-3xl shadow-[0_8px_0_#0f172a] overflow-hidden"
      >
        {/* Chatbot Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center text-xl shadow-[0_3px_0_#15803d] shrink-0">
              🤖
            </div>
            <div>
              <p className="font-black text-white text-base leading-tight">AI DU WAN</p>
              <p className="text-[11px] font-bold text-slate-400 leading-tight">သင်သိလိုသမျှကို AI ဆီမှာ တိုက်ရိုက်မေးမြန်းပါ</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
            <span className="size-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] font-black text-green-400 uppercase tracking-wider">Online</span>
          </div>
        </div>

        {/* Message Pane */}
        <div className="h-72 overflow-y-auto px-5 py-4 space-y-3 bg-slate-50/60 flex flex-col">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                variants={msgVariants}
                initial="hidden"
                animate="show"
                className={`flex items-end gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`shrink-0 w-8 h-8 rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm ${
                    msg.role === "ai"
                      ? "bg-slate-900 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {msg.role === "ai" ? <Bot className="size-4" /> : <User className="size-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm font-bold leading-relaxed whitespace-pre-line ${
                    msg.role === "ai"
                      ? "bg-white border-2 border-slate-200 text-slate-800 rounded-bl-sm shadow-[0_2px_0_#e2e8f0]"
                      : "bg-green-500 border-2 border-green-600 text-white rounded-br-sm shadow-[0_2px_0_#15803d]"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                key="typing"
                variants={msgVariants}
                initial="hidden"
                animate="show"
                className="flex items-end gap-2.5"
              >
                <div className="shrink-0 w-8 h-8 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <Bot className="size-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white border-2 border-slate-200 shadow-[0_2px_0_#e2e8f0] flex items-center gap-1">
                  <span className="size-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="size-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="size-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Row */}
        <div className="p-4 border-t-2 border-slate-100 bg-white flex gap-3 items-center">
          <div className="flex-1 relative">
            <input
              id="ai-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ဥပမာ: &quot;IT မေဂျာ EC ကို ဆက်သွယ်ချင်သည်&quot; ..."
              className="w-full h-12 px-4 rounded-2xl border-2 border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium outline-none focus:border-green-500 focus:bg-white transition-all"
              disabled={isTyping}
            />
          </div>
          <motion.button
            id="ai-chat-send-btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 1 }}
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="h-12 w-12 shrink-0 rounded-2xl bg-green-500 border-2 border-green-600 shadow-[0_3px_0_#15803d] text-white flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="size-5" />
          </motion.button>
        </div>

        {/* Quick Prompts */}
        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {["Civil EC ဆက်သွယ်", "IT မေဂျာ tips", "Mechatronics senior", "EP Engineering", "Architecture portfolio"].map((prompt) => (
            <button
              key={prompt}
              id={`quick-prompt-${prompt.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => { setInput(prompt); }}
              className="text-xs font-bold px-3 py-1.5 rounded-xl border-2 border-slate-200 bg-white text-slate-600 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all cursor-pointer shadow-[0_2px_0_#e2e8f0] active:translate-y-[1px] active:shadow-none"
            >
              {prompt}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Section Label ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3"
      >
        <div className="flex-1 h-0.5 bg-slate-200 rounded-full" />
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-2 border-slate-200 shadow-[0_3px_0_#e2e8f0]">
          <Sparkles className="size-4 text-green-500" />
          <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Senior EC Mentors (၇ ဦး)</span>
        </div>
        <div className="flex-1 h-0.5 bg-slate-200 rounded-full" />
      </motion.div>

      {/* ── Mentor Grid ───────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {MENTORS.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </motion.div>

      {/* ── Empty Suggestion (shown always at bottom) ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-4 shadow-[0_4px_0_#bbf7d0]"
      >
        <div className="w-12 h-12 rounded-2xl bg-white border-2 border-green-300 flex items-center justify-center text-2xl shrink-0 shadow-[0_3px_0_#86efac]">
          💡
        </div>
        <div className="text-center sm:text-left">
          <p className="font-black text-sm text-green-800">AI Chatbot မှ အဖြေ မရသေး?</p>
          <p className="text-xs font-bold text-green-700 mt-0.5 leading-relaxed">
            EC Mentor တွေနဲ့ တိုက်ရိုက် <strong>Telegram</strong> မှ ဆက်သွယ်ကြည့်ပါ!
            သူတို့က သင်ကို Personal experience မျှဝေပြီး မေဂျာ ဆုံးဖြတ်ချက်ချရာမှာ ကူညီပေးနိုင်ပါသည်။
          </p>
        </div>
        <div className="flex items-center gap-1.5 ml-auto shrink-0 px-4 py-2 rounded-xl bg-green-500 border-2 border-green-600 shadow-[0_3px_0_#15803d] text-white font-black text-xs">
          <Zap className="size-3.5" />
          <span>ချိတ်ဆက်ပါ</span>
        </div>
      </motion.div>

    </div>
  );
}

// ─── Mentor Card Component ────────────────────────────────────────────────────

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: `0 10px 0 ${mentor.shadowColor}` }}
      whileTap={{ y: 0, boxShadow: "0 3px 0 #000" }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className="bg-white border-2 border-slate-900 rounded-3xl shadow-[0_6px_0_#000] flex flex-col overflow-hidden cursor-default"
    >
      {/* Card Top Accent Bar */}
      <div className="h-2 w-full" style={{ backgroundColor: mentor.accentColor }} />

      {/* Photo Area */}
      <div className="flex flex-col items-center pt-6 px-5 pb-4 gap-3">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border-4 shadow-[0_4px_0_rgba(0,0,0,0.12)]"
          style={{ borderColor: mentor.accentColor, backgroundColor: `${mentor.accentColor}18` }}
        >
          {mentor.emoji}
        </div>

        {/* Name & Badge */}
        <div className="text-center">
          <h3 className="font-black text-base text-slate-900 leading-tight">{mentor.name}</h3>
          <div className="mt-1.5 flex items-center justify-center gap-1.5">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border-2 ${mentor.badgeBg} ${mentor.badgeText}`}
              style={{ borderColor: `${mentor.accentColor}50` }}>
              {mentor.majorBadge}
            </span>
            <span className="text-[10px] font-bold text-slate-400 border-2 border-slate-200 rounded-full px-2 py-0.5 bg-slate-50">
              {mentor.gradYear}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t-2 border-dashed border-slate-200" />

      {/* Bio */}
      <div className="px-5 py-3">
        <p className="text-xs font-bold text-slate-600 leading-relaxed text-center">
          {mentor.bio}
        </p>
      </div>

      {/* Tags */}
      <div className="px-5 pb-3 flex flex-wrap gap-1.5 justify-center">
        {mentor.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border-2 border-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <div className="px-5 pb-5 mt-auto">
        <motion.a
          id={`mentor-contact-${mentor.id}`}
          href={mentor.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97, y: 1 }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border-2 font-black text-sm text-white transition-all cursor-pointer select-none"
          style={{
            backgroundColor: mentor.accentColor,
            borderColor: mentor.shadowColor,
            boxShadow: `0 4px 0 ${mentor.shadowColor}`,
          }}
        >
          <MessageCircle className="size-4" />
          <span>{mentor.contactLabel} ဆက်သွယ်ရန်</span>
          <ExternalLink className="size-3.5 opacity-70" />
        </motion.a>
      </div>
    </motion.div>
  );
}
