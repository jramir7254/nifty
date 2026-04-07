'use client'

import { useState } from 'react'
import {
    Settings2,

} from 'lucide-react'

import { Button } from '@/components/shadcn/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
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
import { Separator } from '@/components/shadcn/separator'
import { useSearch } from '@/hooks/use-search'

import { ScrollArea } from '@/components/shadcn/scroll-area'
import { ZipInput } from './zip-input'
import CountrySelect from './country-select'
import SubmitButton from './submit-button'
import ClearButton from './clear-button'
import { useGeoStore } from '../../_lib/geo_store'



export function ConfigPanel() {
    const [open, setOpen] = useState(true)
    const { currentSearch } = useSearch('zipcode')



    const randomLocations = useGeoStore(
        (state) => state.randomSelectedLocations
    )

    const selectedCount = randomLocations.length






    return (
        <Collapsible className={open ? 'w-[min(95vw,35rem)] rounded-md overflow-hidden' : 'w-auto'} open={open} onOpenChange={setOpen}>
            {open ? (
                <ScrollArea className="h-[70vh]">
                    <Card className="border bg-background/85 shadow-xl backdrop-blur-xl">
                        <CardHeader className="gap-3">
                            <div className="flex items-start gap-3">

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
                                        Close
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
                                    <p className="mt-2 text-sm font-medium">{currentSearch}</p>
                                </div>
                                <div className="rounded-xl border border-border/70 bg-muted/25 p-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Available
                                    </p>
                                    <p className="mt-2 text-sm font-medium">
                                        0
                                        {/* {availableLocations.length.toLocaleString()} */}
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

                            <FieldGroup>
                                <Field >
                                    <FieldLabel htmlFor="zip">Country</FieldLabel>
                                    <CountrySelect />
                                    <FieldDescription>
                                        Enter your country
                                    </FieldDescription>
                                </Field>
                                <Field >
                                    <FieldLabel htmlFor="zip">Zip Code</FieldLabel>
                                    <ZipInput />
                                    <FieldDescription>
                                        Enter your zip code for a more personalized experience.
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                                <SubmitButton />
                                <ClearButton />
                            </div>
                        </CardContent>
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
