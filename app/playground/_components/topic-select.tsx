import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/select"

import topics from "../_lib/topics.json"
import { useParamsStore } from '../_lib/params-store'

const courseMap = {
    'Programming Fundamentals': 'cs0',
    'Programming Fundamentals I': 'cs1',
    'Programming Fundamentals II': 'cs2',
    'Programming Fundamentals III': 'cs3',
} as const

export default function TopicSelect() {
    const { courseLevel, topic, setParameter } = useParamsStore((state) => state)

    const visibleTopics = topics[courseMap[courseLevel]] || []

    return (
        <Select
            disabled={!courseLevel}
            value={topic || undefined}
            onValueChange={(e) => setParameter('topic', e)}
        >
            <SelectTrigger className="">
                <SelectValue placeholder="Select A Topic" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {visibleTopics.map((topic: string) => <SelectItem key={topic} value={topic}>{topic}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
