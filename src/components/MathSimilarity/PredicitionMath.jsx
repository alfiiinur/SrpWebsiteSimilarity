import React, {useState} from 'react';
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";
import TabelView from "../Tabel_Data";
import {AllSimilaritas, getInitialData} from "../../api/getDataSet";



//predicition user-based
const UserBasedPrediciton = [
    `\\[ {\\widetilde{r_{ui}}} = \\overline{r_{u}} +\\frac{\\sum_v\\in N_u^i Sim_{uv}*\\left(r_{vi} - \\overline{r_{v}}\\right)}{\\sum_v \\in N_u^i\\mid Sim_{uv} \\mid} \\]`
]
const DetailRumusPrediksiUserBased = [
    `\\[ \\overline{r_{u}} = \\text{Rata-rata rating yang diberikan oleh user u pada seluruh item} \\] `,
    `\\[ \\overline{r_{v}} = \\text{Rata-rata rating yang diberikan oleh user v pada seluruh item} \\] `,
    `\\[ Sim_{uv} = \\text{Nilai similaritas antara user u dan v} \\] `,
    `\\[ r_{vi} = \\text{Nilai rating yang diberikan oleh user v terhadap item i} \\] `,

]

export function UserBasedPredicition({opsional, similaritas}){
    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);

    const { result, error } = AllSimilaritas(data, similaritas);


    const RenderUserTabelPrediksi = () => {
        if (!result || !result['prediction']) return null;

        const numberOfColumns = result['prediction'][0].length; // Ambil jumlah kolom dari baris pertama

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
                {result['prediction'].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2 bg-blue-200">{rowIndex + 1}</td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} className="border border-black px-4 py-2 text-center">
                                {value.toFixed(3)} {/* Format desimal */}
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
                <h1 className='font-poppins font-semibold text-black'>Fungsi Prediksi User-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {UserBasedPrediciton.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusPrediksiUserBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Prediction User-Based</h1>
                {/*    call api */}
                <RenderUserTabelPrediksi/>
            </div>
            <div className="flex items-center my-5">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Menghasilkan Top-N Rekomendasi </h1>
            </div>

        </div>
    )
}


//prediciton item-based

const ItemBasedPrediction = [
    `\\[ {\\widetilde{r_{ui}}} = \\overline{r_{i}} +\\frac{\\sum_j\\in N_u^i Sim_{ij}*\\left(r_{uj} - \\overline{r_{j}}\\right)}{\\sum_j \\in N_u^i\\mid Sim_{ij} \\mid} \\]`
]

const DetailRumusPrediksiItemBased = [
    `\\[ \\overline{r_{i}} = \\text{Rata-rata nilai rating pada item i yang telah merating} \\] `,
    `\\[ \\overline{r_{j}} = \\text{Rata-rata nilai rating pada item j yang telah merating} \\] `,
    `\\[ Sim_{ij} = \\text{Nilai similaritas antara item i dan j} \\] `,
    `\\[ r_{uj} = \\text{Nilai rating pada user v terhadap item j} \\] `,

]

export function ItemBasedPrediciton({opsional, similaritas}) {
    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);

    const { result, error } = AllSimilaritas(data, similaritas);

    const RenderItemTabelPrediksi = () => {
        if (!result || !result['prediction']) return null;

        const numberOfColumns = result['prediction'][0].length; // Ambil jumlah kolom dari baris pertama

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
                    {result['prediction'].map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-black px-4 py-2 bg-blue-200">{rowIndex + 1}</td>
                            {row.map((value, colIndex) => (
                                <td key={colIndex} className="border border-black px-4 py-2 text-center">
                                    {value.toFixed(3)} {/* Format desimal */}
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
                <h1 className='font-poppins font-semibold text-black'>Fungsi Prediksi Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {ItemBasedPrediction.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusPrediksiItemBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Prediksi Item-Based</h1>
                {/*    call api */}
                <RenderItemTabelPrediksi/>
            </div>
            <div className="flex items-center my-5">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Menghasilkan Top-N Rekomendasi </h1>
            </div>

        </div>
    )
}