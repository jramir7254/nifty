"use client";

import { Button } from '@/components/shadcn/button';
import { Card, CardHeader, CardAction, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/shadcn/card';
import { useRouter } from "next/navigation";
import React from 'react'

export default function AssCard({ ass }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/assignments/${ass.id}`);
    };

    return (
        <Card size="sm" className="max-h-25 w-full max-w-xs">
            <CardHeader>
                <CardAction>
                    <Button className="" onClick={handleClick}>
                        View
                    </Button>
                </CardAction>
                <CardTitle>{ass.name}</CardTitle>
                <CardDescription className='sr-only'>
                    This card uses the small size variant.
                </CardDescription>
            </CardHeader>

        </Card>

    )

}
