import React from 'react'
import { ItemBasedPrediciton, UserBasedPredicition } from "../MathSimilarity/PredicitionMath";
import { MeanMeasureItemBased, MeanMeasureUserBased } from "../MathSimilarity/meanMeasure";
import { MeanCenteredSimItemBased, MeanCenteredSimUserBased } from "../MathSimilarity/meanCentredSim";
import SimilarityMeasure from '../MathSimilarity/Pearson/SimilarityMeasure';



//user-based



export function BhattacharyyaViewUserBased({ meanRef, meanCenteredRef, fungsiSimilaritas, prediksi, similarity, opsional }) {
    return (
        <div>
            <MeanMeasureUserBased ref={meanRef} opsional={opsional} similaritas={similarity} />
            <MeanCenteredSimUserBased
                ref={meanCenteredRef}
                opsional={"user-based"}
                similaritas={similarity}
            />
            {/*<MeanCenteredSimUserBased opsional={1} similaritas={getACosine}/>*/}
            {/* <AdjustedCosineUserBased opsional={1} similaritas={getACosine}/> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <UserBasedPredicition ref={prediksi} opsional={opsional} similaritas={similarity} />
        </div>
    )
}



//item-based


export function BhattacharyyaViewItemBased({ meanRef, meanCenteredRef, fungsiSimilaritas, prediksi, similarity, opsional }) {
    return (
        <div>
            <MeanMeasureItemBased ref={meanRef} opsional={opsional} similaritas={similarity} />
            <MeanCenteredSimItemBased ref={meanCenteredRef} opsional={opsional} similaritas={similarity} />
            {/*<MeanCenteredSimUserBased opsional={0} similaritas={getACosine}/>*/}
            {/* <AdjustedCosineItemBased opsional={0} similaritas={getACosine}/> */}
            <SimilarityMeasure ref={fungsiSimilaritas} opsional={opsional} similarity={similarity} />
            <ItemBasedPrediciton ref={prediksi} opsional={opsional} similaritas={similarity} />
        </div>
    )
}