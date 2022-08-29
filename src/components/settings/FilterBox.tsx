import React, { FormEvent, useContext } from 'react'
import Button from '../shared/Button';
import { Filter } from './Filter'
import { ReducerContext } from '../../ReducerProvider';
import { QuizCategoryEnum } from '../../utils/Enums';
import styled from 'styled-components';
import { LoadingIcon } from '../icons/LoadingIcon'

interface WrapperProps { 
  isLoading: boolean
}

const lastQuizCategoryIndex = 32;
let categoryOptions: string[] = [];

for (let i = 9; i < lastQuizCategoryIndex; i++) { 
  categoryOptions.push(QuizCategoryEnum[i]);
}

categoryOptions.sort();
categoryOptions.unshift('any');

const difficultyOptions: string[] = ['any', 'easy', 'medium', 'hard'];

export const FilterBox: React.FC = (): JSX.Element => {
  
  const { state, dispatch } = useContext(ReducerContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch({type: 'REMOVE_LOADING_WARNING'})
    if(!state.submitButtonDisabled) { 
      dispatch({ type: 'SET_LOADING' });
    } else { 
      dispatch({type: 'SHOW_MODAL', payload: { modalMessage: 'Must select more than 0 questions'} });
    }
  }

    return <>
      <Wrapper isLoading={state.isLoading}>
          <form onSubmit={handleSubmit}>
              <Filter name="questions" type='number'/>
              <hr/>
              <Filter name="category" options={categoryOptions} type='text'/>
              <hr/>
              <Filter name="difficulty" options={difficultyOptions} type='text'/>
              <hr/>
              <div className='btn-space'>
                <Button disabled={state.submitButtonDisabled} btnType="submit">Start</Button>
              </div>
          </form>
      </Wrapper>
      {state.isLoading?<LoadingIcon/>:<></>}
      </>
}

const Wrapper = styled.div<WrapperProps>`
opacity: ${({isLoading}) => isLoading?0:1};
.btn-space { 
  padding: 30px;
  @media (max-width: 600px) {
    padding: 20px;
  }
}
hr { 
  margin: 0;
} 
`