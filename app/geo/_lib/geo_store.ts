import { create } from 'zustand'

const LOCATIONS_KEY = 'selected_locations'

type State = {
    randomSelectedLocations: unknown[]
}

type Actions = {
    setRandomSelectedLocations: (rand: unknown[]) => void
    clear: () => void
}

export const useGeoStore = create<State & Actions>((set) => ({
    randomSelectedLocations: JSON.parse(sessionStorage.getItem(LOCATIONS_KEY) || "[]"),
    setRandomSelectedLocations: (rand: unknown[]) => {
        sessionStorage.setItem(LOCATIONS_KEY, JSON.stringify(rand))
        set(() => ({ randomSelectedLocations: rand }))
    },
    clear() {
        sessionStorage.removeItem(LOCATIONS_KEY)
        set({ randomSelectedLocations: [] })
    },
}))