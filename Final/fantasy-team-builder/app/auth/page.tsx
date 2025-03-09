// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/contexts/auth-context"
// import { SignupForm } from "@/components/auth/signup-form"
// import { LoginForm } from "@/components/auth/login-form"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useEffect } from "react"

// export default function AuthPage() {
//   const [activeTab, setActiveTab] = useState("login")
//   const { user } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (user) {
//       router.push("/dashboard")
//     }
//   }, [user, router])

//   return (
//     <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
//       <div className="w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-8">Fantasy Team Builder</h1>
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="login">Login</TabsTrigger>
//             <TabsTrigger value="signup">Sign Up</TabsTrigger>
//           </TabsList>
//           <TabsContent value="login">
//             <LoginForm />
//           </TabsContent>
//           <TabsContent value="signup">
//             <SignupForm />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { SignupForm } from "@/components/auth/signup-form"
import { LoginForm } from "@/components/auth/login-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-blue-300/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-100">Fantasy Team Builder</h1>
          <p className="text-blue-300 mt-2">Build your dream team and compete with friends</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-blue-800/50 p-1 rounded-lg">
            <TabsTrigger 
              value="login"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-200 rounded-md py-2"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-200 rounded-md py-2"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="mt-8 text-center text-blue-300 text-sm">
          <p>© 2025 Fantasy Team Builder. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}