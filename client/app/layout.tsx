import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { GeistSans } from 'geist/font'
import { cn } from '@/lib/utils'
import SiteHeader from '@/components/site-header';
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.className
        )}
      >
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html >
  )
}
