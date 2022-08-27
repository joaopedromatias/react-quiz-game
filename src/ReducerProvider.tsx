import React, { ReactNode, useReducer } from 'react'
import { StateInterface, ActionInterface} from './utils/types'
import { reducer } from './reducer'
import { initialState } from './utils/initialState'

type ContextType = {     
    state: StateInterface,
    dispatch: React.Dispatch<ActionInterface>
}

export const ReducerContext = React.createContext<ContextType>({} as ContextType);

interface Props { 
    children: ReactNode
}

export const ReducerProvider: React.FC<Props> = ({children}): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <>
        <ReducerContext.Provider value={{state, dispatch}}>
            {children}
        </ReducerContext.Provider>
    </>
}