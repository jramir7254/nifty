import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/select"
import { useParamsStore } from '../_lib/params-store'

const langauges = [
    'Java',
    'Python',
    'C++',
    'Javascript'
]

export default function LanguageSelect() {
    const { programmingLanguage, setParameter } = useParamsStore((state) => state)

    return (
        <Select
            value={programmingLanguage}
            onValueChange={(e) => setParameter('programmingLanguage', e)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {langauges.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
