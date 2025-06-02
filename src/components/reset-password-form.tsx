
import { cn } from "@/lib/utils"
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { resetPasswordAction } from "@/actions/user.action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ResetPasswordFormProps {
  token: string;
  className?: string;
}

export function ResetPasswordForm({
  className,
  token,
  ...props
}: ResetPasswordFormProps) {
  const [password, setPassword] = React.useState("")
  const [isPending, setIsPending] = React.useState(false)
  const router = useRouter();

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setIsPending(true)
    const { error } = await resetPasswordAction({ token, password });
    setIsPending(false)
    if (error) {
      return toast.error(error)
    } else {
      toast.success("Password reset successful")
      router.push("/auth/login")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  required
                  onChange={(e) => { setPassword(e.target.value) }}
                />
              </div>
              <Button type="submit" className="w-full" onClick={async (e) => {
                handleReset(e)
              }}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account??{" "}
              <a href="/auth/login" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
