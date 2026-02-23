'use client'
import type { Value } from 'platejs';


import {
    usePlateEditor,
} from 'platejs/react';


import { Button } from '@/components/shadcn/button';


import { ScrollArea } from '@/components/shadcn/scroll-area';
import { EditorStatic } from '@/components/plate/nodes/editor-static';
const initialValue: Value = [
    {
        type: 'h2',
        children: [
            { text: 'Hello! Try out the ' },
            { text: 'bold', bold: true },
            { text: ', ' },
            { text: 'italic', italic: true },
            { text: ', and ' },
            { text: 'underline', underline: true },
            { text: ' formatting.' },
        ],
    },
    {
        children: [{ text: 'Collaborative Editing' }],
        type: 'h2',
    },
    {
        type: 'p',
        children: [
            { text: 'Generate content (continue writing, summarize, explain)' },
        ],
        indent: 1,
        listStyleType: 'disc',
    },
    {
        children: [
            { text: 'Edit existing text (improve, fix grammar, change tone)' },
        ],
        indent: 1,
        listStyleType: 'disc',
        type: 'p',
    },
    {
        children: [
            { children: [{ text: 'function hello() {' }], type: 'code_line' },
            {
                children: [{ text: "  console.info('Code blocks are supported!');" }],
                type: 'code_line',
            },
            { children: [{ text: '}' }], type: 'code_line' },
        ],
        lang: 'javascript',
        type: 'code_block',
    },
];

const test = "# heading"
import { BaseEditorKit } from '@/components/plate/kits/editor-base-kit';

export default function AssignmentStaticEditor() {
    const editor = usePlateEditor({
        plugins: BaseEditorKit,

        value: initialValue
        // value: (editor) => editor.getApi(MarkdownPlugin).markdown.deserialize(test)


    });





    return (
        <div>
            <ScrollArea className='h-[50vh] '>

                <EditorStatic
                    variant={'fullWidth'}
                    className=' '
                    editor={editor}
                // value={editor.getApi(MarkdownPlugin).markdown.deserialize(response)} 
                >

                </EditorStatic>
            </ScrollArea>

        </div>
    );
}
