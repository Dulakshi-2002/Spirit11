"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Caught error:", error)
      setError(error.error)
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  if (error) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error.message || "An unexpected error occurred"}</AlertDescription>
          </Alert>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              setError(null)
              window.location.href = "/"
            }}
          >
            Go back to home
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

