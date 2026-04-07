'use client'

import { Button } from '@/components/shadcn/button'
import { ButtonGroup } from '@/components/shadcn/button-group'

import { Input } from '@/components/shadcn/input'
import { Spinner } from '@/components/shadcn/spinner'
import { useSearch } from '@/hooks/use-search'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useZipCodeMutation } from '../../_lib/mutations'



export function ZipInput() {
    const { currentSearch, handleSearchChange } = useSearch('zipcode')
    const { currentSearch: countryParam, } = useSearch('country')
    const [zip, setZip] = useState(currentSearch || '')

    const { isPending, mutate } = useZipCodeMutation()

    const fetchZipBoundary = () => {
        handleSearchChange(zip)
        mutate({ zipcode: zip, country: countryParam })
    }

    return (

        <ButtonGroup>
            <Input
                disabled={!countryParam}
                id="zip"
                onChange={(e) => setZip(e.target.value)}
                placeholder="Zip Code"
                value={zip}
            />
            <Button disabled={!zip || isPending || !countryParam} onClick={fetchZipBoundary} variant="outline" aria-label="Search">
                {isPending ? <Spinner /> : <SearchIcon />}
            </Button>
        </ButtonGroup>
    )

}
