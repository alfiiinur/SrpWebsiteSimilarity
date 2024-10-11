import React, {useState} from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";
import {AllSimilaritas, getInitialData} from "../../api/getDataSet";



// USER-BASED

const  PccFunctionMathUserBased =[
    `\\[ PCC(u,v) = \\frac{\\sum_u\\in I_{uv} \\left(r_{ui} - \\overline{r_{u}}\\right)\\left(r_{vi}-\\overline{r_{u}}\\right)}{\\sqrt{\\sum_u \\in U_{ij} \\left(r_{ui} - \\overline{r_{u}} \\right)^{2}}\\sqrt{\\sum_i \\in I_{uv} \\left(r_{vi} - \\overline{r_{v}} \\right)^{2}}} \\]`
]

const DetailRumusSimUserBased = [
    `\\[ I_{uv} = \\text{Kumpulan item yang telah di rating oleh user u dan v} \\]`,
    `\\[ \\overline{r_{u}}  = \\text{Rata-rata nilai rating yang diberikan oleh user u pada seluruh item i} \\]`,
    `\\[ \\overline{r_{v}} = \\text{Rata-rata nilai rating yang diberikan oleh user v pada seluruh item i} \\]`,
    `\\[ r_{ui} = \\text{Nilai rating pada user u pada item yang sama} \\]`,
    `\\[ r_{vi} = \\text{Nilai rating pada user v pada item yang sama} \\]`,
];



export function PearsonSimUserBased({opsional, similaritas}) {

    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);

    const { result, error } = AllSimilaritas(data, similaritas);

    const RenderUserTabelSimilarity = () => {
        if (!result || !result['similarity']) return null;

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
                            <td key={colIndex} className={`border border-black px-4 py-2 text-center ${
                                value === 1 ? 'bg-red-200' : ''
                            }`}>
                                {value.toFixed(1)} {/* Format desimal */}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
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
    `\\[ PCC(i,j) = \\frac{\\sum_u\\in U_{ij} \\left(r_{ui} - \\overline{r_{i}}\\right)\\left(r_{uj}-\\overline{r_{j}}\\right)}{\\sqrt{\\sum_u \\in U_{ij} \\left(r_{ui} - \\overline{r_{i}} \\right)^{2}}\\sqrt{\\sum_u \\in U_{ij} \\left(r_{uj} - \\overline{r_{j}} \\right)^{2}}} \\]`
]
const DetailRumusSimItemBased = [
    `\\[ U_{ij} = \\text{Kumpulan user yang telah merating pada item yang sama user u dan v} \\]`,
    `\\[ \\overline{r_{i}}  = \\text{Rata-rata nilai rating pada item i yang telah merating} \\]`,
    `\\[ \\overline{r_{j}} = \\text{Rata-rata nilai rating pada item j yang telah merating} \\]`,
    `\\[ r_{ui} = \\text{Nilai rating pada user u terhadap item i } \\]`,
    `\\[ r_{uj} = \\text{Nilai rating pada user v terhadap item j} \\]`,

]

export function PearsonSimItemBased({opsional, similaritas}) {
    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);

    const { result, error } = AllSimilaritas(data, similaritas);

    const RenderItemTabelSimilarity = () => {
        if (!result || !result['similarity']) return null;

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
                            <td key={colIndex} className={`border border-black px-4 py-2 text-center ${
                                value === 1 ? 'bg-red-200' : ''
                            }`}>
                                {value.toFixed(1)} {/* Format desimal */}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
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
                <h1>HASIL VISUALISASI SIMILARITY PEARSON</h1>
            </div>

        </div>
    )
}