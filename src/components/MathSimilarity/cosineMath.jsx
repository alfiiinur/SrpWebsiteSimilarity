import React, {useState} from 'react'
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {MathJaxContext} from "better-react-mathjax";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";
import {AllSimilaritas, getInitialData} from "../../api/getDataSet";




//User-Based

const cosineUserBased = [
    `\\[ Cosine\\left(u,v\\right) = \\frac{\\sum_i\\in I_{uv}r_{ui}r_{vi}}{\\sqrt{\\sum_u\\in I_{u}r^{2}_{ui}}\\sqrt{\\sum_u\\in I_{v}r^{2}_{vi}}} \\]`
]


const DetailRumusSimCosineUserBased = [
    `\\[ I_{uv} = \\text{Kumpulan item yang telah di rating oleh user u dan v} \\] `,
    `\\[ r_{ui} = \\text{Nilai rating pada user u pada item yang sama} \\]`,
    `\\[ r_{vi} = \\text{Nilai rating pada user v pada item yang sama} \\]`,

]

export function CosineMathUserBased({opsional, similaritas}){

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

        const expression = ` \\[ \\text{ Numerator : }I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\} \\ \\text{dan Denominator : } \\ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesRow.join(', ')} \\right\\}, 
         I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol.join(', ')} \\right\\} 
        \\]`;

        return (
            <>
                <MathJaxComponent math={expression} />
            </>
        );
    };


    const SimilaritasValueDa = ({ rowIndex, colIndex, dataOnly }) => {
        // Ambil index yang di-filter dari SimilaritasIndexNonZero
        const nonZeroIndexesRow = dataOnly[rowIndex]
            .map((value, index) => (value !== 0 ? index : null))
            .filter(index => index !== null);

        const nonZeroIndexesCol = dataOnly[colIndex]
            .map((value, index) => (value !== 0 ? index : null))
            .filter(index => index !== null);

        // Cari intersection
        const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));

        // Ambil nilai langsung dari data untuk rowIndex dan colIndex
        const rowValues = intersection.map(i => dataOnly[rowIndex][i]);
        const colValues = intersection.map(i => dataOnly[colIndex][i]);

        // Hitung numerator
        const numerator = rowValues.map((val, idx) => `(${val.toFixed(2)} \\times ${colValues[idx].toFixed(2)})`).join(' + ');

        // Hitung denominator, ambil semua nilai non-zero
        const denominatorRow = nonZeroIndexesRow.map(i => dataOnly[rowIndex][i]);
        const denominatorCol = nonZeroIndexesCol.map(i => dataOnly[colIndex][i]);

        const denominator = `{\\sqrt{(${denominatorRow.filter(val => val !== 0).map(val => `(${val.toFixed(2)})^2`).join(' + ')})} \\times  \\sqrt {(${denominatorCol.filter(val => val !== 0).map(val => `(${val.toFixed(2)})^2`).join(' + ')})}}`;

        // Buat expression untuk MathJax (menampilkan numerator dan denominator)
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${numerator}}{${denominator}} \\]`;

        return <MathJaxComponent math={expression} />;
    };









    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    const [dataOnly, setDataOnly] = useState(initialData.data);

    const { result, error } = AllSimilaritas(data, similaritas);

    const RenderUserTabelSimiliartas = () => {

        if (!result || !result['similarity']) return null;

        const numberOfColumnsSim = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama


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
                                    onClick= {() => handleMeanClick(value, rowIndex, colIndex)}
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
                                        {Array.from({length: dataOnly[0].length}, (_, index) => (
                                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dataOnly.map((row, rowIndex) => (
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
                                            <SimilaritasValueDa rowIndex={selectedUserIndex[0]}
                                                              colIndex={selectedUserIndex[1]} dataOnly={dataOnly}/>
                                        </>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>
                            <p className="text-xl font-bold text-gray-700">Hasil Similaritas antara user {selectedUserIndex[0]+1} dan {selectedUserIndex[1]+1}
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
                <h1 className='font-poppins font-semibold text-black'>Mencari Koefisien Korelasi Vector
                    Cosine User-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {cosineUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusSimCosineUserBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Fungsi Similaritas User-Based</h1>
                {/*    call api */}
                <RenderUserTabelSimiliartas/>
            </div>
        </div>
    )
}


//Item-Based

const cosineExpresionItemBased = [
    `\\[  Cosine\\left(i,j\\right) = \\frac{\\sum_u\\in U_{ij}r_{ui}r_{uj}}{\\sqrt{\\sum_u\\in U_{i}r^{2}_{ui}}\\sqrt{\\sum_u\\in U_{j}r^{2}_{uj}}} \\]`
]

const DetailRumusSimCosineItemBased = [
    `\\[ U_{ij} = \\text{Kumpulan user yang telah merating pada item i dan j} \\]`,
    `\\[ r_{ui} = \\text{Nilai rating pada user u pada item pada item i} \\]`,
    `\\[ r_{uj} = \\text{Nilai rating pada user v pada item pada item j} \\]`,

]

export function CosineMathItemBased({opsional, similaritas}) {

    const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
    const [selectedUserIndexItem, setSelectedUserIndexItem] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedExpression, setSelectedExpression] = useState(null);


    const handleMeanClick = (value, rowIndex, colIndex) => {
        setSelectedMean(value); // Simpan nilai mean yang ditekan
        setSelectedUserIndexItem([rowIndex, colIndex])
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedMean(null); // Reset nilai mean yang dipilih
        setSelectedUserIndexItem(null)
    };


    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    const [dataOnly, setDataOnly] = useState(initialData.data);
    const transposedData = dataOnly[0].map((_, colIndex) =>
        dataOnly.map(row => row[colIndex])
    );

    const {result, error} = AllSimilaritas(data, similaritas);


    const SimilaritasIndexItem = ({ rowIndex, colIndex }) => {
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}}\\right)\\left(r_{${colIndex + 1}i}-\\overline{r_{${rowIndex + 1}}}\\right)}{\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${colIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}\\sqrt{\\sum_{i\\in I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}}} \\left(r_{${rowIndex + 1}i} - \\overline{r_{${rowIndex + 1}}} \\right)^{2}}} \\]`;
        return <MathJaxComponent math={expression} />;
    };

    const SimilaritasIndexNonZeroItem = ({ rowIndex, colIndex, dataOnly }) => {
        const nonZeroIndexesRow = dataOnly.map(row => row[rowIndex])
            .map((value, index) => (value !== 0 ? index + 1 : null))
            .filter(index => index !== null);

        // Ambil non-zero indexes dari kolom berdasarkan col
        const nonZeroIndexesCol = dataOnly.map(row => row[colIndex])
            .map((value, index) => (value !== 0 ? index + 1 : null))
            .filter(index => index !== null);


        const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));

        const expression = ` \\[ \\text{ Numerator : }I_{${rowIndex + 1}} \\cap I_{${colIndex + 1}} = \\left\\{ ${intersection.join(', ')} \\right\\} \\ \\text{dan Denominator : } \\ I_{${rowIndex + 1}} = \\left\\{ ${nonZeroIndexesRow.join(', ')} \\right\\}, 
         I_{${colIndex + 1}} = \\left\\{ ${nonZeroIndexesCol.join(', ')} \\right\\} 
        \\]`;

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

        // Transpose the matrix first
        const transposedDataOnly = transposeMatrix(dataOnly);


        // Ambil index yang di-filter dari SimilaritasIndexNonZero
        // const nonZeroIndexesRow = transposedDataOnly.map((row, index) => (row[rowIndex] !== 0 ? index : null))
        //     .map((value, index) => (value !== 0 ? index : null))
        //     .filter(index => index !== null);
        //
        // // Mengakses data untuk kolom: iterasi pada dataOnly dan ambil nilai pada colIndex untuk tiap baris
        // const nonZeroIndexesCol = transposedDataOnly.map((row, index) => (row[colIndex] !== 0 ? index : null))
        //     .filter(index => index !== null);

        const nonZeroIndexesRow = transposedDataOnly[rowIndex]
            .map((value, index) => (value !== 0 ? index : null))
            .filter(index => index !== null);

        const nonZeroIndexesCol = transposedDataOnly[colIndex]
            .map((value, index) => (value !== 0 ? index : null))
            .filter(index => index !== null);

        // Cari intersection antara indeks baris dan kolom yang memiliki nilai non-zero
        const intersection = nonZeroIndexesRow.filter(index => nonZeroIndexesCol.includes(index));

        // Ambil nilai langsung dari data untuk rowIndex dan colIndex pada intersection
        const rowValues = intersection.map(i => transposedDataOnly[rowIndex][i]);
        const colValues = intersection.map(i => transposedDataOnly[colIndex][i]);

        // Hitung numerator (pembilang)
        const numerator = rowValues.map((val, idx) => `(${val} \\times ${colValues[idx]})`).join(' + ');

        // Hitung denominator, ambil semua nilai non-zero dari rowIndex dan colIndex
        const denominatorRow = nonZeroIndexesRow.map(i => transposedDataOnly[rowIndex][i]);
        const denominatorCol = nonZeroIndexesCol.map(i => transposedDataOnly[colIndex][i]);

        const denominator = `{\\sqrt{(${denominatorRow.filter(val => val !== 0).map(val => `(${val})^2`).join(' + ')})} \\times  \\sqrt {(${denominatorCol.filter(val => val !== 0).map(val => `(${val})^2`).join(' + ')})}}`;

        // Buat expression untuk MathJax (menampilkan numerator dan denominator)
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${numerator}}{${denominator}} \\]`;

        return <MathJaxComponent math={expression} />;
    };








    const RenderItemTabelSimiliartas = () => {

        if (!result || !result['similarity']) return null;

        const numberOfColumnsSimItem = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama


        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">U/U</th>
                        {Array.from({length: numberOfColumnsSimItem}, (_, index) => (
                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {result['similarity'].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                            {row.map((value, colIndex) => (
                                <td key={colIndex}
                                    className={`border border-black px-4 py-2 text-center cursor-pointer hover:bg-card_green_primary ${
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
                                        <th className="border border-black px-4 py-2">I/U</th>
                                        {Array.from({length: transposedData[0].length}, (_, index) => (
                                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transposedData.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>

                                            {row.map((value, colIndex) => {
                                                const OriginalValue = transposedData[rowIndex][colIndex];
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
                                            <SimilaritasIndexItem rowIndex={selectedUserIndexItem[0]}
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


                            <h2 className='font-semibold text-md'>Data yang sudah terfilter</h2>
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedUserIndexItem && dataOnly ? (
                                        <>
                                            {/*<SimilaritasIndex rowIndex={selectedUserIndex[0]} colIndex={selectedUserIndex[1]} />*/}
                                            <SimilaritasValueItem rowIndex={selectedUserIndexItem[0]}
                                                                  colIndex={selectedUserIndexItem[1]}
                                                                  dataOnly={dataOnly}/>
                                        </>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>

                            <p className="text-xl font-bold text-gray-700">Hasil Similaritas antara item {selectedUserIndexItem[0]+1} dan {selectedUserIndexItem[1]+1}
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
                <h1 className='font-poppins font-semibold text-black'>Mencari Vector Cosine
                    Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {cosineExpresionItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusSimCosineItemBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Fungsi Similaritas Item-Based</h1>
                {/*    call api */}
                <RenderItemTabelSimiliartas/>
            </div>
        </div>
    )
}