'use client'
import { authClient } from '@/lib/auth/client';
import React from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data } = authClient.useSession();
    return data ? children : null
}
