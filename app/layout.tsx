import { FC, ReactNode } from 'react'
import { Header } from '@/components/layout/header'
// import { Providers } from '@/components/providers'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Providers
          attribute='class'
          defaultTheme='light'
          enableSystem={true}
          themes={['light', 'dark', 'system']}
        >
          <Header />
          <main className='container mx-auto px-4 py-8'>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

// import { Inter } from "next/font/google"
// import type { Metadata } from "next"
// import { cn } from "@/lib/utils"

// import { Providers } from "./providers"
// import { Header } from "@/components/layout/header"
// import "./globals.css"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Islamic Academy",
//   description: "Learn authentic Islamic knowledge online",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
//         <Providers>
//           <Header />
//           <main>{children}</main>
//         </Providers>
//       </body>
//     </html>
//   )
// }
