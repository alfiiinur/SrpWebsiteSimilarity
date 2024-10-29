export const getFormulaMeanCentered = (similarity, opsional) => {
    opsionalModify = similarity !== "Adjusted Vector Cosine" ? (
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