import Link from 'next/link'
import {
    ArrowLeft,
    Clock3,
    Construction,
    Rocket,
    ScrollText,
} from 'lucide-react'

import { Button } from '@/components/shadcn/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/shadcn/card'
import { Separator } from '@/components/shadcn/separator'
import { CodeEditorDemo } from '@/components/ui/code-editor'

const statusCards = [
    {
        title: 'Page in progress',
        description:
            'The full About experience is still being written and designed.',
        icon: Construction,
    },
    {
        title: 'Content being organized',
        description:
            'Project background, research context, and team details are being assembled.',
        icon: ScrollText,
    },
    {
        title: 'Shipping soon',
        description:
            'This section will expand into a real product story instead of a placeholder.',
        icon: Rocket,
    },
] as const

export default function AboutPage() {
    return (
        <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 size-80 rounded-full bg-primary/8 blur-3xl" />
                <div className="absolute right-0 bottom-0 size-[28rem] rounded-full bg-highlight/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.08),transparent_40%)]" />
            </div>

            <CodeEditorDemo />

            <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center px-6 py-10 sm:px-8 lg:px-12">
                <div className="grid items-center gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <Card className="border-border/70 bg-background/90 shadow-sm backdrop-blur">
                        <CardContent className="flex flex-col gap-8 p-8 sm:p-10">
                            <div className="w-fit rounded-full border border-border/70 bg-muted/30 px-3 py-1 text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
                                Under Development
                            </div>

                            <div className="space-y-4">
                                <h1 className="font-[family:var(--font-nunito)] text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
                                    We&apos;re still building the About page.
                                </h1>
                                <p className="max-w-2xl text-base leading-7 text-foreground/75 sm:text-lg">
                                    The product is moving faster than the marketing copy right now.
                                    This section is reserved for the deeper story behind Nifty
                                    Assignments, and it is still in progress.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-border/70 bg-muted/25 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Status
                                    </p>
                                    <p className="mt-2 text-sm font-medium">Working on it</p>
                                </div>
                                <div className="rounded-2xl border border-border/70 bg-muted/25 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Focus
                                    </p>
                                    <p className="mt-2 text-sm font-medium">
                                        Research, mission, and team context
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-border/70 bg-muted/25 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Timeline
                                    </p>
                                    <p className="mt-2 text-sm font-medium">Soon, not today</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button asChild className="rounded-full px-6">
                                    <Link href="/">
                                        <ArrowLeft data-icon="inline-start" />
                                        Back home
                                    </Link>
                                </Button>
                                <Button asChild className="rounded-full px-6" variant="outline">
                                    <Link href="/auth/sign-up">Create an account</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/70 bg-background/90 shadow-sm backdrop-blur">
                        <CardHeader className="space-y-3">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Clock3 className="size-5" />
                            </div>
                            <div className="space-y-2">
                                <CardTitle>What will eventually live here</CardTitle>
                                <CardDescription className="text-sm leading-6 text-foreground/75">
                                    When this page is ready, it should explain the project with the
                                    same clarity as the rest of the product UI.
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            {statusCards.map(({ description, icon: Icon, title }, index) => (
                                <div className="flex flex-col gap-5" key={title}>
                                    <div className="flex items-start gap-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted/40 text-muted-foreground">
                                            <Icon className="size-5" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">{title}</p>
                                            <p className="text-sm leading-6 text-foreground/75">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                    {index < statusCards.length - 1 ? <Separator /> : null}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}
