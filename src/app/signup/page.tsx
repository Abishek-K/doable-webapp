"use client";
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Flame, ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      setIsLoading(false)
      return
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.")
      setIsLoading(false)
      return
    }
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register');
      }

      const data = await response.json();
      console.log('User registered successfully:', data);

      // Sign in the user client-side after successful registration
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/dashboard")
    } catch (err: any) {
      console.error('Error signing up', err);
      if (err.message.includes('email-already-in-use')) {
         setError("An account with this email already exists.")
      } else {
         setError(err instanceof Error ? err.message : 'An error occurred during registration');
      }
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
          <form onSubmit={handleSignup}>
            <CardHeader className="space-y-2 pt-8">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center text-[#5a5a5a]">
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 mt-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-[#2b2b2b]">Email</Label>
                <Input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="name@example.com" className="bg-white border-[#e4e7ea] focus:border-[#1a73e8] focus:ring-[#1a73e8]/20 rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-semibold text-[#2b2b2b]">Password</Label>
                <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="bg-white border-[#e4e7ea] focus:border-[#1a73e8] focus:ring-[#1a73e8]/20 rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="font-semibold text-[#2b2b2b]">Confirm Password</Label>
                <Input onChange={(e) => setConfirmPassword(e.target.value)} id="confirm-password" type="password" className="bg-white border-[#e4e7ea] focus:border-[#1a73e8] focus:ring-[#1a73e8]/20 rounded-xl h-12" />
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="terms" className="border-[#e4e7ea] data-[state=checked]:bg-[#1a73e8]" required />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none text-[#5a5a5a]"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#1a73e8] font-semibold hover:underline">
                    terms and conditions
                  </Link>
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pb-8">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#f4c400] text-[#1a1a1a] hover:bg-[#e0b400] rounded-full h-12 font-semibold shadow-md transition-all"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <p className="text-sm text-center text-[#5a5a5a]">
                Already have an account?{" "}
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