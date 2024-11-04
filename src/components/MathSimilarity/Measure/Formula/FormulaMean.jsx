import { transposeMatrix } from "../../../../helper/helper"
import MathJaxComponent from "../../../../MathJaxComponent"

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
        default:
            return
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
                return `\\[ \\mu_{${index + 1}} = \\frac{\\sum_{i\\in I_{${index + 1}}} r_{${index + 1}i}}{\\left|U_{${index + 1}}\\right|}   \\forall ${index + 1}\\in\\left\\{1...${data.length}\\right\\} \\]`;
            })
        default:
            return
    }
}

export const getFormulaMeanExpression = (opsional, data, selectedIndex, isNotation) => {

    switch (opsional) {
        case "user-based":
            return data.map((userData, index) => {
                const nonZeroIndices = userData
                    .map((val, idx) => (val !== 0 ? idx + 1 : null))
                    .filter((idx) => idx !== null)
                const ValueData = userData.filter(val => val !== 0)


                return `\\[ \\mu_{${index + 1}} = \\frac{(${!isNotation ? ValueData.join(" + ") : (nonZeroIndices.map(idx => `r_{${index + 1}${idx}}`).join(" + "))})}{ | \\left\\{ ${!isNotation ? nonZeroIndices.join(" , ") : (nonZeroIndices.map((_, ind) => `i_{${ind + 1}}`).join(" , "))} \\right\\} | }   \\]`;
            })
        case "item-based":
            return (data).map((row, index) => {
                const nonZeroIndices = row
                    .map((val, idx) => (val !== 0 ? idx + 1 : null))
                    .filter((idx) => idx !== null)
                const ValueData = row.filter(val => val !== 0)


                return `\\[ \\mu_{${index + 1}} = \\frac{(${!isNotation ? ValueData.join(" + ") : (nonZeroIndices.map(idx => `r_{${idx}${index + 1}}`).join(" + "))})}{ | \\left\\{ ${!isNotation ? nonZeroIndices.join(" , ") : (nonZeroIndices.map((_, ind) => `u_{${ind + 1}}`).join(" , "))} \\right\\} | }   \\]`;
            });
        default:
            return
    }
}

export const getFormulaMeanValue = (opsional, data, isNotation) => {

    switch (opsional) {
        case "user-based":
            return data.map((row, index) => {
                const nonZeroIndices = row
                    .map((val, idx) => (val !== 0 ? idx + 1 : null))
                    .filter((idx) => idx !== null)

                const valueData = row.filter((val) => val !== 0)

                return `\\[ \\mu_{${index + 1}} = \\frac{${!isNotation ? valueData.join(" + ") : nonZeroIndices.map(val => `r_{${val}${index + 1}}`).join(" + ")}}{ ${!isNotation ? valueData.length : `I_${index + 1}`}}   \\]`;
            });

        case "item-based":
            return data.map((row, index) => {
                const nonZeroIndices = row
                    .map((val, idx) => (val !== 0 ? idx + 1 : null))
                    .filter((idx) => idx !== null)

                const valueData = row.filter((val) => val !== 0)
                return `\\[ \\mu_{${index + 1}} = \\frac{${!isNotation ? valueData.join(" + ") : nonZeroIndices.map(val => `r_{${index + 1}${val}}`).join(" + ")}}{ ${!isNotation ? valueData.length : `U_${index + 1}`}}   \\]`;
            });
        default:
            return
    }
}