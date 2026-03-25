"use client"

import * as React from "react"
import {
    ChevronRight,
    Command,
    Globe2,
    Home,
    Pencil,
    Settings,
    Shield,
    CircleUserRound,
    type LucideIcon,
    Sparkles,
    WandSparkles,
    LayoutDashboard
} from "lucide-react"


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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator,
} from "@/components/shadcn/sidebar"
import { usePathname, } from 'next/navigation';

import GlobeSidebar from "@/app/geo/_components/globe-sidebar";
import { logger } from "@/lib/logger";
import AccountSidebar from "@/app/account/_components/account-sidebar";
import Footer from "./footer";
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "../shadcn/collapsible";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";

function Content({ pathname }: { pathname: string }) {
    // if (matchPath("/", pathname)) return <DashboardSidebar />;
    if (pathname.startsWith('/geo')) return <GlobeSidebar />;
    // if (pathname.startsWith('/account')) return <AccountSidebar />;
    return <></>;
}

type Link = {
    name: string,
    link?: string,
    icon: LucideIcon,
    requireAuth?: boolean,
    children?: Link[],
}


const links: Link[] = [
    {
        name: "Home",
        icon: Home,
        link: "/",
        requireAuth: false,
    },
    {
        name: "Account",

        icon: CircleUserRound,

        link: "/account",
        requireAuth: true,
        children: [
            { name: "Dashboard", link: "/account", icon: LayoutDashboard, },
            { name: "Settings", link: "/account/settings", icon: Settings, },
            { name: "Security", link: "/account/security", icon: Shield, },
        ],
    },
    {
        name: "Geo",
        icon: Globe2,
        link: "/geo",
        requireAuth: true,
    },
    {
        name: "Playground",
        icon: WandSparkles,
        link: "/playground",
        requireAuth: true,
    },
]


const matchPath = (pathname: string, link: string | undefined) => {
    if (!link) return false
    return pathname === link
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const { data } = authClient.useSession();

    const isAuthed = !!data


    logger.debug("[PATH]", pathname, pathname === '/account/*')


    return (
        <Sidebar variant="inset" {...props} className="">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Nifty</span>
                                    <span className="truncate text-xs">Assignment Generator</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="font-nunito">
                <SidebarGroup >
                    <SidebarGroupContent>
                        {links.map(link => link.requireAuth && !isAuthed ? null : (
                            // <SidebarGroup key={link.name}>
                            //     <SidebarGroupContent>
                            <SidebarMenu key={link.name}>
                                {link.children ?
                                    <Collapsible key={link.name}>
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton tooltip={link.name}>
                                                    {link.icon && <link.icon />}
                                                    <span>{link.name}</span>
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {link.children?.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.name}>
                                                            <SidebarMenuSubButton asChild isActive={matchPath(pathname, subItem.link)}>
                                                                <Link href={subItem.link || "#"} >
                                                                    <subItem.icon />
                                                                    <span>{subItem.name}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                    :
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={matchPath(pathname, link.link)} >
                                            <Link href={link.link || "#"} >
                                                <link.icon />
                                                <span>{link.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                }
                            </SidebarMenu>

                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* <SidebarGroup>
                    <SidebarGroupContent>
                        <Content pathname={pathname} />
                    </SidebarGroupContent>
                </SidebarGroup> */}
            </SidebarContent>
            <SidebarFooter>
                <Footer />
            </SidebarFooter>
        </Sidebar>
    )
}
