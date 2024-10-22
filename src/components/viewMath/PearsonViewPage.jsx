import React, { useState, useEffect, useRef, forwardRef } from 'react';
import {MeanCenteredSimItemBased, MeanCenteredSimUserBased} from "../MathSimilarity/meanCentredSim";
import {MeanMeasureItemBased, MeanMeasureUserBased} from "../MathSimilarity/meanMeasure";
import {PearsonSimItemBased, PearsonSimUserBased} from "../MathSimilarity/pccMath";
import {ItemBasedPrediciton, UserBasedPredicition} from "../MathSimilarity/PredicitionMath";
import TabelView from "../Tabel_Data";
import {getPearsonPC} from "../../api/api";




export const PearsonViewPageUserBased = forwardRef(({ meanRef, meanCenteredRef, fungsiSimilaritas, prediksi }, ref) => {
    // Declare state to control mean section visibility
    return (
        <div>

            <MeanMeasureUserBased ref={meanRef} opsional={1} similaritas={getPearsonPC} />
            {/* These components are always rendered */}
            <MeanCenteredSimUserBased ref={meanCenteredRef} opsional={1} similaritas={getPearsonPC} />
            <PearsonSimUserBased ref={fungsiSimilaritas} opsional={1} similaritas={getPearsonPC} />
            <UserBasedPredicition ref={prediksi} opsional={1} similaritas={getPearsonPC} />
        </div>
    );
});




export function PearsonViewPageItemBased({meanRef, meanCenteredRef, fungsiSimilaritas, prediksi}){
    return(
        <div>
            <MeanMeasureItemBased  ref={meanRef} opsional={0} similaritas={getPearsonPC}/>
            <MeanCenteredSimItemBased  ref={meanCenteredRef}opsional={0} similaritas={getPearsonPC}/>
            <PearsonSimItemBased  ref={fungsiSimilaritas} opsional={0} similaritas={getPearsonPC}/>
            <ItemBasedPrediciton  ref={prediksi} opsional={0} similaritas={getPearsonPC}/>
        </div>
    )
}