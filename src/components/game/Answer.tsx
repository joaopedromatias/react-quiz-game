import React from 'react'
import styled from 'styled-components'

interface Props {
  answer: string
  onClick(): void
  checked: boolean
}

interface WrapperProps { 
  checked: boolean
}

export const Answer: React.FC<Props> = ( { answer, onClick, checked } ): JSX.Element => {
  return <div onClick={onClick}>
    <Wrapper checked={checked}>
      <div className='flex'>
      <label htmlFor={answer}>
          {answer}
        </label>
        <input type="radio" id={answer} name="answer"/>
      </div>
    </Wrapper>
    </div>
}

const Wrapper = styled.div<WrapperProps>`
cursor: pointer;
padding: 25px;
background-color: ${({checked}) => checked?'var(--answer-checked)':''};
font-weight: bold;
color: ${({theme, checked}) => theme.name==='light' && checked?'var(--white)':''};
&:hover { 
  background-color: ${({checked,theme}) => checked?'var(--answer-checked-hover)':theme.name==='dark'?'var(--dark-gray)':'var(--light-gray)'};
}
.flex { 
  display: flex;
  justify-content: space-between;
  align-items: center;
}
label { 
  font-weight: 350;
  font-size: 1.05rem;
  text-align: left;
}
input { 
  appearance: none;
  -moz-appearance: none;
  margin-top: 0;
  width: 20px;
  height: 20px;
  background-color: ${({checked}) => checked?'var(--answer-input-checked-bg)':'var(--white)'};
  background-image: ${({checked}) => checked?`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='%23000000' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72 104 184 48 128' fill='none' stroke='%23000000' stroke-linecap='round' stroke-linejoin='round' stroke-width='35'%3E%3C/polyline%3E%3C/svg%3E")`:""};
  background-repeat: no-repeat;
  background-position: 50% 65%;
  border-radius: 50%;
  border: ${({theme}) => theme.name==='light'?'var(--dark-gray) solid 0.5px':''};
}
`