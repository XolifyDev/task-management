// app/providers.tsx
'use client'

import { NextAuthProvider } from "@/components/nextauth-provider"
import { ThemeProvider } from "@/components/theme-provider"


export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <NextAuthProvider>
                {children}
            </NextAuthProvider>
        </ThemeProvider>
    )
}