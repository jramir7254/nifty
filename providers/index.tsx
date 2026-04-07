import React from 'react'
import { ThemeProvider } from "@/providers/theme-provider";
import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { authClient } from "@/lib/auth/client";
import { Toaster } from "@/components/shadcn/sonner"
import { TooltipProvider } from "@/components/shadcn/tooltip"
import { ReactQueryClientProvider } from './tanstack-provider'


export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <NeonAuthUIProvider
            authClient={authClient}
            emailOTP
            emailVerification
            credentials={{ confirmPassword: true, }}
            social={{
                providers: ['google', 'github', 'vercel',]
            }}
            redirectTo="/account"
        >
            <ReactQueryClientProvider>

                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        {children}
                        <Toaster />
                    </TooltipProvider>
                </ThemeProvider>
            </ReactQueryClientProvider>

        </NeonAuthUIProvider>
    )
}
