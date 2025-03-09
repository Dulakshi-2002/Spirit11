// import type React from "react"
// import "./globals.css"
// import { Inter } from "next/font/google"
// import { AuthProvider } from "@/contexts/auth-context"
// import { ThemeProvider } from "@/components/theme-provider"
// import { ErrorBoundary } from "@/components/error-boundary"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "Fantasy Team Builder",
//   description: "Build your fantasy sports team",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//           <AuthProvider>
//             <ErrorBoundary>{children}</ErrorBoundary>
//           </AuthProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }



// import './globals.css'

//************************

import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"], display: 'swap' })

export const metadata = {
  title: "Fantasy Team Builder",
  description: "Build your fantasy sports team",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} h-full bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-blue-900 min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen bg-blue-50/50 dark:bg-blue-950/50 backdrop-blur-sm">
            <AuthProvider>
              <ErrorBoundary>
                <main className="flex-grow flex flex-col">
                  {children}
                </main>
              </ErrorBoundary>
            </AuthProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

