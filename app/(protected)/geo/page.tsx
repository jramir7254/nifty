import { ConfigPanel } from "./_components";
import { Suspense } from "react";
import { MarkersLayer } from "./_components/map";
import { Map } from "@/components/ui/tiler";

export default function GlobePage() {
    return (
        <Suspense fallback={<></>}>
            <div className='relative size-full rounded-2xl'>
                <div className="absolute top-4 left-4 z-10">
                    <ConfigPanel />
                </div>
                <Map
                    // projection={{ type: 'globe' }}
                    projection='globe'
                    zoom={2}
                    minZoom={2}
                    styles={{
                        dark: 'https://api.maptiler.com/maps/dataviz-dark/style.json?key=WoHVoOaowll2UAl1a0g4'
                    }}
                >
                    <MarkersLayer />
                </Map>
            </div>
        </Suspense>
    )
}
