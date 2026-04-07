'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useGeoStore } from "./geo_store";
import { useSearch } from "@/hooks/use-search";

export function useZipCodeMutation() {
    const setZipGeometry = useGeoStore((state) => state.setZip)

    return useMutation({
        mutationFn: async (params: { zipcode: string | null, country: string | null }) => {
            const response = await fetch(`/api/geo/zipcode?zipcode=${params.zipcode}&country=${params.country}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
        onSuccess: (data) => {
            toast.success('Zip code found')
            setZipGeometry(data)

        },
        onError: () => {
            toast.error("An error occured");
        }
    });
}


export function useLocationsMutation() {
    const setRandom = useGeoStore((state) => state.setRandomSelectedLocations)
    const { currentSearch } = useSearch('zipcode')

    return useMutation({
        mutationFn: async (params: { zipcodeId: string | null }) => {
            const response = await fetch(`/api/geo/locations?zipcodeId=${params.zipcodeId}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
        onSuccess: (data) => {
            setRandom(data.features.filter(f => f?.properties?.postcode === currentSearch))

            toast.success('Locations found')
        },
        onError: () => {
            toast.error("An error occured");
        }
    });
}