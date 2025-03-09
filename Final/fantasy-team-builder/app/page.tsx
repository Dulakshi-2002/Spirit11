// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/contexts/auth-context"

// export default function Home() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!isLoading) {
//       if (user) {
//         router.push("/dashboard")
//       } else {
//         router.push("/auth")
//       }
//     }
//   }, [user, isLoading, router])

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="animate-pulse">Loading...</div>
//     </div>
//   )
// }

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/auth")
      }
    }
  }, [user, isLoading, router])
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-950">
      <div className="bg-blue-800/30 backdrop-blur-sm p-10 rounded-xl shadow-xl border border-blue-700/20">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-6 rounded-full bg-blue-400/20 flex justify-center items-center">
            <svg 
              className="w-8 h-8 text-blue-200 animate-spin" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <div className="text-blue-100 font-medium text-xl">Loading...</div>
          <div className="text-blue-300/60 text-sm mt-2">Please wait while we prepare your experience</div>
        </div>
      </div>
    </div>
  )
}