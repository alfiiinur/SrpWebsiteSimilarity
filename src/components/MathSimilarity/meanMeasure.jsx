import React from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";


// MEAN USER-BASED

const meanExpressionsUserBased = [
    `\\[ U_{u} = \\frac{\\sum_i\\in I_{u} r_{ui}}{\\left[I_{u}\\right]}   \\forall u\\in\\left\\{1...m\\right\\} \\]`,
];

export function MeanMeasureUserBased(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>1. Mencari Mean Rating</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {meanExpressionsUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    )
}



//MEAN ITEM-BASED

const meanExpressionsItemBased =[
    `\\[ U_{i} = \\frac{\\sum_u\\in U_{i} r_{ui}}{\\left[U_{i}\\right]}   \\forall u\\in\\left\\{1...m\\right\\} \\]`
]

export function MeanMeasureItemBased(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Mencari Mean Rating Item-Based</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {meanExpressionsItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    )
}