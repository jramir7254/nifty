'use client'

import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import React, { useState, useEffect, useRef } from "react";

const center = { lng: -157.9253, lat: 21.4732 };
const zoom = 20;
maptilersdk.config.apiKey = "WoHVoOaowll2UAl1a0g4";
import { useTheme } from "@/context/theme-provider";
import { useGeoStore } from "../_lib/geo_store";





const sourceId = "randomLocations";


export default function Globe() {
    const { theme } = useTheme()
    const randomLocations = useGeoStore((state) => state.randomSelectedLocations)

    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maptilersdk.Map>(null);
    // const gc = new GeocodingControl();


    useEffect(() => {
        if (map.current) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.DATAVIZ.DARK,
            center: [center.lng, center.lat],
            zoom: 1,
            minZoom: 2,
            hash: false,
            projection: "globe"
        });

        if (randomLocations.length) {
            map.current.on("load", () => {
                // If source exists, update data
                if (map.current.getSource(sourceId)) {
                    map.current.getSource(sourceId).setData({
                        type: "FeatureCollection",
                        features: randomLocations
                    });
                    console.log("Source data updated");
                } else {
                    console.warn(`Source ${sourceId} not found, creating new source.`);


                    // If source doesn't exist, add it
                    map.current.addSource(sourceId, {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: randomLocations
                        }
                    });
                    map.current.addLayer({
                        id: sourceId,
                        type: "circle",
                        source: sourceId,
                        paint: {
                            "circle-color": "#4264fb",
                            "circle-radius": 5,
                            "circle-stroke-width": 1,
                            "circle-stroke-color": "#ffffff"
                        }
                    });
                }
            });
        }

        // map.current.addControl(gc);

    }, []);


    useEffect(() => {

        map && map.current && map?.current.setStyle(maptilersdk.MapStyle.DATAVIZ[theme.toUpperCase()])


    }, [theme]);


    useEffect(() => {
        const circleSource = "randomLocations";
        const lineSource = "connections";
        if (!map.current) return;
        if (!map.current.isStyleLoaded()) {
            console.warn("Map style not loaded yet.");
            return;
        }
        if (randomLocations.length > 0) {
            // If source exists, update data
            if (map.current.getSource(sourceId)) {
                map.current.getSource(sourceId).setData({
                    type: "FeatureCollection",
                    features: randomLocations
                });
                console.log("Source data updated");
            } else {
                console.warn(`Source ${sourceId} not found, creating new source.`);


                // If source doesn't exist, add it
                map.current.addSource(sourceId, {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: randomLocations
                    }
                });
                map.current.addLayer({
                    id: sourceId,
                    type: "circle",
                    source: sourceId,
                    paint: {
                        "circle-color": "#4264fb",
                        "circle-radius": 5,
                        "circle-stroke-width": 1,
                        "circle-stroke-color": "#ffffff"
                    }
                });
            }
        } else {
            if (map.current && map.current.getSource(sourceId)) {
                map?.current?.getSource(sourceId)

                console.log("Source data updated");
                map.current.removeLayer(sourceId)
            }
        }
    }
        , [randomLocations]);


    return (
        <>
            <div ref={mapContainer} id="map" className="size-full" />
        </>
    )
}
