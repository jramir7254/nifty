import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/card'
import { FieldGroup, Field, FieldLabel, FieldContent, FieldTitle, FieldDescription } from '@/components/shadcn/field'
import { Textarea } from '@/components/shadcn/textarea'
import React from 'react'
import CourseSelect from '../course-select'
import LanguageSelect from '../language-select'
import TopicSelect from '../topic-select'
import BloomSliders from './blooms-sliders'
import { Separator } from '@/components/shadcn/separator'
import { Switch } from '@/components/shadcn/switch'
import { useParamsStore } from '../../_lib/params-store'

export default function BaseParams() {
    const {
        additionalContext,
        courseLevel,
        generatedAssignemnt,
        includeStarterCode,
        programmingLanguage,
        setParameter,
        topic,
    } = useParamsStore((state) => state)
    return (
        <Card className='bg-background rounded-none'>
            <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>
                    Shape the assignment before it reaches the model.
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-5'>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="course-level">
                            Course level
                        </FieldLabel>
                        <CourseSelect id="course-level" />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="assignment-topic">
                            Topic
                        </FieldLabel>
                        <TopicSelect id="assignment-topic" />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="programming-language">
                            Language
                        </FieldLabel>
                        <LanguageSelect id="programming-language" />
                    </Field>

                    <Separator />

                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldTitle>Starter code</FieldTitle>
                            <FieldDescription>
                                Include scaffolding or method signatures in the
                                generated assignment brief.
                            </FieldDescription>
                        </FieldContent>
                        <Switch
                            checked={includeStarterCode}
                            onCheckedChange={(checked) =>
                                setParameter('includeStarterCode', checked)
                            }
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="additional-context">
                            Additional context
                        </FieldLabel>
                        <FieldDescription>
                            Add constraints, rubric notes, tone, or class-specific
                            context.
                        </FieldDescription>
                        <Textarea
                            className="min-h-32"
                            id="additional-context"
                            onChange={(event) =>
                                setParameter(
                                    'additionalContext',
                                    event.target.value
                                )
                            }
                            placeholder="Include any extra directions the generator should respect..."
                            value={additionalContext}
                        />
                    </Field>
                </FieldGroup>
                <BloomSliders />
            </CardContent>
        </Card>
    )
}
