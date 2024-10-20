import React, {useState} from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";
import {AllSimilaritas, getInitialData} from "../../api/getDataSet";




//User-Based
const  adjustCosineUserBased = [
    `\\[ ACosine(u,v) = \\frac{\\sum_i\\in I_{uv} \\left(r_{ui} - \\overline{r_{i}}\\right)\\left(r_{vi}-\\overline{r_{i}}\\right)}{\\sqrt{\\sum_u \\in I_{uv} \\left(r_{ui} - \\overline{r_{i}} \\right)^{2}}\\sqrt{\\sum_i \\in I_{uv} \\left(r_{vi} - \\overline{r_{i}} \\right)^{2}}} \\]`
]

const DetailRumusSimAdjustedUserBased = [
    `\\[ Su_{i} = \\text{Rata-rata pada user u} \\] `,
    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,

]

export function AdjustedCosineUserBased({opsional, similaritas}){

    const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
    const [selectedUserIndex, setSelectedUserIndex] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedExpression, setSelectedExpression] = useState(null);

    const handleMeanClick = (value, rowIndex, colIndex) => {
        setSelectedMean(value); // Simpan nilai mean yang ditekan
        setSelectedUserIndex([rowIndex, colIndex])
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedMean(null); // Reset nilai mean yang dipilih
        setSelectedUserIndex(null)
    };


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
        const meanCenteredRow = intersection.map(i => dataOnly[rowIndex][i] - meanPerItem(dataOnly, i));
        const meanCenteredCol = intersection.map(i => dataOnly[colIndex][i] - meanPerItem(dataOnly, i));



        // Buat expression untuk MathJax (hanya menampilkan nilai mean-centered)
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${meanCenteredRow.map((val, idx) => `(${val.toFixed(2)} \\times ${meanCenteredCol[idx].toFixed(2)})`).join(' + ')}}{${meanCenteredRow.map((val, idx) => `\\sqrt{(${val.toFixed(2)})^2 +  (${meanCenteredCol[idx].toFixed(2)})^2}`).join(' \\times ')}} \\]`;

        return <MathJaxComponent math={expression} />;
    };


// Fungsi untuk menghitung rata-rata (mean) per item (kolom)
    const meanPerItem = (data, itemIndex) => {
        // Ambil nilai di kolom yang diinginkan (item) dan abaikan nilai 0
        const columnValues = data.map(row => row[itemIndex]).filter(value => value !== 0);
        if (columnValues.length === 0) return 0; // Jika semua nilai 0, return 0 untuk menghindari error
        return columnValues.reduce((sum, value) => sum + value, 0) / columnValues.length;
    };


    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    const [dataOnly, setDataOnly] = useState(initialData.data);


    const { result, error } = AllSimilaritas(data, similaritas);

    const RenderUserTabelSimilarity = () => {
        if (!result || !result['similarity']) return null;

        const numberOfColumnsSimAdj = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama
        const numberOfColumnsCenAdj = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama
        if (!result || !result['mean-centered']) return null;
        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">U/U</th>
                        {Array.from({ length: numberOfColumnsSimAdj }, (_, index) => (
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
                                    onClick={() => handleMeanClick(value, colIndex,rowIndex )}
                                >
                                    {value.toFixed(4)} {/* Format desimal */}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            {/*    show modal */}
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
                                        {Array.from({length: numberOfColumnsCenAdj}, (_, index) => (
                                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {result['mean-centered'].map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>

                                            {row.map((value, colIndex) => {
                                                const OriginalValue = dataOnly[colIndex ][rowIndex];
                                                const IsZero = OriginalValue === 0;

                                                return (
                                                    <td key={colIndex}
                                                        className={`border border-black px-4 py-2 text-center 
                                                            ${IsZero ? 'text-red-500' : ''} 
                                                            ${
                                                            !IsZero &&
                                                            (selectedUserIndex.includes(colIndex))
                                                                ? 'bg-green-200'
                                                                : ''
                                                        }`}
                                                    >
                                                        {value.toFixed(2)} {/* Format desimal */}
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
                                            <SimilaritasIndex rowIndex={selectedUserIndex[0]}
                                                              colIndex={selectedUserIndex[1]}/>
                                            <SimilaritasIndexNonZero rowIndex={selectedUserIndex[0]}
                                                                     colIndex={selectedUserIndex[1]}
                                                                     dataOnly={dataOnly}/>
                                        </>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>


                            <h2 className='font-semibold text-md'>Data yang sudah terfilter</h2>
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedUserIndex && dataOnly ? (
                                        <>
                                            {/*<SimilaritasIndex rowIndex={selectedUserIndex[0]} colIndex={selectedUserIndex[1]} />*/}
                                            <SimilaritasValue rowIndex={selectedUserIndex[0]}
                                                              colIndex={selectedUserIndex[1]} dataOnly={dataOnly}/>
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
                <h1 className='font-poppins font-semibold text-black'>Mencari Similaritas Adjusted Cosine
                    User-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {adjustCosineUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusSimAdjustedUserBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Fungsi Similaritas User-Based</h1>
                {/*    call api */}
                <RenderUserTabelSimilarity/>
            </div>
        </div>
    )
}


//Item-Based


const adjustedCosineItemBased = [
    `\\[ ACosine(i,j) = \\frac{\\sum_u\\in U_{ij} \\left(r_{ui} - \\overline{r_{u}}\\right)\\left(r_{uj}-\\overline{r_{u}}\\right)}{\\sqrt{\\sum_u \\in U_{ij} \\left(r_{ui} - \\overline{r_{u}} \\right)^{2}}\\sqrt{\\sum_i \\in U_{ij} \\left(r_{uj} - \\overline{r_{u}} \\right)^{2}}} \\]`
]

const DetailRumusSimAdjustedItemBased = [
    `\\[ Su_{i} = \\text{Rata-rata pada user u} \\] `,
    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,

]


export function AdjustedCosineItemBased({opsional, similaritas}) {

    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    const [dataOnly, setDataOnly] = useState(initialData.data);
    const transposedData = dataOnly[0].map((_, colIndex) =>
        dataOnly.map(row => row[colIndex])
    );

    const {result, error} = AllSimilaritas(data, similaritas);

    const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
    const [selectedUserIndex, setSelectedUserIndex] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedExpression, setSelectedExpression] = useState(null);

    const handleMeanClick = (value, rowIndex, colIndex) => {
        setSelectedMean(value); // Simpan nilai mean yang ditekan
        setSelectedUserIndex([rowIndex, colIndex])
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedMean(null); // Reset nilai mean yang dipilih
        setSelectedUserIndex(null)
    };

    const SimilaritasIndex = ({ rowIndex, colIndex }) => {
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{${colIndex + 1}i}-\\overline{r_{${rowIndex + 1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${colIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`;
        return <MathJaxComponent math={expression} />;
    };

    const SimilaritasIndexNonZero = ({ rowIndex, colIndex, dataOnly }) => {
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

    // Utility function to transpose the matrix
    const transposeMatrix = (matrix) => {
        return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    };
    const SimilaritasValueItem = ({ rowIndex, colIndex, dataOnly }) => {
        if (!result || !result['mean-centered']) return null;

        // Ambil mean-centered value dari result untuk rowIndex dan colIndex
        const meanCenteredRow = result['mean-centered'][rowIndex];
        const meanCenteredCol = result['mean-centered'][colIndex];

        // Ambil index yang di-filter untuk non-zero values
        const nonZeroIndexesRow = meanCenteredRow
            .map((value, index) => (value !== 0 ? index : null))
            .filter(index => index !== null);

        const nonZeroIndexesCol = meanCenteredCol
            .map((value, index) => (value !== 0 ? index : null))
            .filter(index => index !== null);


        // Cari intersection
        const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));

        // Ambil mean-centered value dari data untuk rowIndex dan colIndex
        const meanCentereValuesdRow = intersection.map(i => meanCenteredRow[i]);
        const meanCenteredValuesCol = intersection.map(i => meanCenteredCol[i]);



        // Buat expression untuk MathJax (hanya menampilkan nilai mean-centered)
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${meanCentereValuesdRow.map((val, idx) => `(${val.toFixed(2)} \\times ${meanCenteredValuesCol[idx].toFixed(2)})`).join(' + ')}}{${meanCentereValuesdRow.map((val, idx) => `\\sqrt{(${val.toFixed(2)})^2 +  (${meanCenteredValuesCol[idx].toFixed(2)})^2}`).join(' \\times ')}} \\]`;

        return <MathJaxComponent math={expression} />;
    };


// Fungsi untuk menghitung rata-rata (mean) per item (kolom)
    const meanPerItem = (data, itemIndex) => {
        // Ambil nilai di kolom yang diinginkan (item) dan abaikan nilai 0
        const columnValues = data.map(row => row[itemIndex]).filter(value => value !== 0);
        if (columnValues.length === 0) return 0; // Jika semua nilai 0, return 0 untuk menghindari error
        return columnValues.reduce((sum, value) => sum + value, 0) / columnValues.length;
    };




    const RenderItemTabelSimilarity = () => {
        if (!result || !result['similarity']) return null;

        const numberOfColumnsItemAjd = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama
        const numberOfColumnsCenItemAdj = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama
        if (!result || !result['mean-centered']) return null;



        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">U/U</th>
                        {Array.from({length: numberOfColumnsItemAjd}, (_, index) => (
                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {result['similarity'].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                            {row.map((value, colIndex) => (
                                <td key={colIndex} className={`border border-black px-4 py-2 text-center  cursor-pointer hover:bg-card_green_primary ${
                                    value === 1 ? 'bg-red-200' : ''
                                }`}
                                    onClick={() => handleMeanClick(value, colIndex, rowIndex)}
                                >
                                    {value.toFixed(4)} {/* Format desimal */}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            {/*    show modal*/}
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
                                        {Array.from({length: numberOfColumnsCenItemAdj}, (_, index) => (
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
                                                            (selectedUserIndex.includes(rowIndex))
                                                                ? 'bg-green-200'
                                                                : ''
                                                        }`}
                                                    >
                                                        {value.toFixed(2)} {/* Format desimal */}
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
                                            <SimilaritasIndex rowIndex={selectedUserIndex[0]}
                                                              colIndex={selectedUserIndex[1]}/>
                                            <SimilaritasIndexNonZero rowIndex={selectedUserIndex[0]}
                                                                     colIndex={selectedUserIndex[1]}
                                                                     dataOnly={dataOnly}/>
                                        </>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>


                            <h2 className='font-semibold text-md'>Data yang sudah terfilter</h2>
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedUserIndex && dataOnly ? (
                                        <>
                                            {/*<SimilaritasIndex rowIndex={selectedUserIndex[0]} colIndex={selectedUserIndex[1]} />*/}
                                            <SimilaritasValueItem rowIndex={selectedUserIndex[0]}
                                                              colIndex={selectedUserIndex[1]} dataOnly={dataOnly}/>
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
                <h1 className='font-poppins font-semibold text-black'>Mencari Similaritas Adjusted Cosine
                    Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {adjustedCosineItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusSimAdjustedItemBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Fungsi Similaritas Item-Based</h1>
                {/*    call api */}
                <RenderItemTabelSimilarity/>
            </div>
        </div>
    )
}