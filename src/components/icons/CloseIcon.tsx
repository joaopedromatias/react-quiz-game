import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from '@react-spring/web';
import { ReducerContext } from '../../ReducerProvider';

interface Props {
  timeout?: number;
}

export const CloseIcon: React.FC<Props> = ({ timeout }): JSX.Element => {
  const { dispatch } = useContext(ReducerContext);
  const [length, setLenght] = useState<number>(0);
  const animatedPath = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    setLenght(animatedPath?.current ? animatedPath.current.getTotalLength() : 0);
  });

  const animationProps = useSpring({
    config: {
      duration: timeout,
    },
    to: {
      strokeDashoffset: length,
    },
    from: {
      strokeDashoffset: 0,
    },
  });

  return (
    <CloseIconWrapper>
      <svg
        onClick={() => {
          dispatch({ type: 'HIDE_MODAL' });
        }}
        xmlns='http://www.w3.org/2000/svg'
        width='22'
        height='22'
        fill='var(--black)'
        viewBox='0 0 256 256'
      >
        <rect width='256' height='256' fill='none'></rect>
        <line
          x1='160'
          y1='96'
          x2='96'
          y2='160'
          fill='none'
          stroke='var(--white)'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='16'
        ></line>
        <line
          x1='160'
          y1='160'
          x2='96'
          y2='96'
          fill='none'
          stroke='var(--white)'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='16'
        ></line>
        <animated.path
          className='path'
          ref={animatedPath}
          style={animationProps}
          d='
            M 128, 32
            a 96, 96 0 0, 0 0, 192
            a 96, 96 0 0, 0 0, -192
            '
          fill='none'
          stroke='var(--white)'
          strokeWidth='16px'
          strokeDasharray={length}
        />
      </svg>
    </CloseIconWrapper>
  );
};

const CloseIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0px;
  left: 0px;
  .path {
    rotate: (90deg);
  }
`;
