'use client'

import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { usePathname } from 'next/navigation'

import ThemeSwitcher from '@/components/navigation/theme-switcher'
import { Button } from '@/components/shadcn/button'
import { authClient } from '@/lib/auth/client'
import { cn } from '@/lib/utils'

const publicLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
] as const

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { data } = authClient.useSession()
    const pathname = usePathname()

    return (
        <div className="h-screen overflow-hidden bg-background">
            <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16  w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <Link
                            className="flex min-w-0 items-center gap-3 rounded-full pr-2 transition-colors hover:text-foreground/80"
                            href="/"
                        >

                            <div className="min-w-0">
                                <h3 className="truncate text-sm font-semibold sm:text-base">
                                    Nifty
                                </h3>

                            </div>
                        </Link>

                        {/* <nav className="hidden items-center rounded-full border border-border/70 bg-background/70 p-1 shadow-sm md:flex">
                            {publicLinks.map((item) => {
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== '/' && pathname.startsWith(item.href))

                                return (
                                    <Button
                                        asChild
                                        className={cn(
                                            'rounded-full px-4',
                                            isActive && 'shadow-xs'
                                        )}
                                        key={item.href}
                                        size="sm"
                                        variant={isActive ? 'secondary' : 'ghost'}
                                    >
                                        <Link href={item.href}>{item.label}</Link>
                                    </Button>
                                )
                            })}
                        </nav> */}
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        {data ? (
                            <Button asChild className="rounded-full px-4" size="sm">
                                <Link href="/account">
                                    Profile
                                    <ArrowUpRight data-icon="inline-end" />
                                </Link>
                            </Button>
                        ) : (
                            <Button asChild className=" px-4" size="sm">
                                <Link href="/auth/sign-up">
                                    Join
                                    <ArrowUpRight data-icon="inline-end" />
                                </Link>
                            </Button>
                        )}

                        <ThemeSwitcher />
                    </div>
                </div>
            </header>

            {children}
        </div>
    )
}
