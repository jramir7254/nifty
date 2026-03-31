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

const courses = [
    'Programming Fundamentals',
    'Programming Fundamentals I',
    'Programming Fundamentals II',
    'Programming Fundamentals III',
]

export default function CourseSelect({
    className,
    id,
}: {
    className?: string
    id?: string
}) {
    const { courseLevel, setParameter } = useParamsStore((state) => state)

    return (
        <Select
            value={courseLevel || undefined}
            onValueChange={(e) => setParameter('courseLevel', e)}
        >
            <SelectTrigger className={cn('w-full', className)} id={id}>
                <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {courses.map(course => <SelectItem key={course} value={course}>{course}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
