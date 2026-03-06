import ClearButton from "./_components/clear-button";
import ShuffleButton from "./_components/shuffle-button";
import { MapControls, Map } from "@/components/ui/map";
import { MarkersLayer } from "./_components/map";

export default function GlobePage() {
    return (
        <div className='size-full rounded-2xl relative  bg-linear-to-b from-black via-gray-900 to-black'>
            <div className="absolute top-5 left-2 inline-flex gap-2 z-5">
                <ShuffleButton />
                <ClearButton />
            </div>
            <Map

                projection={{ type: 'globe' }}
                // center={[-74.006, 40.7128]}
                zoom={2}
                minZoom={2}
                styles={{
                    dark: 'https://api.maptiler.com/maps/dataviz-dark/style.json?key=WoHVoOaowll2UAl1a0g4'
                }}

            >
                <MapControls
                    showCompass
                    showLocate
                    position="top-right"
                />
                <MarkersLayer />
            </Map>
        </div>
    )
}
