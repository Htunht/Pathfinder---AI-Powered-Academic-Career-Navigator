import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { Groq } from "groq-sdk";
import { getAllMajors } from "../repositories/majorRepository";

export interface QuizScores {
  TECH: number;
  INFRASTRUCTURE: number;
  ENERGY: number;
  [key: string]: number;
}

const apiKey = process.env.GEMINI_API_KEY || process.env.GEMINI_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const hfToken = process.env.HF_TOKEN || "";
const openai = hfToken
  ? new OpenAI({
      baseURL: "https://router.huggingface.co/api/router/v1",
      apiKey: hfToken,
    })
  : null;

const groqApiKey = process.env.GROQ_API_KEY || process.env.GROP_API_KEY || "";
const groq = groqApiKey
  ? new Groq({
      apiKey: groqApiKey,
    })
  : null;

export async function calculateMatch(totalScore: number, quizScores: QuizScores) {
  const majors = await getAllMajors();

  // ၁။ အများဆုံး ဝါသနာ (Top Category) ကို ရှာမည်
  const rawTopCategory = Object.keys(quizScores).reduce((a, b) => 
    (quizScores[a] ?? 0) > (quizScores[b] ?? 0) ? a : b
  );

  const categoryMap: { [key: string]: string } = {
    "TECH": "Tech & Electronics",
    "INFRASTRUCTURE": "Infrastructure",
    "ENERGY": "Process & Energy"
  };

  const topCategory = categoryMap[rawTopCategory] || rawTopCategory;

  // ၃။ Logic တွက်ချက်မည်
  const matches = majors.map((major) => {
    const isEligible = totalScore >= major.cutoffMark;
    const isRecommended = major.category === topCategory;

    return {
      ...major,
      isEligible,
      isRecommended,
    };
  });

  const topMatches = matches.filter((m) => m.isEligible && m.isRecommended);
  const otherEligible = matches.filter((m) => m.isEligible && !m.isRecommended);
  const ineligible = matches.filter((m) => !m.isEligible);

  // Generate AI Insight
  let aiInsight = "";
  const topMatchesNames = topMatches.map((m) => m.myanmarName || m.name).join(", ");
  const prompt = `You are a friendly and encouraging Senior Campus Guide welcoming a University Freshman.
The student has completed an academic assessment.

Student's Score Details:

- Total Score: ${totalScore}
- Student's Top Interest Category: ${topCategory}
- Student's Top Match Majors: ${topMatchesNames || "No exact recommended majors (explore other eligible majors)"}

Write a short, professional, and encouraging guide message for the student.
Rules:

1. Write in ENGLISH language ONLY.
2. Keep it to 3-4 sentences.
3. Be friendly and welcoming, like a helpful Senior/Mentor.
4. Use appropriate emojis like 🥳, 🚀, 🎓, or 💡.
5. Focus on the student's top interest and potential career path.`;

  // 1. Try Groq first
  if (groq && groqApiKey) {
    try {
      console.log("Attempting Groq API call...");
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are a friendly Burmese-speaking Senior Campus Guide." },
          { role: "user", content: prompt }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
      });
      const responseText = chatCompletion.choices[0]?.message?.content?.trim();
      if (responseText) {
        aiInsight = responseText;
        console.log("Groq API status: SUCCESS");
        console.log("Groq API call succeeded.");
      }
    } catch (error) {
      console.log("Groq API status: FAILED", error);
      console.error("Groq API Error:", error);
    }
  }

  // 2. Try Hugging Face second
  if (!aiInsight && openai && hfToken) {
    try {
      console.log("Attempting Hugging Face API call...");
      const completion = await openai.chat.completions.create({
        model: "mistralai/Mistral-Nemo-12B-Instruct-v1",
        messages: [
          { role: "system", content: "You are a friendly Burmese-speaking Senior Campus Guide." },
          { role: "user", content: prompt }
        ],
        max_tokens: 1024,
        temperature: 0.7,
      });
      const responseText = completion.choices[0]?.message?.content?.trim();
      if (responseText) {
        aiInsight = responseText;
        console.log("Hugging Face API call succeeded.");
      }
    } catch (error) {
      console.error("Hugging Face API Error:", error);
    }
  }

  // 3. Fall back to Gemini if others failed or were not configured
  if (!aiInsight && apiKey) {
    try {
      console.log("Attempting Gemini API call...");
      let attempts = 0;
      const maxAttempts = 2;
      while (attempts < maxAttempts) {
        try {
          attempts++;
          const aiResult = await model.generateContent(prompt);
          const response = await aiResult.response;
          const responseText = response.text()?.trim();
          if (responseText) {
            aiInsight = responseText;
            console.log("Gemini API call succeeded.");
            break;
          }
        } catch (error: any) {
          console.warn(`Gemini AI API Attempt ${attempts} Failed:`, error.message || error);
          if (error.status === 429 && attempts < maxAttempts) {
            let delayMs = 2000;
            const retryInfo = error.errorDetails?.find(
              (d: any) => d["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
            );
            if (retryInfo && typeof retryInfo.retryDelay === "string") {
              const seconds = parseFloat(retryInfo.retryDelay);
              if (!isNaN(seconds)) {
                delayMs = seconds * 1000;
              }
            }
            console.log(`Rate limited (429). Retrying after ${delayMs}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      console.error("Gemini AI API Error:", error);
    }
  }

  // Fallback to static templates if AI generation failed or apiKey is missing
  if (!aiInsight) {
    if (rawTopCategory === "TECH") {
      aiInsight = "မင်္ဂလာပါ! သင့်ရဲ့ ရလဒ်အရ သင်ဟာ နည်းပညာနဲ့ တီထွင်ဖန်တီးမှုတွေမှာ စိတ်အားထက်သန်သူတစ်ယောက် ဖြစ်ပါတယ်။ ဉာဏ်ရည်တု၊ ဆော့ဖ်ဝဲလ်အင်ဂျင်နီယာ ဒါမှမဟုတ် စက်ရုပ်နည်းပညာတွေဟာ သင့်အတွက် စိန်ခေါ်မှုအသစ်တွေနဲ့ ပြည့်နှက်နေတဲ့ အနာဂတ်ကောင်းတစ်ခု ဖြစ်စေမှာ သေချာပါတယ်။ ဆက်လက်ကြိုးစားပါ! 🚀";
    } else if (rawTopCategory === "INFRASTRUCTURE") {
      aiInsight = "မင်္ဂလာပါ! သင့်ရဲ့ ရလဒ်အရ မြို့ပြတည်ဆောက်ရေး၊ အဆောက်အဦးပုံစံထုတ်လုပ်ရေးနဲ့ အခြေခံအဆောက်အအုံတွေ ဖန်တီးရာမှာ စိတ်ဝင်စားသူတစ်ယောက် ဖြစ်ပါတယ်။ အနာဂတ်မြို့ပြတွေကို ပုံဖော်ပေးမယ့် သင့်ရဲ့ စွမ်းရည်တွေကို အကောင်းဆုံးအသုံးချပြီး နိုင်ငံတော်ဖွံ့ဖြိုးတိုးတက်ရေးမှာ ပါဝင်လိုက်ပါ။ ဆက်လက်ကြိုးစားပါ! 🏗️";
    } else if (rawTopCategory === "ENERGY") {
      aiInsight = "မင်္ဂလာပါ! သင့်ရဲ့ ရလဒ်အရ စွမ်းအင်သစ်တွေ ထုတ်လုပ်ရေး၊ ရေနံနဲ့ ပါဝါဖြန့်ဖြူးရေးစနစ်တွေအပေါ် စိတ်ဝင်စားမှု အလွန်မြင့်မားနေပါတယ်။ သဘာဝစွမ်းအင်နဲ့ လျှပ်စစ်ပါဝါကဏ္ဍတွေဟာ အနာဂတ်ကမ္ဘာအတွက် အဓိကကျတဲ့အတွက် ဒီပညာရပ်မှာ သင်ထူးချွန်အောင်မြင်မှာ သေချာပါတယ်။ ဆက်လက်ကြိုးစားပါ! 💡";
    } else {
      aiInsight = "မင်္ဂလာပါ! သင့်ရဲ့ ဖြေဆိုမှုတွေအရ သတ်မှတ်ထားတဲ့ မေဂျာတစ်ခုစီတိုင်းမှာ ထူးချွန်နိုင်စွမ်းရှိတဲ့ အရည်အချင်းတွေကို တွေ့မြင်ရပါတယ်။ သင့်ရဲ့ အားသာချက်တွေကို ပိုမိုဖွံ့ဖြိုးလာအောင် လေ့လာပြီး အနာဂတ်ခရီးလမ်းကို ယုံကြည်မှုအပြည့်နဲ့ လျှောက်လှမ်းလိုက်ပါ။ ဆက်လက်ကြိုးစားပါ! 🎓";
    }
  }

  return {
    topMatches,
    otherEligible,
    ineligible,
    aiInsight,
  };
}
