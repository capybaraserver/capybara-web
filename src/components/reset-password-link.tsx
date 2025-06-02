
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
import { sendResetPasswordEmail } from "@/actions/user.action"
import { toast } from "sonner"

export function ResetPasswordLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = React.useState("")
  const [isPending, setIsPending] = React.useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setIsPending(true)
    const { error } = await sendResetPasswordEmail({ email });
    setIsPending(false)
    if (error) {
      return toast.error(error)
    } else {
      toast.success("Reset password email sent successfully")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => { setEmail(e.target.value) }}
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
                  "Send reset link"
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
