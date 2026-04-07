import { Spinner } from '@/components/shadcn/spinner'
import { MapPinIcon } from 'lucide-react'
import React from 'react'
import { useLocationsMutation } from '../../_lib/mutations'
import { Button } from '@/components/shadcn/button'
import { useGeoStore } from '../../_lib/geo_store'

export default function SubmitButton() {
    const { mutate, isPending } = useLocationsMutation()
    const zip = useGeoStore((state) => state.selectedZip)

    return (
        <Button disabled={isPending} onClick={() => mutate({ zipcodeId: zip?.features[0]?.properties?.place_id })}>
            {isPending ? <Spinner /> : <MapPinIcon data-icon="inline-start" />}
            Generate
        </Button>)
}
