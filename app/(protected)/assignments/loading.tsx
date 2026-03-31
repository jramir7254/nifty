import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/shadcn/card'
import { Skeleton } from '@/components/shadcn/skeleton'

function LoadingCard() {
    return (
        <Card>
            <CardHeader className="gap-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Skeleton className="h-14 w-full" />
                <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </CardContent>
        </Card>
    )
}

export default function AssignmentsLoading() {
    return (
        <div className=" flex  flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="flex flex-col gap-4">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-12 w-2/3" />
                <Skeleton className="h-5 w-1/2" />
            </div>

            <div className="w-full grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </div>
        </div>
    )
}
