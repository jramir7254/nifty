import { create } from 'zustand'
import type {
    Feature,
    FeatureCollection,
    GeoJsonProperties,
    Point,
} from 'geojson';
const LOCATIONS_KEY = 'selected_locations'

type State = {
    selectedZip: FeatureCollection | null,
    randomSelectedLocations: unknown[]
    numLocations: number
}

type Actions = {
    setRandomSelectedLocations: (rand: unknown[]) => void
    setNumLocations: (num: number) => void
    setZip: (zip: FeatureCollection) => void
    clear: () => void
}

export const useGeoStore = create<State & Actions>((set) => ({
    selectedZip: null,
    randomSelectedLocations: JSON.parse(typeof window !== 'undefined' && sessionStorage.getItem(LOCATIONS_KEY) || "[]"),
    numLocations: 5,
    setRandomSelectedLocations: (rand: unknown[]) => {
        sessionStorage.setItem(LOCATIONS_KEY, JSON.stringify(rand))
        set(() => ({ randomSelectedLocations: rand }))
    },
    setNumLocations: (num: number) => {
        set(() => ({ numLocations: num }))
    },
    setZip: (zip: FeatureCollection) => {
        set(() => ({ selectedZip: zip }))
    },
    clear() {
        sessionStorage.removeItem(LOCATIONS_KEY)
        set({ randomSelectedLocations: [] })
    },
}))