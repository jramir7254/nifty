
import Globe from "@/archive/globe";
// import { Map, MapControls } from "@/components/ui/tiler";
import { Map, MapControls } from "@/components/ui/map";
import { MarkersLayer } from "./_components/map";

import { ConfigPanel } from "./_components";
import { Suspense } from "react";

export default function GlobePage() {
    return (
        <Suspense fallback={<></>}>

            <div className='size-full rounded-2xl relative  '>
                <div className="absolute top-5 left-2 inline-flex gap-2 z-5">
                    <ConfigPanel />
                </div>
                <Map
                    projection={{ type: 'globe' }}

                    zoom={2}
                    minZoom={2}
                    styles={{
                        dark: 'https://api.maptiler.com/maps/dataviz-dark/style.json?key=WoHVoOaowll2UAl1a0g4'
                    }}

                >
                    {/* <MapControls
                    showCompass
                    showLocate
                    position="top-right"
                /> */}
                    <MarkersLayer />
                </Map>
            </div>
        </Suspense>
    )
}
