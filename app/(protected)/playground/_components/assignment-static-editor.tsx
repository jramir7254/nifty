'use client';

import * as React from 'react';
import { FileTextIcon, LoaderCircleIcon } from 'lucide-react';
import { Plate, usePlateEditor } from 'platejs/react';
import { MarkdownPlugin } from '@platejs/markdown';

import { ScrollArea } from '@/components/shadcn/scroll-area';
import { BaseEditorKit } from '@/components/plate/kits/editor-base-kit';
import { ExportToolbarButton } from '@/components/plate/nodes/export-toolbar-button';
import { Editor, EditorContainer } from '@/components/plate/nodes/editor';
import { FixedToolbar } from '@/components/plate/nodes/fixed-toolbar';
import { useParamsStore } from '../_lib/params-store';

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
            setParameter('generatedAssignemnt', nextValue as unknown[]);



            // readOnly preview usually doesn't need focus
            // editor.tf.focus({ edge: 'endEditor' });

            lastAppliedRef.current = deferredMarkdown;
        } catch (error) {
            console.error('Failed to deserialize streamed markdown', error);
        }
    }, [completion, deferredMarkdown, editor, isLoading, setParameter]);

    const hasContent = editor.children.length > 0;

    return (
        <ScrollArea className="h-[85vh]  min-h-[34rem]">
            <Plate
                editor={editor}
                onChange={({ value }) => {
                    setParameter('generatedAssignemnt', value as unknown[]);
                }}
            >
                <FixedToolbar className="gap-3 px-2">
                    <ExportToolbarButton />
                    <div className="text-muted-foreground ml-auto flex items-center gap-2 pr-1 text-sm">
                        {isLoading ? (
                            <>
                                <LoaderCircleIcon className="size-4 animate-spin" />
                                <span>Streaming into preview</span>
                            </>
                        ) : hasContent ? (
                            <>
                                <FileTextIcon className="size-4" />
                                <span>Draft synced for saving</span>
                            </>
                        ) : (
                            <span>Generated content will appear here.</span>
                        )}
                    </div>
                </FixedToolbar>

                <EditorContainer className="max-w-none overflow-hidden" variant="default">
                    <Editor
                        className="wrap-anywhere text-wrap"
                        placeholder="Generated assignment content will appear here."
                        readOnly
                    />
                </EditorContainer>
            </Plate>
        </ScrollArea>
    );
}
