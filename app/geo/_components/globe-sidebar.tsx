import React from 'react'
import { Input } from '@/components/shadcn/input'
import { Label } from '@/components/shadcn/label'
import zipGeoData from "../_lib/zipcodes.json"

import { Button } from '@/components/shadcn/button'
import { ZipCode } from '../_types/types'
import ZipSelect from './zip-select'
import { useGeoStore } from '../_lib/geo_store'
import { useSearch } from '@/hooks/use-search'


const randomize = (arr: any[], num: number) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
};


export default function GlobeSidebar() {
    const { currentSearch } = useSearch('zipcode')

    const setRandom = useGeoStore((state) => state.setRandomSelectedLocations)




    return (

        <form
            className='flex flex-col space-y-10 h-full mt-20  mb-5'
            onSubmit={(e) => {
                e.preventDefault();
                setRandom(randomize(zipGeoData[currentSearch as '79901'].features, 1))
            }}
        >
            <div>
                {/* <Label htmlFor='state'>State</Label> */}
                <Input disabled type='text' placeholder='Texas' id='state' required />
            </div>
            <div>
                <Input disabled type='text' placeholder='El Paso' required />
            </div>
            <div>
                {/* <Input type='text' placeholder='Zip Code' required /> */}
                <ZipSelect />
            </div>
            <div>
                <Input type='number' min={1} max={10} value={5} onChange={(e) => { }} placeholder='Number of locations' required />
            </div>
            <div className='mt-auto'>
                <Button className='w-full bg-blue-800 text-white hover:bg-blue-900 ' type='submit'>Submit</Button>
            </div>
        </form>


    )
}
