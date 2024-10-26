import React, { forwardRef } from 'react';
import { MeanCenteredSimItemBased, MeanCenteredSimUserBased } from "../MathSimilarity/meanCentredSim";
import { MeanMeasureItemBased, MeanMeasureUserBased } from "../MathSimilarity/meanMeasure";
import { PearsonSimItemBased, PearsonSimUserBased } from "../MathSimilarity/pccMath";
import { ItemBasedPrediciton, UserBasedPredicition } from "../MathSimilarity/PredicitionMath";
import SimilarityMeasure from '../MathSimilarity/Pearson/SimilarityMeasure';
import { getPearsonPC } from "../../api/api";




export const PearsonViewPageUserBased = forwardRef(({ meanRef, meanCenteredRef, fungsiSimilaritas, prediksi, similarity, opsional }, ref) => {
    // Declare state to control mean section visibility


    return (
        <div>

            <MeanMeasureUserBased ref={meanRef} opsional={"user-based"} similaritas={similarity} />
            {/* These components are always rendered */}
            <MeanCenteredSimUserBased ref={meanCenteredRef} opsional={"user-based"} similaritas={similarity} />
            {/* <PearsonSimUserBased ref={fungsiSimilaritas} opsional={"user-based"} similaritas={similarity} /> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <UserBasedPredicition ref={prediksi} opsional={"user-based"} similaritas={similarity} />
        </div>
    );
});




export function PearsonViewPageItemBased({ meanRef, meanCenteredRef, fungsiSimilaritas, prediksi, similarity, opsional }) {
    return (
        <div>
            <MeanMeasureItemBased ref={meanRef} opsional={"item-based"} similaritas={similarity} />
            <MeanCenteredSimItemBased ref={meanCenteredRef} opsional={"item-based"} similaritas={similarity} />
            {/* <PearsonSimItemBased ref={fungsiSimilaritas} opsional={"item-based"} similaritas={getPearsonPC} /> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <ItemBasedPrediciton ref={prediksi} opsional={"item-based"} similaritas={similarity} />
        </div>
    )
}