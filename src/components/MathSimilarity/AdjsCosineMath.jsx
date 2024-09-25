import  React from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";




//User-Based
const  adjustCosineUserBased = [
    `\\[ ACosine(u,v) = \\frac{\\sum_i\\in I_{uv} \\left(r_{ui} - \\overline{r_{i}}\\right)\\left(r_{vi}-\\overline{r_{i}}\\right)}{\\sqrt{\\sum_u \\in I_{uv} \\left(r_{ui} - \\overline{r_{i}} \\right)^{2}}\\sqrt{\\sum_i \\in I_{uv} \\left(r_{vi} - \\overline{r_{i}} \\right)^{2}}} \\]`
]


export function AdjustedCosineUserBased(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Mencari Similaritas Adjusted Cosine User-Based</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {adjustCosineUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    )
}


//Item-Based


const adjustedCosineItemBased = [
    `\\[ ACosine(i,j) = \\frac{\\sum_u\\in U_{ij} \\left(r_{ui} - \\overline{r_{u}}\\right)\\left(r_{uj}-\\overline{r_{u}}\\right)}{\\sqrt{\\sum_u \\in U_{ij} \\left(r_{ui} - \\overline{r_{u}} \\right)^{2}}\\sqrt{\\sum_i \\in U_{ij} \\left(r_{uj} - \\overline{r_{u}} \\right)^{2}}} \\]`
]


export function AdjustedCosineItemBased(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Mencari Similaritas Adjusted Cosine Item-Based</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {adjustedCosineItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    )
}