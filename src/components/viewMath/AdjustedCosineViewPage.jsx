import React from 'react'
import {MeanMeasureItemBased, MeanMeasureUserBased} from "../MathSimilarity/meanMeasure";
import {MeanCenteredSimItemBased, MeanCenteredSimUserBased} from "../MathSimilarity/meanCentredSim";
import {ItemBasedPrediciton, UserBasedPredicition} from "../MathSimilarity/PredicitionMath";
import {AdjustedCosineItemBased, AdjustedCosineUserBased} from "../MathSimilarity/AdjsCosineMath";




export function AdjustedCosineViewPageUserBased(){
    return(
        <div>
            <h1>Ini adalah Adjusted Cosine User Based</h1>
            <MeanMeasureUserBased/>
            <MeanCenteredSimUserBased/>
            <AdjustedCosineUserBased/>
            <UserBasedPredicition/>
        </div>
    )
}


export function AdjustedCosineViewPageItemBased(){
    return(
        <div>
            <h1>Ini adalah Adjusted Cosine Item Based</h1>
            <MeanMeasureItemBased/>
            <MeanCenteredSimItemBased/>
            <AdjustedCosineItemBased/>
            <ItemBasedPrediciton/>
        </div>
    )
}