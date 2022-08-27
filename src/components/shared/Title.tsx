import { useContext } from 'react'
import styled from 'styled-components'
import { ReducerContext } from '../../ReducerProvider'

export const Title = (): JSX.Element => {
  const { dispatch } = useContext(ReducerContext);
  return (
    <Wrapper>
        <div>
          <span onClick={() => dispatch({type: 'RESET_SCREEN'})}>Quiz Game</span>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
padding-top: 40px;
font-size: 3rem;
font-weight: bold;
font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
margin-bottom: 25px;
color: var(--title-text);
letter-spacing: 1.3px;
div > span { 
  cursor: pointer;
}
`