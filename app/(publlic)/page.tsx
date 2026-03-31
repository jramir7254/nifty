'use client'
import Image from "next/image";
import { authClient } from '@/lib/auth/client';
import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { Globe } from "@/components/ui/globe";

export default function Home() {

    return (
        <ScrollArea className="flex flex-col h-screen min-h-screen bg-background">

            <div className="bg-background relative flex size-full h-screen items-center justify-center overflow-hidden  px-40 pt-8 pb-40 md:pb-60">
                <h1
                    className="
                        pointer-events-none bg-linear-to-b from-black to-gray-300/80 
                        bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap 
                        text-transparent dark:from-white dark:to-slate-900/10
                    "
                >
                    Nifty
                </h1>
                {/* <Globe className="top-28" /> */}
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            </div>
            <footer>

            </footer>
        </ScrollArea>
    );
}
