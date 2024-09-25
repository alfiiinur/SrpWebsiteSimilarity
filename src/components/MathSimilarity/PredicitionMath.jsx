import React from 'react';
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";



//predicition user-based
const UserBasedPrediciton = [
    `\\[ {\\widetilde{r_{ui}}} = \\overline{r_{u}} +\\frac{\\sum_v\\in N_u^i Sim_{uv}*\\left(r_{vi} - \\overline{r_{v}}\\right)}{\\sum_v \\in N_u^i\\mid Sim_{uv} \\mid} \\]`
]


export function UserBasedPredicition(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Fungsi Prediksi User-Based</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {UserBasedPrediciton.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    )
}


//prediciton item-based

const ItemBasedPrediction = [
    `\\[ {\\widetilde{r_{ui}}} = \\overline{r_{i}} +\\frac{\\sum_j\\in N_u^i Sim_{ij}*\\left(r_{uj} - \\overline{r_{j}}\\right)}{\\sum_j \\in N_u^i\\mid Sim_{ij} \\mid} \\]`
]



export function ItemBasedPrediciton(){
    return(
        <div>
            <h1 className='text-start font-poppins font-semibold text-black px-10 '>Fungsi Prediksi Item-Based</h1>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {ItemBasedPrediction.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
        </div>
    )
}