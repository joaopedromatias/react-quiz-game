import React, { useRef, useContext } from 'react';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { ModalWarning } from './ModalWarning';
import { ReducerContext } from '../../ReducerProvider';

interface ButtonProps {
  children: React.ReactNode;
  disabled: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  btnType: 'submit' | 'button';
  ref?: React.RefObject<HTMLButtonElement>;
  style?: object;
}

interface ButtonWrapperProps {
  children: React.ReactNode;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, onClick, btnType, style }): JSX.Element => {
  const { state } = useContext(ReducerContext);
  const buttonNode = useRef<HTMLButtonElement>(null);
  return (
    <ButtonWrapper disabled={disabled}>
      <button style={style} ref={buttonNode} type={btnType} onClick={onClick}>
        {children}
      </button>
      {state.modal.isModalOpen ? (
        <ModalWarning associatedButton={buttonNode?.current}>{state.modal.modalMessage}</ModalWarning>
      ) : (
        <></>
      )}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  button {
    text-transform: capitalize;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    border: none;
    border-color: transparent;
    padding: 0.6rem 2.6rem;
    border-radius: 0.4rem;
    transition: 0.2s linear all;
    margin: 2px;
    letter-spacing: 1px;
    color: ${({ disabled }) => (disabled ? `var(--btn-text-disabled)` : `var(--white)`)};
    background: ${({ disabled }) => (disabled ? `var(--btn-bg-disabled)` : `var(--btn-bg)`)};
    cursor: ${({ disabled }) => (disabled ? `not-allowed` : `pointer`)};
    &:hover {
      background: ${({ disabled }) => (disabled ? `` : `var(--btn-bg-hover)`)};
      color: ${({ disabled }) => (disabled ? `` : `var(--btn-text-hover)`)};
    }
    @media (max-width: 600px) {
      padding: 0.6rem 2.2rem;
    }
  }
`;

export default Button;
