export const initialState: StateInterface = {
  isPlaying: false,
  isSetting: true,
  isLoading: false,
  submitButtonDisabled: false,
  loadingWarning: false,
  isResultsPage: false,
  questions: '10',
  category: 'Any',
  difficulty: 'Any',
  modal: {
    isModalOpen: false,
    modalMessage: '',
  },
};
