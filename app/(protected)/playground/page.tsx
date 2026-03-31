'use client'

import { Button } from '@/components/shadcn/button'

import { useCompletion, } from '@ai-sdk/react';
import AssignmentStaticEditor from './_components/assignment-static-editor';
import CourseSelect from './_components/course-select';
import LanguageSelect from './_components/language-select';
import TopicSelect from './_components/topic-select';
import { Textarea } from '@/components/shadcn/textarea';
import { useParamsStore } from './_lib/params-store';
import { Separator } from '@/components/shadcn/separator';
import { useGeoStore } from '../geo/_lib/geo_store';
import { saveAssignmentAction } from '@/lib/actions';



export default function AssignmentPage() {

    const { additionalContext, courseLevel, programmingLanguage, topic, generatedAssignemnt, setParameter } = useParamsStore((state) => state)
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

        onFinish: (prompt, completion) => {


        },


        experimental_throttle: 800
    });

    const save = () => {
        console.info('in save')
        const data = {
            params: {
                topic,
                courseLevel,
                programmingLanguage,
                additionalContext,
                randomLocations,
            },
            content: generatedAssignemnt
        }

        saveAssignmentAction(data)
        console.info('after save')
    }


    return (
        <div className="size-full flex">
            <div className="flex-1 max-w-1/3 px-10 pt-20  ">
                <Button disabled={isLoading || !completion} onClick={save}>Save</Button>
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
            <article className="flex-1 max-w-2/3 ">
                {/* <EditorHeader /> */}
                <AssignmentStaticEditor isLoading={isLoading} completion={completion} />

            </article>
        </div>
    )
}



