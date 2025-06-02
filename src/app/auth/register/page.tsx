import { RegisterForm } from "@/components/register-form"
import {SystemTitle} from "@/components/system-title"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SystemTitle />
        <RegisterForm />
      </div>
    </div>
  )
}
