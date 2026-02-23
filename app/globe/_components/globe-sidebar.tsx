import React from 'react'
import { Input } from '@/components/shadcn/input'
import { Label } from '@/components/shadcn/label'

import { Button } from '@/components/shadcn/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select'
export default function GlobeSidebar() {


    const zips = []


    return (

        <form className='flex flex-col space-y-10 h-full mt-20  mb-5' onSubmit={(e) => { e.preventDefault(); updateRandomLocations() }}>
            <div>
                {/* <Label htmlFor='state'>State</Label> */}
                <Input disabled type='text' placeholder='Texas' id='state' required />
            </div>
            <div>
                <Input disabled type='text' placeholder='El Paso' required />
            </div>
            <div>
                {/* <Input type='text' placeholder='Zip Code' required /> */}
                <Select value={"zipCode"} >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Zip Code" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {zips.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
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
