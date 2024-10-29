import React, { forwardRef } from 'react';
import { MeanCenteredSimItemBased, MeanCenteredSimUserBased } from "../MathSimilarity/meanCentredSim";
import { ItemBasedPrediciton, UserBasedPredicition } from "../MathSimilarity/PredicitionMath";
import SimilarityMeasure from '../MathSimilarity/Pearson/SimilarityMeasure';
import { MeanMeasure } from '../MathSimilarity/Pearson/Mean/MeanMeasure';



export const PearsonViewPageUserBased = forwardRef(({ meanCenteredRef, fungsiSimilaritas, prediksi, similarity, opsional }, ref) => {
    // Declare state to control mean section visibility


    return (
        <div>

            {/* <MeanMeasureUserBased ref={meanRef} opsional={"user-based"} similaritas={similarity} /> */}
            <MeanMeasure opsional={opsional} similaritas={similarity} />
            {/* These components are always rendered */}
            <MeanCenteredSimUserBased ref={meanCenteredRef} opsional={"user-based"} similaritas={similarity} />
            {/* <PearsonSimUserBased ref={fungsiSimilaritas} opsional={"user-based"} similaritas={similarity} /> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <UserBasedPredicition ref={prediksi} opsional={"user-based"} similaritas={similarity} />
        </div>
    );
});




export function PearsonViewPageItemBased({ meanCenteredRef, fungsiSimilaritas, prediksi, similarity, opsional }) {
    return (
        <div>
            {/* <MeanMeasureItemBased ref={meanRef} opsional={"item-based"} similaritas={similarity} /> */}
            <MeanMeasure opsional={opsional} similaritas={similarity} />
            <MeanCenteredSimItemBased ref={meanCenteredRef} opsional={"item-based"} similaritas={similarity} />
            {/* <PearsonSimItemBased ref={fungsiSimilaritas} opsional={"item-based"} similaritas={getPearsonPC} /> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <ItemBasedPrediciton ref={prediksi} opsional={"item-based"} similaritas={similarity} />
        </div>
    )
}