'use client'

import type { ReactNode } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/shadcn/card'
import { ScrollArea } from '@/components/shadcn/scroll-area'
import { Separator } from '@/components/shadcn/separator'
import { Skeleton } from '@/components/shadcn/skeleton'
import { cn } from '@/lib/utils'

function WireLine({
    className,
}: {
    className?: string
}) {
    return <Skeleton className={cn('h-4 rounded-full', className)} />
}

function WireStack({
    lines,
}: {
    lines: string[]
}) {
    return (
        <div className="flex flex-col gap-3">
            {lines.map((width, index) => (
                <WireLine className={width} key={`${width}-${index}`} />
            ))}
        </div>
    )
}

function SectionLabel({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className="w-fit rounded-full border bg-background/85 px-3 py-1 text-xs tracking-[0.28em] uppercase text-muted-foreground">
            {children}
        </div>
    )
}

function SectionFrame({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <section className={cn('flex flex-col gap-8', className)}>
            {children}
        </section>
    )
}

function PlaceholderCard({
    className,
    description,
    title,
    children,
}: {
    className?: string
    description?: string
    title: string
    children: ReactNode
}) {
    return (
        <Card className={cn('bg-background/90 backdrop-blur', className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description ? <CardDescription>{description}</CardDescription> : null}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    )
}

export default function Home() {
    return (
        <ScrollArea className="h-screen min-h-screen bg-background">
            <div className="relative min-h-screen overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="bg-primary/6 absolute top-0 left-0 size-80 rounded-full blur-3xl" />
                    <div className="bg-highlight/30 absolute top-24 right-0 size-96 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.06),transparent_40%)]" />
                </div>

                <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
                    <SectionFrame>
                        <SectionLabel>Hero</SectionLabel>

                        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                            <PlaceholderCard
                                className="min-h-[420px]"
                                description="Primary value proposition, supporting copy, quick proof, and CTA cluster."
                                title="Hero Copy"
                            >
                                <div className="flex h-full flex-col gap-8">
                                    <div className="flex flex-wrap gap-3">
                                        <Skeleton className="h-8 w-28 rounded-full" />
                                        <Skeleton className="h-8 w-36 rounded-full" />
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <WireLine className="h-14 w-full max-w-[36rem]" />
                                        <WireLine className="h-14 w-11/12 max-w-[32rem]" />
                                        <WireLine className="h-14 w-8/12 max-w-[24rem]" />
                                    </div>

                                    <WireStack lines={['w-full', 'w-11/12', 'w-8/12']} />

                                    <div className="flex flex-wrap gap-4">
                                        <Skeleton className="h-11 w-36 rounded-full" />
                                        <Skeleton className="h-11 w-32 rounded-full" />
                                    </div>

                                    <div className="mt-auto grid gap-4 sm:grid-cols-3">
                                        <Skeleton className="h-20 w-full rounded-xl" />
                                        <Skeleton className="h-20 w-full rounded-xl" />
                                        <Skeleton className="h-20 w-full rounded-xl" />
                                    </div>
                                </div>
                            </PlaceholderCard>

                            <PlaceholderCard
                                className="min-h-[420px]"
                                description="Hero visual, dashboard preview, product screenshot, or motion-led illustration."
                                title="Hero Visual"
                            >
                                <div className="flex h-full flex-col gap-5">
                                    <div className="flex items-center gap-2 rounded-xl border bg-muted/40 p-3">
                                        <Skeleton className="size-3 rounded-full" />
                                        <Skeleton className="size-3 rounded-full" />
                                        <Skeleton className="size-3 rounded-full" />
                                        <Skeleton className="ml-3 h-4 w-40 rounded-full" />
                                    </div>

                                    <div className="grid flex-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                                        <Skeleton className="h-full min-h-[250px] rounded-2xl" />
                                        <div className="flex flex-col gap-4">
                                            <Skeleton className="h-28 rounded-2xl" />
                                            <Skeleton className="h-28 rounded-2xl" />
                                            <Skeleton className="h-full min-h-28 rounded-2xl" />
                                        </div>
                                    </div>
                                </div>
                            </PlaceholderCard>
                        </div>
                    </SectionFrame>

                    <Separator />

                    <SectionFrame>
                        <SectionLabel>Logo Strip</SectionLabel>

                        <PlaceholderCard
                            description="Social proof bar used for partners, customers, press, or featured platforms."
                            title="Trusted By"
                        >
                            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Skeleton className="h-14 w-full rounded-xl" key={index} />
                                ))}
                            </div>
                        </PlaceholderCard>
                    </SectionFrame>

                    <Separator />

                    <SectionFrame>
                        <SectionLabel>Features</SectionLabel>

                        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
                            <div className="flex flex-col gap-5">
                                <WireLine className="h-10 w-3/4" />
                                <WireStack lines={['w-full', 'w-11/12', 'w-10/12']} />
                                <Skeleton className="h-10 w-36 rounded-full" />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {[
                                    'Feature Card 01',
                                    'Feature Card 02',
                                    'Feature Card 03',
                                    'Feature Card 04',
                                    'Feature Card 05',
                                    'Feature Card 06',
                                ].map((title) => (
                                    <PlaceholderCard
                                        description="Icon, heading, body copy, and optional link."
                                        key={title}
                                        title={title}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <Skeleton className="size-12 rounded-xl" />
                                            <WireStack lines={['w-full', 'w-10/12', 'w-8/12']} />
                                        </div>
                                    </PlaceholderCard>
                                ))}
                            </div>
                        </div>
                    </SectionFrame>

                    <Separator />

                    <SectionFrame>
                        <SectionLabel>Showcase</SectionLabel>

                        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                            <PlaceholderCard
                                className="min-h-[420px]"
                                description="Product walk-through, dashboard preview, before/after panel, or feature spotlight."
                                title="Primary Product Showcase"
                            >
                                <div className="flex h-full flex-col gap-5">
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <Skeleton className="h-20 rounded-xl" />
                                        <Skeleton className="h-20 rounded-xl" />
                                        <Skeleton className="h-20 rounded-xl" />
                                    </div>
                                    <Skeleton className="h-full min-h-[250px] rounded-2xl" />
                                </div>
                            </PlaceholderCard>

                            <div className="grid gap-4">
                                <PlaceholderCard
                                    description="Text-led explainer with a small supporting graphic."
                                    title="Secondary Spotlight"
                                >
                                    <div className="flex flex-col gap-4">
                                        <WireStack lines={['w-full', 'w-11/12', 'w-8/12']} />
                                        <Skeleton className="h-40 rounded-2xl" />
                                    </div>
                                </PlaceholderCard>

                                <PlaceholderCard
                                    description="Metrics, KPI tiles, or mini comparison table."
                                    title="Supporting Metrics"
                                >
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <Skeleton className="h-24 rounded-xl" />
                                        <Skeleton className="h-24 rounded-xl" />
                                        <Skeleton className="h-24 rounded-xl" />
                                        <Skeleton className="h-24 rounded-xl" />
                                    </div>
                                </PlaceholderCard>
                            </div>
                        </div>
                    </SectionFrame>

                    <Separator />

                    <SectionFrame>
                        <SectionLabel>Testimonials</SectionLabel>

                        <div className="grid gap-4 lg:grid-cols-3">
                            {['Testimonial 01', 'Testimonial 02', 'Testimonial 03'].map((title) => (
                                <PlaceholderCard
                                    description="Quote, customer role, company, and optional avatar."
                                    key={title}
                                    title={title}
                                >
                                    <div className="flex flex-col gap-5">
                                        <WireStack lines={['w-full', 'w-11/12', 'w-10/12', 'w-7/12']} />
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="size-10 rounded-full" />
                                            <div className="flex flex-1 flex-col gap-2">
                                                <WireLine className="w-28" />
                                                <WireLine className="w-20" />
                                            </div>
                                        </div>
                                    </div>
                                </PlaceholderCard>
                            ))}
                        </div>
                    </SectionFrame>

                    <Separator />

                    <SectionFrame>
                        <SectionLabel>Pricing</SectionLabel>

                        <div className="grid gap-4 lg:grid-cols-3">
                            {['Starter', 'Growth', 'Enterprise'].map((tier, index) => (
                                <PlaceholderCard
                                    className={index === 1 ? 'border-primary/40 shadow-md' : undefined}
                                    description="Plan name, price, feature list, and action area."
                                    key={tier}
                                    title={tier}
                                >
                                    <div className="flex flex-col gap-5">
                                        <div className="flex flex-col gap-3">
                                            <WireLine className="h-10 w-24" />
                                            <WireStack lines={['w-full', 'w-10/12']} />
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            {Array.from({ length: 5 }).map((_, itemIndex) => (
                                                <div className="flex items-center gap-3" key={itemIndex}>
                                                    <Skeleton className="size-4 rounded-full" />
                                                    <WireLine className="w-full" />
                                                </div>
                                            ))}
                                        </div>

                                        <Skeleton className="mt-auto h-11 w-full rounded-full" />
                                    </div>
                                </PlaceholderCard>
                            ))}
                        </div>
                    </SectionFrame>

                    <Separator />

                    <SectionFrame>
                        <SectionLabel>FAQ + CTA</SectionLabel>

                        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                            <PlaceholderCard
                                description="FAQ accordion region with 4–6 common objections or onboarding questions."
                                title="FAQ"
                            >
                                <div className="flex flex-col gap-3">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <div
                                            className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-4"
                                            key={index}
                                        >
                                            <WireLine className="w-8/12" />
                                            <Skeleton className="size-5 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </PlaceholderCard>

                            <PlaceholderCard
                                className="min-h-[320px]"
                                description="Final conversion block with headline, supporting copy, benefit points, and CTA pair."
                                title="Closing CTA"
                            >
                                <div className="flex h-full flex-col gap-6">
                                    <div className="flex flex-col gap-4">
                                        <WireLine className="h-12 w-full max-w-[28rem]" />
                                        <WireLine className="h-12 w-10/12 max-w-[22rem]" />
                                        <WireStack lines={['w-full', 'w-10/12', 'w-8/12']} />
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <Skeleton className="h-20 rounded-xl" />
                                        <Skeleton className="h-20 rounded-xl" />
                                        <Skeleton className="h-20 rounded-xl" />
                                    </div>

                                    <div className="mt-auto flex flex-wrap gap-4">
                                        <Skeleton className="h-11 w-36 rounded-full" />
                                        <Skeleton className="h-11 w-32 rounded-full" />
                                    </div>
                                </div>
                            </PlaceholderCard>
                        </div>
                    </SectionFrame>
                </div>
                <footer className=" flex items-center  h-50 bg-background  border-t">

                </footer>
            </div>
        </ScrollArea>
    )
}
