"use client"
import { ResetPasswordForm } from "@/components/reset-password-form"
import { ResetPasswordLink } from "@/components/reset-password-link"
import { SystemTitle } from "@/components/system-title"
import { useSearchParams } from "next/navigation"

export default function Page() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SystemTitle />
        {
          !token ? (
            <ResetPasswordLink />
          ) : (
            <ResetPasswordForm token={token} />
          )
        }
      </div>
    </div>
  )
}
