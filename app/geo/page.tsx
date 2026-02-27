import ClearButton from "./_components/clear-button";
import Globe from "./_components/globe";
import ShuffleButton from "./_components/shuffle-button";

export default function GlobePage() {
    return (
        <div className='size-full rounded-2xl relative  bg-gradient-to-b from-black via-gray-900 to-black text-white'>
            <div className="absolute top-5 left-2 inline-flex gap-2 z-5">
                <ShuffleButton />
                <ClearButton />
            </div>
            <Globe />
        </div>
    )
}
