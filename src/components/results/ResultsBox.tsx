import { useContext } from 'react';
import { ReducerContext } from '../../ReducerProvider';
import { ResultItem } from './ResultItem';
import styled from 'styled-components';
import { useCalculateScore } from '../../services/useCalculateScore';
import { Storage } from '../../services/StorageService';
import { useSpring, animated } from '@react-spring/web';
import { useIsMobile } from '../../utils/useIsMobile';

interface WrapperProps {
  isMobile: boolean;
}

const ResultsBox = () => {
  const { state } = useContext(ReducerContext);
  const { score, newHighestScore, percentRight } = useCalculateScore();
  const isMobile = useIsMobile();

  const animation = useSpring({
    delay: 250,
    config: {
      mass: 1.0,
      tension: 170,
      friction: 26,
    },
    to: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    from: {
      opacity: 0,
      transform: 'translateY(-50px)',
    },
  });

  return state.gameData ? (
    <Wrapper isMobile={isMobile}>
      {isMobile ? (
        <div id='results'>
          <strong>Results</strong>
        </div>
      ) : (
        <h2>Results</h2>
      )}
      <div className='score-data'>
        <animated.div id='score' style={animation}>
          <strong>
            Score: {percentRight}% ({score}/{state.questions})
          </strong>
        </animated.div>
        {newHighestScore ? (
          <animated.div id='highest-score' style={animation}>
            <strong>New highest score!</strong>
          </animated.div>
        ) : (
          <animated.div id='not-highest-score' style={animation}>
            <strong>Highest score: {Storage.getItem('highest-score') || 0}%</strong>
          </animated.div>
        )}
      </div>
      {state.gameData.map((item, i) => {
        return <ResultItem {...item} index={i} key={i} />;
      })}
    </Wrapper>
  ) : (
    <h3>something went wrong</h3>
  );
};

const Wrapper = styled.div<WrapperProps>`
  max-height: 64vh;
  .score-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 15px;
    margin-bottom: 10px;
    font-size: 1.25rem;
    letter-spacing: 1.5px;
  }
  #results {
    margin: 10px;
    font-size: 1.15rem;
  }
  #score {
    margin: 5px;
  }
  #highest-score {
    margin: 5px;
    color: ${({ theme }) => (theme.name === 'light' ? 'var(--highest-score-light)' : 'var(--highest-score-dark)')};
  }
  #not-highest-score {
    margin: 5px;
  }

  @media (max-width: 600px) {
    .score-data {
      font-size: 1rem;
    }
  }

  @media (max-width: 360px) {
    .score-data {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 331px) {
    .score-data {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 319px) {
    .score-data {
      font-size: 0.8rem;
    }
  }
`;

export default ResultsBox;
