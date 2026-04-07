import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
import { useSearch } from '@/hooks/use-search';
import { cn } from '@/lib/utils';

const countries = [
    { name: 'United States', code: 'us' },
    { name: 'Mexico', code: 'mx' },
    { name: 'France', code: 'fr' },
]

export default function CountrySelect() {
    const { currentSearch, handleSearchChange } = useSearch('country')

    return (
        <Select
            value={currentSearch || undefined}
            onValueChange={handleSearchChange}
        >
            <SelectTrigger className={cn("w-full",)}>
                <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {countries.map(({ name, code }) => <SelectItem key={code} value={code}>{name}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
