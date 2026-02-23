import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/shadcn/sidebar'
import React from 'react'
import AssignmentStaticEditor from './_components/assignment-static-editor'

export default function AssignmentPage() {
    return (

        <div className='size-full flex gap-5'>
            <div className='flex-1 bg-sidebar'>

            </div>
            <div className='flex-1 border'>
                <AssignmentStaticEditor />
            </div>
        </div>
    )
}
