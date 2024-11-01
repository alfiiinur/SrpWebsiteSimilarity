export const getFormulaMean = (opsional) => {
    switch (opsional) {
        case "user-based":
            return {
                formula: `\\[ \\mu_{u} = \\frac{\\sum_{i\\in I_{u}} r_{ui}}{\\left|I_{u}\\right|} \\ \\ \\  \\forall u\\in\\left\\{1...m\\right\\} \\]`,
                formula_detail: [
                    `\\[ \\mu_{u} = \\text{Rata-rata pada user u} \\] `,
                    `\\[ Iu = \\text{Himpunan item yang telah diberi rating oleh user u} \\] `,
                    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`
                ]
            }
        case "item-based":
            return {
                formula: `\\[ U_{i} = \\frac{\\sum_{I\\in U_{i}} r_{ui}}{\\left|U_{i}\\right|}  \\ \\ \\   \\forall u\\in\\left\\{1...m\\right\\} \\]`,
                formula_detail: [
                    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,
                    `\\[ Ui = \\text{Himpunan user yang telah memberikan rating oleh pada item i} \\] `,
                    `\\[ r_{uv} = \\text{Rating user u terhadap item i} \\]`
                ]
            }
    }
}

export const getFormulaMeanIndex = (opsional, data) => {

    switch (opsional) {
        case "user-based":
            return data.map((_, index) => {
                return `\\[ \\mu_{${index + 1}} = \\frac{\\sum_{i\\in I_{${index + 1}}} r_{${index + 1}i}}{\\left|I_{${index + 1}}\\right|} \\ \\ \\   \\forall ${index + 1}\\in\\left\\{1...${data.length}\\right\\} \\]`;
            })

        case "item-based":
            return data.map((_, index) => {
                return `\\[ \\mu_{${index + 1}} = \\frac{\\sum_{i\\in I_{${index + 1}}} r_{${index + 1}i}}{\\left|I_{${index + 1}}\\right|}   \\forall ${index + 1}\\in\\left\\{1...${data.length}\\right\\} \\]`;
            })
    }
}

export const getFormulaMeanExpression = (opsional, data) => {
    switch (opsional) {
        case "user-based":
            return data.map((userData, index) => {
                const nonZeroIndices = userData
                    .map((val, idx) => (val !== 0 ? idx + 1 : null))
                    .filter((idx) => idx !== null)

                return `\\[ \\mu_{${index + 1}} = \\frac{(${nonZeroIndices.map(idx => `r_{${index + 1}${idx}}`).join(" + ")})}{ | \\left\\{ ${nonZeroIndices.join(" , ")} \\right\\} | }   \\]`;
            })
        case "item-based":
            return data.map((row, index) => {
                const nonZeroIndices = row.map((val, idx) => (val !== 0 ? idx + 1 : null)).filter((idx) => idx !== null)

                return `\\[ \\mu_{${index + 1}} = \\frac{(${nonZeroIndices.map(idx => `r_{${index + 1}${idx}}`).join(" + ")})}{ | \\left\\{ ${nonZeroIndices.join(" , ")} \\right\\} | }  \\]`;
            });
    }
}

export const getFormulaMeanValue = (opsional, data) => {

    switch (opsional) {
        case "user-based":
            return data.map((row, index) => (`\\[ \\mu_{${index + 1}} = \\frac{${row.filter((val) => val !== 0).join(" + ")}}{ ${row.filter((val) => val !== 0).length}}  \\]`))

        case "item-based":
            return data.map((row, index) => {
                return `\\[ \\mu_{${index + 1}} = \\frac{${row.filter((val) => val !== 0).join(" + ")}}{ ${row.filter((val) => val !== 0).length}}   \\]`;
            });
    }
}