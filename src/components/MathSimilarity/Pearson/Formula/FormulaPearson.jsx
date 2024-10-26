// const PccFunctionMathItemBased = [
//     `\\[ PCC(i,j) = \\frac{\\sum_{i\\in U_{ij}} \\left(r_{ui} - \\overline{r_{i}}\\right)\\left(r_{uj}-\\overline{r_{j}}\\right)}{\\sqrt{\\sum_{u\\in U_{ij}} \\left(r_{ui} - \\overline{r_{i}} \\right)^{2}}\\sqrt{\\sum_{u\\in U_{ij}} \\left(r_{uj} - \\overline{r_{j}} \\right)^{2}}} \\]`
// ]
// const DetailRumusSimItemBased = [
//     `\\[ U_{ij} = \\text{Kumpulan user yang telah merating pada item yang sama user u dan v} \\]`,
//     `\\[ \\overline{r_{i}}  = \\text{Rata-rata nilai rating pada item i yang telah merating} \\]`,
//     `\\[ \\overline{r_{j}} = \\text{Rata-rata nilai rating pada item j yang telah merating} \\]`,
//     `\\[ r_{ui} = \\text{Nilai rating pada user u terhadap item i } \\]`,
//     `\\[ r_{uj} = \\text{Nilai rating pada user v terhadap item j} \\]`,
// ]

// const PccFunctionMathUserBased = [
//     `\\[ PCC(u,v) = \\frac{\\sum_{i\\in I_{uv}} \\left(r_{ui} - \\overline{r_{u}}\\right)\\left(r_{vi}-\\overline{r_{u}}\\right)}{\\sqrt{\\sum_{i\\in I_{ui}} \\left(r_{ui} - \\overline{r_{u}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{vi}} \\left(r_{vi} - \\overline{r_{v}} \\right)^{2}}} \\]`
// ]

// const DetailRumusSimUserBased = [
//     `\\[ I_{uv} = \\text{Kumpulan item yang telah di rating oleh user u dan v} \\]`,
//     `\\[ \\overline{r_{u}}  = \\text{Rata-rata nilai rating yang diberikan oleh user u pada seluruh item i} \\]`,
//     `\\[ \\overline{r_{v}} = \\text{Rata-rata nilai rating yang diberikan oleh user v pada seluruh item i} \\]`,
//     `\\[ r_{ui} = \\text{Nilai rating pada user u pada item yang sama} \\]`,
//     `\\[ r_{vi} = \\text{Nilai rating pada user v pada item yang sama} \\]`,
// ];

export const FormulaSimilarity = [
    {
        item_based: {
            formula: `\\[ PCC(i,j) = \\frac{\\sum_{i\\in U_{ij}} \\left(r_{ui} - \\overline{r_{i}}\\right)\\left(r_{uj}-\\overline{r_{j}}\\right)}{\\sqrt{\\sum_{u\\in U_{ij}} \\left(r_{ui} - \\overline{r_{i}} \\right)^{2}}\\sqrt{\\sum_{u\\in U_{ij}} \\left(r_{uj} - \\overline{r_{j}} \\right)^{2}}} \\]`,
            detail_formula: [
                `\\[ U_{ij} = \\text{Kumpulan user yang telah merating pada item yang sama user u dan v} \\]`,
                `\\[ \\overline{r_{i}}  = \\text{Rata-rata nilai rating pada item i yang telah merating} \\]`,
                `\\[ \\overline{r_{j}} = \\text{Rata-rata nilai rating pada item j yang telah merating} \\]`,
                `\\[ r_{ui} = \\text{Nilai rating pada user u terhadap item i } \\]`,
                `\\[ r_{uj} = \\text{Nilai rating pada user v terhadap item j} \\]`,
            ]
        },
        user_based: {
            formula:
                `\\[ PCC(u,v) = \\frac{\\sum_{i\\in I_{uv}} \\left(r_{ui} - \\overline{r_{u}}\\right)\\left(r_{vi}-\\overline{r_{u}}\\right)}{\\sqrt{\\sum_{i\\in I_{ui}} \\left(r_{ui} - \\overline{r_{u}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{vi}} \\left(r_{vi} - \\overline{r_{v}} \\right)^{2}}} \\]`,
            detail_formula:
                [
                    `\\[ I_{uv} = \\text{Kumpulan item yang telah di rating oleh user u dan v} \\]`,
                    `\\[ \\overline{r_{u}}  = \\text{Rata-rata nilai rating yang diberikan oleh user u pada seluruh item i} \\]`,
                    `\\[ \\overline{r_{v}} = \\text{Rata-rata nilai rating yang diberikan oleh user v pada seluruh item i} \\]`,
                    `\\[ r_{ui} = \\text{Nilai rating pada user u pada item yang sama} \\]`,
                    `\\[ r_{vi} = \\text{Nilai rating pada user v pada item yang sama} \\]`,
                ]
        }
    }
]

export const getFormulaSimilarity = (similarity, opsional) => {
    switch (similarity) {
        case "Pearson Coreallation Coeficient (PCC)":
            switch (opsional) {
                case "user-based":
                    return {
                        formula:
                            `\\[ PCC(u,v) = \\frac{\\sum_{i\\in I_{uv}} \\left(r_{ui} - \\overline{r_{u}}\\right)\\left(r_{vi}-\\overline{r_{u}}\\right)}{\\sqrt{\\sum_{i\\in I_{ui}} \\left(r_{ui} - \\overline{r_{u}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{vi}} \\left(r_{vi} - \\overline{r_{v}} \\right)^{2}}} \\]`,
                        detail_formula:
                            [
                                `\\[ I_{uv} = \\text{Kumpulan item yang telah di rating oleh user u dan v} \\]`,
                                `\\[ \\overline{r_{u}}  = \\text{Rata-rata nilai rating yang diberikan oleh user u pada seluruh item i} \\]`,
                                `\\[ \\overline{r_{v}} = \\text{Rata-rata nilai rating yang diberikan oleh user v pada seluruh item i} \\]`,
                                `\\[ r_{ui} = \\text{Nilai rating pada user u pada item yang sama} \\]`,
                                `\\[ r_{vi} = \\text{Nilai rating pada user v pada item yang sama} \\]`,
                            ]
                    }
                case "item-based":
                    return {
                        formula: `\\[ PCC(i,j) = \\frac{\\sum_{i\\in U_{ij}} \\left(r_{ui} - \\overline{r_{i}}\\right)\\left(r_{uj}-\\overline{r_{j}}\\right)}{\\sqrt{\\sum_{u\\in U_{ij}} \\left(r_{ui} - \\overline{r_{i}} \\right)^{2}}\\sqrt{\\sum_{u\\in U_{ij}} \\left(r_{uj} - \\overline{r_{j}} \\right)^{2}}} \\]`,
                        detail_formula: [
                            `\\[ U_{ij} = \\text{Kumpulan user yang telah merating pada item yang sama user u dan v} \\]`,
                            `\\[ \\overline{r_{i}}  = \\text{Rata-rata nilai rating pada item i yang telah merating} \\]`,
                            `\\[ \\overline{r_{j}} = \\text{Rata-rata nilai rating pada item j yang telah merating} \\]`,
                            `\\[ r_{ui} = \\text{Nilai rating pada user u terhadap item i } \\]`,
                            `\\[ r_{uj} = \\text{Nilai rating pada user v terhadap item j} \\]`,
                        ]

                    }
                default:
                    return
            }

        case "Vectore Cosine":
            switch (opsional) {
                case "user-based":
                    return {
                        formula:
                            `\\[ Cosine\\left(u,v\\right) = \\frac{\\sum_i\\in I_{uv}r_{ui}r_{vi}}{\\sqrt{\\sum_u\\in I_{u}r^{2}_{ui}}\\sqrt{\\sum_u\\in I_{v}r^{2}_{vi}}} \\]`,
                        detail_formula:
                            [
                                `\\[ I_{uv} = \\text{Kumpulan item yang telah di rating oleh user u dan v} \\] `,
                                `\\[ r_{ui} = \\text{Nilai rating pada user u pada item yang sama} \\]`,
                                `\\[ r_{vi} = \\text{Nilai rating pada user v pada item yang sama} \\]`,
                            ]
                    }
                case "item-based":
                    return {
                        formula:
                            `\\[  Cosine\\left(i,j\\right) = \\frac{\\sum_u\\in U_{ij}r_{ui}r_{uj}}{\\sqrt{\\sum_u\\in U_{i}r^{2}_{ui}}\\sqrt{\\sum_u\\in U_{j}r^{2}_{uj}}} \\]`,
                        detail_formula:
                            [
                                `\\[ U_{ij} = \\text{Kumpulan user yang telah merating pada item i dan j} \\]`,
                                `\\[ r_{ui} = \\text{Nilai rating pada user u pada item pada item i} \\]`,
                                `\\[ r_{uj} = \\text{Nilai rating pada user v pada item pada item j} \\]`,
                            ]
                    }
                default:
                    return
            }
        case "Adjusted Vector Cosine":
            switch (opsional) {
                case "user-based":
                    return {
                        formula:
                            `\\[ ACosine(u,v) = \\frac{\\sum_i\\in I_{uv} \\left(r_{ui} - \\overline{r_{i}}\\right)\\left(r_{vi}-\\overline{r_{i}}\\right)}{\\sqrt{\\sum_u \\in I_{uv} \\left(r_{ui} - \\overline{r_{i}} \\right)^{2}}\\sqrt{\\sum_i \\in I_{uv} \\left(r_{vi} - \\overline{r_{i}} \\right)^{2}}} \\]`,
                        detail_formula:
                            [
                                `\\[ Su_{i} = \\text{Rata-rata pada user u} \\] `,
                                `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
                                `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,
                            ]
                    }
                case "item-based":
                    return {
                        formula:
                            `\\[ ACosine(i,j) = \\frac{\\sum_u\\in U_{ij} \\left(r_{ui} - \\overline{r_{u}}\\right)\\left(r_{uj}-\\overline{r_{u}}\\right)}{\\sqrt{\\sum_u \\in U_{ij} \\left(r_{ui} - \\overline{r_{u}} \\right)^{2}}\\sqrt{\\sum_i \\in U_{ij} \\left(r_{uj} - \\overline{r_{u}} \\right)^{2}}} \\]`,
                        detail_formula:
                            [
                                `\\[ Su_{i} = \\text{Rata-rata pada user u} \\] `,
                                `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
                                `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,
                            ]
                    }
                case "Bhattacharyya Coefficient Similarity (BC)":
                    switch (opsional) {
                        case "user-based":
                            return {
                                formula:
                                    `\\[  BC(u,v) = \\sum_a\\sqrt{P\\left(r_{u*}=a\\right)\\times P\\left(r_{v*}=a\\right)} \\]`,
                                detail_formula:
                                    [
                                        `\\[ Su_{i} = \\text{Rata-rata pada user u} \\] `,
                                        `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
                                        `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,

                                    ]
                            }
                        case "item-based":
                            return {
                                formula:
                                    `\\[ BC(i,j) = \\sum_a\\sqrt{P\\left(r_{i*}=a\\right)\\times P\\left(r_{j*}=a\\right)}  \\]`,
                                detail_formula:
                                    [
                                        `\\[ Su_{i} = \\text{Rata-rata pada user u} \\] `,
                                        `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
                                        `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,

                                    ]
                            }
                        default:
                            return
                    }
                default:
                    return
            }
        default:
            return
    }
}

/**
 * List of Formula Similarity per Index
 * 
 * @param {Int} rowIndex 
 * @param {Int} colIndex 
 * @param {string} opsional 
 * @param {string} similarity
 * @returns string
 */
export const FormulaSimilarityIndex = (rowIndex, colIndex, opsional, similarity) => {

    switch (similarity) {
        case "Pearson Coreallation Coeficient (PCC)":
            switch (opsional) {
                case "user-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{${colIndex + 1}i}-\\overline{r_{${rowIndex + 1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${colIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`
                case "item-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}}} \\left(r_{u${rowIndex + 1}} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{u${colIndex + 1}}-\\overline{r_{${colIndex + 1}}}\\right)}{\\sqrt{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${rowIndex + 1}}} \\left(r_{u${colIndex + 1}} - \\overline{r_{${colIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`
                default:
                    return
            }

        case "Vectore Cosine":
            switch (opsional) {
                case "user-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{${colIndex + 1}i}-\\overline{r_{${rowIndex + 1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${colIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`
                case "item-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{${colIndex + 1}i}-\\overline{r_{${rowIndex + 1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${colIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`
                default:
                    return
            }
        case "Adjusted Vector Cosine":
            switch (opsional) {
                case "user-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{${colIndex + 1}i}-\\overline{r_{${rowIndex + 1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${colIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`

                case "item-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{${colIndex + 1}i}-\\overline{r_{${rowIndex + 1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${colIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`
                default:
                    return
            }
        default:
            return
    }
}

export const FormulaSimilarityNonZero = (rowIndex, colIndex, similarity, opsional, nonZeroIndexesCol1, nonZeroIndexesCol2, intersection) => {
    switch (similarity) {
        case "Pearson Coreallation Coeficient (PCC)":
            switch (opsional) {
                case "user-based":
                    return `\\[ U_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
            U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
            U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`

                case "item-based":
                    return `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
            I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
            I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`
                default:
                    return
            }
        case "Vectore Cosine":
            switch (opsional) {
                case "user-based":
                    return `\\[ U_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
            U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
            U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`

                case "item-based":
                    return `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
            I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
            I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`
                default:
                    return
            }

        default:
            break;
    }
}

export const FormulaSimilarityValue = (rowIndex, colIndex, meanCenteredRow, meanCenteredCol, similarity) => {
    switch (similarity) {
        case "Pearson Coreallation Coeficient (PCC)":
            return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${meanCenteredRow.map((val, idx) => `(${val.toFixed(2)} \\times ${meanCenteredCol[idx].toFixed(2)})`).join(' + ')}}{\\sqrt{${meanCenteredRow.map((val, idx) => `(${val.toFixed(1)})^2`).join(' + ')}} \\times \\sqrt{${meanCenteredCol.map((val, idx) => `(${val.toFixed(2)})^2`).join(' + ')}}} \\newline \\]`
        case "Vectore Cosine":
            return
        case "Adjusted Vector Cosine":
            return
        default:
            return

    }
}