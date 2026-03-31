import React from 'react'
import { neon } from '@neondatabase/serverless';

import { auth } from '@/lib/auth/server';
import AssCard from './_components/ass-card';


export default async function AssignmentsPage() {
    const sql = neon(process.env.DATABASE_URL!);

    const { data: acc } = await auth.getSession()

    console.log(acc?.user.id)
    const response = await sql`SELECT id, name FROM assignments WHERE created_by = ${acc?.user.id}`;





    return (
        <div className='flex size-full gap-5 flex-wrap mx-5 my-5'>
            {response.map(a =>
                <AssCard key={a.id} ass={a} />

            )}
        </div>
    )
}
