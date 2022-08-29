import React, { useContext, useEffect, useState } from "react"
import { Answer } from "./Answer"
import { Question } from "./Question"
import Button from "../shared/Button"
import { ReducerContext } from "../../ReducerProvider"
import styled from "styled-components"
import { LogEvent } from "../../services/LogEvent"

export const GameBox: React.FC = (): JSX.Element => {

  const initialCheckValue = Array.apply(null, Array(4)).map(x => false);

  const {state, dispatch} = useContext(ReducerContext);
  const [step, setStep] = useState<number>(0);
  const [check, setCheck] = useState<boolean[]>(initialCheckValue);

  useEffect(() => { 
    dispatch({type: 'UPDATE_BUTTON_STATE', payload: { disabled: true }})
  }, [step])

  const handleChoose = (index: number) => { 
    dispatch({type: 'UPDATE_BUTTON_STATE', payload: { disabled: false }})
    dispatch({type: 'HIDE_MODAL'});
    let newCheck = Array.apply(null, Array(4)).map(function () {})
    setCheck(newCheck.map((item, i) => { 
      return i===index?true:false;
    }))
  }

  const showNextStep = () => { 
    setStep(step+1);
    LogEvent.send('game', 'button', 'answer-enabled', 0);
  }

  const showResultsBox = () => { 
    LogEvent.send('game', 'button', 'answer-enabled', 0);
    LogEvent.send('results', 'view', 'results-screen', 1);
    dispatch({type: 'SET_RESULTS_BOX'});
  }

  const handleAnswer = () => { 
    if (!state.submitButtonDisabled) {
      let chosenOption = check.indexOf(true);
      let questionCorrectAnswerIndex = state.gameData![step].correctIndex;
      let isAnswerCorrect = chosenOption===questionCorrectAnswerIndex;
      dispatch({type: 'COMPUTE_STEP_RESULT_DATA', payload: {isAnswerCorrect: isAnswerCorrect, answerGiven: state.gameData![step].answers[chosenOption], currentStep: step }});
      setCheck(initialCheckValue);
      step+1<state.gameData!.length ?
      showNextStep()
      :
      showResultsBox();
    } else { 
      LogEvent.send('game', 'button', 'answer-disabled', 0);
      dispatch({type: 'SHOW_MODAL', payload: { modalMessage: 'You need to choose an answer'} });
    }
  }

    return <> 
      <Wrapper>
        <form action="">
          <h3>{step+1} / {state.questions}</h3>
          <hr />
          <Question question={state.gameData![step].question}/>
          <hr/>
          <Answer answer={state.gameData![step].answers[0]} onClick={() => handleChoose(0)} checked={check[0]}/>
          <hr/>
          <Answer answer={state.gameData![step].answers[1]} onClick={() => handleChoose(1)} checked={check[1]}/>
          <hr/>
          <Answer answer={state.gameData![step].answers[2]} onClick={() => handleChoose(2)} checked={check[2]}/>
          <hr/>        
          <Answer answer={state.gameData![step].answers[3]} onClick={() => handleChoose(3)} checked={check[3]}/>      
          <hr />
          <div className="btn-space">
            <Button disabled={state.submitButtonDisabled} btnType="button" onClick={handleAnswer}>Answer</Button>
          </div>
        </form>
      </Wrapper>
    </>    
}

const Wrapper = styled.div`
.btn-space { 
  padding: 30px;
}
hr { 
  margin: 0;
} 
.answer { 
  cursor: pointer;
}
`