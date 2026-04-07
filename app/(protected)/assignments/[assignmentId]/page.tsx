import { EditorStatic } from '@/components/plate/nodes/editor-static';
import React from 'react'
import { createSlateEditor } from 'platejs';
import { BaseEditorKit } from '@/components/plate/kits/editor-base-kit';
import { neon } from '@neondatabase/serverless';
import { ScrollArea } from '@/components/shadcn/scroll-area';
import { db } from '@/server/drizzle/db';
import { assignments } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';



export default async function AssignmentView({
    params,
}: {
    params: Promise<{ assignmentId: string }>
}) {

    const { assignmentId } = await params

    const assignment = await db
        .select()
        .from(assignments)
        .where(
            eq(assignments.id, assignmentId)
        ).limit(1)
        .then(d => d[0])

    const editorValue = assignment.content

    console.log({ editorValue })

    const editor = createSlateEditor({
        // plugins: [BaseHeadingPlugin, /* ...other base plugins */],
        plugins: BaseEditorKit, // Add your base plugins
        // components: staticComponents,
        value: editorValue as string,
    });

    return (
        <ScrollArea className='h-[90vh] lg:px-20'>

            <EditorStatic
                editor={editor}

                className="max-w-none overflow-hidden pb-30" variant="default"
            />
        </ScrollArea>
    );
}
