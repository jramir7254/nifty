'use client'

import { Button } from "@/components/shadcn/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/shadcn/collapsible"
import { Settings } from "lucide-react"
import { Input } from '@/components/shadcn/input'
import { Label } from '@/components/shadcn/label'
import zipGeoData from "../_lib/zipcodes.json"

import ZipSelect from './zip-select'
import { useGeoStore } from '../_lib/geo_store'
import { useSearch } from '@/hooks/use-search'
import { Separator } from "@/components/shadcn/separator"
import ShuffleButton from "./shuffle-button"
import ClearButton from "./clear-button"

const randomize = (arr: any[], num: number) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
};



export function ConfigPanel() {
    const { currentSearch } = useSearch('zipcode')

    const setRandom = useGeoStore((state) => state.setRandomSelectedLocations)

    return (
        <Collapsible>
            <CollapsibleTrigger asChild>
                <Button size={'icon'} variant={'secondary'}>
                    <Settings />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <Card size="sm" className="w-100" >
                    <CardHeader>
                        <CardAction>
                            Action
                        </CardAction>
                        <CardTitle>Globe Settings</CardTitle>
                        <CardDescription>Set the corner radius of the element.</CardDescription>
                    </CardHeader>
                    <CardContent className="">
                        <Separator />
                        <form
                            className='flex space-y-10'
                            onSubmit={(e) => {
                                e.preventDefault();
                                setRandom(randomize(zipGeoData[currentSearch as '79901'].features, 1))
                            }}
                        >
                            <div>
                                <ZipSelect />
                            </div>
                            <div>
                                <Input type='number' min={1} max={10} value={5} onChange={(e) => { }} placeholder='Number of locations' required />
                            </div>
                            <div className=''>
                                <Button className='w-full bg-blue-800 text-white hover:bg-blue-900 ' type='submit'>Submit</Button>
                            </div>
                        </form>
                        <Separator />
                        <div>
                            <ShuffleButton />
                            <ClearButton />
                        </div>

                    </CardContent>
                </Card>
            </CollapsibleContent>
        </Collapsible>
    )
}
