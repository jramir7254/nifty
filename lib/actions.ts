'use server'


import { db } from '@/server/drizzle/db';
import { assignments } from '@/drizzle/schema';
import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation'


export async function saveAssignmentAction(meta: any) {
    console.info('trying to save', { meta })

    try {
        const { data, error } = await auth.getSession()
        if (error || !data?.session) {
            redirect('/auth/login')
        }

        await db.insert(assignments).values({
            createdBy: data.user.id,
            content: meta?.content,
            params: meta?.params,
        })

    } catch (error) {
        console.error(error)
        throw error
    }
}