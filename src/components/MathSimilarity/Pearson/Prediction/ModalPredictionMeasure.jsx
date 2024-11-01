import { getFormulaPredictionIndex, getFormulaPredictionValue } from "../Formula/FormulaPrediction"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import mathjaxConfig from "../../../../mathjax-config"

const ModalPredictionMeasure = ({ opsional, similarity, topSimilarities, selectedValue, selectedIndex, data, result, close }) => {

    console.log(` <ModalPredictionMeasure
        opsional=${opsional}
        similarity=${similarity}
        topSimilarities=${topSimilarities}
        selectedIndex=${selectedIndex}
        data=${data}
        result=${result}
        close=${close}
        selectedValue=${selectedValue}
    />`)
    const PredictionIndex = ({ rowIndex, colIndex, similarity, opsional }) => {
        const expression = getFormulaPredictionIndex(rowIndex, colIndex, similarity, opsional)
        return (
            <MathJax>
                {expression}
            </MathJax>
        )
    }

    const PredictionValue = (rowIndex, colIndex, similarValues, result, similarity, opsional) => {
        const expression = getFormulaPredictionValue(rowIndex, colIndex, similarValues, result, similarity, opsional)
        return (
            <MathJax>
                {expression}
            </MathJax>
        )
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
                <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Prediksi</h2>
                <div className="overflow-x-auto">
                    <h2 className='font-semibold'>Data Matrix Rating</h2>
                    <table className="border border-black mt-4 mx-auto text-center my-4 ">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-black px-4 py-2">User</th>
                                <th className="border border-black px-4 py-2">Data Rating
                                    (Item {selectedIndex[opsional === "item-based" ? 0 : 1] + 1})
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => {
                                console.log(`
                                    data[rowIndex][selectedIndex[0]],${data[rowIndex][selectedIndex[opsional === "item-based" ? 0 : 1]]} 
                                    rowIndex,${rowIndex} 
                                    selectedIndex[0],${selectedIndex[0]}`);
                                const IsZero = data[rowIndex][selectedIndex[opsional === "item-based" ? 0 : 1]] === 0


                                return (
                                    <tr key={rowIndex}>
                                        <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                        <td
                                            className={`border border-black px-4 py-2 text-center ${IsZero ? 'bg-red-200' : ''}`}
                                        >
                                            {row[selectedIndex[opsional === "item-based" ? 0 : 1]]?.toFixed(1) || 'N/A'} {/* Tampilkan nilai mean-centered untuk item yang dipilih */}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <h2 className='font-semibold'>Matrix Mean Rating</h2>

                    <table className="border border-black mt-4 mx-auto text-center my-4">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-black px-4 py-2">U</th>
                                <th className="border border-black italic px-4 py-2">μ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result['mean-list'].map((mean, index) => {
                                const isActiveUser = index === selectedIndex[0]; // Highlight the active user in the mean rating table

                                return (
                                    <tr key={index}
                                        className={isActiveUser ? 'bg-green-200' : ''}> {/* Highlight active user */}
                                        <td className="border border-black px-4 py-2">{index + 1}</td>
                                        <td className="border border-black px-4 py-2">
                                            <div className="text-center">
                                                {mean}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <h2 className='font-semibold'>Matrix Mean-Centered Rating</h2>

                    <table className="border border-black mt-4 mx-auto text-center ">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-black px-4 py-2">Item</th>
                                <th className="border border-black px-4 py-2">Mean-Centered
                                    (User {selectedIndex[1] + 1})
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {result['mean-centered'].map((row, rowIndex) => {
                                const OriginalValue = opsional === "user-based" ? (data[rowIndex][selectedIndex[0]]) : (data[selectedIndex[0]][rowIndex])
                                const IsZero = OriginalValue === 0
                                const isTopSimilarity = topSimilarities.some(top => top.index === rowIndex && !IsZero)

                                return (
                                    <tr key={rowIndex}>
                                        <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                        <td className={`border border-black px-4 py-2 text-center ${IsZero ? 'bg-red-200' : ''} ${isTopSimilarity ? 'bg-green-200' : ''}`}>
                                            {row[selectedIndex[0]]?.toFixed(2) || 'N/A'} {/* Display mean-centered value */}
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>


                    <h2 className='font-semibold my-4'>Nilai Similarity</h2>
                    {selectedIndex[1] < result['similarity'].length ? (
                        <table className="border border-black mt-4 mx-auto text-center">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-black px-4 py-2">Item</th>
                                    <th className="border border-black px-4 py-2">Nilai Similaritas
                                        (Item {selectedIndex[1] + 1})
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {result['similarity'].map((row, colIndex) => {
                                    const isTopSimilarity = topSimilarities.some(top => top.index === colIndex); // Check if this row is in the top similarities

                                    return (
                                        <tr key={colIndex}>
                                            <td className="border border-black px-4 py-2 bg-gray-200">{colIndex + 1}</td>
                                            <td className={`border border-black px-4 py-2 text-center  ${isTopSimilarity ? 'bg-green-200' : ''}`}>
                                                {row[selectedIndex[1]]?.toFixed(4) || 'N/A'} {/* Display similarity value */}
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                    ) : (
                        <p>Data for this user is not available.</p>
                    )}

                </div>

                {/* Menampilkan perhitungan manual */}

                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-center items-center flex-col px-10'>
                        {selectedIndex ? (
                            <PredictionIndex
                                rowIndex={selectedIndex[0]}
                                colIndex={selectedIndex[1]}
                                opsional={opsional}
                                similarity={similarity}
                            />
                        ) : (
                            <p>No expression selected.</p>
                        )}
                    </div>
                </MathJaxContext>

                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-center items-center flex-col px-10'>
                        {selectedIndex ? (
                            <PredictionValue
                                rowIndex={selectedIndex[0]}
                                colIndex={selectedIndex[1]}
                                similarValues={topSimilarities}
                                result={result}
                                opsional={opsional}
                                similarity={similarity}
                            />
                        ) : (
                            <p>No expression selected.</p>
                        )}
                    </div>
                </MathJaxContext>


                <p className="text-xl font-bold text-gray-700">Hasil prdiksi rating Item
                    target {selectedIndex[1] + 1} terhadap
                    item {selectedIndex[1] + 1} adalah = {selectedValue.toFixed(3)}</p>


                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={close}
                >
                    Tutup
                </button>
            </div>
        </div>
    )
}

export default ModalPredictionMeasure