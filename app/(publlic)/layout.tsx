'use client'

import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/shadcn/button";
import Link from "next/link";


export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { data } = authClient.useSession();



    return (
        <div className="overflow-hidden h-screen">
            <header className="sticky top-0 h-16 bg-background z-10 border-b">
                <Link href={'/'}><Button variant={'link'}>Home</Button></Link>
                {data ? <Link href={'/account'}><Button>Profile</Button></Link> : <Link href={'/auth/sign-up'}><Button>Sign Up</Button></Link>}
            </header>

            {children}
        </div>

    );
}
