import React, { useContext } from 'react'
import styled from 'styled-components'
import { ReducerContext } from "../../ReducerProvider"

interface FilterProps {
  name: string
  type: string
  options?: string[]
}

export const Filter: React.FC<FilterProps> = ({name, type, options}): JSX.Element => {

  const { state, dispatch } = useContext(ReducerContext);

  return type==='text'?(
      <Wrapper>
            <div className='flex-select'>
              <h3 style={{textTransform: 'capitalize', fontSize: '1.25rem'}}>{name}</h3>
              <select required name={name} onChange={(e) => {
                  dispatch({type: 'UPDATE_QUIZ_CONFIG', payload: {name: name, newValue: e.target.value} })
                }}>
                {options?.map((option, index) => <option className='option' key={index}>{option}</option>)}
              </select>
            </div>
      </Wrapper>
    ):(
      <Wrapper>
            <h3 style={{textTransform: 'capitalize', fontSize: '1.25rem'}}>{name}</h3>
            <div className='flex-questions'>
              <input type="range" step='5' min="0" max="15" defaultValue='10' required onChange={(e)=>{
                dispatch({type: 'UPDATE_QUIZ_CONFIG', payload: {name: name, newValue: e.target.value} })
                 if(e.target.value === '0') {
                dispatch({type: 'UPDATE_BUTTON_STATE', payload: {disabled: true}});
                 } else if (state.submitButtonDisabled === true) {
                dispatch({type: 'UPDATE_BUTTON_STATE', payload: {disabled: false}});
                dispatch({type: 'HIDE_MODAL'} );
                 }
                }}/>
              <span>{state.questions}</span>
            </div>
      </Wrapper>
    )
}

const Wrapper = styled.div`
padding: 2.5rem 3.6rem;
display: flex;
gap: 5px;
flex-wrap: wrap;
font-family: 'Guizar', serif;
letter-spacing: 1px;
.flex-select { 
  display: flex;
  justify-content: center;
  align-items: center;
  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: ${ ({theme}) => theme.name==='light'?'var(--select-input-bg-light)':'var(--select-input-bg-dark)' };
    background-image: ${ ({theme}) => theme.name==='light'?`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23000000' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='208 96 128 176 48 96' fill='none' stroke='%23000000' stroke-linecap='round' stroke-linejoin='round' stroke-width='16'%3E%3C/polyline%3E%3C/svg%3E")`
    :`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23000000' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='208 96 128 176 48 96' fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='16'%3E%3C/polyline%3E%3C/svg%3E")`};
    background-repeat: no-repeat;
    background-position: 95%;
    margin-left: 50px;
    padding-left: 10px;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 300px;
    height: 40px;
    color: ${( ( {theme} ) => theme.color )};
    transition: all 0.15s linear;
    text-transform: capitalize;
    border: ${({theme}) => theme.name==='light' ? '1px solid var(--dark-gray)' : '0.5px solid var(--btn-text-disabled)' };
  }
}
.flex-questions { 
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;
  font-weight: 500;
  width: 300px;
  input { 
    appearance: none;
    -webkit-appearance: none;
    background: ${(({theme}) => theme.name==='light'?'var(--select-input-bg-light)':'var(--select-input-bg-dark)')};
    margin: 0 4rem;
    border: ${({theme}) => theme.name==='light' ? '1px solid var(--dark-gray)' : '0.5px solid var(--btn-text-disabled)' };
    border-radius: 0.5rem;
    transition: all 0.15s linear;
    max-width: 150px;
    cursor: pointer;
    &::-webkit-slider-thumb { 
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--question-choice-thumb);
      cursor: pointer;
    }
    &::-moz-range-thumb { 
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--question-choice-thumb);
      cursor: pointer;
    }
  }
  span { 
    margin-right: 2rem;
  }
}
@media (max-width: 600px) {
padding: 0px;
flex-direction: column;
align-items: center;
justify-content: center;
  .flex-select { 
    display: block;
    select { 
      margin-left: 0px;
      margin-bottom: 22px;
      border-radius: 0.3rem;
      width: 65vw;
      height: 27px;
    }
  }
    .flex-questions { 
      margin-bottom: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 85vw;
      input { 
        margin: 0 45px;
      }
      span { 
        font-size: 1.6rem;
      }
    }
}
`