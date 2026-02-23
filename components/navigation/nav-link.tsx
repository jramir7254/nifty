'use client';
import { authClient } from '@/lib/auth/client';

import Link from 'next/link'
import React from 'react'
import { Button } from '../shadcn/button'
import { usePathname } from 'next/navigation'

export default function NavLink({
    text,
    path,
    auth = false,
    guest = false,
}: {
    text: string
    path: string
    auth?: boolean
    guest?: boolean
}) {
    const pathname = usePathname();
    const { data } = authClient.useSession();

    if (auth && !data) return null
    if (guest && data) return null

    const isActive = pathname === path || pathname.startsWith(path.substring(0)) && path !== '/'

    return (
        <Link href={path} >
            <Button variant={'link'} className={isActive ? "underline" : ""} >{text}</Button>
        </Link>
    )
}
