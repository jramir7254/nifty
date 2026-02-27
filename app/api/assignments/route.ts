import { logger } from '@/lib/logger';
import { auth } from '@/lib/auth/server';
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);


export async function POST(req: Request): Promise<Response> {

    const body = await req.json()
    logger.debug('[BODY]', body)

    logger.info('inside backend')
    const { data: session } = await auth.getSession();

    if (!session?.user) {
        return Response.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    await new Query()

    logger.debug("[SESSION]", { session })

    // return Response.json({})
    const response = await sql`SELECT * FROM neon_auth.user`;


    logger.debug('[RES]', response)



    return Response.json({ status: 200 });


}