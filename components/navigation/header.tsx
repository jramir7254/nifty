'use client'
import React from 'react'
import { SidebarTrigger } from '../shadcn/sidebar'
import { Separator } from '../shadcn/separator'
import { Switch } from '../shadcn/switch'
import { useTheme } from '@/context/theme-provider'
import NavLink from './nav-link'




export default function Header() {
    const { setTheme, theme } = useTheme()



    const isDark = theme === 'dark'

    const changeTheme = () => {
        theme === 'dark' ? setTheme('light') : setTheme('dark')
    }

    return (
        <header className="flex h-16 shrink-0  items-center gap-2">
            <div className="flex items-center lg:gap-2 lg:px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />

                <NavLink path='/' text='Home' />
                <NavLink path='/auth/sign-in' text='Sign In' guest />
                <NavLink path='/account' text='Account' auth />
                <NavLink path='/globe' text='Globe' auth />
                <NavLink path='/assignment' text='Assignment' auth />



            </div>
            <div className="lg:ml-auto mr-5 lg:mr-10">
                <Switch checked={isDark} onCheckedChange={changeTheme} />
            </div>
        </header>
    )
}
