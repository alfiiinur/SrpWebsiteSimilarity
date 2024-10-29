export const getFormulaSimilarity = (similarity, opsional) => {
    switch (similarity) {
        case "Pearson Coreallation Coeficient (PCC)":
            switch (opsional) {
                case "user-based":
                    return {
                        formula:
                            `\\[ PCC(u,v) = \\frac{\\sum_{i\\in I_{uv}} s_{ui} s_{vi}}{\\sqrt{\\sum_{i\\in I_{ui}} s_{ui}^{2}}\\sqrt{\\sum_{i\\in I_{vi}} s_{vi}^{2}}} \\]`,
                        detail_formula:
                            [
                                `\\[ I_{uv} = \\text{Kumpulan item yang telah dinilai oleh user u dan v} \\]`,
                                `\\[ s_{ui} = \\text{Nilai mean-centered dari rating item i yang telah dinilai oleh user u } \\]`
                            ]
                    }
                case "item-based":
                    return {
                        formula: `\\[ PCC(i,j) = \\frac{\\sum_{u\\in U_{ij}} s_{ui} s_{uj}}{\\sqrt{\\sum_{u\\in U_{ij}} s^{2}_{ui}}\\sqrt{\\sum_{u\\in U_{ij}} s^{2}_{uj}}} \\]`,
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

        case "Vector Cosine":
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

                default:
                    return
            }
        case "Bhattacharyya Coefficient Similarity (BC)":

            switch (opsional) {
                case "user-based":
                    return {
                        formula:
                            `\\[  BC(u,v) = \\sum_a \\sqrt{P\\left(r_{u*}=a\\right)\\times P\\left(r_{v*}=a\\right)} \\]`,
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
                            `\\[ BC(i,j) = \\sum_a \\sqrt{P\\left(r_{i*}=a\\right)\\times P\\left(r_{j*}=a\\right)}  \\]`,
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
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} s_{${rowIndex + 1}i} s_{${colIndex + 1}i}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} s_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${rowIndex + 1}}} s_{${colIndex + 1}i}^{2}}} \\]`
                case "item-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}}} s_{${rowIndex + 1}i} s_{${colIndex + 1}i}}{\\sqrt{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}}} s_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}}} s_{${colIndex + 1}i}^{2}}} \\]`
                default:
                    return
            }

        case "Vector Cosine":
            switch (opsional) {
                case "user-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\ r_{${rowIndex + 1}i} r_{${colIndex + 1}i}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} } \\ r_{${colIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in I_{${colIndex + 1}}} \\ r_{${rowIndex + 1}i}^{2}}} \\]`
                case "item-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{u\\in U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}}} \\ r_{u${rowIndex + 1}} r_{u${colIndex + 1}}}{\\sqrt{\\sum_{u\\in U_{${rowIndex + 1}} } \\ r_{u${colIndex + 1}}^{2}}\\sqrt{\\sum_{u\\in U_{${colIndex + 1}}} \\ r_{u${rowIndex + 1}}^{2}}} \\]`
                default:
                    return
            }
        case "Adjusted Vector Cosine":
            switch (opsional) {
                case "user-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} s_{${rowIndex + 1}i} s_{${colIndex + 1}i}}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} s_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} s_{${colIndex + 1}i}^{2}}} \\]`

                case "item-based":
                    return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}}} s_{${rowIndex + 1}i} s_{${colIndex + 1}i}}{\\sqrt{\\sum_{i\\in U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}}} s_{${rowIndex + 1}i}^{2}}\\sqrt{\\sum_{i\\in U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}}} s_{${colIndex + 1}i}^{2}}} \\]`
                default:
                    return
            }
        case "Bhattacharyya Coefficient Similarity (BC)":
            return
        default:
            return
    }
}

export const FormulaSimilarityNonZero = (rowIndex, colIndex, similarity, opsional, nonZeroIndexesCol1, nonZeroIndexesCol2, intersection) => {
    switch (similarity) {
        case "Pearson Coreallation Coeficient (PCC)":
            switch (opsional) {
                case "user-based":
                    return {
                        FormulaWithoutValue: `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
            I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
            I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`, FormulaWithValue: `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.map(val => `i_{${val}}`)} \\right\\}, 
            I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(val => `i_{${val}}`)} \\right\\} \\text{ maka : }
            I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.map(val => `i_{${val}}`)} \\right\\}\\]`
                    }

                case "item-based":
                    return {
                        FormulaWithoutValue: `\\[ U_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
            U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
            U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`,
                        FormulaWithValue: `\\[ U_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.map(val => `u_{${val}}`)} \\right\\}, 
            U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(val => `u_{${val}}`)} \\right\\} \\text{ maka : }
            U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}} = \\left\\{ ${intersection.map(val => `u_{${val}}`)} \\right\\}\\]`
                    }
                default:
                    return
            }
        case "Vector Cosine":
            switch (opsional) {
                case "user-based":
                    return {
                        FormulaWithoutValue: `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
            I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
            I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`,
                        FormulaWithValue: `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.map(val => `i_{${val}}`)} \\right\\}, 
            I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(val => `i_{${val}}`)} \\right\\} \\text{ maka : }
            I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.map(val => `i_{${val}}`)} \\right\\}\\]`
                    }

                case "item-based":
                    return {
                        FormulaWithoutValue: `\\[ U_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
            U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
            U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`,
                        FormulaWithValue: `\\[ U_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.map(val => `u_{${val}}`)} \\right\\}, 
            U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(val => `u_{${val}}`)} \\right\\} \\text{ maka : }
            U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}} = \\left\\{ ${intersection.map(val => `u_{${val}}`)} \\right\\}\\]`
                    }
                default:
                    return
            }
        case "Adjusted Vector Cosine":
            switch (opsional) {
                case "user-based":
                    return {
                        FormulaWithoutValue: `\\[ U_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
        U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
        U_{${rowIndex + 1}} \\cap U_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`,
                        FormulaWithValue: `\\[ U_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.map(val => `u_{${val}}`)} \\right\\}, 
        U_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(val => `u_{${val}}`)} \\right\\} \\text{ maka : }
        U_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.map(val => `u_{${val}}`)} \\right\\}\\]`
                    }
                case "item-based":
                    return {
                        FormulaWithoutValue: `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
        I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
        I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`,
                        FormulaWithValue: `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.map(val => `i_{${val}}`)} \\right\\}, 
        I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.map(val => `i_{${val}}`)} \\right\\} \\text{ maka : }
        I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.map(val => `i_{${val}}`)} \\right\\}\\]`
                    }
                default:
                    return
            }
        default:
            break;
    }
}

export const FormulaSimilarityValue = (rowIndex, colIndex, dataSimilarityRow, dataSimilarityCol, similarity) => {
    console.log(`
        rowIndex : ${rowIndex}, 
        colIndex : ${colIndex}, 
        dataSimilarityRow : ${dataSimilarityRow}, 
        dataSimilarityCol : ${dataSimilarityCol}, 
        similarity : ${similarity}
        `)

    switch (similarity) {
        case "Pearson Coreallation Coeficient (PCC)":
            return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${dataSimilarityRow.map((val, idx) => `(${val.toFixed(2)} \\times ${dataSimilarityCol[idx].toFixed(2)})`).join(' + ')}}{\\sqrt{${dataSimilarityRow.map((val, idx) => `(${val.toFixed(1)})^2`).join(' + ')}} \\times \\sqrt{${dataSimilarityCol.map((val, idx) => `(${val.toFixed(2)})^2`).join(' + ')}}} \\newline \\]`
        case "Vector Cosine":
            return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${dataSimilarityRow.map((val, idx) => `(${val.toFixed(0)} \\times ${dataSimilarityCol[idx].toFixed(0)})`).join(' + ')}}{\\sqrt{${dataSimilarityRow.map((val, idx) => `(${val.toFixed(0)})^2`).join(' + ')}} \\times \\sqrt{${dataSimilarityCol.map((val, idx) => `(${val.toFixed(0)})^2`).join(' + ')}}} \\newline \\]`
        case "Adjusted Vector Cosine":
            return `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${dataSimilarityRow.map((val, idx) => `(${val.toFixed(2)} \\times ${dataSimilarityCol[idx].toFixed(2)})`).join(' + ')}}{${dataSimilarityRow.map((val, idx) => `\\sqrt{(${val.toFixed(2)})^2 +  (${dataSimilarityCol[idx].toFixed(2)})^2}`).join(' \\times ')}} \\]`
        case "Bhattacharyya Coefficient Similarity (BC)":
            return
        default:
            return

    }
}