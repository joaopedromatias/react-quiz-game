import Button from '../shared/Button';
import styled from 'styled-components';
import { useContext } from 'react';
import { ReducerContext } from '../../ReducerProvider';

export const LoadingWarning = () => {
  const { dispatch } = useContext(ReducerContext);

  return (
    <Wrapper>
      <div>
        <span>Check your internet connection and try again</span>
        <Button
          disabled={false}
          btnType='button'
          style={{ marginTop: '12px' }}
          onClick={() => {
            dispatch({ type: 'RESET_SCREEN' });
          }}
        >
          Try Again
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  transform: translateY(300px);
  margin: 0 40px;
  font-size: 1.1rem;
`;
