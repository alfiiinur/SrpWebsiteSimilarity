import React from 'react'
import {MeanMeasureItemBased, MeanMeasureUserBased} from "../MathSimilarity/meanMeasure";
import {MeanCenteredSimItemBased, MeanCenteredSimUserBased} from "../MathSimilarity/meanCentredSim";
import {ItemBasedPrediciton, UserBasedPredicition} from "../MathSimilarity/PredicitionMath";
import {CosineMathItemBased, CosineMathUserBased} from "../MathSimilarity/cosineMath";


export function CosineViewPageUserBased(){
    return(
        <div>
            <h1>Ini adalah cosine user based</h1>
            <MeanMeasureUserBased/>
            <MeanCenteredSimUserBased/>
            <CosineMathUserBased/>
            <UserBasedPredicition/>
        </div>
    )
}


export function CosineViewPageItemBased(){
    return(
        <div>
            <h1>Ini adalah cosine item based</h1>
            <MeanMeasureItemBased/>
            <MeanCenteredSimItemBased/>
            <CosineMathItemBased/>
            <ItemBasedPrediciton/>
        </div>
    )
}