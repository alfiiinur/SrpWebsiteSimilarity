import  React from 'react'
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {MathJaxContext} from "better-react-mathjax";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";




//User-Based

const cosineUserBased = [
    `\\[ Cosine\\left(u,v\\right) = \\frac{\\sum_i\\in I_{uv}r_{ui}r_{vi}}{\\sqrt{\\sum_u\\in I_{u}r^{2}_{ui}}\\sqrt{\\sum_u\\in I_{v}r^{2}_{vi}}} \\]`
]


const DetailRumusSimCosineUserBased = [
    `\\[ I_{uv} = \\text{Kumpulan item yang telah di rating oleh user u dan v} \\] `,
    `\\[ r_{ui} = \\text{Nilai rating pada user u pada item yang sama} \\]`,
    `\\[ r_{vi} = \\text{Nilai rating pada user v pada item yang sama} \\]`,

]

export function CosineMathUserBased(){
    return(
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

export function CosineMathItemBased(){
    return(
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
            </div>
        </div>
    )
}