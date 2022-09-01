import { useContext } from 'react';
import { ReducerContext } from '../ReducerProvider';
import { Storage } from './StorageService';

interface calculateScoreReturn {
  score: number;
  newHighestScore: boolean;
  percentRight: number;
}

export const useCalculateScore = (): calculateScoreReturn => {
  const { state } = useContext(ReducerContext);
  let score = 0;
  let newHighestScore: boolean;

  state.gameData?.forEach((game) => {
    if (game.status === true) {
      score++;
    }
  });

  const percentRight = Number(((score / Number(state.questions)) * 100).toFixed(1));

  const lastHighestScore = Number(Storage.getItem('highest-score') || 0);

  if (percentRight > lastHighestScore) {
    newHighestScore = true;
    Storage.setItem('highest-score', String(percentRight));
  } else {
    newHighestScore = false;
  }

  return { score, newHighestScore, percentRight };
};
