'use client'
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from '@/components/shadcn/field'
import React from 'react'
import CourseSelect from '../course-select'
import { useParamsStore } from '../../_lib/params-store'
import { Slider } from '@/components/shadcn/slider'
import { capitalize } from 'es-toolkit/string';

const bloomVerbs = [
    'remembering',
    'understanding',
    'applying',
    'analyzing',
    'evaluating',
    'creating',
] as const


export default function BloomSliders() {
    const store = useParamsStore((store) => store)
    return (
        <FieldGroup>
            <FieldContent>
                <FieldTitle>Blooms</FieldTitle>
                <FieldDescription>
                    Include scaffolding or method signatures in the
                    generated assignment brief.
                </FieldDescription>
            </FieldContent>
            {bloomVerbs.map(verb =>
                <Field key={verb}>
                    <FieldLabel htmlFor={verb}>
                        {capitalize(verb)} <span className='ml-auto'>{store.blooms[verb]}%</span>
                    </FieldLabel>
                    <Slider
                        value={[store.blooms[verb]]}
                        max={100}
                        step={1}
                        onValueChange={(e) => store.setParameter('blooms', { ...store.blooms, [verb]: e[0] })}

                    />
                </Field>
            )}
        </FieldGroup>
    )
}
