import { MathJaxContext, MathJax } from "better-react-mathjax";
import mathjaxConfig from "../../../mathjax-config";
import { FormulaSimilarityIndex, FormulaSimilarityNonZero, FormulaSimilarityValue } from "./Formula/FormulaSimilarity";
import { transposeMatrix } from "../../../helper/helper";

const SimilarityIndex = ({ rowIndex, colIndex, similarity, opsional }) => {
    const expression = FormulaSimilarityIndex(rowIndex, colIndex, opsional, similarity)
    return (
        <>
            <MathJax>
                {expression}
            </MathJax>
        </>
    )
}

const SimilarityValue = ({ rowIndex, colIndex, data, dataOnly, similarity, selectedMean, opsional }) => {
    const dataModify = opsional === "item-based" ? transposeMatrix(dataOnly) : dataOnly

    const nonZeroIndexesRow = dataModify[rowIndex].map((row, index) => (row !== 0 ? index : null)).filter(index => index !== null);
    const nonZeroIndexesCol = dataModify[colIndex].map((row, index) => (row !== 0 ? index : null)).filter(index => index !== null);

    const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));

    const dataSimilarity = similarity !== "Vector Cosine" ? data['mean-centered'] : dataModify

    if (!dataSimilarity || dataSimilarity.length === 0) return null;

    const dataSimilarityRow = intersection.map(i => {
        return dataSimilarity[rowIndex][i]
    });

    const dataSimilarityCol = intersection.map(i => {

        return dataSimilarity[colIndex][i]
    });

    if (!dataSimilarityRow || !dataSimilarityCol) return null;

    const expression = FormulaSimilarityValue(
        rowIndex,
        colIndex,
        dataSimilarityRow,
        dataSimilarityCol,
        similarity,
    )

    return (
        <>
            <MathJax>
                {expression}
                {`\\[ Sim(${rowIndex + 1},${colIndex + 1}) = ${selectedMean.toFixed(4)} \\]`}
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

    const expression = FormulaSimilarityNonZero(
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
                {expression}
            </MathJax>
        </>
    );
};

const ModalSimilarity = ({ data, numberOfColumnsCen, close, selectedIndex, selectedMean, dataOnly, similarity, opsional }) => {

    const dataModify = (similarity !== "Vector Cosine" && similarity !== "Bhattacharyya Coefficient Similarity (BC)") ? data["mean-centered"] : (
        opsional === "user-based" ? dataOnly : transposeMatrix(dataOnly)
    )

    return (<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
            <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Fungsi Similarity</h2>

            <h2 className='font-semibold text-md'>Data Mean-Centered Yang Dipilih Selain 0</h2>
            <div className="overflow-x-auto">
                <table
                    className="border border-black mt-4 mx-auto text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-black px-4 py-2">{(similarity !== "Adjusted Vector Cosine" && opsional === "user-based") ? "U/I" : "I/U"}</th>
                            {Array.from({ length: numberOfColumnsCen }, (_, index) => (
                                <th key={index} className="border border-black px-4 py-2">
                                    <MathJaxContext options={mathjaxConfig}>
                                        <MathJax>
                                            {`\\[ ${(similarity !== "Vector Cosine" && similarity !== "Bhattacharyya Coefficient Similarity (BC)") ? "s" : "r"}_{${opsional === "user-based" ? `*${index + 1}` : `${index + 1}*`}} \\]`}
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
                                            {`\\[ ${(similarity !== "Vector Cosine" && similarity !== "Bhattacharyya Coefficient Similarity (BC)") ? "s" : "r"}_{${opsional === "user-based" ? `${rowIndex + 1}*` : `*${rowIndex + 1}`}} \\]`}
                                        </MathJax>
                                    </MathJaxContext>
                                </td>
                                {row.map((value, colIndex) => {
                                    const IsZero = dataOnly[(similarity !== "Adjusted Vector Cosine" && opsional === "user-based") ? rowIndex : colIndex][(similarity !== "Adjusted Vector Cosine" && opsional === "user-based") ? colIndex : rowIndex] === 0
                                    return (
                                        <td key={colIndex}
                                            className={`border border-black px-4 py-2 text-center
                                                ${(IsZero) ? 'text-red-500' : ''} 
                                                ${!(IsZero) &&
                                                    (selectedIndex.includes(rowIndex))
                                                    ? 'bg-green-200'
                                                    : ''
                                                }`
                                            }
                                        >
                                            {value.toFixed(1)}
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
                            <SimilarityIndexNonZero
                                rowIndex={selectedIndex[0]}
                                colIndex={selectedIndex[1]}
                                similarity={similarity}
                                opsional={opsional}
                                dataOnly={dataOnly} />
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