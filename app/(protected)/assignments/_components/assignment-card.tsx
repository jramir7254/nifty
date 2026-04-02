import type { ComponentType } from 'react'
import Link from 'next/link'
import {
    ArrowUpRightIcon,
    BookOpenIcon,
    Code2Icon,
    FileTextIcon,
    MapPinIcon,
    SparklesIcon,
} from 'lucide-react'

import { Button } from '@/components/shadcn/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/shadcn/card'

export type AssignmentGalleryItem = {
    courseLevel: string
    excerpt: string
    id: string
    includeStarterCode: boolean
    language: string
    locationCount: number
    locationNames: string[]
    title: string
    topic: string
    wordCount: number
}

type AssCardProps = {
    assignment: AssignmentGalleryItem
}

function StatBlock({
    icon: Icon,
    label,
    value,
}: {
    icon: ComponentType<{ className?: string }>
    label: string
    value: string
}) {
    return (
        <div className="rounded-lg border bg-background/80 p-2.5">
            <div className="text-muted-foreground flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
                <Icon className="size-4" />
                <span>{label}</span>
            </div>
            <p className="mt-1 line-clamp-2 text-xs font-medium leading-snug sm:text-sm">
                {value}
            </p>
        </div>
    )
}

export default function AssignmentCard({ assignment }: AssCardProps) {
    return (
        <Card className="relative h-full overflow-hidden border-border/70 bg-background/90 backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-br from-primary/10 via-transparent to-highlight/20" />

            <CardHeader className="relative gap-3">
                {/* <div className="rounded-full border bg-background/85 px-3 py-1 text-xs tracking-[0.24em] uppercase text-muted-foreground">
                    Generated Assignment
                </div> */}
                <CardAction>
                    <Button asChild size="sm" variant="outline">
                        <Link href={`/assignments/${assignment.id}`}>
                            Open
                            <ArrowUpRightIcon data-icon="inline-end" />
                        </Link>
                    </Button>
                </CardAction>

                <div className="flex flex-col gap-2">
                    <CardTitle className="line-clamp-2">{assignment.title}</CardTitle>
                    <CardDescription>
                        {assignment.courseLevel} | {assignment.language}
                    </CardDescription>
                </div>
            </CardHeader>

            {/* <CardContent className="relative flex flex-1 flex-col gap-3">
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                    {assignment.excerpt}
                </p>

                <div className="grid grid-cols-3 gap-2">
                    <StatBlock
                        icon={FileTextIcon}
                        label="Topic"
                        value={assignment.topic}
                    />
                    <StatBlock
                        icon={Code2Icon}
                        label="Words"
                        value={`${assignment.wordCount} words`}
                    />
                    <StatBlock
                        icon={MapPinIcon}
                        label="Geo Context"
                        value={
                            assignment.locationCount > 0
                                ? `${assignment.locationCount} places`
                                : 'No locations'
                        }
                    />
                </div>

                {assignment.locationNames.length > 0 ? (
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {assignment.locationNames.map((locationName) => (
                            <div
                                className="rounded-full border bg-muted/50 px-3 py-1"
                                key={locationName}
                            >
                                {locationName}
                            </div>
                        ))}
                    </div>
                ) : null}
            </CardContent> */}

            {/* <CardFooter className="gap-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <BookOpenIcon className="size-4" />
                        <span>{assignment.courseLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <SparklesIcon className="size-4" />
                        <span>
                            {assignment.includeStarterCode
                                ? 'Starter code included'
                                : 'Prompt only'}
                        </span>
                    </div>
                </div>
            </CardFooter> */}
        </Card>
    )
}
