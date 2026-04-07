'use client'

import type { ReactNode } from 'react'

import type { LucideIcon } from 'lucide-react'
import {
    BookOpenText,
    MapPinned,
    Sparkles,
} from 'lucide-react'

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

import { CodeEditor } from '@/components/ui/code-editor'

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


const audiences = [
    {
        title: "Community College Learners",
        body: 'Designed for the diverse student populations often found in community colleges, including Early College High School students, P-TECH pathways, workforce upskilling learners, transfer-degree students, military trainees, and non-CS majors entering computing courses.',
    },
    {
        title: 'CS2 and CS3 Students',
        body: 'Supports students in foundational and intermediate computer science courses by reinforcing key concepts such as data structures, algorithms, graphs, and collections. It can be used both as a learning tool and as a refresher before more advanced coursework.',
    },
    {
        title: 'Honors and Competency-Based Learners',
        body: `Serves students pursuing honors projects, CS+X pathways, and competency-based education models. The tool helps learners demonstrate mastery at their own pace while supporting deeper exploration of CS3 concepts through research and applied work.`,
    },
] as const





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


const niftyAssignment = `
public class NiftyAssignment {
  public static void main(String[] args) {
    String name = args.length > 0 ? args[0] : "User";
    System.out.println("Hello, " + name + "! Welcome to your nifty assignment.");
  }
}
`;

export default function Home() {
    return (
        <ScrollArea className="h-[calc(100vh-4rem)] bg-background">
            <div className="relative min-h-full overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 size-80 rounded-full bg-primary/8 blur-3xl" />
                    <div className="absolute top-24 right-0 size-96 rounded-full bg-blue-800/30 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.08),transparent_40%)]" />
                </div>

                <div className="relative mx-auto flex w-full max-w-360 flex-col gap-14 px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
                    <SectionFrame>

                        <div className="grid gap-6 items-center xl:grid-cols-[0.88fr_1.15fr] h-[calc(100vh-4rem)]">
                            <div className="space-y-5">
                                <h1 className="font-[family:var(--font-nunito)] text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
                                    Nifty Assignment Generator
                                </h1>
                                <p className="max-w-2xl text-base leading-7 text-foreground/75">
                                    The first implementation centered on Computer Science 3,
                                    especially data structures, graph terminology, and nearby
                                    cybersecurity outcomes. Later updates widened the lens
                                    toward CS + X programs where computing opens the door to
                                    adjacent fields.
                                </p>

                            </div>

                            <div className="flex items-center justify-center">
                                <CodeEditor className='max-w-[90vw]!' lang='java' title='NiftyAssignment.java' duration={3}>
                                    {niftyAssignment}
                                </CodeEditor>
                            </div>
                        </div>
                    </SectionFrame>
                    {/* <Separator /> */}
                    <SectionFrame>

                        <div className="grid gap-6 items-start xl:grid-cols-[0.88fr_1.12fr] pb-20">
                            <div className="space-y-5">
                                <h2 className="font-[family:var(--font-nunito)] text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
                                    Purpose
                                </h2>
                                <p className="max-w-2xl text-base leading-7 text-foreground/75">
                                    The tool is a software application that generates engaging assignments for computer science courses, integrating Bloom’s Taxonomy to ensure alignment with learning outcomes. Educators can select Bloom’s levels to incorporate a range of cognitive skills while contextualizing assignments within local city infrastructures, fostering relevance for students. This approach enhances learning outcomes and boosts student engagement, focusing on three key areas: Bloom’s levels integration, local context incorporation, and improved engagement.
                                </p>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="grid gap-4">
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
                                </div>
                            </div>
                        </div>
                    </SectionFrame>
                    <Separator />

                    <SectionFrame>
                        <div className="grid gap-6 justify-center items-center xl:grid-rows-[0.88fr_1.12fr] py-20 ">
                            <div className="flex justify-center space-y-5 ">
                                <h2 className="font-[family:var(--font-nunito)] text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
                                    Audiences
                                </h2>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="grid lg:grid-cols-3 gap-4">
                                    {audiences.map(({ body, title }) => (
                                        <div
                                            className="rounded-2xl border border-border/70 bg-muted/25 p-4"
                                            key={title}
                                        >
                                            <div className="flex flex-col items-center gap-4">
                                                <p className="font-medium">{title}</p>
                                                <p className="text-sm leading-6 text-foreground/75">
                                                    {body}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SectionFrame>



                </div>
                <footer className=" flex items-center font-nunito   h-50 bg-background  border-t">
                    <div className='flex flex-col gap-5 px-10 lg:flex-row justify-between  mx-auto w-full max-w-360 '>
                        <div>
                            <h4>Principal Investigator</h4>
                            <a className='text-muted-foreground hover:underline' href='https://christianservin.com/'>
                                Christian Servin, Ph.D.
                            </a>
                            <p className='text-muted-foreground'>
                                cservin1@epcc.edu
                            </p>
                        </div>
                        <div>
                            <h4>Developed By</h4>
                            <a className='text-muted-foreground hover:underline' href='https://www.jesusramirez.dev/'>
                                Jesus Ramirez
                            </a>
                            <p className='text-muted-foreground'>
                                jrami904@epcc.edu
                            </p>
                        </div>
                    </div>

                </footer>
            </div>
        </ScrollArea>
    )
}
