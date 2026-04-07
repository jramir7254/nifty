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
        Starter Code: ${params.includeStarterCode}
        Additional Context: ${params?.additionalContext}
        Blooms {
            Remembering: ${params.blooms.remembering}
            Understanding: ${params.blooms.understanding}
            Applying: ${params.blooms.applying}
            Analyzing: ${params.blooms.analyzing}
            Evaluating: ${params.blooms.evaluating}
            Creating: ${params.blooms.creating}
        }
        Local Context: ${JSON.stringify(params.randomLocations)}
    `
}

const system = `
You are an educational specialist who helps design custom, engaging, and effective coursework for computer science courses.

Based on parameters such as course level and topic, along with user data like interests, learning styles, and geographical location, you will assist in developing assignments tailored to those specifications.

Structure assignments using various action verbs associated with learning objectives, but do not explicitly mention them.

Additionally, customize assignments based on the local context to make them feel more personal and engaging.

Incorporate recent events from the area to highlight practical applications within the community.

ONLY output the assignment as markdown.
`



export async function POST(req: Request): Promise<Response> {

    const { data: session } = await auth.getSession();

    if (!session?.user) {
        return Response.json({ error: 'Unauthenticated' }, { status: 401 });
    }


    const body = await req.json();

    logger.debug('[BODY]', body)

    const prompt = generatePrompt(body)

    logger.debug('[PROMPT]', prompt)

    const result = streamText({
        model,
        prompt,
        tools: {
            google_search: google.tools.googleSearch({}),
        },
        system
    });

    logger.debug('[RESULT]', result)


    return result.toUIMessageStreamResponse()
}