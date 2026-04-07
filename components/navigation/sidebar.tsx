"use client"

import * as React from "react"
import Link from "next/link"

import {
    File,
    Globe2,
    LayoutDashboard,
    Settings,
    Shield,
    Sparkles,
    WandSparkles,
    type LucideIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { authClient } from "@/lib/auth/client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/shadcn/sidebar"

import Footer from "./footer"


type NavItem = {
    title: string
    href: string
    icon: LucideIcon
    requireAuth?: boolean
}

type NavSection = {
    label: string
    items: NavItem[]
}

const navSections: NavSection[] = [
    {
        label: "Workspace",
        items: [
            {
                title: "Geo",
                href: "/geo",
                icon: Globe2,
                requireAuth: true,
            },
            {
                title: "Playground",
                href: "/playground",
                icon: WandSparkles,
                requireAuth: true,
            },
            {
                title: "Assignments",
                href: "/assignments",
                icon: File,
                requireAuth: true,
            },
        ],
    },
    {
        label: "Account",
        items: [
            // {
            //     title: "Dashboard",
            //     href: "/account",
            //     icon: LayoutDashboard,
            //     requireAuth: true,
            // },
            {
                title: "Settings",
                href: "/account/settings",
                icon: Settings,
                requireAuth: true,
            },
            {
                title: "Security",
                href: "/account/security",
                icon: Shield,
                requireAuth: true,
            },
        ],
    },
]

const isRouteActive = (pathname: string, href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const { data } = authClient.useSession()

    const isAuthed = Boolean(data)

    const visibleSections = React.useMemo(
        () =>
            navSections
                .map((section) => ({
                    ...section,
                    items: section.items.filter(
                        (item) => !item.requireAuth || isAuthed
                    ),
                }))
                .filter((section) => section.items.length > 0),
        [isAuthed]
    )

    return (
        <Sidebar collapsible="offcanvas" variant="inset" {...props}>
            <SidebarHeader className="gap-0">
                <SidebarMenu>
                    <SidebarMenuItem >
                        <SidebarMenuButton
                            asChild
                            className="h-auto min-h-14 items-start rounded-md"
                            size="sm"
                        >
                            <Link href="/">

                                <div className="grid flex-1 text-left leading-tight">
                                    <span className="truncate font-semibold">Nifty</span>
                                    <span className="truncate text-xs text-sidebar-foreground/70">
                                        Assignment generator studio
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* <SidebarSeparator /> */}
            </SidebarHeader>

            <SidebarContent className="font-nunito">
                {visibleSections.map((section) => (
                    <SidebarGroup key={section.label}>
                        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isRouteActive(pathname, item.href)}
                                            tooltip={item.title}
                                        >
                                            <Link href={item.href}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <Footer />
            </SidebarFooter>

            {/* <SidebarRail /> */}
        </Sidebar>
    )
}
