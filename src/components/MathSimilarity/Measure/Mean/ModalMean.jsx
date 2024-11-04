import { MathJaxContext, MathJax } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import { useState } from "react"
import { Input } from "@headlessui/react";
import MathJaxComponent from "../../../../MathJaxComponent"
import { getFormulaMeanIndex, getFormulaMeanExpression, getFormulaMeanValue } from "../Formula/FormulaMean";
import { transposeMatrix } from "../../../../helper/helper";


const ModalMean = ({ opsional, similarity, data, selectedIndex, selectedMean, close }) => {

    const [isNotation, setIsNotation] = useState(false)

    const dataModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? transposeMatrix(data) : data) : (opsional === "user-based" ? (data) : transposeMatrix(data))

    const opsionalModify = similarity === "Adjusted Vector Cosine" ? (opsional === "user-based" ? "item-based" : "user-based") : opsional


    const meanRumusIdx = getFormulaMeanIndex(opsional, data, similarity)

    const meanIndexExp = getFormulaMeanExpression(opsional, data, selectedIndex[0], isNotation)

    const meanExpressionsValues = getFormulaMeanValue(opsional, data, isNotation)

    const toggleIsNotation = () => {
        setIsNotation(!isNotation)
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Mean <span
                    className='italic'>(μ)</span> {opsional.split("-")[0]} - {selectedIndex + 1}</h2>

                <div>
                    <label class="inline-flex items-center cursor-pointer">
                        <Input
                            type="checkbox"
                            value=""
                            class="sr-only peer"
                            onChange={toggleIsNotation}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-300"></div>
                        <span class="ms-3 text-sm font-medium text-gray-950">Tampilkan Notasi</span>
                    </label>
                </div>

                <div className='flex flex-row justify-center m-3 overflow-x-auto'>


                    <div className='overflow-x-auto'>
                        <h2 className='font-semibold'>Data Rating (r)</h2>
                        <table className="border border-black mt-4 mx-auto text-center">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-black px-4 py-2">U/I</th>
                                    {Array.from({ length: dataModify[0].length }, (_, index) => (  // Menggunakan panjang kolom dari data
                                        <th key={index}
                                            className="border border-black px-4 py-2">{!isNotation ? (index + 1) : <MathJaxComponent>{`\\[ i_${index + 1} \\]`}</MathJaxComponent>}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dataModify.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="border border-black px-4 py-2 bg-gray-200">{!isNotation ? (rowIndex + 1) : <MathJaxComponent>{`\\[ u_${rowIndex + 1} \\]`}</MathJaxComponent>}</td>
                                        {row.map((value, colIndex) => {
                                            const cellClass = value === 0
                                                ? 'border border-black px-4 py-2 text-center bg-red-200'
                                                : 'border border-black px-4 py-2 text-center';
                                            const indicator = selectedIndex.includes(opsionalModify === "user-based" ? rowIndex : colIndex)
                                                ? "bg-green-200" : ""
                                            console.log(selectedIndex.includes(colIndex));

                                            return (
                                                <td key={colIndex}
                                                    // className="border border-black px-4 py-2 text-center"
                                                    className={`${indicator} ${cellClass}`}
                                                    title={isNotation ? (value.toFixed ? value.toFixed(0) : value) : `r${colIndex + 1}${rowIndex + 1}`}
                                                >
                                                    {!isNotation ? (value.toFixed ? value.toFixed(0) : value) : <MathJaxComponent>{`\\[  r_{${colIndex + 1}${rowIndex + 1}} \\]`}</MathJaxComponent>} {/* Format desimal hanya jika diperlukan */}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Menampilkan rumus mean menggunakan MathJax */}
                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-center items-center flex-col px-10'>
                        {/* Tampilkan hanya rumus dan hasil untuk user yang dipilih */}
                        {meanRumusIdx[selectedIndex[0]]?.length > 0 ? (
                            <div className="text-center">
                                <MathJax >
                                    {/* {meanRumusIdx[selectedIndex]} */}
                                    {meanRumusIdx[selectedIndex[0]]}
                                </MathJax>
                            </div>
                        ) : (
                            <p className="text-center">Data untuk user ini tidak tersedia.</p>
                        )}

                        {meanIndexExp[selectedIndex[0]]?.length > 0 ? (
                            <div className="text-center">
                                <MathJax >
                                    {meanIndexExp[selectedIndex[0]]}
                                </MathJax>
                            </div>
                        ) : (
                            <p className="text-center">Data untuk user ini tidak tersedia.</p>
                        )}

                        {meanExpressionsValues[selectedIndex[0]]?.length > 0 ? (
                            <div className="text-center">
                                <MathJax >
                                    {meanExpressionsValues[selectedIndex[0]]}
                                </MathJax>
                            </div>
                        ) : (
                            <p className="text-center">Data untuk user ini tidak tersedia.</p>
                        )}
                    </div>
                </MathJaxContext>

                {/* Menampilkan perhitungan manual */}
                <p className="text-xl font-bold text-gray-700 text-center">Hasil mean dari
                    item {selectedIndex[0] + 1} adalah = {selectedMean}</p>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={close} // Menutup modal saat tombol ditekan
                >
                    Tutup
                </button>
            </div>
        </div>
    )
}

export default ModalMean