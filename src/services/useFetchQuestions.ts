import { useContext } from "react";
import { ReducerContext } from "../ReducerProvider";
import { useFetchToken } from "./useFetchToken";
import { APIResponses } from '../utils/Enums'
import { GameData } from '../utils/types'
import CookieService from "./CookieService";
import { QuizCategoryEnum } from '../utils/Enums'

interface Results { 
    category: string
    correct_answer: string
    difficulty: 'easy' | 'medium' | 'hard'
    incorrect_answers: string[]
    question: string
    types: string
}

interface DataResponse { 
    response_code: APIResponses
    results: Array<Results>
}

export const useFetchQuestions = async (questions: string) => { 

    const { state, dispatch } = useContext(ReducerContext);

    const quizCategoryQueryString: string = state.category!=='Any'?`&category=${QuizCategoryEnum[state.category as keyof typeof QuizCategoryEnum]}`:'';

    const quizDifficultyQueryString: string = state.difficulty!=='Any'?`&difficulty=${state.difficulty}`:'';

    const htmlDecodeSring = (text: string): string => {
        var doc = new DOMParser().parseFromString(text, 'text/html');
        return doc.documentElement.textContent as string;
    }

    const htmlDecodeArray = (arrayText: string[]): Array<string> => {
        return arrayText.map(arrayItem => { 
            var doc = new DOMParser().parseFromString(arrayItem, 'text/html');
            return doc.documentElement.textContent as string;
        })
    }

    const treatResponse = (data: DataResponse) => { 
        const { results } = data;
        const phases: Array<GameData> = []
        results.forEach((result: Results) => { 
            let question = htmlDecodeSring(result.question);
            let incorrectAnswers = htmlDecodeArray(result.incorrect_answers);
            let correctAnswer = htmlDecodeSring(result.correct_answer)
            let answers = [...incorrectAnswers, correctAnswer];
            let difficulty = result.difficulty;
            answers.sort();
            let corectIndex = answers.findIndex(answer => answer === correctAnswer)
            let phase = {
                question: question,
                answers: answers,
                correctIndex: corectIndex,
                difficulty: difficulty
            }
            phases.push(phase)
        })
        if (!state.loadingWarning) { 
            dispatch({type: 'SET_IS_PLAYING', payload: {gameData: phases }})
        }
    }

    const fetchQuestionsTokenized = async (token: string) => {

        const res = await fetch(`https://opentdb.com/api.php?amount=${questions}&type=multiple&token=${token}${quizCategoryQueryString}${quizDifficultyQueryString}`);
        const data = await res.json();

        if (data.response_code===APIResponses.TOKEN_NOT_FOUND || data.response_code===APIResponses.TOKEN_EMPTY) { 
            CookieService.delete('api_token');
            fetchQuestionsNotTokenized();
        } else if (data.response_code === APIResponses.SUCCESS) {
            treatResponse(data)
            return true;
        }
    }

    const fetchQuestionsNotTokenized = async () => {
        const res = await fetch(`https://opentdb.com/api.php?amount=${questions}&type=multiple${quizCategoryQueryString}${quizDifficultyQueryString}`)
        const data = await res.json();
        if (data.response_code===APIResponses.SUCCESS) { 
            treatResponse(data)
            return true;
        }
    }

    const timeout = setTimeout(() => {     
        dispatch({type: 'SHOW_LOADING_WARNING'});
    }, 6000)

    let apiToken = await useFetchToken(); 
    const loaded = await (apiToken ? fetchQuestionsTokenized(apiToken) : fetchQuestionsNotTokenized());
    
    if (loaded === true) { 
        clearTimeout(timeout);
    }
}