import React, { useContext } from 'react';
import { useFetchQuestions } from '../../services/useFetchQuestions';
import { ReducerContext } from '../../ReducerProvider';
import styled from 'styled-components';
import { LoadingWarning } from '../settings/LoadingWarning';

export const LoadingIcon: React.FC = (): JSX.Element => {
  const { state } = useContext(ReducerContext);

  useFetchQuestions(state.questions);

  return (
    <Wrapper>
      {state.loadingWarning ? (
        <div className='loading-warning'>
          <LoadingWarning />
        </div>
      ) : (
        <div className='center'>
          <svg className='icon' xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 256 256'>
            <rect width='256' height='256' fill='none'></rect>
            <path
              d='M168,40.7a96,96,0,1,1-80,0'
              fill='none'
              className='spinner-path'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='18'
            ></path>
          </svg>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .center {
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    line-height: 100vh;
  }
  .icon {
    animation: rotate 1.1s linear infinite;
  }
  .spinner-path {
    stroke: ${({ theme }) => (theme.name === 'light' ? 'var(--black)' : 'var(--title-text)')};
  }
  .loading-warning {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
  }
`;
