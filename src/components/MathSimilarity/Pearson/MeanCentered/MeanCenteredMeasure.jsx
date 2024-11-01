import { useState } from "react";
import ModalMeanCenteredMeasure from "./ModalMeanCenteredMeasure";
import { getFormulaMeanCentered } from "../Formula/FormulaMeanCentered";
import { FunctionMeasureDropdown } from "../../DropdownFunction/FunctionMeasureDropdown";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { AllSimilaritas } from "../../../../api/getDataSet";
import { transposeMatrix } from "../../../../helper/helper";

const MeanCenteredMeasure = ({ opsional, similarity, initialData }) => {

    const [selectedValue, setSelectedValue] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedIndex, setSelectedIndex] = useState(null)

    const FormulaMeanCentered = getFormulaMeanCentered(similarity, opsional)


    const handleMeanClick = (value, rowIndex, colIndex) => {
        setSelectedValue(value); // Simpan nilai mean yang ditekan
        setSelectedIndex([rowIndex, colIndex])
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setSelectedValue(null); // Reset nilai mean yang dipilih
        setShowModal(false); // Sembunyikan modal
    };



    const [data] = useState(initialData);
    // get only data
    const [dataOnly] = useState(initialData.data);

    const { result } = AllSimilaritas(data, similarity);

    const dataModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? (dataOnly) : transposeMatrix(dataOnly)) : (opsional === "user-based" ? dataOnly : transposeMatrix(dataOnly))

    const RenderTabelMeanCentered = () => {
        if (!result || !result['mean-centered']) return null;
        const resultModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? transposeMatrix(dataOnly) : (dataOnly)) : (opsional === "user-based" ? result['mean-centered'] : transposeMatrix(result['mean-centered']))
        const numberOfColumns = resultModify[0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-black px-4 py-2">I/U</th>
                            {Array.from({ length: numberOfColumns }, (_, index) => (
                                <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {resultModify.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                {row.map((value, colIndex) => {
                                    const OriginalValue = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? dataModify[colIndex][rowIndex] : dataModify[rowIndex][colIndex]) : (opsional === "user-based" ? dataModify[rowIndex][colIndex] : dataModify[colIndex][rowIndex])


                                    const IsZero = OriginalValue === 0;
                                    return (
                                        <td key={colIndex}
                                            className={`border border-black px-4 py-2 text-center cursor-pointer hover:bg-card_green_primary ${IsZero ? 'bg-red-200' : ''}`}
                                            onClick={() => handleMeanClick(value, rowIndex, colIndex)}
                                        >
                                            {value.toFixed(2)}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showModal && (
                    <ModalMeanCenteredMeasure
                        similarity={similarity}
                        selectedIndex={selectedIndex}
                        selectedValue={selectedValue}
                        dataOnly={dataOnly}
                        result={result}
                        opsional={similarity === "Adjusted Vector Cosine" ? (opsional === "item-based" ? "user-based" : "item-based") : opsional}
                        close={closeModal}
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
                <h1 className='font-poppins font-semibold text-black'>Mencari Mean-Centered Rating Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>
                    <MathJax>
                        {FormulaMeanCentered.formula}
                    </MathJax>
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={FormulaMeanCentered.detail_formula} />
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Mean-Centerd {opsional.replace("-", " ").toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}</h1>
                <RenderTabelMeanCentered />
            </div>
        </div>
    )
}

export default MeanCenteredMeasure