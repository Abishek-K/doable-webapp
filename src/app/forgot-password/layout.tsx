import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password — Doable",
  description: "Reset your Doable account password.",
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
