import React from 'react'
import { MeanCenteredSimItemBased } from "../MathSimilarity/meanCentredSim";
import SimilarityMeasure from '../MathSimilarity/Pearson/SimilarityMeasure';
import { UserBasedPredicition } from '../MathSimilarity/PredicitionMath';
import { ItemBasedPrediciton } from "../MathSimilarity/PredicitionMath";
import { MeanMeasure } from '../MathSimilarity/Pearson/Mean/MeanMeasure';




export function AdjustedCosineViewPageUserBased({ meanCenteredRef, fungsiSimilaritas, prediksi, similarity, opsional }) {
    return (
        <div>
            {/* <MeanMeasureItemBased ref={meanRef} opsional={opsional} similaritas={similarity} /> */}
            <MeanMeasure opsional={opsional} similaritas={similarity} />
            <MeanCenteredSimItemBased
                ref={meanCenteredRef}
                opsional={"user-based"}
                similaritas={similarity}
            />
            {/*<MeanCenteredSimUserBased opsional={1} similaritas={getACosine}/>*/}
            {/* <AdjustedCosineUserBased opsional={1} similaritas={getACosine}/> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <ItemBasedPrediciton ref={prediksi} opsional={opsional} similaritas={similarity} />
        </div>
    )
}


export function AdjustedCosineViewPageItemBased({ meanCenteredRef, fungsiSimilaritas, prediksi, similarity, opsional }) {
    return (
        <div>
            {/* <MeanMeasureUserBased ref={meanRef} opsional={opsional} similaritas={similarity} /> */}
            <MeanMeasure opsional={opsional} similaritas={similarity} />
            <MeanCenteredSimItemBased ref={meanCenteredRef} opsional={opsional} similaritas={similarity} />
            {/*<MeanCenteredSimUserBased opsional={0} similaritas={getACosine}/>*/}
            {/* <AdjustedCosineItemBased opsional={0} similaritas={getACosine}/> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <UserBasedPredicition ref={prediksi} opsional={opsional} similaritas={similarity} />
        </div>
    )
}