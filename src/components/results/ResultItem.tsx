import styled from 'styled-components';
import { WrongIcon } from '../icons/WrongIcon';
import { RigthIcon } from '../icons/RightIcon';

interface Props extends GameData {
  index: number;
}

export const ResultItem: React.FC<Props> = ({ index, correctIndex, answerGiven, answers, status, question }: Props) => {
  return (
    <Wrapper>
      <hr />
      <div className='split-icon'>
        <div className='main-flex'>
          <div className='question-container'>
            <span className='question'>
              {index + 1}. {question}
            </span>
          </div>
          {status ? (
            <div className='inner-flex'>
              <div>{answerGiven} </div>
            </div>
          ) : (
            <div className='inner-flex'>
              <div>Your answer: {answerGiven} </div>
              <div>Right answer: {answers[correctIndex]} </div>
            </div>
          )}
        </div>
        <span className='hold-icon'>{status ? <RigthIcon /> : <WrongIcon />}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: left;
  .split-icon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    direction: row-reverse;
    margin: 12px;
    .hold-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 2px;
    }
    .main-flex {
      margin: 3px 10px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      gap: 5px;
      .question-container {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .question {
          font-weight: bold;
        }
      }
      .inner-flex {
        text-align: left;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        gap: 3px;
        div {
          padding: 4px 0px;
        }
      }
    }
  }
`;
