import { Compass } from "lucide-react"
import { Link } from "react-router"
import { LoginForm } from "@/pages/auth/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2.5 group select-none">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary/60 text-primary-foreground shadow-xs transition-transform duration-300 group-hover:scale-105">
              <Compass className="size-5 transition-transform duration-500 group-hover:rotate-45" />
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary to-primary/30 rounded-xl blur-xs opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Pathfinder
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/login_banner.png"
          alt="Login Banner"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
