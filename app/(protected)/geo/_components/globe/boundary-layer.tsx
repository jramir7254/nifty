"use client";

import { useEffect, useId, useCallback, useState } from "react";
import { MapPopup, useMap } from "@/components/mapcn/tiler";
import { useGeoStore } from "../../_lib/geo_store";
import { ScrollArea } from "@/components/shadcn/scroll-area";


export function BoundaryLayer() {
    const { map, isLoaded } = useMap();
    const zip = useGeoStore((state) => state.selectedZip);
    const [open, setOpen] = useState(
        false
    );

    const id = useId();
    const sourceId = `boundary-source-${id}`;
    const borderLayerId = `boundary-border-layer-${id}`;
    const fillId = `boundary-fill-layer-${id}`;



    useEffect(() => {
        if (!zip) return
        map?.flyTo({
            center: [zip?.features[0]?.properties?.lon, zip?.features[0]?.properties?.lat],
            zoom: 14,
            duration: 1500,
            essential: true,
        });

    }, [zip, map]);

    const addLayers = useCallback(() => {
        if (!map || !zip) return;
        // Add source if it doesn't exist
        if (!map.getSource(sourceId)) {
            map.addSource(sourceId, {
                type: "geojson",
                data: zip
            });
        }

        // Add fill layer if it doesn't exist
        if (!map.getLayer(borderLayerId)) {
            map.addLayer({
                id: borderLayerId,
                type: "line",
                source: sourceId,
                paint: {
                    "line-color": "#155dfc",
                    "line-width": 2,
                },
            });
        }


        if (!map.getLayer(fillId)) {
            map.addLayer({
                id: fillId,
                type: "fill",
                source: sourceId,
                paint: {
                    "fill-color": "#155dfc",
                    'fill-opacity': 0.15
                },
            });
        }


    }, [map, sourceId, borderLayerId, zip, fillId]);


    useEffect(() => {
        if (!map || !isLoaded) return;

        addLayers()

        const handleClick = () => {
            setOpen(true)
        }




        const handleMouseEnter = () => {
            map.setPaintProperty(fillId, 'fill-opacity', 0.5);
            map.getCanvas().style.cursor = "pointer";
        };

        const handleMouseLeave = () => {
            map.setPaintProperty(fillId, 'fill-opacity', 0.15);
            map.getCanvas().style.cursor = "";
        };


        map.on("click", fillId, handleClick);
        map.on("mouseenter", fillId, handleMouseEnter);
        map.on("mouseleave", fillId, handleMouseLeave);

        return () => {


            map.off("click", fillId, handleClick);
            map.off("mouseenter", fillId, handleMouseEnter);
            map.off("mouseleave", fillId, handleMouseLeave);

            try {
                if (map.getLayer(borderLayerId)) map.removeLayer(borderLayerId);
                if (map.getLayer(fillId)) map.removeLayer(fillId);
                if (map.getSource(sourceId)) map.removeSource(sourceId);
            } catch {
                // ignore cleanup errors
            }
        };
    }, [map, isLoaded, sourceId, borderLayerId, zip, addLayers, fillId]);

    //     center: [zip?.features[0]?.properties?.lon, zip?.features[0]?.properties?.lat],

    return (
        <>
            {open && (
                <MapPopup
                    className=""
                    longitude={zip?.features[0]?.properties?.lon}
                    latitude={zip?.features[0]?.properties?.lat}
                    onClose={() => setOpen(false)}
                    closeOnClick={false}
                    focusAfterOpen={false}
                    offset={10}
                    closeButton
                >
                    <div className=" min-w-35 h-20">

                        <p className="font-medium">{zip?.features[0]?.properties?.postcode}</p>
                        <p className="text-sm text-muted-foreground">
                            {zip?.features[0]?.properties?.address_line2}
                        </p>
                    </div>
                    <ScrollArea className="bg-background/90  z-10 rounded-md w-150 h-50 border px-3 py-2 text-sm font-medium backdrop-blur">
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
                            {JSON.stringify(zip, null, 4)}
                        </pre>
                    </ScrollArea>
                </MapPopup>)}
        </>
    );
}

