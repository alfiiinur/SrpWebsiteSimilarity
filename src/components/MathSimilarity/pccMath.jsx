import React, {useState} from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";
import {AllSimilaritas, getInitialData} from "../../api/getDataSet";



// USER-BASED

const  PccFunctionMathUserBased =[
    `\\[ PCC(u,v) = \\frac{\\sum_{i\\in I_{uv}} \\left(r_{ui} - \\overline{r_{u}}\\right)\\left(r_{vi}-\\overline{r_{u}}\\right)}{\\sqrt{\\sum_{i\\in I_{ui}} \\left(r_{ui} - \\overline{r_{u}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{vi}} \\left(r_{vi} - \\overline{r_{v}} \\right)^{2}}} \\]`
]

const DetailRumusSimUserBased = [
    `\\[ I_{uv} = \\text{Kumpulan item yang telah di rating oleh user u dan v} \\]`,
    `\\[ \\overline{r_{u}}  = \\text{Rata-rata nilai rating yang diberikan oleh user u pada seluruh item i} \\]`,
    `\\[ \\overline{r_{v}} = \\text{Rata-rata nilai rating yang diberikan oleh user v pada seluruh item i} \\]`,
    `\\[ r_{ui} = \\text{Nilai rating pada user u pada item yang sama} \\]`,
    `\\[ r_{vi} = \\text{Nilai rating pada user v pada item yang sama} \\]`,
];









export function PearsonSimUserBased({opsional, similaritas}) {

    const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
    const [selectedUserIndex, setSelectedUserIndex] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedExpression, setSelectedExpression] = useState(null);

    const handleMeanClick = (value, rowIndex, colIndex) => {
        // const expressionIndex = SimilaritasIndex(rowIndex, colIndex)
        // const expressionIndexNonZero = SimilaritasIndexNonZero(rowIndex, colIndex)
        // const expressionValue = SimilaritasValue(rowIndex, colIndex)
        // setSelectedExpression([expressionIndex, expressionIndexNonZero, expressionValue]);
        setSelectedMean(value); // Simpan nilai mean yang ditekan
        setSelectedUserIndex([rowIndex, colIndex])
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedMean(null); // Reset nilai mean yang dipilih
        setSelectedUserIndex(null)
    };


    // rumus perhtiungan manual

    // const SimilaritasIndex = (rowIndex, colIndex) => {
    //    return `\\[ Sim(${rowIndex+1},${colIndex+1}) = \\frac{\\sum_{i\\in I_{${rowIndex+1}} \\cap I_{${colIndex+1}}} \\left(r_{${rowIndex+1}i} - \\overline{r_{${rowIndex+1}}}\\right)\\left(r_{${colIndex+1}i}-\\overline{r_{${rowIndex+1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex+1}} \\cap I_{${colIndex+1}}} \\left(r_{${colIndex+1}i} - \\overline{r_{${rowIndex+1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex+1}} \\cap I_{${colIndex+1}}} \\left(r_{${rowIndex+1}i} - \\overline{r_{${rowIndex+1}}} \\right)^{2}}} \\]`
    // }
    //
    // const SimilaritasIndexNonZero = (rowIndex, colIndex) => {
    //     // Ambil semua indeks kolom dengan nilai selain 0 dari data rating asli untuk user pertama (rowIndex)
    //     const nonZeroIndexesRow = dataOnly[rowIndex]
    //         .map((value, index) => value !== 0 ? index + 1 : null) // Hanya simpan indeks non-zero
    //         .filter(index => index !== null);
    //
    //     // Ambil semua indeks kolom dengan nilai selain 0 dari data rating asli untuk user kedua (colIndex)
    //     const nonZeroIndexesCol = dataOnly[colIndex]
    //         .map((value, index) => value !== 0 ? index + 1 : null) // Hanya simpan indeks non-zero
    //         .filter(index => index !== null);
    //
    //     // Format MathJax dengan indeks yang tidak nol
    //     return `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesRow.join(', ')} \\right\\},
    //         I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol.join(', ')} \\right\\} \\text{ maka : }
    //         I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index)).join(', ')} \\right\\}\\]`;
    // };
    //
    //
    // const SimilaritasValue = (rowIndex, colIndex) => {
    //     return `\\[ Sim(${rowIndex+1},${colIndex+1}) = \\frac{\\sum_{i\\in I_{${rowIndex+1}} \\cap I_{${colIndex+1}}} \\left(r_{${rowIndex+1}i} - \\overline{r_{${rowIndex+1}}}\\right)\\left(r_{${colIndex+1}i}-\\overline{r_{${rowIndex+1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex+1}} \\cap I_{${colIndex+1}}} \\left(r_{${colIndex+1}i} - \\overline{r_{${rowIndex+1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex+1}} \\cap I_{${colIndex+1}}} \\left(r_{${rowIndex+1}i} - \\overline{r_{${rowIndex+1}}} \\right)^{2}}} \\]`
    // }

    const SimilaritasIndex = ({ rowIndex, colIndex }) => {
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{${colIndex + 1}i}-\\overline{r_{${rowIndex + 1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${colIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`;
        return <MathJaxComponent math={expression} />;
    };

    const SimilaritasIndexNonZero = ({ rowIndex, colIndex, dataOnly }) => {
        const nonZeroIndexesRow = dataOnly[rowIndex]
            .map((value, index) => (value !== 0 ? index + 1 : null))
            .filter(index => index !== null);

        const nonZeroIndexesCol = dataOnly[colIndex]
            .map((value, index) => (value !== 0 ? index + 1 : null))
            .filter(index => index !== null);

        const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));

        const expression = `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesRow.join(', ')} \\right\\}, 
        I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol.join(', ')} \\right\\} \\text{ maka : }
        I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`;

        return (
            <>
                <MathJaxComponent math={expression} />
            </>
        );
    };

    // FITUR TAMBAHAN
    // const SimilaritasIndexFilter = ({ rowIndex, colIndex }) => {
    //     const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{${colIndex + 1}i}-\\overline{r_{${rowIndex + 1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${colIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`;
    //     return <MathJaxComponent math={expression} />;
    // };
    //
    // const SimilaritasIndexNonZeroFilter = ({ rowIndex, colIndex, dataOnly }) => {
    //     const nonZeroIndexesRow = dataOnly[rowIndex]
    //         .map((value, index) => (value !== 0 ? index + 1 : null))
    //         .filter(index => index !== null);
    //
    //     const nonZeroIndexesCol = dataOnly[colIndex]
    //         .map((value, index) => (value !== 0 ? index + 1 : null))
    //         .filter(index => index !== null);
    //
    //     const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));
    //
    //     const expression = `\\[
    //      Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(s_{${rowIndex + 1}i} \\right)\\left(s_{${colIndex + 1}i} \\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(s_{${colIndex + 1}i} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(s_{${rowIndex + 1}i} \\right)^{2}}}
    //
    //      I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\} \\]`;
    //
    //     return (
    //         <>
    //             <MathJaxComponent math={expression} />
    //         </>
    //     );
    // };

    const SimilaritasValue = ({ rowIndex, colIndex, dataOnly }) => {
        // Ambil index yang di-filter dari SimilaritasIndexNonZero
        const nonZeroIndexesRow = dataOnly[rowIndex]
            .map((value, index) => (value !== 0 ? index : null))
            .filter(index => index !== null);

        const nonZeroIndexesCol = dataOnly[colIndex]
            .map((value, index) => (value !== 0 ? index : null))
            .filter(index => index !== null);

        // Cari intersection
        const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));

        // Ambil mean-centered value dari data untuk rowIndex dan colIndex
        const meanCenteredRow = intersection.map(i => dataOnly[rowIndex][i] - mean(dataOnly[rowIndex]));
        const meanCenteredCol = intersection.map(i => dataOnly[colIndex][i] - mean(dataOnly[colIndex]));



        // Buat expression untuk MathJax (hanya menampilkan nilai mean-centered)
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${meanCenteredRow.map((val, idx) => `(${val.toFixed(2)} \\times ${meanCenteredCol[idx].toFixed(2)})`).join(' + ')}}{${meanCenteredRow.map((val, idx) => `\\sqrt{(${val.toFixed(2)})^2 +  (${meanCenteredCol[idx].toFixed(2)})^2}`).join(' \\times ')}} \\]`;

        return <MathJaxComponent math={expression} />;
    };

// Fungsi untuk menghitung rata-rata (mean)
    const mean = (arr) => {
        const validValues = arr.filter(value => value !== 0); // Hanya hitung non-zero values
        return validValues.reduce((sum, value) => sum + value, 0) / validValues.length;
    };






    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    // get only data
    const [dataOnly, setDataOnly] = useState(initialData.data);

    const { result, error } = AllSimilaritas(data, similaritas);

    const RenderUserTabelSimilarity = () => {
        if (!result || !result['similarity']) return null;

        const numberOfColumnsSim = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama
        const numberOfColumnsCen = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama
        if (!result || !result['mean-centered']) return null;


        return (
            <div className='flex justify-center mt-4'>
            <table className="border border-black mt-4">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">U/U</th>
                    {Array.from({ length: numberOfColumnsSim }, (_, index) => (
                        <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {result['similarity'].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} className={`border border-black px-4 py-2 text-center cursor-pointer hover:bg-card_green_primary ${
                                value === 1 ? 'bg-red-200' : ''
                            }`}
                                onClick={() => handleMeanClick(value, rowIndex, colIndex)}
                            >
                                {value.toFixed(4)} {/* Format desimal */}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
                {/* Modal Card */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
                            <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Fungsi Similaritas</h2>

                            <h2 className='font-semibold text-md'>Data Mean-Centered Yang Dipilih Selain 0</h2>
                            <div className="overflow-x-auto"> {/* Tambahkan ini untuk responsivitas tabel */}
                                <table
                                    className="border border-black mt-4 mx-auto text-center"> {/* Tambahkan mx-auto dan text-center */}
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">U/I</th>
                                        {Array.from({length: numberOfColumnsCen}, (_, index) => (
                                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {result['mean-centered'].map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>

                                            {row.map((value, colIndex) => {
                                                const OriginalValue = dataOnly[rowIndex][colIndex];
                                                const IsZero = OriginalValue === 0;

                                                return (
                                                    <td key={colIndex}
                                                        className={`border border-black px-4 py-2 text-center 
                                                            ${IsZero ? 'text-red-500' : ''} 
                                                            ${
                                                            !IsZero &&
                                                            (selectedUserIndex.includes(rowIndex))
                                                                ? 'bg-green-200'
                                                                : ''
                                                        }`}
                                                    >
                                                        {value.toFixed(1)} {/* Format desimal */}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Menampilkan perhitungan manual */}
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedUserIndex ? (
                                        <>
                                            <SimilaritasIndex rowIndex={selectedUserIndex[0]} colIndex={selectedUserIndex[1]} />
                                            <SimilaritasIndexNonZero rowIndex={selectedUserIndex[0]} colIndex={selectedUserIndex[1]} dataOnly={dataOnly} />
                                        </>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>


                            <h2 className='font-semibold text-md'>Data yang sudah terfilter</h2>
                            {/*<div className="overflow-x-auto"> /!* Tambahkan ini untuk responsivitas tabel *!/*/}
                            {/*    <table*/}
                            {/*        className="border border-black mt-4 mx-auto text-center"> /!* Tambahkan mx-auto dan text-center *!/*/}
                            {/*        <thead>*/}
                            {/*        <tr className="bg-gray-200">*/}
                            {/*            <th className="border border-black px-4 py-2">U/I</th>*/}
                            {/*            {Array.from({length: numberOfColumnsCen}, (_, index) => (*/}
                            {/*                <th key={index} className="border border-black px-4 py-2">{index + 1}</th>*/}
                            {/*            ))}*/}
                            {/*        </tr>*/}
                            {/*        </thead>*/}
                            {/*        <tbody>*/}
                            {/*        {result['mean-centered'].map((row, rowIndex) => (*/}
                            {/*            <tr key={rowIndex}>*/}
                            {/*                <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>*/}

                            {/*                {row.map((value, colIndex) => {*/}
                            {/*                    // data real nya*/}
                            {/*                    const OriginalValue = dataOnly[rowIndex][colIndex];*/}
                            {/*                    const IsZero = OriginalValue === 0;*/}

                            {/*                    let isInIntersection = false;*/}

                            {/*                    // Cek apakah user ini dipilih (dari selectedUserIndex)*/}
                            {/*                    if (selectedUserIndex.includes(rowIndex)) {*/}
                            {/*                        // Ambil indeks non-zero dari baris dan kolom yang dipilih*/}
                            {/*                        const nonZeroIndexesRow = dataOnly[rowIndex]*/}
                            {/*                            .map((value, index) => (value !== 0 ? index : null))*/}
                            {/*                            .filter(index => index !== null);*/}

                            {/*                        const nonZeroIndexesCol = dataOnly[selectedUserIndex[1]] // Kolom user lain*/}
                            {/*                            .map((value, index) => (value !== 0 ? index : null))*/}
                            {/*                            .filter(index => index !== null);*/}

                            {/*                        // Hitung intersection dari baris yang dipilih dan kolom yang dipilih*/}
                            {/*                        const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));*/}

                            {/*                        // Jika colIndex saat ini ada di intersection, beri highlight*/}
                            {/*                        isInIntersection = intersection.includes(colIndex);*/}
                            {/*                    }*/}

                            {/*                    return (*/}
                            {/*                        <td key={colIndex}*/}
                            {/*                            className={`border border-black px-4 py-2 text-center */}
                            {/*                                ${IsZero ? 'text-red-500' : ''} */}
                            {/*                                ${!IsZero && isInIntersection ? 'bg-green-200' : ''}*/}
                            {/*                            `}*/}
                            {/*                        >*/}
                            {/*                            {value.toFixed(1)} /!* Format desimal *!/*/}
                            {/*                        </td>*/}
                            {/*                    );*/}
                            {/*                })}*/}
                            {/*            </tr>*/}
                            {/*        ))}*/}
                            {/*        </tbody>*/}
                            {/*    </table>*/}
                            {/*</div>*/}
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedUserIndex && dataOnly ? (
                                        <>
                                            {/*<SimilaritasIndex rowIndex={selectedUserIndex[0]} colIndex={selectedUserIndex[1]} />*/}
                                            <SimilaritasValue rowIndex={selectedUserIndex[0]} colIndex={selectedUserIndex[1]} dataOnly={dataOnly}  />
                                        </>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>
                            <p className="text-xl font-bold text-gray-700">Hasil mean dari adalah
                                = {selectedMean.toFixed(4)}</p>
                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={closeModal} // Menutup modal saat tombol ditekan
                            >
                                Tutup
                            </button>
                        </div>
                    </div>

                )}


            </div>
        );
    };

    return (
        <div>
            <div className="flex items-center">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Mencari Koefisien Korelasi Pearson
                    Correlation Coefficient (PCC) User-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {PccFunctionMathUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusSimUserBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Fungsi Similaritas User-Based</h1>
                {/*    call api */}
                <RenderUserTabelSimilarity/>
            </div>
            <div>
                <h1>HASIL VISUALISASI SIMILARITY PEARSON</h1>
            </div>

        </div>
    );
}


//ITEM-BASED


const PccFunctionMathItemBased = [
    `\\[ PCC(i,j) = \\frac{\\sum_{i\\in U_{ij}} \\left(r_{ui} - \\overline{r_{i}}\\right)\\left(r_{uj}-\\overline{r_{j}}\\right)}{\\sqrt{\\sum_{u\\in U_{ij}} \\left(r_{ui} - \\overline{r_{i}} \\right)^{2}}\\sqrt{\\sum_{u\\in U_{ij}} \\left(r_{uj} - \\overline{r_{j}} \\right)^{2}}} \\]`
]
const DetailRumusSimItemBased = [
    `\\[ U_{ij} = \\text{Kumpulan user yang telah merating pada item yang sama user u dan v} \\]`,
    `\\[ \\overline{r_{i}}  = \\text{Rata-rata nilai rating pada item i yang telah merating} \\]`,
    `\\[ \\overline{r_{j}} = \\text{Rata-rata nilai rating pada item j yang telah merating} \\]`,
    `\\[ r_{ui} = \\text{Nilai rating pada user u terhadap item i } \\]`,
    `\\[ r_{uj} = \\text{Nilai rating pada user v terhadap item j} \\]`,

]

export function PearsonSimItemBased({opsional, similaritas}) {

    const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
    const [selectedUserIndexItem, setSelectedUserIndexItem] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedExpression, setSelectedExpression] = useState(null);

    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    // get only data
    const [dataOnly, setDataOnly] = useState(initialData.data);
    const transposedData = dataOnly[0].map((_, colIndex) =>
        dataOnly.map(row => row[colIndex])
    );

    const {result, error} = AllSimilaritas(data, similaritas);

    const handleMeanClick = (value, rowIndex, colIndex) => {
        setSelectedMean(value); // Simpan nilai mean yang ditekan
        setSelectedUserIndexItem([rowIndex, colIndex ])
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedMean(null); // Reset nilai mean yang dipilih
        setSelectedUserIndexItem(null)
    };

    const SimilaritasIndex = ({ rowIndex, colIndex }) => {
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{${colIndex + 1}i}-\\overline{r_{${rowIndex + 1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${colIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`;
        return <MathJaxComponent math={expression} />;
    };

    const SimilaritasIndexNonZeroItem = ({ rowIndex, colIndex, dataOnly }) => {
        // Ambil indeks non-zero dari kolom colIndex
        const nonZeroIndexesCol1 = dataOnly.map((row, index) => (row[colIndex] !== 0 ? index + 1 : null))
            .filter(index => index !== null); // +1 untuk 1-based indexing

        // Ambil indeks non-zero dari kolom rowIndex (yang dipakai sebagai perbandingan)
        const nonZeroIndexesCol2 = dataOnly.map((row, index) => (row[rowIndex] !== 0 ? index + 1 : null))
            .filter(index => index !== null);

        // Cari intersection antara kedua kolom
        const intersection = nonZeroIndexesCol1.filter(index => nonZeroIndexesCol2.includes(index));

        const expression = `\\[ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesCol1.join(', ')} \\right\\}, 
        I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol2.join(', ')} \\right\\} \\text{ maka : }
        I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\}\\]`;

        return (
            <>
                <MathJaxComponent math={expression} />
            </>
        );
    };


    // const SimilaritasValue = ({ rowIndex, colIndex, dataOnly }) => {
    //     // Ambil index yang di-filter dari SimilaritasIndexNonZero
    //     const nonZeroIndexesRow = dataOnly.map((row, index) => (row[colIndex] !== 0 ? index + 1 : null))
    //         .filter(index => index !== null); // +1 untuk 1-based indexing
    //
    //     const nonZeroIndexesCol = dataOnly.map((row, index) => (row[rowIndex] !== 0 ? index + 1 : null))
    //         .filter(index => index !== null);
    //
    //     // Cari intersection
    //     const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));
    //
    //
    //     const numberOfColumnsCen = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama
    //     if (!result || !result['mean-centered']) return null;
    //
    //
    //     // Ambil mean-centered value dari data untuk rowIndex dan colIndex
    //     const meanCenteredRow = intersection.map(i => numberOfColumnsCen[rowIndex][i]  );
    //     const meanCenteredCol = intersection.map(i => numberOfColumnsCen[colIndex][i] );
    //
    //     // Buat expression untuk MathJax (hanya menampilkan nilai mean-centered)
    //     const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${meanCenteredRow.map((val, idx) => `(${val.toFixed(2)} \\times ${meanCenteredCol[idx].toFixed(2)})`).join(' + ')}}{${meanCenteredRow.map((val, idx) => `\\sqrt{(${val.toFixed(2)}) +  (${meanCenteredCol[idx].toFixed(2)})}`).join(' \\times ')}} \\]`;
    //
    //     return <MathJaxComponent math={expression} />;
    // };

    const SimilaritasValue = ({ rowIndex, colIndex, dataOnly }) => {
        // Ambil index yang di-filter dari SimilaritasIndexNonZero
        const nonZeroIndexesRow = dataOnly.map((row, index) => (row[colIndex] !== 0 ? index : null)) // Remove +1 for 0-based indexing
            .filter(index => index !== null);

        const nonZeroIndexesCol = dataOnly.map((row, index) => (row[rowIndex] !== 0 ? index : null)) // Remove +1 for 0-based indexing
            .filter(index => index !== null);

        // Cari intersection
        const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));

        const meanCentered = result['mean-centered']; // Access mean-centered array

        if (!meanCentered || meanCentered.length === 0) return null;

        // Map intersection indexes to retrieve mean-centered values
        const meanCenteredRow = intersection.map(i => meanCentered[rowIndex][i]);
        const meanCenteredCol = intersection.map(i => meanCentered[colIndex][i]);

        // Check if values are valid
        if (!meanCenteredRow || !meanCenteredCol) return null;

        // Buat expression untuk MathJax (hanya menampilkan nilai mean-centered)
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${meanCenteredRow.map((val, idx) => `(${val.toFixed(1)} \\times ${meanCenteredCol[idx].toFixed(1)})`).join(' + ')}}{\\sqrt{${meanCenteredRow.map((val, idx) => `(${val.toFixed(1)})^2`).join(' + ')}} \\times \\sqrt{${meanCenteredCol.map((val, idx) => `(${val.toFixed(1)})^2`).join(' + ')}}} \\]`;

        return <MathJaxComponent math={expression} />;
    };





    const RenderItemTabelSimilarity = () => {
        if (!result || !result['similarity']) return null;
        const numberOfColumnsSim = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama

        const numberOfColumnsCen = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama
        if (!result || !result['mean-centered']) return null;

        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">U/U</th>
                        {Array.from({length: numberOfColumnsSim}, (_, index) => (
                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {result['similarity'].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} className={`border border-black px-4 py-2 text-center cursor-pointer hover:bg-card_green_primary ${
                                value === 1 ? 'bg-red-200' : ''
                            }`}
                                onClick={() => handleMeanClick(value, rowIndex, colIndex)}

                            >
                                {value.toFixed(4)} {/* Format desimal */}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {/*    modal card item */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
                            <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Fungsi Similaritas</h2>

                            <h2 className='font-semibold text-md'>Data Mean-Centered Yang Dipilih Selain 0</h2>
                            <div className="overflow-x-auto"> {/* Tambahkan ini untuk responsivitas tabel */}
                                <table
                                    className="border border-black mt-4 mx-auto text-center"> {/* Tambahkan mx-auto dan text-center */}
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">U/I</th>
                                        {Array.from({length: numberOfColumnsCen}, (_, index) => (
                                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {result['mean-centered'].map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>

                                            {row.map((value, colIndex) => {
                                                const OriginalValue = dataOnly[colIndex][rowIndex];
                                                const IsZero = OriginalValue === 0;

                                                return (
                                                    <td key={colIndex}
                                                        className={`border border-black px-4 py-2 text-center 
                                                            ${IsZero ? 'text-red-500' : ''} 
                                                            ${
                                                            !IsZero &&
                                                            (selectedUserIndexItem.includes(rowIndex))
                                                                ? 'bg-green-200'
                                                                : ''
                                                        }`}
                                                    >
                                                        {value.toFixed(1)} {/* Format desimal */}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Menampilkan perhitungan manual */}
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedUserIndexItem ? (
                                        <>
                                            <SimilaritasIndex rowIndex={selectedUserIndexItem[0]}
                                                              colIndex={selectedUserIndexItem[1]}/>
                                            <SimilaritasIndexNonZeroItem rowIndex={selectedUserIndexItem[0]}
                                                                     colIndex={selectedUserIndexItem[1]}
                                                                     dataOnly={dataOnly}/>
                                        </>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>


                            {/*<h2 className='font-semibold text-md'>Data yang sudah terfilter</h2>*/}
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedUserIndexItem && dataOnly ? (
                                        <>
                                            {/*<SimilaritasIndex rowIndex={selectedUserIndex[0]} colIndex={selectedUserIndex[1]} />*/}
                                            <SimilaritasValue rowIndex={selectedUserIndexItem[0]}
                                                              colIndex={selectedUserIndexItem[1]} dataOnly={dataOnly}/>
                                        </>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>
                            <p className="text-xl font-bold text-gray-700">Hasil mean dari adalah
                                = {selectedMean.toFixed(4)}</p>
                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={closeModal} // Menutup modal saat tombol ditekan
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };
    return (
        <div>
            <div className="flex items-center">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Mencari Koefisien Korelasi
                    Pearson Correlation Coefficient (PCC) Item Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {PccFunctionMathItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusSimItemBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Fungsi Similaritas Item-Based</h1>
                {/*    call api */}
                <RenderItemTabelSimilarity/>
            </div>
            <div>
                <h1 className='font-semibold'>HASIL VISUALISASI SIMILARITY PEARSON</h1>
            </div>

        </div>
    )
}