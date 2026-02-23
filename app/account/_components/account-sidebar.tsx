import React from 'react'
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/shadcn/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { Home, Settings, Shield } from 'lucide-react';


export default function AccountSidebar() {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupContent>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/account'} >
                            <Link href="/account" >
                                <Home />
                                <p>Home</p>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/account/settings'} >
                            <Link href="/account/settings" >
                                <Settings />

                                <p>Settings</p>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/account/security'} >
                            <Link href="/account/security" >
                                <Shield />

                                <p>Security</p>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
