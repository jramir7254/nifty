import React from 'react'
import zipGeoData from "../_lib/zipcodes.json"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { useSearch } from '@/hooks/use-search';
export default function ZipSelect() {
    const { currentSearch, handleSearchChange } = useSearch('zipcode')


    const zipcodes = Object.keys(zipGeoData)

    return (
        <Select
            value={currentSearch || undefined}
            onValueChange={handleSearchChange}
        >
            <SelectTrigger className="w-45">
                <SelectValue placeholder="Zip Code" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {zipcodes.map(zipcode => <SelectItem key={zipcode} value={zipcode}>{zipcode}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
