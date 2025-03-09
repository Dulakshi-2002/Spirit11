"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loading } from "@/components/ui/loading"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

