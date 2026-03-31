'use client';

import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { cn } from '@/lib/utils';

interface EarthProps {
    className?: string;
    theta?: number;
    dark?: number;
    scale?: number;
    diffuse?: number;
    mapSamples?: number;
    mapBrightness?: number;
    baseColor?: [number, number, number];
    markerColor?: [number, number, number];
    glowColor?: [number, number, number];
}

const Earth: React.FC<EarthProps> = ({
    className,
    theta = 0.25,
    dark = 1,
    scale = 1.1,
    diffuse = 1.2,
    mapSamples = 40000,
    mapBrightness = 6,
    baseColor = [0.4, 0.6509, 1],
    markerColor = [1, 0, 0],
    glowColor = [0.2745, 0.5765, 0.898],
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        let phi = 0;
        let width = 0;

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth || 0;
            }
        };

        onResize();
        window.addEventListener('resize', onResize);

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta,
            dark,
            scale,
            diffuse,
            mapSamples,
            mapBrightness,
            baseColor,
            markerColor,
            glowColor,
            opacity: 1,
            offset: [0, 0],
            markers: [],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.003;

                // keep COBE buffer synced with actual element size
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        return () => {
            window.removeEventListener('resize', onResize);
            globe.destroy();
        };
    }, [
        theta,
        dark,
        scale,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
    ]);

    return (
        <div
            className={cn(
                'mx-auto w-full max-w-[350px] aspect-square flex items-center justify-center',
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="block h-full w-full"
            />
        </div>
    );
};

export default Earth;