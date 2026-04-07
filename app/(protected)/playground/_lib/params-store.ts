import { create } from 'zustand'

const PARAMS_KEY = 'assignment_parameters'

type State = {
    courseLevel: string,
    programmingLanguage: string
    topic: string
    additionalContext: string,
    includeStarterCode: boolean,
    blooms: {
        remembering: number,
        understanding: number,
        applying: number,
        analyzing: number,
        evaluating: number,
        creating: number,
    },
    generatedAssignemnt: unknown[]
}

const initialState = {
    courseLevel: "",
    programmingLanguage: "",
    topic: "",
    additionalContext: "",
    includeStarterCode: false,
    blooms: {
        remembering: 50,
        understanding: 50,
        applying: 50,
        analyzing: 50,
        evaluating: 50,
        creating: 50,
    },
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