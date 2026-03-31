import { create } from 'zustand'

const LOCATIONS_KEY = 'selected_locations'

type State = {
    randomSelectedLocations: unknown[]
    numLocations: number
}

type Actions = {
    setRandomSelectedLocations: (rand: unknown[]) => void
    setNumLocations: (num: number) => void
    clear: () => void
}

export const useGeoStore = create<State & Actions>((set) => ({
    randomSelectedLocations: JSON.parse(typeof window !== 'undefined' && sessionStorage.getItem(LOCATIONS_KEY) || "[]"),
    numLocations: 5,
    setRandomSelectedLocations: (rand: unknown[]) => {
        sessionStorage.setItem(LOCATIONS_KEY, JSON.stringify(rand))
        set(() => ({ randomSelectedLocations: rand }))
    },
    setNumLocations: (num: number) => {
        set(() => ({ numLocations: num }))
    },
    clear() {
        sessionStorage.removeItem(LOCATIONS_KEY)
        set({ randomSelectedLocations: [] })
    },
}))