'use client'


import {
    usePlateEditor,
} from 'platejs/react';


import { ScrollArea } from '@/components/shadcn/scroll-area';
import { EditorStatic } from '@/components/plate/nodes/editor-static';
import { BaseEditorKit } from '@/components/plate/kits/editor-base-kit';
import { MarkdownPlugin } from '@platejs/markdown';
import { useDeferredValue, useMemo } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/shadcn/button';
import { useParamsStore } from '../_lib/params-store';
import { client } from '@/lib/axios';

export default function AssignmentStaticEditor({
    completion
}: {
    completion: string
}) {
    const { additionalContext, courseLevel, programmingLanguage, topic, setParameter } = useParamsStore((state) => state)

    const editor = usePlateEditor({
        plugins: BaseEditorKit,
    });

    const deferredMarkdown = useDeferredValue(completion);

    // 3) Only deserialize when the deferred markdown changes
    const value = useMemo(() => {
        return editor.getApi(MarkdownPlugin).markdown.deserialize(deferredMarkdown);
    }, [editor, deferredMarkdown]);


    const onClick = () => {
        logger.debug("[EDITOR]", editor.children)
        client.post('/api/assignments', {
            additionalContext,
            courseLevel,
            topic,
            programmingLanguage,
            generatedAssignment: editor.children
        })
        setParameter('generatedAssignemnt', editor.children)
    }


    return (
        <ScrollArea className='h-[80vh] '>
            <Button onClick={onClick}>Save</Button>
            <EditorStatic
                variant={'select'}
                className='px-10 text-wrap max-w-[50vw]'
                editor={editor}
                value={value}
            />
        </ScrollArea>
    );
}
