import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "@/lib/prisma"
import { hashPassword, verifyPassword } from "@/lib/argon2"
import { nextCookies } from "better-auth/next-js"
import { createAuthMiddleware, APIError } from "better-auth/api"
import { admin } from "better-auth/plugins"
import { getValidEmailDomains } from "./utils"
import { sendEmail } from "./email"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    requireEmailVerification: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log("Sending reset password email to:", user, url, token, request);
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log("Sending verification email to:", user, url, token, request);
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email)
        const domain = email.split("@")[1]
        const validEmailDomains = getValidEmailDomains()
        if (!validEmailDomains.includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid email domain. Please use a valid email address."
          })
        }
      }
    })
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"],
        input: false
      }
    }
  },
  session: {
    expiresIn: 7 * 24 * 60 * 60,
  },
  advanced: {
    database: {
      generateId: false
    }
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"],
    })
  ]
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "unknown";
