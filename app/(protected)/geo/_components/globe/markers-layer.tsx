"use client";

import { useEffect, useState, useId, useRef, useCallback } from "react";
import { MapPopup, useMap } from "@/components/mapcn/tiler";
import { useGeoStore } from "../../_lib/geo_store";



interface SelectedPoint {
    id: number;
    address: string
    name: string;
    category: string;
    coordinates: [number, number];
}

import type {
    Feature,
    FeatureCollection,
    GeoJsonProperties,
    Point,
} from 'geojson';
import { Toggle } from "@/components/shadcn/toggle";
import { BookmarkIcon } from "lucide-react";


type RandomLocationFeature = Feature<Point, GeoJsonProperties>;
type RandomLocations = RandomLocationFeature[];


export function MarkersLayer() {
    const { map, isLoaded } = useMap();
    const randomLocations = useGeoStore((state) => state.randomSelectedLocations as RandomLocations);

    const id = useId();
    const sourceId = `markers-source-${id}`;
    const layerId = `markers-layer-${id}`;
    const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(
        null
    );

    const latestRandomLocationsRef = useRef<RandomLocations>(randomLocations);

    useEffect(() => {
        latestRandomLocationsRef.current = randomLocations;
    }, [randomLocations]);



    const addLayers = useCallback(() => {
        if (!map) return;
        // Add source if it doesn't exist
        if (!map.getSource(sourceId)) {
            map.addSource(sourceId, {
                type: "geojson",
                data: {
                    type: 'FeatureCollection',
                    features: randomLocations
                },
            });
        }

        // Add fill layer if it doesn't exist
        if (!map.getLayer(layerId)) {
            map.addLayer({
                id: layerId,
                type: "circle",
                source: sourceId,
                paint: {
                    "circle-radius": 6,
                    "circle-color": "#3b82f6",
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#ffffff",
                    // add more paint properties here to customize the appearance of the markers
                },
            });
        }


    }, [map, sourceId, layerId, randomLocations]);


    useEffect(() => {
        if (!map || !isLoaded) return;

        addLayers()

        const handleClick = (
            e: maplibregl.MapMouseEvent & {
                features?: maplibregl.MapGeoJSONFeature[];
            }
        ) => {
            if (!e.features?.length) return;

            const feature = e.features[0];
            const coords = (feature.geometry as GeoJSON.Point).coordinates as [
                number,
                number
            ];

            setSelectedPoint({
                id: feature.properties?.id,
                address: feature.properties?.address_line2,
                name: feature.properties?.name,
                category: feature.properties?.category,
                coordinates: coords,
            });
        };

        const handleMouseEnter = () => {
            map.getCanvas().style.cursor = "pointer";
        };

        const handleMouseLeave = () => {
            map.getCanvas().style.cursor = "";
        };

        map.on("click", layerId, handleClick);
        map.on("mouseenter", layerId, handleMouseEnter);
        map.on("mouseleave", layerId, handleMouseLeave);

        return () => {
            map.off("click", layerId, handleClick);
            map.off("mouseenter", layerId, handleMouseEnter);
            map.off("mouseleave", layerId, handleMouseLeave);

            try {
                if (map.getLayer(layerId)) map.removeLayer(layerId);
                if (map.getSource(sourceId)) map.removeSource(sourceId);
            } catch {
                // ignore cleanup errors
            }
        };
    }, [map, isLoaded, sourceId, layerId, randomLocations, addLayers]);

    return (
        <>
            {selectedPoint && (
                <MapPopup
                    className=""
                    longitude={selectedPoint.coordinates[0]}
                    latitude={selectedPoint.coordinates[1]}
                    onClose={() => setSelectedPoint(null)}
                    closeOnClick={false}
                    focusAfterOpen={false}
                    offset={10}
                    closeButton
                >
                    <div className=" min-w-35 h-20">
                        <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
                            <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
                            Bookmark
                        </Toggle>
                        <p className="font-medium">{selectedPoint.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {selectedPoint?.address}
                        </p>
                    </div>
                </MapPopup>
            )}
        </>
    );
}

