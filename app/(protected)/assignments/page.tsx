import Link from 'next/link'
import { neon } from '@neondatabase/serverless'

import { auth } from '@/lib/auth/server'
import { getAssignmentTitle, getPlainText } from '@/lib/assignment-title'
import { Button } from '@/components/shadcn/button'
import AssignmentCard, { type AssignmentGalleryItem } from './_components/assignment-card'
import { ScrollArea } from '@/components/shadcn/scroll-area'

type AssignmentParams = {
    additionalContext?: string
    courseLevel?: string
    includeStarterCode?: boolean
    programmingLanguage?: string
    randomLocations?: unknown[]
    topic?: string
}

type AssignmentRow = {
    content?: unknown[] | null
    id: number | string
    name?: string | null
    params?: AssignmentParams | null
}

type LocationFeature = {
    properties?: {
        name?: string
    }
}

function getLocationNames(randomLocations: unknown) {
    if (!Array.isArray(randomLocations)) {
        return []
    }

    return randomLocations
        .map((location) => {
            if (!location || typeof location !== 'object') {
                return null
            }

            const name = (location as LocationFeature).properties?.name
            return typeof name === 'string' && name.trim() ? name.trim() : null
        })
        .filter((name): name is string => Boolean(name))
}

function buildGalleryItem(row: AssignmentRow): AssignmentGalleryItem {
    const params = row.params ?? {}
    const plainText = getPlainText(row.content)
    const locationNames = getLocationNames(params.randomLocations)
    const excerpt =
        plainText.length > 128 ? `${plainText.slice(0, 125).trimEnd()}...` : plainText

    return {
        courseLevel: params.courseLevel || 'Course not set',
        excerpt:
            excerpt ||
            'No preview text was saved with this assignment. Open it to inspect the full draft.',
        id: String(row.id),
        includeStarterCode: Boolean(params.includeStarterCode),
        language: params.programmingLanguage || 'Language not set',
        locationCount: Array.isArray(params.randomLocations)
            ? params.randomLocations.length
            : 0,
        locationNames: locationNames.slice(0, 2),
        title: getAssignmentTitle(row),
        topic: params.topic || 'General prompt',
        wordCount: plainText ? plainText.split(/\s+/).length : 0,
    }
}

export default async function AssignmentsPage() {
    const sql = neon(process.env.DATABASE_URL!)
    const { data: session } = await auth.getSession()

    const rows = (await sql`
        SELECT id, name, params, content
        FROM assignments
        WHERE created_by = ${session?.user.id}
    `) as AssignmentRow[]

    const assignments = [...rows].reverse().map(buildGalleryItem)

    return (
        <ScrollArea className="relative size-full h-[90vh]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="bg-primary/6 absolute top-0 left-0 size-72 rounded-full blur-3xl" />
                <div className="bg-highlight/30 absolute top-24 right-0 size-96 rounded-full blur-3xl" />
            </div>

            <div className="relative mx-auto flex max-w-[1700px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <section className="flex flex-col gap-4">
                    <p className="text-muted-foreground text-xs tracking-[0.32em] uppercase">
                        Assignment Gallery
                    </p>

                    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Showcase every generated assignment in one place.
                            </h1>
                            <p className="text-muted-foreground mt-3 max-w-2xl text-sm sm:text-base">
                                Browse saved drafts by topic, language, and geo context, then
                                jump straight into the full editor view when you need the
                                complete assignment.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button asChild variant="outline">
                                <Link href="/geo">Open geo workspace</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/playground">Create new assignment</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {assignments.length === 0 ? (
                    <div className="rounded-2xl border border-dashed bg-background/80 px-6 py-10 text-center shadow-sm backdrop-blur">
                        <h2 className="text-xl font-semibold tracking-tight">
                            No assignments saved yet
                        </h2>
                        <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm sm:text-base">
                            Save a draft from the playground to populate this gallery with
                            generated assignments.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <Button asChild>
                                <Link href="/playground">Go to playground</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/geo">Add geo context first</Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <section className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {assignments.map((assignment) => (
                            <AssignmentCard assignment={assignment} key={assignment.id} />
                        ))}
                    </section>
                )}
            </div>
        </ScrollArea>
    )
}
