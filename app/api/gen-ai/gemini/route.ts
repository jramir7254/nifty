import { logger } from '@/lib/logger';
import { google } from '@ai-sdk/google';
import { auth } from '@/lib/auth/server';

import {
    streamText,
} from 'ai';


const model = google('gemini-2.5-flash')


const generatePrompt = (params) => {
    return `
        Generate an assignment based on the following parameters

        Course: ${params?.courseLevel}
        Topic: ${params?.topic}
        Programming Language: ${params?.programmingLanguage}
        Additional Context: ${params?.additionalContext}
    `
}

const system = `
You are an educational specialist who helps design custom, 
engaging, and effective coursework for computer science courses.

Based on parameters such as course level, topic, etc., along with 
other user data such as interests, learning style, and geographical data, 
you will help develop an assignment tailored to those parameters.

ONLY output the assignment as markdown.
`



export async function POST(req: Request): Promise<Response> {

    logger.info('inside backend')
    const { data: session } = await auth.getSession();

    if (!session?.user) {
        return Response.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    logger.debug("[SESSION]", { session })

    // return Response.json({})


    const body = await req.json();

    logger.debug('[BODY]', body)

    const prompt = generatePrompt(body)

    logger.debug('[PROMPT]', prompt)


    const result = streamText({
        model,
        prompt,
        system
    });



    return result.toUIMessageStreamResponse()
}