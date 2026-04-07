
// export type ZipCode = keyof typeof zipGeoData
// export type ZipFeature = (typeof zipGeoData)[ZipCode]['features'][number]


export type PlaceProperties = {
    name: string;
    ref: number;
    country: string;
    country_code: string;
    state: string;
    county: string;
    city: string;
    postcode: string;
    street: string;
    housenumber: string;
    iso3166_2: string;
    lon: number;
    lat: number;
    state_code: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    categories: string[];
    details: string[];
    datasource: {
        sourcename: string;
        attribution: string;
        license: string;
        url: string;
        raw: {
            ref: number;
            name: string;
            shop: string;
            brand: string;
            phone: string;
            osm_id: number;
            website: string;
            building: string;
            osm_type: string;
            "addr:city": string;
            "addr:state": string;
            "addr:street": string;
            "addr:postcode": number;
            opening_hours: string;
            "brand:wikidata": string;
            "addr:housenumber": number;
        };
    };
    website: string;
    opening_hours: string;
    brand: string;
    brand_details: {
        wikidata: string;
    };
    contact: {
        phone: string;
    };
    commercial: {
        type: string;
    };
    place_id: string;
};