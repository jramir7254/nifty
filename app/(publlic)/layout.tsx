'use client'

import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import ThemeSwitcher from "@/components/navigation/theme-switcher";


export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { data } = authClient.useSession();



    return (
        <div className="overflow-hidden h-screen">
            <header className="sticky flex items-center justify-end px-10 top-0 h-16 bg-background z-10 border-b">
                <nav className="flex gap-2">
                    <Link href={'/'}>
                        <Button variant={'link'}>
                            Home
                        </Button>
                    </Link>
                    <Link href={'/about'}>
                        <Button variant={'link'}>
                            About
                        </Button>
                    </Link>
                    {data ? (
                        <Link href={'/account'}>
                            <Button>
                                Profile
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href={'/auth/sign-up'}>
                                <Button className="rounded-full">
                                    Sign Up
                                </Button>
                            </Link>
                            <Link href={'/auth/login'}>
                                <Button className="rounded-full">
                                    Login
                                </Button>
                            </Link>
                        </>
                    )}
                    <ThemeSwitcher />
                </nav>
            </header>

            {children}
        </div>

    );
}
