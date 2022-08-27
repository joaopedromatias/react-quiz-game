import React, { useContext } from "react";
import { ReducerContext } from "../../ReducerProvider";
import { GameBox } from "../game/GameBox";
import { FilterBox } from "../settings/FilterBox";
import { ResultsBox } from "../results/ResultsBox";
import Button from "./Button";

export const Box: React.FC = (): JSX.Element => { 
    
    const { state, dispatch } = useContext(ReducerContext)

    if (state.isSetting || state.isLoading || state.isPlaying) { 
        return <div className="box">
            {state.isSetting || state.isLoading?<FilterBox/>:state.isPlaying?<GameBox/>:<></>}
        </div>
    }

    return <>
        <div className="box" style={{marginBottom: '15px'}}>
            <ResultsBox/> 
        </div>
        <Button btnType="button" disabled={false} onClick={() => dispatch({type: 'RESET_SCREEN'})}>Play Again</Button> 
    </>
}