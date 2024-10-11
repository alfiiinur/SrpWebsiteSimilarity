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

    return(
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


export function AdjustedCosineItemBased({opsional, similaritas}){
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
    return(
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