import React from 'react'
import {MeanMeasureItemBased, MeanMeasureUserBased} from "../MathSimilarity/meanMeasure";
import {MeanCenteredSimItemBased, MeanCenteredSimUserBased} from "../MathSimilarity/meanCentredSim";
import {ItemBasedPrediciton, UserBasedPredicition} from "../MathSimilarity/PredicitionMath";
import {CosineMathItemBased, CosineMathUserBased} from "../MathSimilarity/cosineMath";
import {getCosine} from "../../api/api";


export function CosineViewPageUserBased(){
    return(
        <div>
            <MeanMeasureUserBased opsional={1} similaritas={getCosine}/>
            <MeanCenteredSimUserBased opsional={1} similaritas={getCosine}/>
            <CosineMathUserBased opsional={1} similaritas={getCosine}/>
            <UserBasedPredicition opsional={1} similaritas={getCosine}/>
        </div>
    )
}


export function CosineViewPageItemBased(){
    return(
        <div>
            <MeanMeasureItemBased opsional={0} similaritas={getCosine}/>
            <MeanCenteredSimItemBased opsional={0} similaritas={getCosine}/>
            <CosineMathItemBased opsional={0} similaritas={getCosine}/>
            <ItemBasedPrediciton opsional={0} similaritas={getCosine}/>
        </div>
    )
}