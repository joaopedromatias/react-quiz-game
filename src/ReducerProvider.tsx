import { ReactNode, useReducer, createContext } from 'react';
import { StateInterface, ActionInterface } from './utils/types';
import { reducer } from './reducer';
import { initialState } from './utils/initialState';

type ContextType = {
  state: StateInterface;
  dispatch: React.Dispatch<ActionInterface>;
};

export const ReducerContext = createContext<ContextType>({} as ContextType);

interface Props {
  children: ReactNode;
}

export const ReducerProvider: React.FC<Props> = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <>
      <ReducerContext.Provider value={{ state, dispatch }}>{children}</ReducerContext.Provider>
    </>
  );
};
