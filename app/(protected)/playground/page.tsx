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
import BloomSliders from './_components/params/blooms-sliders'

type LocationFeature = {
    properties?: {
        name?: string
    }
}


function getLocationName(location: unknown) {
    if (!location || typeof location !== 'object') {
        return null
    }

    return ((location as LocationFeature).properties?.name ?? null)
}


export default function AssignmentPage() {
    const {
        additionalContext,
        clear: clearParameters,
        courseLevel,
        generatedAssignemnt,
        includeStarterCode,
        programmingLanguage,
        blooms,
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
            blooms,
            topic,
        },
        onFinish(prompt, completion) {
            console.log('finished completion', { prompt, completion })
            handleSave()
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



    const handleReset = () => {
        clearParameters()
        clearGeoContext()
        setCompletion('')
        setInput('')
        setLastSavedAt(null)
    }

    const handleSave = () => {


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
                    blooms
                },
            })

            setLastSavedAt(Date.now())
        })
    }

    return (
        <div className=" size-full max-h-full overflow-hidden">


            <div className="relative  flex  flex-col gap-6 ">

                <div className="relative grid xl:grid-cols-[minmax(380px,400px)_minmax(0,1fr)]">

                    <ScrollArea className="relative flex flex-col h-[90vh] gap-6   xl:self-start lg:border-r">
                        <header className="sticky bg-background z-10 top-0 flex justify-end px-5 py-2 gap-4 border-b">


                            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">

                                <div className="flex flex-wrap gap-3">
                                    <Button onClick={handleReset} type="button" variant="outline">
                                        <RotateCcwIcon data-icon="inline-start" />
                                        Reset setup
                                    </Button>
                                    {/* <Button
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
                                    </Button> */}
                                </div>
                            </div>

                            {/* <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
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
                    </div> */}
                        </header>

                        <Card className='bg-background rounded-none'>
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

                        </Card>

                        <Card className='bg-background rounded-none'>
                            <CardHeader>
                                <CardTitle>Configuration</CardTitle>
                                <CardDescription>
                                    Shape the assignment before it reaches the model.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-5'>
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
                                <BloomSliders />
                            </CardContent>
                        </Card>

                        <Card className='bg-background rounded-none'>
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
                    </ScrollArea>


                    <div className="flex min-w-0 min-h-full  flex-col gap-6">

                        <Card className="flex bg-background min-h-full  rounded-none ">
                            {/* <CardHeader>
                                <CardTitle>Live Preview</CardTitle>
                                <CardDescription>
                                    Streamed markdown is rendered below and kept in sync with the
                                    draft that gets saved.
                                </CardDescription>
                            </CardHeader> */}
                            <CardContent className='bg-background h-full'>
                                <AssignmentStaticEditor
                                    completion={completion}
                                    isLoading={isLoading}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
