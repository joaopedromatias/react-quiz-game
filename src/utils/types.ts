export interface GameData { 
    question: string,
    answers: string[],
    correctIndex: number
    answerGiven?: string
    status?: boolean 
    difficulty: 'easy' | 'medium' | 'hard'
}

export interface StateInterface {
    isPlaying: boolean
    isSetting: boolean
    isLoading: boolean
    isResultsPage: boolean
    submitButtonDisabled: boolean
    questions: string
    loadingWarning: boolean
    category: string
    difficulty: string
    modal: { 
        isModalOpen: boolean
        modalMessage: string
    }
    gameData?: GameData[]
}

export interface ActionInterface {
    type: string
    payload?: {
        disabled?: boolean
        name?: string
        newValue?: string | number
        modalMessage?: string
        gameData?: GameData[]
        isAnswerCorrect?: boolean
        answerGiven?: string
        currentStep?: number
    }
}
