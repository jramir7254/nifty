import { Suspense } from "react";
import { MarkersLayer } from "./_components/globe/markers-layer";
import { Map } from "@/components/mapcn/tiler";
import { BoundaryLayer } from "./_components/globe/boundary-layer";
import { ConfigPanel } from "./_components/config/config-panel";

export default function GlobePage() {
    return (
        <Suspense fallback={<></>}>
            <div className='relative size-full rounded-2xl'>
                <div className="absolute top-4 left-4 z-10">
                    <ConfigPanel />
                </div>
                <Map
                    projection='globe'
                    zoom={2}
                    minZoom={2}
                    styles={{
                        dark: 'https://api.maptiler.com/maps/dataviz-dark/style.json?key=WoHVoOaowll2UAl1a0g4'
                    }}
                >
                    <BoundaryLayer />
                    <MarkersLayer />
                </Map>
            </div>
        </Suspense>
    )
}
