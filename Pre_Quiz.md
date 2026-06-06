ဒီ Pre-Quiz Gateway အပိုင်းကို AI Coding Assistant တွေ (Cursor, GitHub Copilot သို့မဟုတ် ChatGPT) ဆီမှာ အလွယ်တကူ ရေးခိုင်းလို့ရမယ့် System Prompt ကို အောက်မှာ ပြင်ဆင်ပေးလိုက်ပါတယ်။

မလိုလားအပ်တဲ့ အရိပ်တွေ၊ ခပ်ဝိုင်းဝိုင်းပုံစံတွေကို ရှောင်ရှားပြီး ပြတ်သားတဲ့ (Sharp & Flat) ဒီဇိုင်းထွက်လာစေဖို့ သေချာထည့်သွင်းရေးသားပေးထားပါတယ်။

💻 Pre-Quiz Gateway Code Generation Prompt
Role: Act as an Expert React Developer and UI/UX Designer.

Context: I am building a "Career & Major Pathfinder" web application for Grade-12 students entering Technological Universities. Before they start the personality/aptitude quiz, I need a "Pre-Quiz Gateway" Modal or Full-screen Card component. This component will collect their high school matriculation marks for 4 specific subjects to determine their eligibility for various engineering majors.

Task: Create a React Functional Component (using Tailwind CSS) for this Pre-Quiz Gateway.

Functional Requirements:

Input Fields: Four distinct input fields for: English, Mathematics, Physics, and Chemistry.

Validation: Each input must only accept numbers, with a minimum value of 0 and a maximum value of 100.

Real-time Calculation: Display a dynamic "Total Score" (out of 400) that updates instantly as the user types in their marks.

Call to Action (CTA): A "Continue to Assessment" button. This button MUST be disabled until all 4 inputs are filled with valid numbers (0-100).

Design & Aesthetic Requirements (CRITICAL):

Strictly NO soft designs: I do not like soft drop shadows or heavily rounded corners. Do NOT use shadow-md, shadow-lg, rounded-xl, or rounded-2xl.

Sharp & Brutalist Approach: Use flat designs, sharp corners (rounded-none or rounded-sm), and clear 1px solid borders (e.g., border-2 border-black or border-gray-800).

Solid Shadows: If you need depth, use a solid offset shadow (e.g., shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]).

Typography: Use bold, tightly-spaced headings. For the input fields and the "Total Score" display, use a monospaced font (font-mono) to give it a technical, data-driven, engineering feel.

Colors: Keep the background clean (white or very light gray) with high-contrast elements (e.g., a solid black button with white text).

Output: Please provide the complete, clean, and modular React component code (e.g., PreQuizGateway.jsx). Assume state is managed locally within this component before being passed up to the parent.
