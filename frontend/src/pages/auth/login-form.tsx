import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email({ message: "အီးမေးလ်လိပ်စာ မှန်ကန်စွာ ထည့်သွင်းပေးပါ။" }),
  password: z.string().min(8, { message: "စကားဝှက်သည် အနည်းဆုံး ၈ လုံး ရှိရပါမည်။" })
})

export function LoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)

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
    const result = loginSchema.safeParse(formData)
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

    const { error } = await authClient.signIn.email({
      email: result.data.email,
      password: result.data.password,
    });

    if (error) {
      setErrors({ email: error.message || "အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။" })
    } else {
      navigate("/")
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-1.5 text-center mb-2">
        <h1 className="text-2xl font-black text-slate-800">🔑 သင့်အကောင့်သို့ ဝင်ရောက်ပါ</h1>
        <p className="text-sm font-bold text-slate-500">
          အကောင့်သို့ ဝင်ရောက်ရန် သင့်အီးမေးလ်ကို အောက်တွင် ထည့်သွင်းပါ
        </p>
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
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="text-sm font-black text-slate-700">
            စကားဝှက်
          </label>
          <a href="#" className="text-xs font-bold text-green-600 hover:text-green-700 hover:underline">
            စကားဝှက် မေ့သွားပါသလား။
          </a>
        </div>
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
        {errors.password && (
          <span className="text-xs font-bold text-red-500 mt-1">
            ⚠️ {errors.password}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-3 rounded-2xl border-b-4 border-green-700 active:border-b-0 active:translate-y-[4px] shadow-[0_4px_0_#15803d] transition-all cursor-pointer text-center select-none flex items-center justify-center mt-2"
      >
        ဝင်ရန်
      </button>

      {/* Separator */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t-2 border-slate-100"></div>
        <span className="flex-shrink mx-4 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-2">
          သို့မဟုတ်
        </span>
        <div className="flex-grow border-t-2 border-slate-100"></div>
      </div>

      {/* Social Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-600 font-black py-2.5 rounded-2xl border-2 border-slate-200 border-b-4 border-slate-300 active:border-b-2 active:translate-y-[2px] transition-all cursor-pointer shadow-[0_3px_0_#e2e8f0]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 shrink-0 text-slate-800">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </svg>
        <span>GitHub အကောင့်ဖြင့် ဝင်ရောက်ရန်</span>
      </button>

      {/* Register Link */}
      <p className="text-center text-sm font-bold text-slate-500 mt-2">
        အကောင့်မရှိသေးဘူးလား။{" "}
        <Link to="/signup" className="text-green-600 hover:text-green-700 underline underline-offset-4 font-black">
          အကောင့်ဖွင့်ရန်
        </Link>
      </p>
    </form>
  )
}
