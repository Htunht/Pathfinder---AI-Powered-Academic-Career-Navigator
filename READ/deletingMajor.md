Role: Expert Frontend Developer & UI/UX Designer
remove the "အရင်းအမြစ်" and add this

Theme: Pathfinder Gamified Aesthetic (Thick borders, solid shadows, rounded corners, high contrast)

1. Top Section: AI Pathfinder Chatbot Interface
   "Create a Top Section for the Mentorship Hub.

Container: A wide, hero-style card with bg-white, border-4 border-slate-900, and a heavy shadow-[0_8px_0_#0f172a].

Header: An icon of a 🤖 or 🧭 with a title 'AI Pathfinder Guide' and a subtitle 'သင်သိလိုသမျှကို AI ဆီမှာ တိုက်ရိုက်မေးမြန်းပါ'။

Input Area: A large, rounded-2xl input field with a 'Ask me anything...' placeholder. Include a prominent 'Send' button with a bouncy hover effect (hover:-translate-y-1).

Visuals: Add a subtle background pattern or a small floating 3D-style robot illustration on the right side to make it feel interactive."

2. Main Section: 7 ECs Mentorship Grid
   "Create a Main Section below the Chatbot for the 'Senior Mentors' (ECs).

Grid Layout: A responsive grid that shows 1 column on mobile, 2 on tablet, and 3 or 4 on desktop (specifically to fit 7 cards neatly).

EC Card Design:

Structure: bg-white, border-2 border-slate-900, rounded-3xl, shadow-[0_6px_0_#000].

Photo: A top-positioned, circular or rounded-2xl image container for the EC photo with a thick border.

Details:

EC Name (Bold, Slate-900).

Major Badge (e.g., 'IT Major' in a green-tinted bubble).

Expertise Tags: A row of small, pill-shaped badges (e.g., '#WebDev', '#Robotics') using bg-slate-100.

Action Button: A 'Chat with [EC Name]' button at the bottom using bg-green-500, text-white, border-2 border-green-700, and a shadow-[0_4px_0_#15803d].

Interactivity: When the button is clicked, it should trigger an external link to their Telegram or Messenger."

💡 အပိုဆောင်း ထည့်သွင်းရန် အကြံပြုချက်များ
၁။ Animations: Card လေးတွေကို framer-motion သုံးပြီး တစ်ခုချင်းစီ အစီအစဉ်လိုက် ပေါ်လာအောင် (Stagger animation) လုပ်ခိုင်းလိုက်ပါ။ ဒါဆိုရင် Page က ပိုပြီး အသက်ဝင်သွားပါလိမ့်မယ်။

၂။ Empty State: AI Chatbot မှာ အဖြေရှာမတွေ့တဲ့အခါ "EC တွေနဲ့ တိုက်ရိုက် စကားပြောကြည့်ပါလား" ဆိုတဲ့ အညွှန်းလေး ပေါ်လာအောင် လုပ်ခိုင်းပါ။

၃။ EC Data: prompt ထဲမှာပဲ မေဂျာ ၇ ခုလုံးရဲ့ အမည်တွေကို တစ်ခါတည်း ထည့်ပေးလိုက်ပါ (Civil, Archi, EC, EP, ME, MC, IT/Computer)။ ဒါဆိုရင် သူက Card ၇ ခုကို အလိုအလျောက် ပုံဖော်ပေးပါလိမ့်မယ်။
