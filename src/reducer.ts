import { StateInterface, ActionInterface, GameData } from './utils/types';
import { LogEvent } from './services/LogEvent';

export const reducer = (state: StateInterface, action: ActionInterface): StateInterface => {
  const copyState: StateInterface = { ...state };
  const gameData: Array<GameData> | null = copyState.gameData ? copyState.gameData : null;
  let currentStepGameData: GameData;
  let newData;
  let joinData;

  switch (action.type) {
    case 'UPDATE_BUTTON_STATE':
      return { ...state, submitButtonDisabled: action.payload?.disabled || false };

    case 'UPDATE_QUIZ_CONFIG':
      if (action.payload && action.payload.name && action.payload.newValue) {
        const newState: StateInterface = { ...state, [action.payload.name]: action.payload.newValue };
        return newState;
      }
      break;

    case 'RESET_SCREEN':
      window.location.pathname = '/';
      break;

    case 'SET_LOADING':
      return { ...state, isLoading: true, isSetting: false };

    case 'SHOW_MODAL':
      if (action.payload?.modalMessage) {
        const newState = {
          ...state,
          modal: { isModalOpen: true, modalMessage: action.payload.modalMessage },
        };
        return newState;
      }
      break;

    case 'HIDE_MODAL':
      return { ...state, modal: { isModalOpen: false, modalMessage: '' } };

    case 'SET_IS_PLAYING':
      if (action.payload?.gameData) {
        const newState = {
          ...state,
          isLoading: false,
          isPlaying: true,
          gameData: action.payload.gameData,
          submitButtonDisabled: true,
        };
        return newState;
      }
      break;

    case 'SET_RESULTS_BOX':
      return { ...state, isResultsPage: true, isPlaying: false };

    case 'COMPUTE_STEP_RESULT_DATA':
      if (action.payload && gameData && typeof action.payload.currentStep === 'number') {
        currentStepGameData = { ...gameData[action.payload.currentStep] };

        newData = {
          answerGiven: action.payload.answerGiven,
          status: action.payload.isAnswerCorrect,
        };

        joinData = { ...currentStepGameData, ...newData };

        gameData[action.payload.currentStep] = joinData;

        return { ...state, gameData: gameData };
      }

      break;

    case 'SHOW_LOADING_WARNING':
      LogEvent.send('loading', 'view', 'loading-warning', 1);
      return { ...state, loadingWarning: true };

    case 'REMOVE_LOADING_WARNING':
      return { ...state, loadingWarning: false };
  }

  return state;
};
