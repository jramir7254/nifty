"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shadcn/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/shadcn/sidebar"
import LogoutButton from "./logout-modal"
import { UserButton } from '@neondatabase/neon-js/auth/react/ui';
import { authClient } from "@/lib/auth/client"

import LogoutModal from "./logout-modal"
import Link from "next/link"
import AuthGuard from "../ui/auth-guard"

export default function Footer() {
    const { isMobile } = useSidebar()

    return (
        <SidebarMenu>
            <SidebarMenuItem >
                <SidebarMenuButton
                    size="lg"
                    asChild
                // className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >

                    <UserButton className="bg-background text-foreground" />
                </SidebarMenuButton>
                {/* <DropdownMenu modal>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                        // className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >

                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent

                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}

                    >
                        <DropdownMenuLabel asChild className="p-0 font-normal">
                            <Link href={'https://www.jesusramirez.dev'} target="_blank" className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={'/icon.png'} alt={"Jesus Ramirez"} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Developed By</span>
                                    <span className="truncate text-xs">Jesus Ramirez</span>
                                </div>
                            </Link>
                        </DropdownMenuLabel>

                        <AuthGuard>
                            <DropdownMenuSeparator />
                            <LogoutModal >
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} >
                                    <LogOut /> Log out
                                </DropdownMenuItem>
                            </LogoutModal>
                        </AuthGuard>
                    </DropdownMenuContent>
                </DropdownMenu> */}
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
