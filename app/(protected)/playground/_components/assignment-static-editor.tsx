'use client';

import * as React from 'react';
import { Plate, usePlateEditor } from 'platejs/react';
import { MarkdownPlugin } from '@platejs/markdown';

import { ScrollArea } from '@/components/shadcn/scroll-area';
import { BaseEditorKit } from '@/components/plate/kits/editor-base-kit';
import { ExportToolbarButton } from '@/components/plate/nodes/export-toolbar-button';
import { Editor, EditorContainer } from '@/components/plate/nodes/editor';
import { Toolbar } from '@/components/plate/nodes/toolbar';
import { FixedToolbar } from '@/components/plate/nodes/fixed-toolbar';
import { useParamsStore } from '../_lib/params-store';
import { Button } from '@/components/shadcn/button';

export default function AssignmentStaticEditor({
    completion,
    isLoading
}: {
    completion: string;
    isLoading: boolean,
}) {
    const editor = usePlateEditor({
        plugins: BaseEditorKit,
        // optional: seed empty value if you want
        // value: [{ type: 'p', children: [{ text: '' }] }],
    });
    const { setParameter } = useParamsStore((state) => state)

    // Optional: smooth heavy updates a bit
    const deferredMarkdown = React.useDeferredValue(completion);

    // Avoid re-applying identical content
    const lastAppliedRef = React.useRef<string>('');



    React.useEffect(() => {
        if (!editor) return;

        if (deferredMarkdown === lastAppliedRef.current) return;



        try {
            const nextValue =
                editor.getApi(MarkdownPlugin).markdown.deserialize(deferredMarkdown || '');

            editor.tf.setValue(nextValue);



            // readOnly preview usually doesn't need focus
            // editor.tf.focus({ edge: 'endEditor' });

            lastAppliedRef.current = deferredMarkdown;
        } catch (error) {
            console.error('Failed to deserialize streamed markdown', error);
        }
    }, [editor, deferredMarkdown, isLoading, completion]);

    return (
        <ScrollArea className="h-[80vh]">
            <Plate editor={editor}  >
                <FixedToolbar>
                    <ExportToolbarButton />
                    <Button onClick={() => setParameter('generatedAssignemnt', editor.children)}>Load</Button>
                    <div>
                        {isLoading && 'loading'}
                    </div>
                </FixedToolbar>

                <EditorContainer className='overflow-hidden! max-w-300' variant={'demo'}>
                    {/* Remove value prop here; Plate editor instance owns the value */}
                    <Editor className='px-12! text-wrap! wrap-anywhere' readOnly placeholder="Type your amazing content here..." />
                </EditorContainer>
            </Plate>
        </ScrollArea>
    );
}