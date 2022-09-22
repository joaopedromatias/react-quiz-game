import { useContext, useState } from 'react';
import styled from 'styled-components';
import { ReducerContext } from '../../ReducerProvider';
import { useIsMobile } from '../../utils/useIsMobile';

interface WrapperProps {
  isPlaying: boolean;
}

export const Footer = () => {
  const { state } = useContext(ReducerContext);

  const isMobile = useIsMobile();

  const iconsInitalColor = 'var(--icons-main-color)';

  const [twitterColor, setTwitterColor] = useState<string>(iconsInitalColor);
  const [facebookColor, setFacebookColor] = useState<string>(iconsInitalColor);

  return (
    <footer>
      <Wrapper isPlaying={state.isPlaying}>
        <div className='grid'>
          <div className='tdb'>
            <div>
              {isMobile ? 'Data by' : 'Game data provided by'}{' '}
              <a target='_blank' rel='noopener noreferrer' href='https://opentdb.com/'>
                Trivia Database
              </a>
            </div>{' '}
            <div>
              {isMobile ? 'CC BY-SA 4.0' : 'Creative Commons Attribution-ShareAlike 4.0 International'}{' '}
              <a target='_blank' rel='noopener noreferrer' href='https://creativecommons.org/licenses/by-sa/4.0/'>
                License
              </a>{' '}
            </div>
          </div>
          <div className='share-icons'>
            <a
              onMouseEnter={() => {
                setTwitterColor('#27A1D5');
              }}
              onMouseLeave={() => {
                setTwitterColor(iconsInitalColor);
              }}
              rel='noopener noreferrer'
              href='https://twitter.com/share?ref_src=twsrc%5Etfw'
              className='twitter-share-button'
              target='_blank'
              data-text='Just found this amazing quiz game!'
              data-url='https://quiz-play-it.netlify.app/'
              data-hashtags='quiz-play-it'
              data-show-count='false'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='#000000' viewBox='0 0 256 256'>
                <rect width='256' height='256' fill='none'></rect>
                <path
                  d='M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z'
                  fill='none'
                  stroke={twitterColor}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='16'
                ></path>
              </svg>
            </a>
            <div
              className='fb-share-button'
              data-href='https://quiz-play-it.netlify.app/'
              data-layout='button'
              data-size='small'
            >
              <a
                onMouseEnter={() => {
                  setFacebookColor('#1870E5');
                }}
                onMouseLeave={() => {
                  setFacebookColor(iconsInitalColor);
                }}
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fquiz-play-it.netlify.app%2F&amp;src=sdkpreparse'
                className='fb-xfbml-parse-ignore'
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='#000000' viewBox='0 0 256 256'>
                  <rect width='256' height='256' fill='none'></rect>
                  <circle
                    cx='128'
                    cy='128'
                    r='96'
                    fill='none'
                    stroke={facebookColor}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='16'
                  ></circle>
                  <path
                    d='M168,88H152a23.9,23.9,0,0,0-24,24V224'
                    fill='none'
                    stroke={facebookColor}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='16'
                  ></path>
                  <line
                    x1='96'
                    y1='144'
                    x2='160'
                    y2='144'
                    fill='none'
                    stroke={facebookColor}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='16'
                  ></line>
                </svg>
              </a>
            </div>
          </div>
          <div className='feedback'>
            Found an issue?
            <br />
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/joaopedromatias/react-quiz-game/issues'
            >
              Let me know!
            </a>
          </div>
        </div>
        <i>
          developed by{' '}
          <a target='_blank' rel='noopener noreferrer' href='https://github.com/joaopedromatias'>
            @joaopedromatias
          </a>
        </i>
      </Wrapper>
    </footer>
  );
};

const Wrapper = styled.div<WrapperProps>`
  font-size: 0.9rem;
  background-color: ${({ theme }) => (theme.name === 'light' ? 'var(--footer-bg-light)' : 'var(--footer-bg-dark)')};
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  width: 100vw;
  font-family: sans-serif;
  font-weight: 300;
  height: 100px;
  color: ${({ theme }) => (theme.name === 'light' ? 'var(--footer-color-light)' : 'var(--footer-color-dark)')};
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 33vw);
    padding-top: 10px;
    padding-bottom: 5px;
    height: 60px;
    .tdb {
      font-family: sans-serif;
      max-width: 300px;
      margin-left: 15px;
      text-align: left;
      div {
        margin-bottom: 5px;
        a {
          color: var(--link-color);
        }
      }
    }
    .share-icons {
      display: flex;
      justify-content: center;
      gap: 30px;
      align-items: center;
    }
    .feedback {
      width: 100%;
      text-align: right;
      margin: auto;
      a {
        color: var(--link-color);
      }
    }
  }
  i {
    font-weight: 500;
    letter-spacing: 1.5px;
    a {
      color: ${({ theme }) => (theme.name === 'light' ? 'var(--username-light)' : 'var(--username-dark)')};
      text-decoration: none;
    }
  }
  @media (max-width: 600px) {
    max-width: 100vw;
    font-size: 0.8rem;
    height: 120px;
    transform: none;
    .grid {
      height: 80px;
      .feedback {
        max-width: 100px;
      }
    }
    i {
      font-weight: 400;
      a {
      }
    }
  }
`;
