import { StateInterface } from "./types"

export const initialState: StateInterface = {
    isPlaying: false,
    isSetting: true, 
    isLoading: false,
    submitButtonDisabled: false,    
    isResultsPage: false,
    questions: '10',
    category: 'Any',
    difficulty: 'Any',
    modal: { 
        isModalOpen: false,
        modalMessage: ""
    }
 }