import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"

const signupSchema = z.object({
  name: z.string().min(2, { message: "အမည်သည် အနည်းဆုံး ၂ လုံး ရှိရပါမည်။" }),
  email: z.string().email({ message: "အီးမေးလ်လိပ်စာ မှန်ကန်စွာ ထည့်သွင်းပေးပါ။" }),
  password: z.string().min(8, { message: "စကားဝှက်သည် အနည်းဆုံး ၈ လုံး ရှိရပါမည်။" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "စကားဝှက်များ ကိုက်ညီမှု မရှိပါ။",
  path: ["confirmPassword"]
});

export function SignupForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = signupSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const path = issue.path[0]
        if (typeof path === "string") {
          fieldErrors[path] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})

    const { error } = await authClient.signUp.email({
      email: result.data.email,
      password: result.data.password,
      name: result.data.name,
    });

    if (error) {
      setErrors({ email: error.message || "အကောင့်ဖွင့်ခြင်း မအောင်မြင်ပါ။" })
    } else {
      navigate("/")
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-1.5 text-center mb-2">
        <h1 className="text-2xl font-black text-slate-800">🎒 အကောင့်အသစ် ဖွင့်လှစ်ပါ</h1>
        <p className="text-sm font-bold text-slate-500">
          အကောင့်ဖွင့်ရန် သင့်အချက်အလက်များကို အောက်တွင် ထည့်သွင်းပါ
        </p>
      </div>

      {/* Name Field */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-black text-slate-700">
          အမည်
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          required
          value={formData.name}
          onChange={handleChange}
          className={`w-full h-12 px-4 rounded-2xl border-2 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all font-bold ${
            errors.name
              ? "border-red-400 focus:border-red-500 shadow-[0_3px_0_#fecaca] focus:shadow-[0_3px_0_#fca5a5]"
              : "border-slate-200 focus:border-green-500 shadow-[0_3px_0_#e2e8f0] focus:shadow-[0_3px_0_#15803d]"
          }`}
        />
        {errors.name && (
          <span className="text-xs font-bold text-red-500 mt-1">
            ⚠️ {errors.name}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-black text-slate-700">
          အီးမေးလ်
        </label>
        <input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          value={formData.email}
          onChange={handleChange}
          className={`w-full h-12 px-4 rounded-2xl border-2 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all font-bold ${
            errors.email
              ? "border-red-400 focus:border-red-500 shadow-[0_3px_0_#fecaca] focus:shadow-[0_3px_0_#fca5a5]"
              : "border-slate-200 focus:border-green-500 shadow-[0_3px_0_#e2e8f0] focus:shadow-[0_3px_0_#15803d]"
          }`}
        />
        {errors.email && (
          <span className="text-xs font-bold text-red-500 mt-1">
            ⚠️ {errors.email}
          </span>
        )}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-black text-slate-700">
          စကားဝှက်
        </label>
        <div className="relative w-full">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleChange}
            className={`w-full h-12 pl-4 pr-11 rounded-2xl border-2 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all font-bold ${
              errors.password
                ? "border-red-400 focus:border-red-500 shadow-[0_3px_0_#fecaca] focus:shadow-[0_3px_0_#fca5a5]"
                : "border-slate-200 focus:border-green-500 shadow-[0_3px_0_#e2e8f0] focus:shadow-[0_3px_0_#15803d]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-hidden"
          >
            {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
          </button>
        </div>
        {!errors.password && (
          <p className="text-[11px] font-bold text-slate-400 mt-0.5">
            အနည်းဆုံး စာလုံး ၈ လုံး ရှိရပါမည်။
          </p>
        )}
        {errors.password && (
          <span className="text-xs font-bold text-red-500 mt-1">
            ⚠️ {errors.password}
          </span>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirmPassword" className="text-sm font-black text-slate-700">
          စကားဝှက်ကို ထပ်မံအတည်ပြုပါ
        </label>
        <div className="relative w-full">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full h-12 pl-4 pr-11 rounded-2xl border-2 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all font-bold ${
              errors.confirmPassword
                ? "border-red-400 focus:border-red-500 shadow-[0_3px_0_#fecaca] focus:shadow-[0_3px_0_#fca5a5]"
                : "border-slate-200 focus:border-green-500 shadow-[0_3px_0_#e2e8f0] focus:shadow-[0_3px_0_#15803d]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-hidden"
          >
            {showConfirmPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-xs font-bold text-red-500 mt-1">
            ⚠️ {errors.confirmPassword}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-3 rounded-2xl border-b-4 border-green-700 active:border-b-0 active:translate-y-[4px] shadow-[0_4px_0_#15803d] transition-all cursor-pointer text-center select-none flex items-center justify-center mt-2"
      >
        အကောင့်ဖွင့်ရန်
      </button>

      {/* Separator */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t-2 border-slate-100"></div>
        <span className="flex-shrink mx-4 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-2">
          သို့မဟုတ်
        </span>
        <div className="flex-grow border-t-2 border-slate-100"></div>
      </div>

      {/* Google Auth Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-600 font-black py-2.5 rounded-2xl border-2 border-slate-200 border-b-4 border-slate-300 active:border-b-2 active:translate-y-[2px] transition-all cursor-pointer shadow-[0_3px_0_#e2e8f0]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4.5 shrink-0">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        <span>Google အကောင့်ဖြင့် အကောင့်ဖွင့်ရန်</span>
      </button>

      {/* Login Link */}
      <p className="text-center text-sm font-bold text-slate-500 mt-2">
        အကောင့်ရှိပြီးသားလား။{" "}
        <Link to="/login" className="text-green-600 hover:text-green-700 underline underline-offset-4 font-black">
          ဝင်ရန်
        </Link>
      </p>
    </form>
  )
}
