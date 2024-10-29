import React from 'react'
import { MeanCenteredSimItemBased, MeanCenteredSimUserBased } from "../MathSimilarity/meanCentredSim";
import { ItemBasedPrediciton, UserBasedPredicition } from "../MathSimilarity/PredicitionMath";
import SimilarityMeasure from '../MathSimilarity/Pearson/SimilarityMeasure';
import { MeanMeasure } from '../MathSimilarity/Pearson/Mean/MeanMeasure';


export function CosineViewPageUserBased({ meanCenteredRef, fungsiSimilaritas, prediksi, similarity, opsional }) {
    return (
        <div>
            {/* <MeanMeasureUserBased ref={meanRef} opsional={opsional} similaritas={similarity} /> */}
            <MeanMeasure opsional={opsional} similaritas={similarity} />
            <MeanCenteredSimUserBased
                ref={meanCenteredRef}
                opsional={"user-based"}
                similaritas={similarity}
            />
            {/* <CosineMathUserBased opsional={1} similaritas={similarity}/> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <UserBasedPredicition ref={prediksi} opsional={opsional} similaritas={similarity} />
        </div>
    )
}


export function CosineViewPageItemBased({ meanCenteredRef, fungsiSimilaritas, prediksi, similarity, opsional }) {
    return (
        <div>
            {/* <MeanMeasureItemBased ref={meanRef} opsional={opsional} similaritas={similarity} /> */}
            <MeanMeasure opsional={opsional} similaritas={similarity} />
            <MeanCenteredSimItemBased ref={meanCenteredRef} opsional={opsional} similaritas={similarity} />
            {/* <CosineMathItemBased opsional={0} similaritas={similarity}/> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <ItemBasedPrediciton ref={prediksi} opsional={opsional} similaritas={similarity} />
        </div>
    )
}