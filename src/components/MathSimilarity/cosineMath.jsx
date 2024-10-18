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
        const meanCenteredRow = intersection.map(i => dataOnly[rowIndex][i] - mean(dataOnly[rowIndex]));
        const meanCenteredCol = intersection.map(i => dataOnly[colIndex][i] - mean(dataOnly[colIndex]));



        // Buat expression untuk MathJax (hanya menampilkan nilai mean-centered)
        const expression = `\\[ Sim(${rowIndex + 1},${colIndex + 1}) = \\frac{${meanCenteredRow.map((val, idx) => `(${val.toFixed(2)} \\times ${meanCenteredCol[idx].toFixed(2)})`).join(' + ')}}{${meanCenteredRow.map((val, idx) => `\\sqrt{(${val.toFixed(2)}) +  (${meanCenteredCol[idx].toFixed(2)})}`).join(' \\times ')}} \\]`;

        return <MathJaxComponent math={expression} />;
    };

// Fungsi untuk menghitung rata-rata (mean)
    const mean = (arr) => {
        const validValues = arr.filter(value => value !== 0); // Hanya hitung non-zero values
        return validValues.reduce((sum, value) => sum + value, 0) / validValues.length;
    };






    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    const [dataOnly, setDataOnly] = useState(initialData.data);

    const { result, error } = AllSimilaritas(data, similaritas);

    const RenderUserTabelSimiliartas = () => {

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


    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);

    const {result, error} = AllSimilaritas(data, similaritas);

    const RenderItemTabelSimiliartas = () => {

        if (!result || !result['similarity']) return null;

        const numberOfColumns = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama


        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">U/U</th>
                        {Array.from({length: numberOfColumns}, (_, index) => (
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
                                    onClick={() => handleMeanClick(value)}
                                >
                                    {value.toFixed(2)} {/* Format desimal */}
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

                            <p className="text-xl font-bold text-gray-700">Hasil mean dari adalah
                                = {selectedMean.toFixed(2)}</p>

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