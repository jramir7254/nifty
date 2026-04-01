import { and, eq } from 'drizzle-orm'

import { assignments } from '@/drizzle/schema'
import { auth } from '@/lib/auth/server'
import { getAssignmentTitle } from '@/lib/assignment-title'
import { db } from '@/server/drizzle/db'

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ assignmentId: string }> }
) {
    const { data: session } = await auth.getSession()

    if (!session?.user) {
        return Response.json({ error: 'Unauthenticated' }, { status: 401 })
    }

    const { assignmentId } = await params

    const assignment = await db
        .select({
            content: assignments.content,
            id: assignments.id,
            name: assignments.name,
            params: assignments.params,
        })
        .from(assignments)
        .where(
            and(
                eq(assignments.id, assignmentId),
                eq(assignments.createdBy, session.user.id)
            )
        )
        .limit(1)
        .then((rows) => rows[0])

    if (!assignment) {
        return Response.json({ error: 'Assignment not found' }, { status: 404 })
    }

    return Response.json({
        id: assignment.id,
        title: getAssignmentTitle(assignment),
    })
}
