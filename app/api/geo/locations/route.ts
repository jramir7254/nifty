import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const zipcodeId = searchParams.get('zipcodeId')

    console.log({ zipcodeId, key: process.env.GEOAPIFY_API_KEY })

    const url = `https://api.geoapify.com/v2/places?categories=commercial&filter=place:${zipcodeId}&limit=100&apiKey=${process.env.GEOAPIFY_API_KEY}`

    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) throw new Error('Failed to fetch data');

        const data = await res.json();

        console.log({ data })

        return NextResponse.json(data);
    } catch (error) {
        console.error({ error })

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}
