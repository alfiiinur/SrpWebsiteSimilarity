import React from 'react'
import {MeanMeasureItemBased, MeanMeasureUserBased} from "../MathSimilarity/meanMeasure";
import {MeanCenteredSimItemBased, MeanCenteredSimUserBased} from "../MathSimilarity/meanCentredSim";
import {AdjustedCosineItemBased, AdjustedCosineUserBased} from "../MathSimilarity/AdjsCosineMath";
import {getACosine, getBC} from "../../api/api";
import {ItemBasedPredicitonAdjust, UserBasedPredicitionAdjust} from "../MathSimilarity/PredictionAdjusted";
import {ItemBasedPrediciton} from "../MathSimilarity/PredicitionMath";




export function AdjustedCosineViewPageUserBased(){
    return(
        <div>
            <MeanMeasureItemBased opsional={1} similaritas={getACosine}/>
            <MeanCenteredSimItemBased opsional={1} similaritas={getACosine}/>
            {/*<MeanCenteredSimUserBased opsional={1} similaritas={getACosine}/>*/}
            <AdjustedCosineUserBased opsional={1} similaritas={getACosine}/>
            <UserBasedPredicitionAdjust opsional={1} similaritas={getACosine}/>
        </div>
    )
}


export function AdjustedCosineViewPageItemBased(){
    return(
        <div>
            <MeanMeasureUserBased opsional={0} similaritas={getACosine}/>
            <MeanCenteredSimItemBased opsional={0} similaritas={getACosine}/>
            {/*<MeanCenteredSimUserBased opsional={0} similaritas={getACosine}/>*/}
            <AdjustedCosineItemBased opsional={0} similaritas={getACosine}/>
            {/*<ItemBasedPredicitonAdjust opsional={0} similaritas={getACosine}/>*/}
            <ItemBasedPrediciton opsional={0} similaritas={getACosine} />
        </div>
    )
}