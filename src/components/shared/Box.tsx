import React, { useContext, lazy, Suspense } from "react";
import { ReducerContext } from "../../ReducerProvider";
import Button from "./Button";

const FilterBox = lazy(() => import('../settings/FilterBox'));
const GameBox = lazy(() => import('../game/GameBox'));
const ResultsBox = lazy(() => import('../results/ResultsBox'));

export const Box: React.FC = (): JSX.Element => { 
    
    const { state, dispatch } = useContext(ReducerContext)

    if (state.isSetting || state.isLoading || state.isPlaying) { 
        return <div className="box">
            <Suspense fallback={FallbackFilterAndGame()}>
                {state.isSetting || state.isLoading?<FilterBox/>:state.isPlaying?<GameBox/>:<></>}
            </Suspense>
        </div>
    }

    return <>
        <div className="box" style={{marginBottom: '15px'}}>
            <Suspense fallback={FallbackResults()}>
                <ResultsBox/> 
            </Suspense>
        </div>
        <Button btnType="button" disabled={false} onClick={() => dispatch({type: 'RESET_SCREEN'})}>Play Again</Button> 
        </>
    
}

const FallbackFilterAndGame = () => { 
    return <h3 style={{lineHeight: '500px', opacity: 0}}>.</h3>
}

const FallbackResults = () => { 
    return <h3 style={{lineHeight: '500px', opacity: 0}}>.</h3>
}