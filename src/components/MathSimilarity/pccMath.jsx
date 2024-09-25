import React from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";


// USER-BASED

const  PccFunctionMathUserBased =[
    `\\[ PCC(u,v) = \\frac{\\sum_u\\in I_{uv} \\left(r_{ui} - \\overline{r_{u}}\\right)\\left(r_{vi}-\\overline{r_{u}}\\right)}{\\sqrt{\\sum_u \\in U_{ij} \\left(r_{ui} - \\overline{r_{u}} \\right)^{2}}\\sqrt{\\sum_i \\in I_{uv} \\left(r_{vi} - \\overline{r_{v}} \\right)^{2}}} \\]`
]


export function PearsonSimUserBased() {
    return (
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Mencari Koefisien Korelasi Pearson Correlation Coefficient (PCC) User-Based</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {PccFunctionMathUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    );
}


//ITEM-BASED


const PccFunctionMathItemBased = [
    `\\[ PCC(i,j) = \\frac{\\sum_u\\in U_{ij} \\left(r_{ui} - \\overline{r_{i}}\\right)\\left(r_{uj}-\\overline{r_{j}}\\right)}{\\sqrt{\\sum_u \\in U_{ij} \\left(r_{ui} - \\overline{r_{i}} \\right)^{2}}\\sqrt{\\sum_u \\in U_{ij} \\left(r_{uj} - \\overline{r_{j}} \\right)^{2}}} \\]`
]


export function PearsonSimItemBased(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Mencari Koefisien Korelasi
                Pearson Correlation Coefficient (PCC) Item Based</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {PccFunctionMathItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>

        </div>
    )
}