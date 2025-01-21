import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"

import { Providers } from "./providers"
import { Header } from "@/components/layout/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Islamic Academy",
  description: "Learn authentic Islamic knowledge online",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
