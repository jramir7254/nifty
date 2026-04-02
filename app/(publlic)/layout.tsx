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
            <header className="sticky flex items-center justify-between px-5 lg:px-75 top-0 h-16 bg-background z-10 border-b">
                <div>
                    <h3 className="text-2xl">Nifty</h3>
                </div>
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
                            <Button className="rounded-full">
                                Profile
                            </Button>
                        </Link>
                    ) : (
                        <Link href={'/auth/sign-up'}>
                            <Button variant={'outline'} className="rounded-full">
                                Sign Up/In
                            </Button>
                        </Link>
                    )}
                    <ThemeSwitcher />
                </nav>
            </header>

            {children}
        </div>

    );
}
