import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/select"
import { cn } from '@/lib/utils'
import { useParamsStore } from '../_lib/params-store'

const languages = [
    'Java',
    'Python',
    'C++',
    'JavaScript',
]

export default function LanguageSelect({
    className,
    id,
}: {
    className?: string
    id?: string
}) {
    const { programmingLanguage, setParameter } = useParamsStore((state) => state)

    return (
        <Select
            value={programmingLanguage || undefined}
            onValueChange={(e) => setParameter('programmingLanguage', e)}
        >
            <SelectTrigger className={cn('w-full', className)} id={id}>
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                            {language}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
