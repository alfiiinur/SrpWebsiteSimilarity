import React from 'react'
import {MeanCenteredSimItemBased, MeanCenteredSimUserBased} from "../MathSimilarity/meanCentredSim";
import {MeanMeasureItemBased, MeanMeasureUserBased} from "../MathSimilarity/meanMeasure";
import {PearsonSimItemBased, PearsonSimUserBased} from "../MathSimilarity/pccMath";
import {ItemBasedPrediciton, UserBasedPredicition} from "../MathSimilarity/PredicitionMath";




export function PearsonViewPageUserBased(){
    return(
        <div>
            <h1>Ini adalah pcc user based</h1>
            <MeanMeasureUserBased/>
            <MeanCenteredSimUserBased/>
            <PearsonSimUserBased/>
            <UserBasedPredicition/>
        </div>
    )
}


export function PearsonViewPageItemBased(){
    return(
        <div>
            <h1>Ini adalah ppc item based</h1>
            <MeanMeasureItemBased/>
            <MeanCenteredSimItemBased/>
            <PearsonSimItemBased/>
            <ItemBasedPrediciton/>
        </div>
    )
}