'use client'

import { Button } from '@/components/shadcn/button'
import { DefaultChatTransport } from 'ai'
import { useState } from 'react'
import { useChat, useCompletion } from '@ai-sdk/react';
import AssignmentStaticEditor from './_components/assignment-static-editor';
import CourseSelect from './_components/course-select';
import LanguageSelect from './_components/language-select';
import TopicSelect from './_components/topic-select';
import { Textarea } from '@/components/shadcn/textarea';
import { useParamsStore } from './_lib/params-store';
import { type UIMessage } from 'ai';
import { Separator } from '@/components/shadcn/separator';
import { useGeoStore } from '../geo/_lib/geo_store';
import EditorHeader from './_components/editor-header';


export default function AssignmentPage() {
    const { additionalContext, courseLevel, programmingLanguage, topic, setParameter } = useParamsStore((state) => state)
    const randomLocations = useGeoStore((state) => state.randomSelectedLocations)


    const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
        api: '/api/gen-ai/gemini',
        body: {
            additionalContext,
            courseLevel,
            programmingLanguage,
            topic,
            randomLocations
        },

        experimental_throttle: 800
    });

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     sendMessage({text: ""});
    //     setInput('');
    // };
    return (
        <div className="size-full flex">
            <div className="flex-1 max-w-1/3 px-10 pt-20  ">
                <form onSubmit={handleSubmit}>
                    <input
                        name="prompt"
                        value={input}
                        onChange={handleInputChange}
                        id="input"
                    />
                    <button type="submit">Submit</button>
                </form>
                <CourseSelect />
                <TopicSelect />
                <LanguageSelect />
                <Textarea value={additionalContext} onChange={(e) => setParameter('additionalContext', e.target.value)} />
            </div>
            <Separator orientation='vertical' />
            <div className="flex-1 max-w-2/3 ">
                {/* <EditorHeader /> */}
                <AssignmentStaticEditor isLoading={isLoading} completion={completion} />
            </div>
        </div>
    )
}



// {messages.map(m => (
//                     <div key={m.id} className="whitespace-pre-wrap">
//                         {m.role === 'user' ? 'User: ' : 'AI: '}
//                         {m.parts.map(part => {
//                             if (part.type === 'text') {
//                                 return part.text;
//                             }
//                         })}
//                         {/* Render usage via metadata */}
//                         {m.metadata?.totalUsage && (
//                             <div>Total usage: {m.metadata?.totalUsage.totalTokens} tokens</div>
//                         )}
//                     </div>
//                 ))}

//                 <form onSubmit={handleSubmit}>
//                     <input
//                         value={input}
//                         onChange={e => setInput(e.target.value)}
//                         placeholder="Ask about the weather..."
//                     />
//                     <button type="submit">Send</button>
//                 </form>

//                 <p>status: {status}</p>