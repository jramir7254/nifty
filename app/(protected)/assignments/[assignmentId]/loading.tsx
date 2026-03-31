import { Separator } from '@/components/shadcn/separator'
import { Skeleton } from '@/components/shadcn/skeleton'
import React from 'react'

export default function Loding() {
    return (
        <div className='px-20 py-5 space-y-5'>
            <div className='space-y-2'>
                <Skeleton className='w-100 h-10' />
                <Skeleton className='w-75 h-5' />
                <Skeleton className='w-80 h-5' />
                <Skeleton className='w-60 h-5' />
            </div>
            <Separator />
            <div className='space-y-2'>
                <Skeleton className='w-75 h-5' />
                <Skeleton className='w-150 h-2' />
                <Skeleton className='w-125 h-2' />
                <Skeleton className='w-100 h-2' />
                <Skeleton className='w-135 h-2' />
            </div>
            <div className='space-y-2'>
                <Skeleton className='w-100 h-5' />
                <Skeleton className='w-200 h-2' />
                <Skeleton className='w-180 h-2' />
                <Skeleton className='w-175 h-2' />
                <Skeleton className='w-225 h-2' />

            </div>

        </div>
    )
}
