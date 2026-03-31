import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/select"
import { cn } from '@/lib/utils'

import topics from "../_lib/topics.json"
import { useParamsStore } from '../_lib/params-store'

const courseMap = {
    'Programming Fundamentals': 'cs0',
    'Programming Fundamentals I': 'cs1',
    'Programming Fundamentals II': 'cs2',
    'Programming Fundamentals III': 'cs3',
} as const

type CourseKey = keyof typeof courseMap

export default function TopicSelect({
    className,
    id,
}: {
    className?: string
    id?: string
}) {
    const { courseLevel, topic, setParameter } = useParamsStore((state) => state)

    const selectedCourse = courseLevel as CourseKey | ''
    const visibleTopics =
        selectedCourse && selectedCourse in courseMap
            ? topics[courseMap[selectedCourse as CourseKey]] || []
            : []

    return (
        <Select
            disabled={!courseLevel}
            value={topic || undefined}
            onValueChange={(e) => setParameter('topic', e)}
        >
            <SelectTrigger className={cn('w-full', className)} id={id}>
                <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {visibleTopics.map((topic: string) => <SelectItem key={topic} value={topic}>{topic}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
