import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const country = searchParams.get('country') || 'us'
    const zip = searchParams.get('zipcode')

    console.log({ country, zip, key: process.env.GEOAPIFY_API_KEY })

    const url = `https://api.geoapify.com/v1/postcode/search?postcode=${zip}&countrycode=${country}&geometry=original&apiKey=${process.env.GEOAPIFY_API_KEY}`

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
