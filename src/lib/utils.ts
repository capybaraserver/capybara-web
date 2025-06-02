import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getValidEmailDomains () {
  const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", 
    "icloud.com", "protonmail.com", "mail.com", 
    "zoho.com", "aol.com", "yandex.com", "tutanota.com", 
    "163.com", "qq.com", "126.com", "sina.com", "aliyun.com", 
    "aliyun.com.cn", "sohu.com", "139.com", "yeah.net", 
    "21cn.com", "tom.com", "foxmail.com", "gmx.com", "web.de", "mail.ru", "yandex.ru"]
  if (process.env.NODE_ENV === "development") {
    emailDomains.push("example.com")
  }
  return emailDomains
}

