import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReducerContext } from '../../ReducerProvider';
import { useSpring, animated } from '@react-spring/web';
import { CloseIcon } from '../icons/CloseIcon';
import { useIsMobile } from '../../utils/useIsMobile';

interface Props {
  associatedButton: HTMLButtonElement | null;
  children: React.ReactNode;
}

interface WrapperProps {
  modalPosLeft: string;
  modalPosTop: string;
}

const timeout = 4500;

export const ModalWarning: React.FC<Props> = ({ associatedButton }): JSX.Element => {
  const { state, dispatch } = useContext(ReducerContext);
  const [buttonPosLeft, setButtonPosLeft] = useState<number>(0);
  const [buttonPosTop, setButtonPosTop] = useState<number>(0);
  const isMobile = useIsMobile();

  const modalPosLeft = (buttonPosLeft - 185).toString() + 'px';
  const modalPosTop = (buttonPosTop - 15).toString() + 'px';

  function hideModal() {
    dispatch({ type: 'HIDE_MODAL' });
  }

  useEffect(() => {
    setButtonPosLeft(associatedButton?.getBoundingClientRect().left || 0);
    setButtonPosTop(associatedButton?.getBoundingClientRect().top || 0);
    const modalTimeout = setTimeout(hideModal, timeout);
    return () => {
      clearTimeout(modalTimeout);
    };
  }, []);

  const modalAnimationProps = useSpring({
    config: {
      tension: 150,
      friction: 22,
    },
    to: {
      transform: 'translateY(0px)',
    },
    from: {
      transform: `${isMobile ? 'translateY(-1000px)' : 'translateY(1000px)'}`,
    },
  });

  if (!buttonPosLeft) {
    return <></>;
  }
  return (
    <>
      <Wrapper modalPosLeft={modalPosLeft} modalPosTop={modalPosTop}>
        <animated.div className='dialog-box' style={modalAnimationProps}>
          <p>{state.modal.modalMessage}</p>
          <CloseIcon timeout={timeout} />
        </animated.div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<WrapperProps>`
  .dialog-box {
    margin: 0;
    border-radius: 3px;
    text-transform: none;
    padding: 3px;
    line-height: 20px;
    width: 160px;
    height: 60px;
    position: absolute;
    left: ${({ modalPosLeft }) => modalPosLeft};
    top: ${({ modalPosTop }) => modalPosTop};
    background-color: var(--modal-bg);
    display: flex;
    color: var(--white);
    justify-content: center;
    align-items: center;
    border: 1px solid
      ${({ theme }) => (theme.name === 'light' ? 'var(--modal-border-light)' : 'var(--modal-border-dark)')};
  }
  p {
    max-width: 130px;
  }
  @media (max-width: 600px) {
    .dialog-box {
      position: fixed;
      top: 30px;
      left: calc(50vw - 80px);
    }
  }
`;
