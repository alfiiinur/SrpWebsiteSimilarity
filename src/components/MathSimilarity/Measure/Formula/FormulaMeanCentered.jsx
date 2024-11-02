export const getFormulaMeanCentered = (similarity, opsional) => {
    const opsionalModify = similarity !== "Adjusted Vector Cosine" ? (
        opsional === "item-based" ? "user-based" : "item-based"
    ) : opsional

    switch (opsionalModify) {
        case "user-based":
            return {
                formula: `\\[ S_{ui} = r_{ui} -\\mu_{i}  \\ \\ \\  \\forall u \\in \\left\\{1...m\\right\\} \\]`,
                detail_formula: [
                    `\\[ S_{ui} = \\text{Rata-rata pada user u} \\] `,
                    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
                    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,
                ]
            }
        case "item-based":
            return {
                formula: `\\[ S_{ui} = r_{ui} -\\mu_{i}  \\ \\ \\  \\forall i \\in \\left\\{1...m\\right\\}  \\]`,
                detail_formula: [
                    `\\[ S_{ui} = \\text{Rata-rata pada user u} \\] `,
                    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
                    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,
                ]
            }
        default:
            return;
    }
}

export const getFormulaMeanCenteredIndex = (rowIndex, colIndex, opsional) => {
    return `\\[ S_{${rowIndex + 1}${colIndex + 1}} = r_{${rowIndex + 1}${colIndex + 1}} -\\mu_{${(opsional === "user-based" ? rowIndex : colIndex) + 1}} \\]`
}

export const getFormulaMeanCenteredValue = (rowIndex, colIndex, data, result, opsional, similarity) => {

    // console.log(data, rowIndex, colIndex)

    const selectedValue = rowIndex !== null && colIndex !== null ?
        (
            similarity === "Adjusted Vector Cosine" ?
                (opsional === "user-based" ? data[colIndex][rowIndex] : data[rowIndex][colIndex])
                : (data[rowIndex][colIndex]))
        : null

    const selectedMeanValue = rowIndex !== null ? result['mean-list'][opsional === "user-based" ? rowIndex : colIndex] : null

    return `\\[ S_{${rowIndex + 1}${colIndex + 1}} = ${selectedValue} - ${selectedMeanValue} \\]`
}