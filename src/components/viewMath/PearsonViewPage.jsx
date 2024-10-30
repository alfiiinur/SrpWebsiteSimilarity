import React, { forwardRef } from 'react';
import { ItemBasedPrediciton, UserBasedPredicition } from "../MathSimilarity/PredicitionMath";
import SimilarityMeasure from '../MathSimilarity/Pearson/SimilarityMeasure';
import { MeanMeasure } from '../MathSimilarity/Pearson/Mean/MeanMeasure';
import MeanCenteredMeasure from '../MathSimilarity/Pearson/MeanCentered/MeanCenteredMeasure';
import { getInitialData } from '../../api/getDataSet';



export const PearsonViewPageUserBased = forwardRef(({ fungsiSimilaritas, prediksi, similarity, opsional }, ref) => {
    // Declare state to control mean section visibility
    const initialData = getInitialData(opsional);

    return (
        <div>

            {/* <MeanMeasureUserBased ref={meanRef} opsional={"user-based"} similaritas={similarity} /> */}
            <MeanMeasure opsional={opsional} similaritas={similarity} />
            {/* These components are always rendered */}
            {/* <MeanCenteredSimUserBased ref={meanCenteredRef} opsional={"user-based"} similaritas={similarity} /> */}
            <MeanCenteredMeasure
                opsional={opsional}
                similarity={similarity}
                initialData={initialData}
            />
            {/* <PearsonSimUserBased ref={fungsiSimilaritas} opsional={"user-based"} similaritas={similarity} /> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <UserBasedPredicition ref={prediksi} opsional={"user-based"} similaritas={similarity} />
        </div>
    );
});




export function PearsonViewPageItemBased({ fungsiSimilaritas, prediksi, similarity, opsional }) {
    const initialData = getInitialData(opsional);
    return (
        <div>
            {/* <MeanMeasureItemBased ref={meanRef} opsional={"item-based"} similaritas={similarity} /> */}
            <MeanMeasure opsional={opsional} similaritas={similarity} />
            {/* <MeanCenteredSimItemBased ref={meanCenteredRef} opsional={"item-based"} similaritas={similarity} /> */}
            <MeanCenteredMeasure
                opsional={opsional}
                similarity={similarity}
                initialData={initialData}
            />
            {/* <PearsonSimItemBased ref={fungsiSimilaritas} opsional={"item-based"} similaritas={getPearsonPC} /> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <ItemBasedPrediciton ref={prediksi} opsional={"item-based"} similaritas={similarity} />
        </div>
    )
}