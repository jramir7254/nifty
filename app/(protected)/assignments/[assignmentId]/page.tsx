import { EditorStatic } from '@/components/plate/nodes/editor-static';
import React from 'react'
import { createSlateEditor } from 'platejs';
import { BaseEditorKit } from '@/components/plate/kits/editor-base-kit';
import { neon } from '@neondatabase/serverless';
import { ScrollArea } from '@/components/shadcn/scroll-area';





export default async function AssignmentView({
    params,
}: {
    params: Promise<{ assignmentId: string }>
}) {
    const sql = neon(process.env.DATABASE_URL!);
    const { assignmentId } = await params


    const editorValue = await sql`SELECT * FROM assignments WHERE id = ${assignmentId}`;

    console.log({ editorValue: editorValue.content })

    const editor = createSlateEditor({
        // plugins: [BaseHeadingPlugin, /* ...other base plugins */],
        plugins: BaseEditorKit, // Add your base plugins
        // components: staticComponents,
        value: editorValue[0].content,
    });

    return (
        <ScrollArea className='h-[90vh] px-20'>

            <EditorStatic
                editor={editor}

                className="pb-30"
            />
        </ScrollArea>
    );
}
