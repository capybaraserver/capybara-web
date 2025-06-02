'use server'
import { auth, ErrorCode } from "@/lib/auth"
import { APIError } from "better-auth/api"
import { headers } from "next/headers"
import { sendEmail } from "@/lib/email"

export async function signUpEmailAction({ email, password }: { email: string; password: string }) {
  // Validate email
  if (!email) return { error: "Email is required" }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return { error: "Please enter a valid email address" }
  // Validate password
  if (!password) return { error: "Password is required" }
  if (password.length < 8) return { error: "Password must be at least 8 characters" }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (!passwordRegex.test(password)) return { error: "Password must contain both letters and numbers" }
  try {
    await auth.api.signUpEmail({
      body: {
        name: email.split("@")[0],
        email,
        password
      }
    })
    return { error: null }
  } catch (error) {
    if (error instanceof APIError) {
      const ErrorCode = error.body ? (error.body.code as ErrorCode) : "unknown"
      switch (ErrorCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "User already exists with this email" }
        default:
          return { error: error.message }
      }
    }
    console.error("Error during sign-up:", error);
    return { error: "An error occurred during sign-up. Please try again later." }
  }
}

export async function signInEmailAction({ email, password }: { email: string; password: string }) {
  // Validate email
  if (!email) return { error: "Email is required" }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return { error: "Please enter a valid email address" }
  // Validate password
  if (!password) return { error: "Please enter your password" }
  // signInEmail
  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password
      }
    })
    return { error: null }
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message }
    }
    console.error("Error during sign-in:", error)
    return { error: "An error occurred during sign-in. Please try again later." }
  }
}

export async function sendVerifyEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
  console.log(`Sending email to ${to} with subject "${subject}" and text "${text}"`)
  sendEmail({ to, subject, text })
}

export async function sendResetPasswordEmail({ email }: { email: string }) {
  console.log(`Sending reset password email to ${email}`)
  if (!email) return { error: "Email is required" }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return { error: "Please enter a valid email address" }
  try {
    await auth.api.forgetPassword({
      body: {
        email,
        redirectTo: "/auth/reset-password",
      }
    })
    return { error: null }
  } catch (error) {
    if (error instanceof APIError) {
      const ErrorCode = error.body ? (error.body.code as ErrorCode) : "unknown"
      switch (ErrorCode) {
        default:
          return { error: error.message }
      }
    }
    console.error("Error during sendResetPasswordEmail:", error);
    return { error: "An error occurred during sendResetPasswordEmail. Please try again later." }
  }

}

export async function resetPasswordAction({ token, password }: { token: string; password: string }) {
  if (!token) return { error: "Token is required" }
  if (!password) return { error: "Password is required" }
  if (password.length < 8) return { error: "Password must be at least 8 characters" }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (!passwordRegex.test(password)) return { error: "Password must contain both letters and numbers" }

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: password,
        token,
      }
    })
    return { error: null }
  } catch (error) {
    if (error instanceof APIError) {
      const ErrorCode = error.body ? (error.body.code as ErrorCode) : "unknown"
      switch (ErrorCode) {
        default:
          return { error: error.message }
      }
    }
    console.error("Error during resetPasswordAction:", error);
    return { error: "An error occurred during resetPasswordAction. Please try again later." }
  }
}
