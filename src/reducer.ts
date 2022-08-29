import { StateInterface, ActionInterface } from "./utils/types";

export const reducer = (state: StateInterface, action: ActionInterface): StateInterface => {
    
    const { payload } = action;
    let copyState = {...state};

    switch (action.type) { 
        
        case ('UPDATE_BUTTON_STATE'):
            let newState: StateInterface = {...state, submitButtonDisabled: action?.payload?.disabled || false }
            return newState;      
        
        case ('UPDATE_QUIZ_CONFIG'): 
            if (payload?.name && payload?.newValue) { 
                let newState: StateInterface = {...state, [payload.name]: payload.newValue}
                return newState         
            }
            break

        case('RESET_SCREEN'): 
            window.location.pathname = "/"
        break
                  
        case ('SET_LOADING'): 
            return {...state, isLoading: true, isSetting: false}

        case ('SHOW_MODAL'):
            if (action?.payload?.modalMessage) { 
                let newState = {...state, modal: { isModalOpen: true, modalMessage: action.payload.modalMessage }};
                return newState
            }
            break 

        case ('HIDE_MODAL'):
            let newModalState = {...state, modal: { isModalOpen: false, modalMessage: '' }};
            return newModalState
         
        case ('SET_IS_PLAYING'): 
            if(action.payload?.gameData) { 
                let newState = {...state, isLoading: false, isPlaying: true, gameData: action.payload.gameData, submitButtonDisabled: true}
                return newState
            }
            break

        case('SET_RESULTS_BOX'): 
            return {...state, isResultsPage: true, isPlaying: false}

        case('COMPUTE_STEP_RESULT_DATA'):
            let gameData = copyState.gameData!

            let currentStepGameData = {...gameData[action.payload?.currentStep!]}
            let newData = { 
                answerGiven: action.payload?.answerGiven,
                status: action.payload?.isAnswerCorrect
            }
            
            let joinData = {...currentStepGameData, ...newData}

            gameData[action.payload?.currentStep!] = joinData;

            return {...state, gameData: gameData}

            case('SHOW_LOADING_WARNING'):
                return {...state, loadingWarning: true}

            case('REMOVE_LOADING_WARNING'):
                return {...state, loadingWarning: false}
        }

        return state
}