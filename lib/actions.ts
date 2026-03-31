'use server'

import React from 'react'
import { neon } from '@neondatabase/serverless';

import { auth } from '@/lib/auth/server';


export async function saveAssignmentAction(data: any) {
    console.info('trying to save')

    try {

        const sql = neon(process.env.DATABASE_URL!);

        const { data: acc } = await auth.getSession()

        console.log(acc?.user.id)

        const response = await sql`
        INSERT INTO assignments (created_by, content, params)
        VALUES (${acc?.user.id}, ${JSON.stringify(data.content)}, ${JSON.stringify(data.params)})
        `;
    } catch (error) {
        console.error(error)
    }

}