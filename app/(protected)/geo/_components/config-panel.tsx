'use client'

import { useState } from 'react'
import {
    Globe2,
    Layers3,
    Settings2,
    Shuffle,
    Sparkles,
    Trash2,
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
import {
    Collapsible,
    CollapsibleTrigger,
} from '@/components/shadcn/collapsible'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/shadcn/field'
import { Input } from '@/components/shadcn/input'
import { Separator } from '@/components/shadcn/separator'
import { useSearch } from '@/hooks/use-search'

import zipGeoData from '../_lib/zipcodes.json'
import { useGeoStore } from '../_lib/geo_store'
import ZipSelect from './zip-select'
import { ScrollArea } from '@/components/shadcn/scroll-area'

type ZipCode = keyof typeof zipGeoData
type ZipFeature = (typeof zipGeoData)[ZipCode]['features'][number]

const DEFAULT_ZIP = Object.keys(zipGeoData)[0] as ZipCode
const MAX_LOCATIONS = 10

const randomize = <T,>(arr: T[], num: number) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(num, arr.length))
}

const clampLocations = (value: number) =>
    Math.max(1, Math.min(MAX_LOCATIONS, value))

export function ConfigPanel() {
    const [open, setOpen] = useState(true)
    const { currentSearch } = useSearch('zipcode')

    const activeZip = (currentSearch as ZipCode | null) ?? DEFAULT_ZIP
    const availableLocations = zipGeoData[activeZip]?.features ?? []

    const setRandom = useGeoStore((state) => state.setRandomSelectedLocations)
    const clear = useGeoStore((state) => state.clear)
    const numLocations = useGeoStore((state) => state.numLocations)
    const setNumLocations = useGeoStore((state) => state.setNumLocations)
    const randomLocations = useGeoStore(
        (state) => state.randomSelectedLocations as ZipFeature[]
    )

    const selectedCount = randomLocations.length
    const requestedCount = clampLocations(numLocations)
    const previewLocations = randomLocations.slice(0, 3)

    const handleGenerate = () => {
        setRandom(randomize(availableLocations, requestedCount))
    }

    return (
        <Collapsible className={open ? 'w-[min(95vw,35rem)]' : 'w-auto'} open={open} onOpenChange={setOpen}>
            {open ? (
                <ScrollArea className="h-[70vh]">
                    <Card className="border-border/70 bg-background/85 shadow-xl backdrop-blur-xl">
                        <CardHeader className="gap-3">
                            <div className="flex items-start gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Settings2 className="size-5" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle>Globe Settings</CardTitle>
                                    <CardDescription className="mt-1 leading-6">
                                        Control the active ZIP sample and review what is currently being
                                        rendered on the globe.
                                    </CardDescription>
                                </div>
                            </div>
                            <CardAction>
                                <CollapsibleTrigger asChild>
                                    <Button size="sm" variant="outline">
                                        Collapse
                                    </Button>
                                </CollapsibleTrigger>
                            </CardAction>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-6">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="rounded-xl border border-border/70 bg-muted/25 p-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        ZIP
                                    </p>
                                    <p className="mt-2 text-sm font-medium">{activeZip}</p>
                                </div>
                                <div className="rounded-xl border border-border/70 bg-muted/25 p-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Available
                                    </p>
                                    <p className="mt-2 text-sm font-medium">
                                        {availableLocations.length.toLocaleString()}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border/70 bg-muted/25 p-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        On globe
                                    </p>
                                    <p className="mt-2 text-sm font-medium">{selectedCount}</p>
                                </div>
                            </div>

                            <Separator />

                            <form
                                className="flex flex-col gap-6"
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    handleGenerate()
                                }}
                            >
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel>ZIP code</FieldLabel>
                                        <ZipSelect className="w-full" />
                                        <FieldDescription>
                                            Choose the local area that should supply place data for the
                                            globe sample.
                                        </FieldDescription>
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="geo-sample-size">Sample size</FieldLabel>
                                        <Input
                                            id="geo-sample-size"
                                            inputMode="numeric"
                                            max={MAX_LOCATIONS}
                                            min={1}
                                            onChange={(event) => {
                                                const value = Number(event.target.value)

                                                if (Number.isNaN(value)) {
                                                    setNumLocations(1)
                                                    return
                                                }

                                                setNumLocations(clampLocations(value))
                                            }}
                                            placeholder="Number of locations"
                                            required
                                            type="number"
                                            value={requestedCount}
                                        />
                                        <FieldDescription>
                                            Pick between 1 and {MAX_LOCATIONS} markers for each generated
                                            globe sample.
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>

                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                                    <Button type="submit">
                                        <Sparkles data-icon="inline-start" />
                                        Generate
                                    </Button>
                                    <Button
                                        disabled={!selectedCount}
                                        onClick={handleGenerate}
                                        type="button"
                                        variant="outline"
                                    >
                                        <Shuffle data-icon="inline-start" />
                                        Shuffle
                                    </Button>
                                    <Button
                                        disabled={!selectedCount}
                                        onClick={clear}
                                        type="button"
                                        variant="ghost"
                                    >
                                        <Trash2 data-icon="inline-start" />
                                        Clear
                                    </Button>
                                </div>
                            </form>

                            <Separator />

                            {/* <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <Globe2 className="size-4 text-muted-foreground" />
                                    <p className="text-sm font-medium">Current globe snapshot</p>
                                </div>
                                <div className="grid gap-2">

                                    <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 px-3 py-2">
                                        <span className="text-sm text-muted-foreground">Requested markers</span>
                                        <span className="text-sm font-medium">{requestedCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 px-3 py-2">
                                        <span className="text-sm text-muted-foreground">Displayed markers</span>
                                        <span className="text-sm font-medium">{selectedCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 px-3 py-2">
                                        <span className="text-sm text-muted-foreground">Source places</span>
                                        <span className="text-sm font-medium">
                                            {availableLocations.length.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div> */}
                        </CardContent>

                        <CardFooter className="flex flex-col items-stretch gap-4">
                            <div className="flex items-center gap-2">
                                <Layers3 className="size-4 text-muted-foreground" />
                                <p className="text-sm font-medium">Selected places preview</p>
                            </div>

                            {previewLocations.length ? (
                                <div className="flex flex-col gap-2">
                                    {previewLocations.map((location) => (
                                        <div
                                            className="rounded-xl border border-border/70 bg-background/80 px-3 py-2"
                                            key={location.properties.uniqueId}
                                        >
                                            <p className="truncate text-sm font-medium">
                                                {location.properties.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm leading-6 text-muted-foreground">
                                    No sample is active yet. Generate a set of markers, then click any
                                    marker on the globe to inspect its label.
                                </p>
                            )}
                        </CardFooter>
                    </Card>
                </ScrollArea>
            ) : (
                <CollapsibleTrigger asChild>
                    <Button
                        aria-label="Open globe settings"
                        className="rounded-2xl border border-border/70 bg-background/85 shadow-xl backdrop-blur-xl"
                        size="icon"
                        variant="outline"
                    >
                        <Settings2 />
                    </Button>
                </CollapsibleTrigger>
            )}
        </Collapsible>
    )
}
