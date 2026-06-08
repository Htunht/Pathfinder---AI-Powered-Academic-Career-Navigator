import { Link } from "react-router"
import { LoginForm } from "@/pages/auth/login-form"
import { Compass } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        {/* Logo wrapper */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2.5 group select-none">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-500 text-white shadow-[0_3px_0_#15803d] transition-all duration-300 group-hover:scale-105 group-hover:rotate-12">
              <Compass className="size-5" strokeWidth={2.5} />
            </div>
            <span className="font-black text-2xl tracking-tight text-slate-800">
              DU WAN KYAL
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-[0_8px_0_#cbd5e1] flex flex-col gap-6">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
