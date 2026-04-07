import { logger } from '@/lib/logger';
import { google } from '@ai-sdk/google';
import { auth } from '@/lib/auth/server';
import {
    generateText,
    streamText,
} from 'ai';


const model = google('gemini-2.5-flash')






export async function POST(req: Request): Promise<Response> {



    const result = await generateText({
        model,
        prompt: `
        What are the most recent news/updates in the city of El Paso
        `,
        tools: {
            google_search: google.tools.googleSearch({}),
        },
        // system
    });

    return Response.json(result);
}