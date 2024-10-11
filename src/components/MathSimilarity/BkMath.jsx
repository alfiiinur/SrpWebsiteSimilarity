import React, {useState} from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";
import {AllSimilaritas, getInitialData} from "../../api/getDataSet";




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

export function BhattacharyyaItemBased({opsional, similaritas}){
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
                <h1 className='font-poppins font-semibold text-black'>Mencari Koefisien Korelasi
                    Bhattacharyya Distance Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {BhattacharyyaFunctionItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusSimBhattacharyyaItemBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Fungsi Similaritas Item-Based</h1>
                {/*    call api */}
                <RenderItemTabelSimilarity/>
            </div>
        </div>
    )
}