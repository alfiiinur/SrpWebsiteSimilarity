import React from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";


const meanCenterdRatingUserBased = [
    `\\[ Su_{i} = r_{ui} -\\mu_{i}  \\forall u \\in \\left\\{1...m\\right\\} \\]`,
];



export function MeanCenteredSimUserBased(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Mencari Mean-Centered Rating User-Based</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {meanCenterdRatingUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    )
}



//ITEM-BASED

const meanCenterdRatingItemBased = [
    `\\[ Su_{i} = r_{ui} -\\mu_{i}  \\forall i \\in \\left\\{1...m\\right\\}  \\]`
]


export function MeanCenteredSimItemBased(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Mencari Mean-Centered Rating</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {meanCenterdRatingItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    )
}