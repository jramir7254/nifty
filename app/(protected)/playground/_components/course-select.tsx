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
const courses = [
    'Programming Fundamentals',
    'Programming Fundamentals I',
    'Programming Fundamentals II',
    'Programming Fundamentals III',
]

export default function CourseSelect() {
    const { courseLevel, setParameter } = useParamsStore((state) => state)

    return (
        <Select
            value={courseLevel}
            onValueChange={(e) => setParameter('courseLevel', e)}
        >
            <SelectTrigger className="">
                <SelectValue placeholder="Select A Course" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {courses.map(course => <SelectItem key={course} value={course}>{course}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
