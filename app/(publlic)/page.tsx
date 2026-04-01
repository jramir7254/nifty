'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
    ArrowRight,
    BookOpenText,
    Compass,
    GraduationCap,
    MapPinned,
    ShieldCheck,
    Sparkles,
    TimerReset,
    TriangleAlert,
} from 'lucide-react'

import { Button } from '@/components/shadcn/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/shadcn/card'
import { ScrollArea } from '@/components/shadcn/scroll-area'
import { Separator } from '@/components/shadcn/separator'
import { cn } from '@/lib/utils'
import { DottedMap } from '@/components/ui/dotted-map'

const pillars = [
    {
        title: "Bloom's for Computing",
        body: 'Choose the intended order of thinking so the generated work matches the learning outcome and assessment verbs.',
        icon: Sparkles,
    },
    {
        title: 'Sense of Belonging',
        body: 'Bring in familiar schools, transportation systems, or other city infrastructure so the prompt feels locally relevant.',
        icon: MapPinned,
    },
    {
        title: 'Topic Alignment',
        body: 'Anchor each assignment to a real learning outcome instead of a generic coding exercise.',
        icon: BookOpenText,
    },
] as const

const audienceGroups = [
    'ECHS',
    'P-TECH',
    'Industry upskilling',
    'Transfer degrees',
    'Military training',
    'Non-CS graduates',
] as const

const curriculumCards = [
    {
        title: 'CS 3 foundation',
        description: 'The first release targeted Computer Science 3 with ACM CCECC and cybersecurity-infused outcomes.',
        bullets: [
            'AL-13: compare arrays, sets, maps, stacks, queues, trees, and graphs.',
            'DS-22: describe graph terminology, properties, and special graph or tree cases.',
        ],
        icon: GraduationCap,
    },
    {
        title: 'CS2023 expansion',
        description: 'Later updates broadened the tool toward CS + X and current ACM curriculum guidance.',
        bullets: [
            'SEP-Context: connect computing to social context and the digital divide.',
            'AL-Foundational: explain how ADT operations transform a data structure in a real-world example.',
        ],
        icon: Compass,
    },
    {
        title: 'Cybersecurity and data science',
        description: 'The project also points toward adjacent career pathways without dropping the core CS focus.',
        bullets: [
            'Authentication, access control, and incident-response concepts.',
            'Secure implementation topics like input validation and abstraction.',
            'Programming, data structures, and algorithms for analysis.',
        ],
        icon: ShieldCheck,
    },
] as const

const difficultyCards = [
    {
        title: 'CS 2 perspective',
        body: 'Definitions were manageable, but implementation often needed more support, which led to an OER companion.',
    },
    {
        title: 'CS 3 remedial use',
        body: 'The activity frequently felt difficult because it surfaced topics students needed to revisit at the start of the semester.',
    },
    {
        title: 'Graph activities',
        body: 'Students were more comfortable declaring and populating a graph than writing methods across multiple data structures.',
    },
    {
        title: 'Honors and CS + X',
        body: "The Bloom's feature also supports honors-style research prompts across cybersecurity and data analysis themes.",
    },
] as const

const strengths = [
    'Strong curriculum alignment and competency coverage.',
    'Useful consolidation of CS 2 concepts into one activity.',
    'Regional workforce relevance for cybersecurity and data analytics.',
    'Interdisciplinary coverage across CS, programming, cyber, and data.',
    'Flexible enough to fit different courses and delivery styles.',
] as const

const constraints = [
    'Some assignments require substantial time.',
    'Students may face topics not covered in local notes or textbooks.',
    'Educators may need to pace the output as a lab versus a full assignment.',
] as const

const faqItems = [
    {
        question: 'What goes into a generated assignment?',
        answer: "Bloom's for Computing, local sense-of-belonging context, and a topic or learning outcome chosen by the educator.",
    },
    {
        question: 'How long is it meant to take?',
        answer: 'The target window is one to two hours, though observed completion times varied by course level and student background.',
    },
    {
        question: 'What is required to use it?',
        answer: 'The application uses the OpenAI Model API on token-based pricing and requires an OpenAI account.',
    },
] as const

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <div className="w-fit rounded-full border border-border/70 bg-background/85 px-3 py-1 text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
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
    return <section className={cn('flex flex-col gap-8', className)}>{children}</section>
}

function ListCard({
    bullets,
    className,
    description,
    icon: Icon,
    title,
}: {
    bullets: readonly string[]
    className?: string
    description: string
    icon: LucideIcon
    title: string
}) {
    return (
        <Card className={cn('border-border/70 bg-background/90 shadow-sm backdrop-blur', className)}>
            <CardHeader className="space-y-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                </div>
                <div className="space-y-2">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-sm leading-6 text-foreground/75">
                        {description}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-sm leading-6 text-foreground/80">
                    {bullets.map((bullet) => (
                        <li className="flex gap-3" key={bullet}>
                            <span className="mt-2 size-2 shrink-0 rounded-full bg-primary/70" />
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export default function Home() {
    return (
        <ScrollArea className="h-[calc(100vh-4rem)] bg-background">
            <div className="relative min-h-full overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 size-80 rounded-full bg-primary/8 blur-3xl" />
                    <div className="absolute top-24 right-0 size-96 rounded-full bg-highlight/30 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.08),transparent_40%)]" />
                </div>

                <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
                    {/* <DottedMap /> */}
                    <SectionFrame>
                        <SectionLabel>Overview</SectionLabel>

                        <div className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
                            <Card className="border-border/70 bg-background/90 shadow-sm backdrop-blur">
                                <CardContent className="flex h-full flex-col gap-8 p-8 sm:p-10">
                                    <div className="flex flex-wrap gap-3">
                                        <div className="rounded-full border border-border/70 bg-muted/35 px-4 py-2 text-sm text-foreground/75">
                                            OpenAI-powered generation
                                        </div>
                                        <div className="rounded-full border border-border/70 bg-muted/35 px-4 py-2 text-sm text-foreground/75">
                                            Community-college focused
                                        </div>
                                    </div>

                                    <div className="max-w-4xl space-y-5">
                                        <h1 className="font-[family:var(--font-nunito)] text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
                                            Generate computing assignments that stay grounded in
                                            learning outcomes, Bloom&apos;s rigor, and local
                                            relevance.
                                        </h1>
                                        <p className="max-w-3xl text-base leading-7 text-foreground/75 sm:text-lg">
                                            Nifty Assignments helps educators create engaging
                                            computer science activities by blending Bloom&apos;s for
                                            Computing, topic alignment, and familiar community
                                            systems into one assignment-generation workflow.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <Button asChild className="rounded-full px-6">
                                            <Link href="/auth/sign-up">
                                                Create an account
                                                <ArrowRight className="size-4" />
                                            </Link>
                                        </Button>
                                        <Button asChild className="rounded-full px-6" variant="outline">
                                            <Link href="/auth/login">Log in</Link>
                                        </Button>
                                        <Button asChild className="rounded-full px-6" variant="ghost">
                                            <a
                                                href="https://platform.openai.com/docs/pricing"
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                View API pricing
                                            </a>
                                        </Button>
                                    </div>

                                    <div className="mt-auto grid gap-3 sm:grid-cols-3">
                                        <Card className="border-border/60 bg-muted/30 shadow-none">
                                            <CardContent className="space-y-2 p-5">
                                                <p className="text-3xl font-semibold">3</p>
                                                <p className="text-sm leading-6 text-foreground/75">
                                                    inputs shape each assignment: rigor, local
                                                    context, and topic
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-border/60 bg-muted/30 shadow-none">
                                            <CardContent className="space-y-2 p-5">
                                                <p className="text-3xl font-semibold">1-2 hrs</p>
                                                <p className="text-sm leading-6 text-foreground/75">
                                                    intended completion window, depending on scope
                                                    and course readiness
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-border/60 bg-muted/30 shadow-none">
                                            <CardContent className="space-y-2 p-5">
                                                <p className="text-3xl font-semibold">CS + X</p>
                                                <p className="text-sm leading-6 text-foreground/75">
                                                    expansion into cybersecurity, data science,
                                                    and adjacent pathways
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid gap-4">
                                <Card className="border-border/70 bg-background/90 shadow-sm backdrop-blur">
                                    <CardHeader>
                                        <CardTitle>What shapes each assignment</CardTitle>
                                        <CardDescription className="leading-6 text-foreground/75">
                                            The generator is designed so educators steer the task
                                            instead of settling for a generic prompt.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        {pillars.map(({ body, icon: Icon, title }) => (
                                            <div
                                                className="rounded-2xl border border-border/70 bg-muted/25 p-4"
                                                key={title}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                        <Icon className="size-5" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <p className="font-medium">{title}</p>
                                                        <p className="text-sm leading-6 text-foreground/75">
                                                            {body}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="border-border/70 bg-background/90 shadow-sm backdrop-blur">
                                    <CardHeader>
                                        <CardTitle>Access and usage notes</CardTitle>
                                        <CardDescription className="leading-6 text-foreground/75">
                                            Practical details called out in the project notes.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {[
                                            'Built on the OpenAI Model API with token-based pricing.',
                                            'Requires an OpenAI account to use the full application.',
                                            'Originally built for CS 3 and expanded toward broader computing programs.',
                                        ].map((item) => (
                                            <div
                                                className="flex gap-3 rounded-2xl border border-border/70 bg-muted/25 p-4"
                                                key={item}
                                            >
                                                <span className="mt-2 size-2 shrink-0 rounded-full bg-primary/70" />
                                                <p className="text-sm leading-6 text-foreground/75">
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </SectionFrame>

                    <Separator />

                    <SectionFrame>
                        <SectionLabel>Curriculum Fit</SectionLabel>

                        <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
                            <div className="space-y-5">
                                <h2 className="font-[family:var(--font-nunito)] text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                                    Built for real computing pathways, not a generic worksheet
                                    generator.
                                </h2>
                                <p className="max-w-2xl text-base leading-7 text-foreground/75">
                                    The first implementation centered on Computer Science 3,
                                    especially data structures, graph terminology, and nearby
                                    cybersecurity outcomes. Later updates widened the lens
                                    toward CS + X programs where computing opens the door to
                                    adjacent fields.
                                </p>
                                <div className="rounded-3xl border border-border/70 bg-muted/30 p-5">
                                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                                        Intended learners
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        {audienceGroups.map((group) => (
                                            <div
                                                className="rounded-full border border-border/70 bg-background/85 px-4 py-2 text-sm text-foreground/75"
                                                key={group}
                                            >
                                                {group}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 lg:grid-cols-3">
                                {curriculumCards.map((card) => (
                                    <ListCard
                                        bullets={card.bullets}
                                        description={card.description}
                                        icon={card.icon}
                                        key={card.title}
                                        title={card.title}
                                    />
                                ))}
                            </div>
                        </div>
                    </SectionFrame>

                    <Separator />

                    <SectionFrame>
                        <SectionLabel>Difficulty and Delivery</SectionLabel>

                        <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
                            <Card className="border-border/70 bg-background/90 shadow-sm backdrop-blur">
                                <CardHeader className="space-y-4">
                                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <TimerReset className="size-5" />
                                    </div>
                                    <div className="space-y-2">
                                        <CardTitle className="text-2xl">
                                            Calibrated for flexible delivery
                                        </CardTitle>
                                        <CardDescription className="max-w-2xl text-sm leading-6 text-foreground/75">
                                            The write-up describes the tool as modular: educators
                                            can adjust complexity, treat the output as a lab or
                                            assignment, and use it in traditional or
                                            competency-based formats.
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl border border-border/70 bg-muted/25 p-5">
                                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                                            In theory
                                        </p>
                                        <p className="mt-3 text-3xl font-semibold">1 to 2 hours</p>
                                        <p className="mt-3 text-sm leading-6 text-foreground/75">
                                            That range assumes the educator selects a scope that
                                            matches the class and student background.
                                        </p>
                                    </div>
                                    <div className="rounded-3xl border border-border/70 bg-muted/25 p-5">
                                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                                            In practice
                                        </p>
                                        <p className="mt-3 text-3xl font-semibold">About 1 hour</p>
                                        <p className="mt-3 text-sm leading-6 text-foreground/75">
                                            Many CS 3 students finished around an hour, while
                                            some CS 2 learners needed closer to two.
                                        </p>
                                    </div>
                                    <div className="rounded-3xl border border-border/70 bg-muted/25 p-5 sm:col-span-2">
                                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                                            Where it fits
                                        </p>
                                        <p className="mt-3 text-sm leading-7 text-foreground/75">
                                            It can work as a refresher, a diagnostic, a
                                            graph-heavy implementation activity, an honors-style
                                            research prompt, or a competency-based checkpoint.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {difficultyCards.map((card) => (
                                    <Card
                                        className="border-border/70 bg-background/90 shadow-sm backdrop-blur"
                                        key={card.title}
                                    >
                                        <CardHeader className="space-y-4">
                                            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                <Compass className="size-5" />
                                            </div>
                                            <div className="space-y-2">
                                                <CardTitle className="text-lg">{card.title}</CardTitle>
                                                <CardDescription className="text-sm leading-6 text-foreground/75">
                                                    {card.body}
                                                </CardDescription>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </SectionFrame>

                    <Separator />

                    <SectionFrame>
                        <SectionLabel>Strengths and Constraints</SectionLabel>

                        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                            <ListCard
                                bullets={strengths}
                                description="The strongest themes in the document are alignment, flexibility, and relevance to workforce-oriented two-year programs."
                                icon={ShieldCheck}
                                title="What the tool does well"
                            />

                            <div className="grid gap-4">
                                <ListCard
                                    bullets={constraints}
                                    className="border-amber-500/25"
                                    description="The main tradeoff is time: some outputs stretch students beyond what has already been covered in course notes or textbooks."
                                    icon={TriangleAlert}
                                    title="What educators still need to manage"
                                />

                                <Card className="border-border/70 bg-background/90 shadow-sm backdrop-blur">
                                    <CardHeader>
                                        <CardTitle>Common questions from the write-up</CardTitle>
                                        <CardDescription className="text-sm leading-6 text-foreground/75">
                                            Replaced the generic FAQ placeholder with answers
                                            supported by the source document.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {faqItems.map(({ answer, question }) => (
                                            <div
                                                className="rounded-2xl border border-border/70 bg-muted/25 p-5"
                                                key={question}
                                            >
                                                <p className="font-medium">{question}</p>
                                                <p className="mt-2 text-sm leading-6 text-foreground/75">
                                                    {answer}
                                                </p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </SectionFrame>

                    <Separator />

                    <SectionFrame className="pb-2">
                        <Card className="border-border/70 bg-background/90 shadow-sm backdrop-blur">
                            <CardContent className="flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-3xl space-y-4">
                                    <SectionLabel>Next Step</SectionLabel>
                                    <h2 className="font-[family:var(--font-nunito)] text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                                        Replace the wireframe with a homepage that actually
                                        explains the product.
                                    </h2>
                                    <p className="text-base leading-7 text-foreground/75">
                                        The page now reflects the documented goals of Nifty
                                        Assignments: relevant computing activities, stronger
                                        community connection, and better control over rigor and
                                        pacing.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button asChild className="rounded-full px-6">
                                        <Link href="/auth/sign-up">
                                            Get started
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>
                                    <Button asChild className="rounded-full px-6" variant="outline">
                                        <Link href="/about">Learn more</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </SectionFrame>
                </div>
                <footer className=" flex items-center  h-50 bg-background  border-t">

                </footer>
            </div>
        </ScrollArea>
    )
}
