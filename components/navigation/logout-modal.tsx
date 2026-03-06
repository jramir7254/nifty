import React, { Children } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog"

import { Button } from "@/components/shadcn/button"
import { LogOut, Trash2Icon } from "lucide-react"
import Link from 'next/link'
export default function LogoutModal({ children }: { children: React.ReactNode }) {
    return (



        <AlertDialog  >
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent
                size="sm">
                <AlertDialogHeader >
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <LogOut />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">
                        <Link href={'/auth/sign-out'}>
                            Logout
                        </Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    )
}
