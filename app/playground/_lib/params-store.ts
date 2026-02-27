import { create } from 'zustand'

const PARAMS_KEY = 'assignment_parameters'

type State = {
    courseLevel: string,
    programmingLanguage: string
    topic: string
    additionalContext: string,
    includeStarterCode: boolean,
    generatedAssignemnt: unknown[]
}

const initialState = {
    courseLevel: "",
    programmingLanguage: "",
    topic: "",
    additionalContext: "",
    includeStarterCode: false,
    generatedAssignemnt: []
}

type Actions = {
    setParameter: (param: keyof State, value: unknown) => void
    clear: () => void
}

export const useParamsStore = create<State & Actions>((set) => ({
    ...initialState,
    setParameter: (param: keyof State, value: unknown) => {
        // sessionStorage.setItem(LOCATIONS_KEY, JSON.stringify(rand))
        set({ [param]: value })
    },
    clear() {
        sessionStorage.removeItem(PARAMS_KEY)
        set(initialState)
    },
}))