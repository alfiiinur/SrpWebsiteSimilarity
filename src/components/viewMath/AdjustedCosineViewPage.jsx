import React from 'react'
import {MeanMeasureItemBased, MeanMeasureUserBased} from "../MathSimilarity/meanMeasure";
import {MeanCenteredSimItemBased, MeanCenteredSimUserBased} from "../MathSimilarity/meanCentredSim";
import {ItemBasedPrediciton, UserBasedPredicition} from "../MathSimilarity/PredicitionMath";
import {AdjustedCosineItemBased, AdjustedCosineUserBased} from "../MathSimilarity/AdjsCosineMath";
import {getACosine, getBC} from "../../api/api";




export function AdjustedCosineViewPageUserBased(){
    return(
        <div>
            <MeanMeasureUserBased opsional={1} similaritas={getACosine}/>
            <MeanCenteredSimUserBased opsional={1} similaritas={getACosine}/>
            <AdjustedCosineUserBased opsional={1} similaritas={getACosine}/>
            <UserBasedPredicition opsional={1} similaritas={getACosine}/>
        </div>
    )
}


export function AdjustedCosineViewPageItemBased(){
    return(
        <div>
            <MeanMeasureItemBased opsional={0} similaritas={getACosine}/>
            <MeanCenteredSimItemBased opsional={0} similaritas={getACosine}/>
            <AdjustedCosineItemBased opsional={0} similaritas={getACosine}/>
            <ItemBasedPrediciton opsional={0} similaritas={getACosine}/>
        </div>
    )
}