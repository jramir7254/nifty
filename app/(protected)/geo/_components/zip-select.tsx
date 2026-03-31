import zipGeoData from "../_lib/zipcodes.json"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { useSearch } from '@/hooks/use-search';
import { cn } from '@/lib/utils';

export default function ZipSelect({
    className,
}: {
    className?: string
}) {
    const { currentSearch, handleSearchChange } = useSearch('zipcode')


    const zipcodes = Object.keys(zipGeoData)

    return (
        <Select
            value={currentSearch || undefined}
            onValueChange={handleSearchChange}
        >
            <SelectTrigger className={cn("w-full", className)}>
                <SelectValue placeholder="Select ZIP code" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {zipcodes.map(zipcode => <SelectItem key={zipcode} value={zipcode}>{zipcode}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
