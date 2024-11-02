import { transposeMatrix } from "../../../../helper/helper"

export const getFormulaPrediction = (similarity, opsional) => {
    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? "item-based" : "user-based") : opsional

    switch (opsionalModify) {
        case "user-based":
            return {
                formula: `\\[ {\\widetilde{r_{ui}}} = \\overline{r_{u}} +\\frac{\\sum_{v\\in N_u^i} Sim_{uv}*\\left(r_{vi} - \\overline{r_{v}}\\right)}{\\sum_{v \\in N_u^i}\\mid Sim_{uv} \\mid} \\]`,
                arg_max: `\\[  X_u(j)=\\ \\begin{matrix}k\\\\argmax\\ \\\\i\\ \\in\\ \\hat{I}\\\\\\end{matrix}{\\hat{r}}_{ui}\\  \\]`,
                detail_formula: [
                    `\\[ \\overline{r_{u}} = \\text{Rata-rata rating yang diberikan oleh user u pada seluruh item} \\] `,
                    `\\[ \\overline{r_{v}} = \\text{Rata-rata rating yang diberikan oleh user v pada seluruh item} \\] `,
                    `\\[ Sim_{uv} = \\text{Nilai similarity antara user u dan v} \\] `,
                    `\\[ r_{vi} = \\text{Nilai rating yang diberikan oleh user v terhadap item i} \\] `,
                ]
            }
        case "item-based":
            return {
                formula: `\\[ {\\widetilde{r_{ui}}} = \\overline{r_{i}} +\\frac{\\sum{_j\\in N_u^i} Sim_{ij}*\\left(r_{uj} - \\overline{r_{j}}\\right)}{\\sum_{j \\in N_u^i}\\mid Sim_{ij} \\mid} \\]`,
                arg_max: `\\[  X_u(j)=\\ \\begin{matrix}k\\\\argmax\\ \\\\i\\ \\in\\ \\hat{I}\\\\\\end{matrix}{\\hat{r}}_{ui}\\  \\]`,
                detail_formula: [
                    `\\[ \\overline{r_{i}} = \\text{Rata-rata nilai rating pada item i yang telah merating} \\] `,
                    `\\[ \\overline{r_{j}} = \\text{Rata-rata nilai rating pada item j yang telah merating} \\] `,
                    `\\[ Sim_{ij} = \\text{Nilai similaritas antara item i dan j} \\] `,
                    `\\[ r_{uj} = \\text{Nilai rating pada user v terhadap item j} \\] `,
                ]
            }
        default:
            return
    }
}

export const getFormulaArgMax = (rowIndex, colIndex, opsional, similarity, topSimilarity) => {
    console.log(topSimilarity);
    switch (opsional) {
        case "user-based":
            return `\\[  Y_${(colIndex + 1)}(${(rowIndex + 1)})=\\ \\begin{matrix}2\\\\argmax\\ \\\\u \\in U_{${(colIndex + 1)}} \\end{matrix}Sim(${(rowIndex + 1)},u)\\ = \\{ ${topSimilarity.map(sim => sim.index + 1).join(",")} \\} \\]`
        case "item-based":
            return `\\[  Y_${(rowIndex + 1)}(${(colIndex + 1)})=\\ \\begin{matrix}2\\\\argmax\\ \\\\i \\in I_{${(rowIndex + 1)}} \\end{matrix}Sim(i,${(colIndex + 1)})\\ = \\ \\{ ${topSimilarity.map(sim => sim.index + 1).join(",")} \\} \\]`
        default:
            return;
    }
}

export const getFormulaPredictionIndex = (rowIndex, colIndex, similarity, opsional) => {
    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? "item-based" : "user-based") : opsional

    switch (opsionalModify) {
        case "user-based":
            return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = \\overline{r_{${rowIndex + 1}}} +\\frac{\\sum_{v\\in Y_${rowIndex + 1}(${colIndex + 1})} Sim_{${rowIndex + 1}v} \\times s_{v${colIndex + 1}}}{\\sum_{v \\in Y_${rowIndex + 1}(${colIndex + 1})}\\mid Sim_{${rowIndex + 1}v} \\mid} \\]`
        case "item-based":
            return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = \\overline{r_{${colIndex + 1}}} +\\frac{\\sum_{v\\in Y_${(colIndex + 1)}(${(rowIndex + 1)})} Sim_{v${rowIndex + 1}} \\times s_{${colIndex + 1}v}}{\\sum_{v \\in Y_${(colIndex + 1)}(${(rowIndex + 1)})}\\mid Sim_{v${rowIndex + 1}} \\mid} \\]`
        default:
            break;
    }
}

export const getFormulaPredictionValue = (rowIndex, colIndex, similarValues, result, similarity, opsional) => {
    console.log(rowIndex, colIndex, similarValues, result, similarity, opsional);

    const resultMeanCentered = similarity === "Adjusted Vector Cosine" ? transposeMatrix(result["mean-centered-brother"]) : result["mean-centered"]
    const resultMean = similarity === "Adjusted Vector Cosine" ? (result["mean-list-brother"]) : result["mean-list"]


    switch (opsional) {
        case "user-based":
            return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {${resultMean[rowIndex].toFixed(3)}} + \\frac{${similarValues.filter(sim => resultMeanCentered[sim.index][colIndex] !== 0)
                .map(sim => (`\\left(${sim.value.toFixed(4)} \\times \\left(${resultMeanCentered[sim.index][colIndex].toFixed(2)}\\right)\\right)`
                )).join(' + ')}}{${similarValues.filter(sim => resultMeanCentered[sim.index][colIndex] !== 0)
                    .map(sim => `\\mid ${sim.value.toFixed(4)} \\mid`)
                    .join(' + ')}} \\]`;

        case "item-based":
            return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {${resultMean[colIndex].toFixed(3)}} + \\frac{${similarValues.filter(sim => resultMeanCentered[sim.index][rowIndex] !== 0)
                .map(sim => (`\\left(${sim.value.toFixed(4)} \\times \\left(${resultMeanCentered[sim.index][rowIndex].toFixed(2)}\\right)\\right)`))
                .join(' + ')}}{${similarValues.filter(sim => resultMeanCentered[sim.index][rowIndex] !== 0)
                    .map(sim => `\\mid ${sim.value.toFixed(4)} \\mid`)
                    .join(' + ')}} \\]`
        default:
            return
    }
}