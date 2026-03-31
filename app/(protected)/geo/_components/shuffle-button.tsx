'use client'

import { Button } from '@/components/shadcn/button'
import { Shuffle } from 'lucide-react'
import React from 'react'
import { useGeoStore } from '../_lib/geo_store'
import zipGeoData from "../_lib/zipcodes.json"
import { useSearch } from '@/hooks/use-search'


const randomize = (arr: any[], num: number) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
};

export default function ShuffleButton() {
    const setRandom = useGeoStore((state) => state.setRandomSelectedLocations)
    const numLocs = useGeoStore((state) => state.numLocations)
    const randomLocations = useGeoStore((state) => state.randomSelectedLocations)

    const { currentSearch } = useSearch('zipcode')


    return (
        <Button disabled={!randomLocations.length} onClick={() => setRandom(randomize(zipGeoData[currentSearch as '79901']?.features, numLocs))
        } size={'icon'}>
            <Shuffle />
        </Button>
    )
}


