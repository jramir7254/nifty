'use client'

import * as React from 'react'

import { useCompletion } from '@ai-sdk/react'
import {
    BookOpenIcon,
    Code2Icon,
    FileTextIcon,
    LoaderCircleIcon,
    MapPinIcon,
    RotateCcwIcon,
    SaveIcon,
    SparklesIcon,
} from 'lucide-react'

import { Button } from '@/components/shadcn/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/shadcn/card'
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from '@/components/shadcn/field'
import { Input } from '@/components/shadcn/input'
import { Separator } from '@/components/shadcn/separator'
import { Switch } from '@/components/shadcn/switch'
import { Textarea } from '@/components/shadcn/textarea'
import { saveAssignmentAction } from '@/lib/actions'

import AssignmentStaticEditor from './_components/assignment-static-editor'
import CourseSelect from './_components/course-select'
import LanguageSelect from './_components/language-select'
import TopicSelect from './_components/topic-select'
import { useParamsStore } from './_lib/params-store'
import { useGeoStore } from '../geo/_lib/geo_store'
import { ScrollArea } from '@/components/shadcn/scroll-area'

type LocationFeature = {
    properties?: {
        name?: string
    }
}

type SummaryCardProps = {
    description: string
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
}

function getLocationName(location: unknown) {
    if (!location || typeof location !== 'object') {
        return null
    }

    return ((location as LocationFeature).properties?.name ?? null)
}

function SummaryCard({ description, icon: Icon, label, value }: SummaryCardProps) {
    return (
        <Card size="sm">
            <CardHeader className="gap-3">
                <div className="text-muted-foreground flex items-center gap-2 text-xs tracking-[0.24em] uppercase">
                    <Icon className="size-4" />
                    <span>{label}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <CardTitle>{value}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </CardHeader>
        </Card>
    )
}

export default function AssignmentPage() {
    const {
        additionalContext,
        clear: clearParameters,
        courseLevel,
        generatedAssignemnt,
        includeStarterCode,
        programmingLanguage,
        setParameter,
        topic,
    } = useParamsStore((state) => state)
    const clearGeoContext = useGeoStore((state) => state.clear)
    const randomLocations = useGeoStore((state) => state.randomSelectedLocations)

    const [lastSavedAt, setLastSavedAt] = React.useState<number | null>(null)
    const [isSaving, startSavingTransition] = React.useTransition()

    const {
        completion,
        handleInputChange,
        handleSubmit,
        input,
        isLoading,
        setCompletion,
        setInput,
        stop,
    } = useCompletion({
        api: '/api/gen-ai/gemini',
        body: {
            additionalContext,
            courseLevel,
            includeStarterCode,
            programmingLanguage,
            randomLocations,
            topic,
        },
        experimental_throttle: 800,
    })

    const hasDraft = generatedAssignemnt.length > 0
    const canGenerate =
        input.trim().length > 0 &&
        Boolean(courseLevel) &&
        Boolean(programmingLanguage) &&
        Boolean(topic)

    const savedAtLabel = React.useMemo(() => {
        if (!lastSavedAt) {
            return null
        }

        return new Intl.DateTimeFormat(undefined, {
            hour: 'numeric',
            minute: '2-digit',
        }).format(lastSavedAt)
    }, [lastSavedAt])

    const locationNames = React.useMemo(() => {
        return randomLocations
            .map(getLocationName)
            .filter((name): name is string => Boolean(name))
            .slice(0, 4)
    }, [randomLocations])

    const summaryCards = React.useMemo(
        () => [
            {
                description: courseLevel
                    ? 'Sets the difficulty and topic list.'
                    : 'Choose a course to unlock topics.',
                icon: BookOpenIcon,
                label: 'Course',
                value: courseLevel || 'Choose a course',
            },
            {
                description: programmingLanguage
                    ? 'Used for examples and starter scaffolding.'
                    : 'Select the target implementation language.',
                icon: Code2Icon,
                label: 'Language',
                value: programmingLanguage || 'Language needed',
            },
            {
                description: topic
                    ? 'Keeps the brief focused on one concept.'
                    : 'Pick a topic after selecting a course.',
                icon: FileTextIcon,
                label: 'Topic',
                value: topic || 'Topic needed',
            },
            {
                description:
                    randomLocations.length > 0
                        ? 'Pulled in from the geo workspace.'
                        : 'Add map context if the assignment needs real places.',
                icon: MapPinIcon,
                label: 'Locations',
                value:
                    randomLocations.length > 0
                        ? `${randomLocations.length} attached`
                        : 'No geo context',
            },
        ],
        [courseLevel, programmingLanguage, randomLocations.length, topic]
    )

    const handleReset = () => {
        clearParameters()
        clearGeoContext()
        setCompletion('')
        setInput('')
        setLastSavedAt(null)
    }

    const handleSave = () => {
        if (!hasDraft || isSaving) {
            return
        }

        startSavingTransition(async () => {
            await saveAssignmentAction({
                content: generatedAssignemnt,
                params: {
                    additionalContext,
                    courseLevel,
                    includeStarterCode,
                    programmingLanguage,
                    randomLocations,
                    topic,
                },
            })

            setLastSavedAt(Date.now())
        })
    }

    return (
        <ScrollArea className="relative size-full h-[90vh] overflow-y-auto">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="bg-primary/6 absolute top-0 left-0 size-72 rounded-full blur-3xl" />
                <div className="bg-highlight/30 absolute top-24 right-0 size-80 rounded-full blur-3xl" />
            </div>

            <div className="relative mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <section className="flex flex-col gap-4">
                    <p className="text-muted-foreground text-xs tracking-[0.32em] uppercase">
                        Assignment Studio
                    </p>

                    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Clean assignment drafting instead of a scratchpad.
                            </h1>
                            <p className="text-muted-foreground mt-3 max-w-2xl text-sm sm:text-base">
                                Build a stronger prompt, attach geo context, and save the
                                rendered assignment from the live preview without the old
                                manual sync step.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button onClick={handleReset} type="button" variant="outline">
                                <RotateCcwIcon data-icon="inline-start" />
                                Reset setup
                            </Button>
                            <Button
                                disabled={!hasDraft || isSaving}
                                onClick={handleSave}
                                type="button"
                            >
                                {isSaving ? (
                                    <LoaderCircleIcon
                                        className="animate-spin"
                                        data-icon="inline-start"
                                    />
                                ) : (
                                    <SaveIcon data-icon="inline-start" />
                                )}
                                {isSaving ? 'Saving draft...' : 'Save draft'}
                            </Button>
                        </div>
                    </div>

                    <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                        <span>
                            {hasDraft
                                ? 'Preview content is synced and ready to save.'
                                : 'Generate an assignment to unlock saving.'}
                        </span>
                        {savedAtLabel ? (
                            <>
                                <span aria-hidden="true">|</span>
                                <span>Last saved at {savedAtLabel}</span>
                            </>
                        ) : null}
                    </div>
                </section>

                <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
                    <div className="flex flex-col gap-6 xl:sticky xl:top-6 xl:self-start">
                        <Card>
                            <CardHeader>
                                <CardTitle>Prompt</CardTitle>
                                <CardDescription>
                                    Give the generator a concise direction before layering in
                                    course, topic, and language constraints.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="assignment-prompt">
                                                Assignment goal
                                            </FieldLabel>
                                            <FieldDescription>
                                                Example: create a location-aware loops and arrays
                                                project with a grading rubric.
                                            </FieldDescription>
                                            <Input
                                                autoComplete="off"
                                                id="assignment-prompt"
                                                name="prompt"
                                                onChange={handleInputChange}
                                                placeholder="Describe the assignment you want to generate..."
                                                value={input}
                                            />
                                        </Field>
                                    </FieldGroup>

                                    <div className="flex flex-wrap gap-3">
                                        <Button disabled={!canGenerate || isLoading} type="submit">
                                            {isLoading ? (
                                                <LoaderCircleIcon
                                                    className="animate-spin"
                                                    data-icon="inline-start"
                                                />
                                            ) : (
                                                <SparklesIcon data-icon="inline-start" />
                                            )}
                                            {isLoading ? 'Generating...' : 'Generate assignment'}
                                        </Button>

                                        {isLoading ? (
                                            <Button onClick={stop} type="button" variant="outline">
                                                Stop stream
                                            </Button>
                                        ) : null}
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter>
                                <p className="text-muted-foreground text-sm">
                                    Generate is enabled after the prompt, course, topic, and
                                    language are set.
                                </p>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Configuration</CardTitle>
                                <CardDescription>
                                    Shape the assignment before it reaches the model.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="course-level">
                                            Course level
                                        </FieldLabel>
                                        <CourseSelect id="course-level" />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="assignment-topic">
                                            Topic
                                        </FieldLabel>
                                        <TopicSelect id="assignment-topic" />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="programming-language">
                                            Language
                                        </FieldLabel>
                                        <LanguageSelect id="programming-language" />
                                    </Field>

                                    <Separator />

                                    <Field orientation="horizontal">
                                        <FieldContent>
                                            <FieldTitle>Starter code</FieldTitle>
                                            <FieldDescription>
                                                Include scaffolding or method signatures in the
                                                generated assignment brief.
                                            </FieldDescription>
                                        </FieldContent>
                                        <Switch
                                            checked={includeStarterCode}
                                            onCheckedChange={(checked) =>
                                                setParameter('includeStarterCode', checked)
                                            }
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="additional-context">
                                            Additional context
                                        </FieldLabel>
                                        <FieldDescription>
                                            Add constraints, rubric notes, tone, or class-specific
                                            context.
                                        </FieldDescription>
                                        <Textarea
                                            className="min-h-32"
                                            id="additional-context"
                                            onChange={(event) =>
                                                setParameter(
                                                    'additionalContext',
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Include any extra directions the generator should respect..."
                                            value={additionalContext}
                                        />
                                    </Field>
                                </FieldGroup>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Geo Context</CardTitle>
                                <CardDescription>
                                    The playground reads from the shared map selection in the geo
                                    workspace.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <div className="rounded-lg border border-dashed p-4">
                                    <p className="text-2xl font-semibold tracking-tight">
                                        {randomLocations.length}
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        {randomLocations.length === 1
                                            ? 'location attached'
                                            : 'locations attached'}
                                    </p>
                                </div>

                                {locationNames.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium">Included locations</p>
                                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                            {locationNames.map((name) => (
                                                <div
                                                    className="flex items-center gap-2"
                                                    key={name}
                                                >
                                                    <MapPinIcon className="size-4" />
                                                    <span>{name}</span>
                                                </div>
                                            ))}
                                            {randomLocations.length > locationNames.length ? (
                                                <span>
                                                    +{randomLocations.length - locationNames.length}{' '}
                                                    more
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">
                                        No locations selected yet. Open the geo page to shuffle a
                                        set of places and bring them back here.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex min-w-0 flex-col gap-6">
                        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
                            {summaryCards.map((card) => (
                                <SummaryCard
                                    description={card.description}
                                    icon={card.icon}
                                    key={card.label}
                                    label={card.label}
                                    value={card.value}
                                />
                            ))}
                        </div>

                        <Card className="min-h-[720px]">
                            <CardHeader>
                                <CardTitle>Live Preview</CardTitle>
                                <CardDescription>
                                    Streamed markdown is rendered below and kept in sync with the
                                    draft that gets saved.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AssignmentStaticEditor
                                    completion={completion}
                                    isLoading={isLoading}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}
