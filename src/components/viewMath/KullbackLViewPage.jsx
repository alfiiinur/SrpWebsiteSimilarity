import React from 'react'
import {MeanMeasureItemBased, MeanMeasureUserBased} from "../MathSimilarity/meanMeasure";
import {MeanCenteredSimItemBased, MeanCenteredSimUserBased} from "../MathSimilarity/meanCentredSim";
import {PearsonSimItemBased, PearsonSimUserBased} from "../MathSimilarity/pccMath";
import {ItemBasedPrediciton, UserBasedPredicition} from "../MathSimilarity/PredicitionMath";



export function KullbackViewPageUserBased(){
    return(
        <div>
            <MeanMeasureUserBased />
            <MeanCenteredSimUserBased/>
            <PearsonSimUserBased/>
            <UserBasedPredicition/>
        </div>
    )
}


export function KullbackViewPageItemBased(){
    return(
        <div>
            <MeanMeasureItemBased/>
            <MeanCenteredSimItemBased/>
            <PearsonSimItemBased/>
            <ItemBasedPrediciton/>
        </div>
    )
}