import { MathJaxContext, MathJax } from "better-react-mathjax";
import mathjaxConfig from "../../../mathjax-config";
import { FormulaSimilarityIndex, FormulaSimilarityNonZero, FormulaSimilarityValue, getFormulaSimilarity } from "./Formula/FormulaSimilarity";
import { transposeMatrix } from "../../../helper/helper";

const SimilarityIndex = ({ rowIndex, colIndex, similarity, opsional }) => {
    const expression = FormulaSimilarityIndex(rowIndex, colIndex, opsional, similarity)
    return (
        <>
            <MathJax>
                {getFormulaSimilarity(similarity, opsional).formula}
                {expression}
            </MathJax>
        </>
    )
}

const SimilarityValue = ({ rowIndex, colIndex, data, dataOnly, similarity, selectedMean, opsional }) => {
    const dataModify = opsional === "item-based" ? transposeMatrix(dataOnly) : dataOnly
    // const dataModify = transposeMatrix(dataOnly)

    const nonZeroIndexesRow = dataModify[rowIndex].map((row, index) => (row !== 0 ? index : null)).filter(index => index !== null);
    console.log("dataModify[rowIndex]", dataModify[rowIndex], "nonZeroIndexesRow", nonZeroIndexesRow);
    const nonZeroIndexesCol = dataModify[colIndex].map((row, index) => (row !== 0 ? index : null)).filter(index => index !== null);

    const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));
    console.log("intersection", intersection);

    const dataSimilarity = similarity !== "Vector Cosine" ? (
        similarity === "Bhattacharyya Coefficient Similarity (BC)" ? data["probability"] :
            (data["mean-centered"])
    ) : dataModify

    if (!dataSimilarity || dataSimilarity.length === 0) return null;

    const dataSimilarityRow = (similarity === "Bhattacharyya Coefficient Similarity (BC)" ? data['probability'][rowIndex + 1] : (intersection.map(i => {
        return dataSimilarity[rowIndex][i]
    })))

    const dataSimilarityCol = (similarity === "Bhattacharyya Coefficient Similarity (BC)" ? data['probability'][rowIndex + 1] : (intersection.map(i => {
        return dataSimilarity[colIndex][i]
    })))

    if (!dataSimilarityRow || !dataSimilarityCol) return null;

    const { formula, result_formula } = FormulaSimilarityValue(
        rowIndex,
        colIndex,
        dataSimilarityRow,
        dataSimilarityCol,
        selectedMean,
        similarity,
    )

    return (
        <>
            <MathJax>
                {formula}
                {result_formula}
            </MathJax>
        </>)
}

const SimilarityIndexNonZero = ({ rowIndex, colIndex, dataOnly, similarity, opsional }) => {

    const dataModify = opsional === "item-based" ? transposeMatrix(dataOnly) : dataOnly

    // Ambil indeks non-zero dari kolom colIndex
    const nonZeroIndexesCol1 = dataModify[rowIndex].map((row, index) => {

        return row !== 0 ? index + 1 : null
    })
        .filter(index => index !== null); // +1 untuk 1-based indexing


    // Ambil indeks non-zero dari kolom rowIndex (yang dipakai sebagai perbandingan)

    const nonZeroIndexesCol2 = dataModify[colIndex].map((row, index) => (row !== 0 ? index + 1 : null))
        .filter(index => index !== null);

    // Cari intersection antara kedua kolom
    const intersection = nonZeroIndexesCol1.filter(index => nonZeroIndexesCol2.includes(index));

    const { FormulaWithValue, FormulaWithoutValue } = FormulaSimilarityNonZero(
        rowIndex,
        colIndex,
        similarity,
        opsional,
        nonZeroIndexesCol1,
        nonZeroIndexesCol2,
        intersection
    )

    return (
        <>
            <MathJax>
                {FormulaWithValue}
                {FormulaWithoutValue}
            </MathJax>
        </>
    );
};

const ModalSimilarity = ({ data, close, selectedIndex, selectedMean, dataOnly, similarity, opsional }) => {

    const dataModify = (similarity !== "Vector Cosine" && similarity !== "Bhattacharyya Coefficient Similarity (BC)") ? (
        (similarity === "Adjusted Vector Cosine" || opsional === "item-based") ? transposeMatrix(data["mean-centered"]) : data["mean-centered"]
    ) : (
        dataOnly
    )

    const numberOfColumnsCen = dataOnly[0].length;

    return (<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
            <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Fungsi Similarity</h2>

            <h2 className='font-semibold text-md'>Data Mean-Centered Yang Dipilih Selain 0</h2>
            <div className="overflow-x-auto">
                <table
                    className="border border-black mt-4 mx-auto text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-black px-4 py-2">U/I</th>
                            {Array.from({ length: numberOfColumnsCen }, (_, index) => (
                                <th key={index} className="border border-black px-4 py-2">
                                    <MathJaxContext options={mathjaxConfig}>
                                        <MathJax>
                                            {`\\[ i_{${index + 1}} \\]`}
                                        </MathJax>
                                    </MathJaxContext>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataModify.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="border border-black px-4 py-2 bg-gray-200">
                                    <MathJaxContext options={mathjaxConfig}>
                                        <MathJax>
                                            {`\\[ u_{${rowIndex + 1}} \\]`}
                                        </MathJax>
                                    </MathJaxContext>
                                </td>
                                {row.map((value, colIndex) => {
                                    const IsZero = dataOnly[rowIndex][colIndex] === 0

                                    return (
                                        <td key={colIndex}
                                            className={`border border-black px-4 py-2 text-center
                                                ${(IsZero) ? 'text-red-500' : ''} 
                                                ${!(IsZero) &&
                                                    (selectedIndex.includes(opsional === "item-based" ? colIndex : rowIndex))
                                                    ? 'bg-green-200'
                                                    : ''
                                                }`
                                            }
                                        >
                                            {value.toFixed(similarity !== "Vector Cosine" && similarity !== "Bhattacharyya Coefficient Similarity (BC)" ? 2 : 0)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-center items-center flex-col px-10'>
                    {selectedIndex ? (
                        <>
                            <SimilarityIndex
                                rowIndex={selectedIndex[0]}
                                colIndex={selectedIndex[1]}
                                dataOnly={dataOnly}
                                opsional={opsional}
                                similarity={similarity}
                            />
                            {similarity !== "Bhattacharyya Coefficient Similarity (BC)" ? (
                                <SimilarityIndexNonZero
                                    rowIndex={selectedIndex[0]}
                                    colIndex={selectedIndex[1]}
                                    similarity={similarity}
                                    opsional={opsional}
                                    dataOnly={dataOnly} />) : ""}
                        </>
                    ) : (
                        <p>No expression selected.</p>
                    )}
                </div>
            </MathJaxContext>

            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-center items-center flex-col px-10'>
                    {selectedIndex && dataOnly ? (
                        <>
                            <SimilarityValue
                                rowIndex={selectedIndex[0]}
                                colIndex={selectedIndex[1]}
                                data={data}
                                dataOnly={dataOnly}
                                similarity={similarity}
                                selectedMean={selectedMean}
                                opsional={opsional}
                            />
                        </>
                    ) : (
                        <p>No expression selected.</p>
                    )}
                </div>
            </MathJaxContext>
            <p className="text-xl font-bold text-gray-700">Hasil Similaritas antara item {selectedIndex[0] + 1} dan {selectedIndex[1] + 1}
                = {selectedMean.toFixed(4)}</p>
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={close}
            >
                Tutup
            </button>
        </div>
    </div>)
}

export default ModalSimilarity