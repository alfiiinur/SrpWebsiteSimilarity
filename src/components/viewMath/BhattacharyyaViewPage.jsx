import React from 'react'
import {BhattacharyyaItemBased, BhattacharyyaUserBased} from "../MathSimilarity/BkMath";
import {ItemBasedPrediciton, UserBasedPredicition} from "../MathSimilarity/PredicitionMath";
import {MeanMeasureItemBased, MeanMeasureUserBased} from "../MathSimilarity/meanMeasure";
import {MeanCenteredSimItemBased, MeanCenteredSimUserBased} from "../MathSimilarity/meanCentredSim";
import {getBC} from "../../api/api";



//user-based



export function BhattacharyyaViewUserBased(){
    return(
        <div>
            <MeanMeasureUserBased opsional={1} similaritas={getBC}/>
            <MeanCenteredSimUserBased opsional={1} similaritas={getBC}/>
            <BhattacharyyaUserBased opsional={1} similaritas={getBC}/>
            <UserBasedPredicition opsional={1} similaritas={getBC} />
        </div>
    )
}



//item-based


export function BhattacharyyaViewItemBased(){
    return(
        <div>
            <MeanMeasureItemBased opsional={0} similaritas={getBC}/>
            <MeanCenteredSimItemBased opsional={0} similaritas={getBC}/>
            <BhattacharyyaItemBased opsional={0} similaritas={getBC}/>
            <ItemBasedPrediciton opsional={0} similaritas={getBC} />
        </div>
    )
}