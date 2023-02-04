import { useContext } from 'react';
import { ReducerContext } from '../ReducerProvider';
import { useFetchToken } from './useFetchToken';
import { APIResponses } from '../utils/Enums';
import CookieService from './CookieService';
import { QuizCategoryEnum } from '../utils/Enums';

interface Results {
  category: string;
  correct_answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  incorrect_answers: string[];
  question: string;
  types: string;
}

interface DataResponse {
  response_code: APIResponses;
  results: Array<Results>;
}

export const useFetchQuestions = async (questions: string) => {
  const { state, dispatch } = useContext(ReducerContext);

  const quizCategoryQueryString: string =
    state.category !== 'Any' ? `&category=${QuizCategoryEnum[state.category as keyof typeof QuizCategoryEnum]}` : '';

  const quizDifficultyQueryString: string = state.difficulty !== 'Any' ? `&difficulty=${state.difficulty}` : '';

  const htmlDecodeSring = (text: string): string => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent as string;
  };

  const htmlDecodeArray = (arrayText: string[]): Array<string> => {
    return arrayText.map((arrayItem) => {
      const doc = new DOMParser().parseFromString(arrayItem, 'text/html');
      return doc.documentElement.textContent as string;
    });
  };

  const treatResponse = (data: DataResponse) => {
    const { results } = data;
    const phases: Array<GameData> = [];
    results.forEach((result: Results) => {
      const question = htmlDecodeSring(result.question);
      const incorrectAnswers = htmlDecodeArray(result.incorrect_answers);
      const correctAnswer = htmlDecodeSring(result.correct_answer);
      const answers = [...incorrectAnswers, correctAnswer];
      const difficulty = result.difficulty;
      answers.sort();
      const corectIndex = answers.findIndex((answer) => answer === correctAnswer);
      const phase = {
        question: question,
        answers: answers,
        correctIndex: corectIndex,
        difficulty: difficulty,
      };
      phases.push(phase);
    });
    if (!state.loadingWarning) {
      dispatch({ type: 'SET_IS_PLAYING', payload: { gameData: phases } });
    }
  };

  const fetchQuestionsTokenized = async (token: string) => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${questions}&type=multiple&token=${token}${quizCategoryQueryString}${quizDifficultyQueryString}`
    );
    const data = await res.json();

    if (data.response_code === APIResponses.TOKEN_NOT_FOUND || data.response_code === APIResponses.TOKEN_EMPTY) {
      CookieService.delete('api_token');
      fetchQuestionsNotTokenized();
    } else if (data.response_code === APIResponses.SUCCESS) {
      treatResponse(data);
      return true;
    }
  };

  const fetchQuestionsNotTokenized = async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${questions}&type=multiple${quizCategoryQueryString}${quizDifficultyQueryString}`
    );
    const data = await res.json();
    if (data.response_code === APIResponses.SUCCESS) {
      treatResponse(data);
      return true;
    }
  };

  const timeout = setTimeout(() => {
    dispatch({ type: 'SHOW_LOADING_WARNING' });
  }, 15000);

  const apiToken = await useFetchToken();
  const loaded = await (apiToken ? fetchQuestionsTokenized(apiToken) : fetchQuestionsNotTokenized());

  if (loaded === true) {
    clearTimeout(timeout);
  }
};
