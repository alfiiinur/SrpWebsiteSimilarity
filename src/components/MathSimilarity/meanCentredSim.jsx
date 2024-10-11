import React, {useState} from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";
import {AllSimilaritas, getInitialData} from "../../api/getDataSet";


const meanCenterdRatingUserBased = [
    `\\[ Su_{i} = r_{ui} -\\mu_{i}  \\forall u \\in \\left\\{1...m\\right\\} \\]`,
];

//keterangan rumus mean-CENTERD

const DetailRumusMeanCenUserBased = [
    `\\[ Su_{i} = \\text{Rata-rata pada user u} \\] `,
    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,

]

export function MeanCenteredSimUserBased({opsional, similaritas}){
    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);

    const { result, error } = AllSimilaritas(data, similaritas);
    const RenderUserTabelMeanCenterdPCC = () => {
        if (!result || !result['mean-centered']) return null;

        const numberOfColumns = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <div className='flex justify-center mt-4'>
            <table className="border border-black mt-4">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">U/I</th>
                    {Array.from({ length: numberOfColumns }, (_, index) => (
                        <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {result['mean-centered'].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} className="border border-black px-4 py-2 text-center">
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
                <h1 className='font-poppins font-semibold text-black'>Mencari Mean-Centered Rating
                    User-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {meanCenterdRatingUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
           <FunctionMeasureDropdown DetailRumus={DetailRumusMeanCenUserBased}/>

            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Mean-Centerd User-Based</h1>
                {/*    call api */}
                <RenderUserTabelMeanCenterdPCC/>
            </div>
        </div>
    )
}


//ITEM-BASED

const meanCenterdRatingItemBased = [
    `\\[ Su_{i} = r_{ui} -\\mu_{i}  \\forall i \\in \\left\\{1...m\\right\\}  \\]`
]

const DetailRumusMeanCenItemBased = [
    `\\[ Su_{i} = \\text{Rata-rata pada user u} \\] `,
    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`,
    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,

]

export function MeanCenteredSimItemBased({opsional, similaritas}) {
    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);

    const { result, error } = AllSimilaritas(data, similaritas);
    const RenderItemTabelMeanCenterdPCC = () => {
        if (!result || !result['mean-centered']) return null;

        const numberOfColumns = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <div className='flex justify-center mt-4'>
            <table className="border border-black mt-4">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">U/I</th>
                    {Array.from({ length: numberOfColumns }, (_, index) => (
                        <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {result['mean-centered'].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} className="border border-black px-4 py-2 text-center">
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
                <h1 className='font-poppins font-semibold text-black'>Mencari Mean-Centered Rating Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {meanCenterdRatingItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusMeanCenItemBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Mean-Centerd Item-Based</h1>
                {/*    call api */}
                <RenderItemTabelMeanCenterdPCC/>
            </div>
        </div>
    )
}