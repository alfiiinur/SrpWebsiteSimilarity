import mathjaxConfig from "../../../../mathjax-config"
import ModalPredictionMeasure from "./ModalPredictionMeasure"
import { getFormulaPrediction } from "../Formula/FormulaPrediction"
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown"
import { useState } from "react"
import { AllSimilaritas } from "../../../../api/getDataSet"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import { transposeMatrix } from "../../../../helper/helper"

export function PredictionMeasure({ opsional, similarity, initialData }) {

    const [data] = useState(initialData)
    const [dataOnly] = useState(initialData.data)
    const formula = getFormulaPrediction(similarity, opsional)

    const dataModify = opsional === "item-based" || similarity === "Adjusted Vector Cosine" ? transposeMatrix(dataOnly) : dataOnly

    const { result } = AllSimilaritas(data, similarity);

    const [selectedValue, setSelectedValue] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState([])

    const [topSimilarities, setTopSimilarities] = useState([]);

    const findTopSimilaritiesWithValidRatings = (similarityData, dataModify, itemIndex, userIndex, count = 2) => {
        const similarities = similarityData.map((row, index) => {
            console.log("dataModify", dataModify);

            console.log("dataModify", opsional === "item-based" ? transposeMatrix(dataModify)[userIndex][index] : dataModify[index][itemIndex], (opsional === "item-based" ? dataModify[itemIndex][index] : dataModify[index][itemIndex]) !== 0, "&&", index === itemIndex, "=", index === itemIndex ? false : (opsional === "item-based" ? dataModify[itemIndex][index] : dataModify[index][itemIndex]) !== 0, index, itemIndex);
            return ({
                index,
                value: row[opsional === "user-based" ? userIndex : itemIndex],
                hasRated: index === itemIndex ? false : (opsional === "item-based" ? transposeMatrix(dataModify)[userIndex][index] : dataModify[index][itemIndex]) !== 0
            })
        });
        console.log("similarities", similarities);


        const validSimilarities = similarities.filter(item => item.hasRated).sort((a, b) => b.value - a.value)
        console.log("validSimilarities", validSimilarities);

        return validSimilarities.slice(0, count)
    };



    const handleMeanClick = (value, rowIndex, colIndex) => {
        setSelectedValue(value)
        setSelectedIndex([rowIndex, colIndex])
        const top = findTopSimilaritiesWithValidRatings(result['similarity'], dataModify, colIndex, rowIndex);
        setTopSimilarities(top);
        setShowModal(true)
    };

    const closeModal = () => {
        setShowModal(false)
        setSelectedIndex([])
        setSelectedValue(null)
        setTopSimilarities(null)
    };

    const RenderTabelPrediksi = () => {
        if (!result || !result['prediction']) return null;

        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-black px-4 py-2">U/I</th>
                            {Array.from({ length: result['prediction'][0].length }, (_, index) => (
                                <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    {/* <tbody> */}
                    {result['prediction'].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-black px-4 py-2 bg-blue-200">{rowIndex + 1}</td>
                            {row.map((value, colIndex) => {
                                const IsZero = dataOnly[rowIndex][colIndex] === 0;
                                return (
                                    <td key={colIndex}
                                        className={`border border-black px-4 py-2 text-center ${IsZero ? 'bg-red-200 cursor-pointer hover:bg-card_green_primary' : ''}`}
                                        onClick={IsZero ? () => handleMeanClick(value, rowIndex, colIndex) : undefined}

                                    >
                                        {value.toFixed(3)} {/* Format desimal */}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                    {/* </tbody> */}
                </table>
                {/*    show modal*/}
                {
                    showModal && selectedIndex[1] !== null && selectedIndex[0] !== null && (

                        < ModalPredictionMeasure
                            opsional={opsional}
                            similarity={similarity}
                            topSimilarities={topSimilarities}
                            selectedIndex={selectedIndex}
                            data={dataModify}
                            result={result}
                            close={closeModal}
                            selectedValue={selectedValue}
                        />

                    )}
            </div>
        );
    };

    return (
        <div>
            <div className="flex items-center">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4" />
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Menghitung Prediksi {opsional.replace("-", " ").toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}</h1>
            </div>
            <div className='text-start ml-10'>
                <h2 className='font-semibold'>1. Menentukan {opsional.split()[0]} Target</h2>
                <h2 className='font-semibold'>2. {opsional === "user-based" ? "Mencari daftar item yang belum diberi rating user target" : "Mencari daftar user yang belum memberi rating user target"}</h2>
                <h2 className='font-semibold'>3. Menentukan tetangga terdekat {opsional.split()[0]} target</h2>
                <p className='text-gray-700 font-medium ml-5 text-justify '>Tetangga terdekat X<sub>u</sub>(j) merupakan
                    himpunan sejumlah k user yang merupakan tetangga terdekat (atau similar dengan ) user target u, yang
                    telah memberikan rating pada item j</p>
                <p className='ml-5 font-semibold'>Catatan : | X<sub>u</sub>(j) | ≤ k</p>
                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-start items-start flex-row my-5 pl-5'>
                        <div className='border-2 py-3 px-3 border-black rounded-lg'>
                            <MathJax>
                                {formula.arg_max}
                            </MathJax>
                        </div>

                        <p className='ml-4 items-center text-red-500 font-semibold text-justify'>Di mana himpunan
                            didapatkan berdasarkan urutan nilai similarity (dari yang terbesar ke yang terkecil)</p>
                    </div>

                </MathJaxContext>
                <h2 className='font-semibold'>4. Menentukan prediksi rating</h2>

            </div>
            <div className="flex items-center">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4" />
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Fungsi Prediksi Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>
                    <MathJax>
                        {formula.formula}
                    </MathJax>
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={formula.detail_formula} />
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Prediksi {opsional.replace("-", " ").toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}</h1>
                {/*    call api */}
                <RenderTabelPrediksi />
            </div>

        </div>
    )
}

export default PredictionMeasure