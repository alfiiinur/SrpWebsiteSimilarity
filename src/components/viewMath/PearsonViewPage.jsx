import React from 'react'
import {MeanCenteredSimItemBased, MeanCenteredSimUserBased} from "../MathSimilarity/meanCentredSim";
import {MeanMeasureItemBased, MeanMeasureUserBased} from "../MathSimilarity/meanMeasure";
import {PearsonSimItemBased, PearsonSimUserBased} from "../MathSimilarity/pccMath";
import {ItemBasedPrediciton, UserBasedPredicition} from "../MathSimilarity/PredicitionMath";
import TabelView from "../Tabel_Data";
import {getPearsonPC} from "../../api/api";




export function PearsonViewPageUserBased(){
    return(
        <div>
            <TabelView/>
            <MeanMeasureUserBased opsional={1} similaritas={getPearsonPC}/>
            <MeanCenteredSimUserBased opsional={1} similaritas={getPearsonPC}/>
            <PearsonSimUserBased opsional={1} similaritas={getPearsonPC}/>
            <UserBasedPredicition opsional={1} similaritas={getPearsonPC}/>
        </div>
    )
}


export function PearsonViewPageItemBased(){
    return(
        <div>
            <MeanMeasureItemBased opsional={0} similaritas={getPearsonPC}/>
            <MeanCenteredSimItemBased opsional={0} similaritas={getPearsonPC}/>
            <PearsonSimItemBased opsional={0} similaritas={getPearsonPC}/>
            <ItemBasedPrediciton opsional={0} similaritas={getPearsonPC}/>
        </div>
    )
}