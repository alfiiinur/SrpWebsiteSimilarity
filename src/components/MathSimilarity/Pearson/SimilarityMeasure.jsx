import React, { useState } from 'react'
import { MathJaxContext, MathJax } from "better-react-mathjax";
import mathjaxConfig from "../../../mathjax-config";
import { FunctionMeasureDropdown } from "../DropdownFunction/FunctionMeasureDropdown.jsx";
import { AllSimilaritas, getInitialData } from "../../../api/getDataSet.js";
import { getFormulaSimilarity } from './Formula/FormulaSimilarity.jsx';
import ModalSimilarity from './ModalSimilarityMeasure.jsx';


/**
 * |----------------------------------------------------|
 * |                                                    |
 * |                                                    |
 * |                    Component Table                 |
 * |                                                    |
 * |                                                    |
 * |----------------------------------------------------|
 * 
 */
const TableSimilarity = ({ children }) => {
    return <table className="border border-black mt-4">{children}</table>
}

const HeadTableSimilarity = ({ children, opsional }) => {
    return <thead>
        <tr className="bg-gray-200">
            <th className="border border-black px-4 py-2">{opsional === "user-based" ? "U/U" : "I/I"}</th>
            {children}
        </tr>
    </thead>
}

const BodyTableSimilarity = ({ children }) => {
    return (<tbody>
        {children}
    </tbody>)
}

const TrTableSimilarity = ({ children, key }) => {
    return (
        <tr key={key}>
            {children}
        </tr>)
}

const TdTableSimilarity = ({ onClick, children, value, key }) => {
    return (
        <td key={key} className={`border border-black px-4 py-2 text-center cursor-pointer hover:bg-card_green_primary ${value === 1 ? 'bg-red-200' : ''}`}
            onClick={onClick}
        >
            {children}
        </td>)
}

export default function SimilarityMeasure({ opsional, similarity, initialData }, ref) {

    const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
    const [selectedIndex, setSelectedIndex] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal

    const [data] = useState(initialData);
    // get only data
    const [dataOnly] = useState(initialData.data);

    const { result } = AllSimilaritas(data, similarity);

    const FormulaSimilarity = getFormulaSimilarity(similarity, opsional)


    const handleMeanClick = (value, rowIndex, colIndex) => {
        setSelectedMean(value); // Simpan nilai mean yang ditekan
        setSelectedIndex([rowIndex, colIndex])
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedMean(null); // Reset nilai mean yang dipilih
        setSelectedIndex(null)
    };

    const RenderTabelSimilarity = () => {
        if (!result || !result['similarity']) return null;
        const numberOfColumnsSim = result['similarity'][0].length;

        if (!result || !result['mean-centered']) return null;

        return (
            <div className='flex justify-center mt-4'>
                <TableSimilarity className="border border-black mt-4">
                    <HeadTableSimilarity opsional={opsional}>
                        {Array.from({ length: numberOfColumnsSim }, (_, index) => (
                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                        ))}
                    </HeadTableSimilarity>
                    <BodyTableSimilarity>
                        {result['similarity'].map((row, rowIndex) => (
                            <TrTableSimilarity key={rowIndex}>
                                <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                {row.map((value, colIndex) => (
                                    <TdTableSimilarity
                                        key={colIndex}
                                        value={value}
                                        onClick={() => handleMeanClick(value, rowIndex, colIndex)}
                                    >
                                        {value.toFixed(4)}
                                    </TdTableSimilarity>
                                ))}
                            </TrTableSimilarity>
                        ))}
                    </BodyTableSimilarity>
                </TableSimilarity>
                {showModal && (
                    <ModalSimilarity
                        similarity={similarity}
                        opsional={opsional}
                        close={closeModal}
                        selectedIndex={selectedIndex}
                        selectedMean={selectedMean}
                        dataOnly={dataOnly}
                        data={result}
                    />
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4" />
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>{`Mencari Koefisien Korelasi
                    ${similarity} ${opsional.replace("-", " ").toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}`}</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    <MathJax>
                        {FormulaSimilarity.formula}
                    </MathJax>
                </div>
            </MathJaxContext>

            <FunctionMeasureDropdown DetailRumus={FormulaSimilarity.detail_formula} />
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>{`Hasil Fungsi Similarity ${opsional.replace("-", " ").toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase())}`}</h1>

                <RenderTabelSimilarity result={result} handleMeanClick={handleMeanClick} closeModal={closeModal} />
            </div>
            <div>
                <h1 className='font-semibold'>HASIL VISUALISASI SIMILARITY PEARSON</h1>
            </div>

        </div>
    )
}