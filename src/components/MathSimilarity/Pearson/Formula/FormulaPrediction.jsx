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

export const getFormulaPredictionIndex = (rowIndex, colIndex, similarity, opsional) => {
    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? "item-based" : "user-based") : opsional

    switch (opsionalModify) {
        case "user-based":
            return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = \\overline{r_{${rowIndex + 1}}} +\\frac{\\sum_{v\\in N_${rowIndex + 1}^${colIndex + 1}} Sim_{${rowIndex + 1}v} \\times \\left(r_{v${colIndex + 1}} - \\overline{r_{v}}\\right)}{\\sum_{v \\in N_${rowIndex + 1}^${colIndex + 1}}\\mid Sim_{${rowIndex + 1}v} \\mid} \\]`
        case "item-based":
            return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = \\overline{r_{${rowIndex + 1}}} +\\frac{\\sum_{v\\in N_${rowIndex + 1}^${colIndex + 1}} Sim_{${rowIndex + 1}v} \\times \\left(r_{v${colIndex + 1}} - \\overline{r_{v}}\\right)}{\\sum_{v \\in N_${rowIndex + 1}^${colIndex + 1}}\\mid Sim_{${rowIndex + 1}v} \\mid} \\]`
        default:
            break;
    }
}

export const getFormulaPredictionValue = (rowIndex, colIndex, similarValues, result, similarity, opsional) => {
    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? "item-based" : "user-based") : opsional

    switch (opsionalModify) {
        case "user-based":
            return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {${result['mean-list'][rowIndex]}} + \\frac{${similarValues.filter(sim => result['mean-centered'][sim.index][rowIndex] !== 0)
                .map(sim => (`\\left(${sim.value.toFixed(4)} \\times \\left(${result['mean-centered'][sim.index][rowIndex].toFixed(2)}\\right)\\right)`
                )).join(' + ')}}{${similarValues.filter(sim => result['mean-centered'][sim.index][rowIndex] !== 0)
                    .map(sim => `\\mid ${sim.value.toFixed(4)} \\mid`)
                    .join(' + ')}} \\]`;

        case "item-based":
            return `\\[ {\\widetilde{r_{${rowIndex + 1}${colIndex + 1}}}} = {${result['mean-list'][rowIndex]}} + \\frac{${similarValues.filter(sim => result['mean-centered'][sim.index][rowIndex] !== 0)
                .map(sim => (`\\left(${sim.value.toFixed(4)} \\times \\left(${result['mean-centered'][sim.index][rowIndex].toFixed(2)}\\right)\\right)`))
                .join(' + ')}}{${similarValues.filter(sim => result['mean-centered'][sim.index][rowIndex] !== 0)
                    .map(sim => `\\mid ${sim.value.toFixed(4)} \\mid`)
                    .join(' + ')}} \\]`
        default:
            return
    }
}