import  React from 'react'
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {MathJaxContext} from "better-react-mathjax";




//User-Based

const cosineUserBased = [
    `\\[ Cosine\\left(u,v\\right) = \\frac{\\sum_i\\in I_{uv}r_{ui}r_{vi}}{\\sqrt{\\sum_u\\in I_{u}r^{2}_{ui}}\\sqrt{\\sum_u\\in I_{v}r^{2}_{vi}}} \\]`
]

export function CosineMathUserBased(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Mencari Koefisien Korelasi Vector Cosine User-Based</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {cosineUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    )
}


//Item-Based

const cosineExpresionItemBased = [
    `\\[  Cosine\\left(i,j\\right) = \\frac{\\sum_u\\in U_{ij}r_{ui}r_{uj}}{\\sqrt{\\sum_u\\in U_{i}r^{2}_{ui}}\\sqrt{\\sum_u\\in U_{j}r^{2}_{uj}}} \\]`
]

export function CosineMathItemBased(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Mencari Vector Cosine Item-Based</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {cosineExpresionItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    )
}