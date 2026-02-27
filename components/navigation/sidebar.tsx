"use client"

import * as React from "react"
import {
    Command,
} from "lucide-react"


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/shadcn/sidebar"
import { usePathname, } from 'next/navigation';

import GlobeSidebar from "@/app/geo/_components/globe-sidebar";
import { logger } from "@/lib/logger";
import AccountSidebar from "@/app/account/_components/account-sidebar";
import Footer from "./footer";

function Content({ pathname }: { pathname: string }) {
    // if (matchPath("/", pathname)) return <DashboardSidebar />;
    if (pathname.startsWith('/geo')) return <GlobeSidebar />;
    if (pathname.startsWith('/account')) return <AccountSidebar />;
    return <></>;
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();


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
                                    <span className="truncate font-medium">Acme Inc</span>
                                    <span className="truncate text-xs">Enterprise</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="">
                {<Content pathname={pathname} />}
            </SidebarContent>
            <SidebarFooter>
                <Footer />
            </SidebarFooter>
        </Sidebar>
    )
}
