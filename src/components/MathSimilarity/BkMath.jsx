import React, {useEffect, useState} from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";
import {AllSimilaritas, getInitialData} from "../../api/getDataSet";
import {getBC} from "../../api/api";




//user-based

const  BhattacharyyaFunctionUserBased =[
    `\\[  BC(u,v) = \\sum_a\\sqrt{P\\left(r_{u*}=a\\right)\\times P\\left(r_{v*}=a\\right)} \\]`
]

const DetailRumusSimBhattacharyyaUserBased = [
    `\\[ Su_{i} = \\text{Rata-rata pada user u} \\] `,
    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,

]

export function BhattacharyyaUserBased({opsional, similaritas}){

    const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
    const [selectedUserIndex, setSelectedUserIndex] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedExpression, setSelectedExpression] = useState(null);
    const [activeUserIndices, setActiveUserIndices] = useState([]);


    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    const [dataOnly, setDataOnly] = useState(initialData.data);


    const { result, error } = AllSimilaritas(data, similaritas);


    const handleMeanClick = (value, rowIndex, colIndex) => {
        const expressionIndex = IndexProbsFun(rowIndex, colIndex); // Generate LaTeX expression
        const expressionIndexValue = IndexValueProbsFun(rowIndex, colIndex); // Generate LaTeX expression
        const hasilProbsIndexValue = HasilProbsValue(rowIndex, colIndex); // Generate LaTeX expression
        // const MeanExp = CenterdValue(rowIndex, colIndex);
        setSelectedExpression([expressionIndex, expressionIndexValue, hasilProbsIndexValue]); //


        setSelectedMean(value); // Simpan nilai mean yang ditekan
        setSelectedUserIndex([rowIndex, colIndex])
        // Menyimpan baris dan kolom aktif
        setActiveUserIndices([rowIndex, colIndex]); // Simpan baris dan kolom aktif
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedMean(null); // Reset nilai mean yang dipilih
        setSelectedUserIndex(null)
    };


    // rumus


    const IndexProbsFun = (rowIndex, colIndex) => {
        const ratings = [1, 2, 3, 4, 5]; // Daftar rating
        const sumTerms = ratings.map(rating =>
            `\\sqrt{P\\left(r_{${rowIndex + 1}}= ${rating}\\right)\\times P\\left(r_{${colIndex + 1}}= ${rating}\\right)}`
        ).join(' + '); // Menggabungkan dengan tanda tambah

        return `\\[  BC(${rowIndex + 1},${colIndex + 1}) =  ${sumTerms} \\]`;
    };

    const IndexValueProbsFun = (rowIndex, colIndex) => {
        if (!result || !result['probabilities']) return null;

        // Get the probabilities for the selected row and column
        const rowProbabilities = result['probabilities'][rowIndex + 1]; // Assuming keys are 1-based
        const colProbabilities = result['probabilities'][colIndex + 1]; // Assuming keys are 1-based

        if (!rowProbabilities || !colProbabilities) return null;

        const ratings = [1, 2, 3, 4, 5]; // Daftar rating
        const sumTerms = ratings.map(rating => {
            const rowProb = rowProbabilities[rating - 1] || 0; // Use 0 if undefined
            const colProb = colProbabilities[rating - 1] || 0; // Use 0 if undefined

            return `\\sqrt{\\left(${rowProb}\\right)\\times \\left(${colProb}\\right)}`;
        }).join(' + '); // Menggabungkan dengan tanda tambah

        return `\\[  BC(${rowIndex + 1},${colIndex + 1}) = ${sumTerms} \\]`;
    };

    const HasilProbsValue = (rowIndex, colIndex) => {
        if (!result || !result['probabilities']) return null;

        // Get the probabilities for the selected row and column
        const rowProbabilities = result['probabilities'][rowIndex + 1]; // Assuming keys are 1-based
        const colProbabilities = result['probabilities'][colIndex + 1]; // Assuming keys are 1-based

        if (!rowProbabilities || !colProbabilities) return null;

        const ratings = [1, 2, 3, 4, 5]; // Daftar rating
        const productTerms = ratings.map(rating => {
            const rowProb = rowProbabilities[rating - 1] || 0; // Use 0 if undefined
            const colProb = colProbabilities[rating - 1] || 0; // Use 0 if undefined

            // Calculate the product for each rating
            const product = Math.sqrt(rowProb * colProb);

            return `  {\\left(${product.toFixed(4)}\\right)}`; // Display square root of product
        }).join(' + '); // Menggabungkan dengan tanda tambah

        return `\\[  BC(${rowIndex + 1},${colIndex + 1}) = ${productTerms} \\]`;
    };






    const RenderUserTabelSimilarity = () => {
        if (!result || !result['similarity']) return null;
        if (!result || !result['probabilities']) return null;
        const numberOfColumns = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">U/U</th>
                        {Array.from({ length: numberOfColumns }, (_, index) => (
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
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
                            <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Fungsi Similaritas</h2>

                            <h2 className='text-xl font-semibold'>Probabilities</h2>
                            <div className="overflow-x-auto"> {/* Tambahkan ini untuk responsivitas tabel */}
                                <table className="border border-black mt-2 mx-auto text-center">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">User</th>
                                        <th className="border border-black px-4 py-2">Rating Probability</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.entries(result['probabilities']).map(([key, value], index) => (
                                        <tr key={key} className={activeUserIndices.includes(index) ? 'bg-green-200' : ''}>
                                            <td className="border border-black px-4 py-2">{key}</td>
                                            <td className="border border-black px-4 py-2">{value.join(', ')}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/*rumus */}
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedExpression ? (
                                        <MathJaxComponent math={selectedExpression}/>
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
                    Bhattacharyya Distance User-Based</h1>
            </div>


            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {BhattacharyyaFunctionUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusSimBhattacharyyaUserBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Fungsi Similaritas User-Based</h1>
                {/*    call api */}
                <RenderUserTabelSimilarity/>
            </div>
        </div>
    )
}


//item-based


const BhattacharyyaFunctionItemBased = [
    `\\[ BC(i,j) = \\sum_a\\sqrt{P\\left(r_{i*}=a\\right)\\times P\\left(r_{j*}=a\\right)}  \\]`
]


const DetailRumusSimBhattacharyyaItemBased = [
    `\\[ Su_{i} = \\text{Rata-rata pada user u} \\] `,
    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,

]

export function BhattacharyyaItemBased({ opsional, similaritas }) {
    const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
    const [selectedUserIndex, setSelectedUserIndex] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedExpression, setSelectedExpression] = useState(null);
    const [activeUserIndices, setActiveUserIndices] = useState([]);




    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);
    const [dataOnly, setDataOnly] = useState(initialData.data);


    const { result, error } = AllSimilaritas(data, similaritas);

    const handleMeanClick = (value, rowIndex, colIndex) => {
        const expressionIndexItem = IndexProbsFunItem(rowIndex, colIndex); // Generate LaTeX expression
        const expressionIndexValueItem = IndexValueProbsFunItem(rowIndex, colIndex); // Generate LaTeX expression
        const hasilProbsIndexValueItem = HasilProbsValueItem(rowIndex, colIndex); // Generate LaTeX expression
        // const MeanExp = CenterdValue(rowIndex, colIndex);
        setSelectedExpression([expressionIndexItem, expressionIndexValueItem, hasilProbsIndexValueItem]); //





        setSelectedMean(value);
        setSelectedUserIndex([rowIndex, colIndex]);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMean(null);
        setSelectedUserIndex(null);
    };


    const IndexProbsFunItem = (rowIndex, colIndex) => {
        const ratings = [1, 2, 3, 4, 5]; // Daftar rating
        const sumTerms = ratings.map(rating =>
            `\\sqrt{P\\left(r_{${rowIndex + 1}}= ${rating}\\right)\\times P\\left(r_{${colIndex + 1}}= ${rating}\\right)}`
        ).join(' + '); // Menggabungkan dengan tanda tambah

        return `\\[  BC(${rowIndex + 1},${colIndex + 1}) =  ${sumTerms} \\]`;
    };


    const IndexValueProbsFunItem = (rowIndex, colIndex) => {
        if (!result || !result['probabilities']) return null;

        // Get the probabilities for the selected row and column
        const rowProbabilities = result['probabilities'][rowIndex + 1]; // Assuming keys are 1-based
        const colProbabilities = result['probabilities'][colIndex + 1]; // Assuming keys are 1-based

        if (!rowProbabilities || !colProbabilities) return null;

        const ratings = [1, 2, 3, 4, 5]; // Daftar rating
        const sumTerms = ratings.map(rating => {
            const rowProb = rowProbabilities[rating - 1] || 0; // Use 0 if undefined
            const colProb = colProbabilities[rating - 1] || 0; // Use 0 if undefined

            return `\\sqrt{\\left(${rowProb}\\right)\\times \\left(${colProb}\\right)}`;
        }).join(' + '); // Menggabungkan dengan tanda tambah

        return `\\[  BC(${rowIndex + 1},${colIndex + 1}) = ${sumTerms} \\]`;
    };

    const HasilProbsValueItem = (rowIndex, colIndex) => {
        if (!result || !result['probabilities']) return null;

        // Get the probabilities for the selected row and column
        const rowProbabilities = result['probabilities'][rowIndex + 1]; // Assuming keys are 1-based
        const colProbabilities = result['probabilities'][colIndex + 1]; // Assuming keys are 1-based

        if (!rowProbabilities || !colProbabilities) return null;

        const ratings = [1, 2, 3, 4, 5]; // Daftar rating
        const productTerms = ratings.map(rating => {
            const rowProb = rowProbabilities[rating - 1] || 0; // Use 0 if undefined
            const colProb = colProbabilities[rating - 1] || 0; // Use 0 if undefined

            // Calculate the product for each rating
            const product = Math.sqrt(rowProb * colProb);

            return `  {\\left(${product.toFixed(4)}\\right)}`; // Display square root of product
        }).join(' + '); // Menggabungkan dengan tanda tambah

        return `\\[  BC(${rowIndex + 1},${colIndex + 1}) = ${productTerms} \\]`;
    };


    const RenderItemTabelSimilarity = () => {
        if (!result || !result['similarity']) return null;
        if (!result || !result['probabilities']) return null;
        const numberOfColumns = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama


        return (
            <div className='flex justify-center mt-4'>
                <table className="border border-black mt-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">U/U</th>
                        {Array.from({ length: numberOfColumns }, (_, index) => (
                            <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {result['similarity'].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                            {row.map((value, colIndex) => (
                                <td key={colIndex} className={`border border-black px-4 py-2 text-center cursor-pointer hover:bg-card_green_primary ${value === 1 ? 'bg-red-200' : ''}`}
                                    onClick={() => handleMeanClick(value, rowIndex, colIndex)}>
                                    {value.toFixed(4)}
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
                                <table className="border border-black mt-2 mx-auto text-center">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-black px-4 py-2">Item</th>
                                        <th className="border border-black px-4 py-2">Rating Probability</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.entries(result['probabilities']).map(([key, value], index) => (
                                        <tr key={key}
                                            className={activeUserIndices.includes(index) ? 'bg-green-200' : ''}>
                                            <td className="border border-black px-4 py-2">{key}</td>
                                            <td className="border border-black px-4 py-2">{value.join(', ')}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>


                            {/*rumus */}
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-center items-center flex-col px-10'>
                                    {selectedExpression ? (
                                        <MathJaxComponent math={selectedExpression}/>
                                    ) : (
                                        <p>No expression selected.</p>
                                    )}
                                </div>
                            </MathJaxContext>

                            <p className="text-xl font-bold text-gray-700">Hasil mean dari adalah
                                = {selectedMean.toFixed(4)}</p>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>
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
                <h1 className='font-poppins font-semibold text-black'>Mencari Koefisien Korelasi Bhattacharyya Distance
                    Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>
                    {BhattacharyyaFunctionItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusSimBhattacharyyaItemBased}/>
            <div className='px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Fungsi Similaritas Item-Based</h1>
                <RenderItemTabelSimilarity/>
            </div>
        </div>
    );
}