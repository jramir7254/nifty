'use client'

import { Button } from '@/components/shadcn/button'
import { Trash2 } from 'lucide-react'
import { useGeoStore } from '../../_lib/geo_store'

export default function ClearButton() {


    const clear = useGeoStore((state) => state.clear)

    const randomLocations = useGeoStore(
        (state) => state.randomSelectedLocations
    )

    const selectedCount = randomLocations.length

    return (
        <Button
            disabled={!selectedCount}
            onClick={clear}
            type="button"
            variant="ghost"
        >
            <Trash2 data-icon="inline-start" />
            Clear
        </Button>
    )
}
