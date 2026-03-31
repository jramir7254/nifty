'use client'

import { Button } from '@/components/shadcn/button'
import { BrushCleaning } from 'lucide-react'
import React from 'react'
import { useGeoStore } from '../_lib/geo_store'

export default function ClearButton() {
    const clearStore = useGeoStore((state) => state.clear)
    const randomLocations = useGeoStore((state) => state.randomSelectedLocations)

    return (
        <Button disabled={!randomLocations.length} onClick={clearStore} size={'icon'}>
            <BrushCleaning />
        </Button>
    )
}
