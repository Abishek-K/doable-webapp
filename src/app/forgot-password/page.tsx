"use client"
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMsg(null)

    if (!email) {
      setError("Please enter your email address.")
      setIsLoading(false)
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccessMsg("If an account exists with that email, a password reset link has been sent.")
    } catch (err: any) {
      console.error('Error sending reset email', err)
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] flex flex-col">
      <Navigation showBackButton={true} />
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md bg-white border border-[#e4e7ea] shadow-sm rounded-3xl">
          <form onSubmit={handleReset}>
            <CardHeader className="space-y-2 pt-8">
              <CardTitle className="text-2xl font-bold text-center">Reset your password</CardTitle>
              <CardDescription className="text-center text-[#5a5a5a]">
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 mt-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl">
                  {successMsg}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-[#2b2b2b]">Email</Label>
                <Input 
                  onChange={(e) => setEmail(e.target.value)} 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="bg-white border-[#e4e7ea] focus:border-[#1a73e8] focus:ring-[#1a73e8]/20 rounded-xl h-12" 
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pb-8">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#1a73e8] text-white hover:bg-[#1765cc] rounded-full h-12 font-semibold shadow-md transition-all"
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
              <p className="text-sm text-center text-[#5a5a5a]">
                Remembered your password?{" "}
                <Link href="/login" className="text-[#1a73e8] font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e4e7ea] w-full mt-auto">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between py-6 space-y-4 sm:space-y-0">
          <div className="flex items-center">
            <span className="text-sm font-medium text-[#5a5a5a]">© {new Date().getFullYear()} Doable. All rights reserved.</span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/terms" className="text-sm font-medium text-[#5a5a5a] hover:text-[#1a1a1a] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-[#5a5a5a] hover:text-[#1a1a1a] transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
