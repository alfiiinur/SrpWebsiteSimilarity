import React, { useState, useEffect } from 'react';
import { getPearsonPC, getCosine, getACosine, getBC } from "./api";

// opsional = 1 user-based
// opsional = 0 item-based
// export function useDataSet(initialOpsional) {
//     const [data, setData] = useState({
//         data: [
//             [5, 0, 4, 3, 5, 4],
//             [4, 5, 0, 3, 2, 3],
//             [0, 3, 0, 2, 1, 0],
//             [1, 2, 2, 0, 3, 4],
//             [1, 0, 1, 2, 3, 3],
//         ],
//         k: 2,
//         opsional: initialOpsional,
//     });
//
//     const [result, setResult] = useState(null);
//     const [error, setError] = useState(null);
//
//     const resetResult = () => {
//         setResult(null);
//         setError(null);
//     };
//
//     const similarityFunctions = {
//         pearson: getPearsonPC,
//         cosine: getCosine,
//         acosine: getACosine,
//         bc: getBC,
//     };
//
//     const handleSubmit = async (similarityType) => {
//         resetResult();
//
//         // Validate input data
//         if (!data.data.length || data.k <= 0) {
//             setError("Please ensure that the data is valid.");
//             return;
//         }
//
//         try {
//             const similarityFunction = similarityFunctions[similarityType];
//             if (!similarityFunction) {
//                 throw new Error("Invalid similarity function type.");
//             }
//
//             const response = await similarityFunction(data);
//             setResult(response.data);
//         } catch (err) {
//             console.error(err);
//             setError(err.response ? err.response.data.detail : 'Something went wrong');
//         }
//     };
//
//     return {data, setData, handleSubmit, result, error};
// }



export const getInitialData = (opsional) => ({
    data: [
        [5, 0, 4, 3, 5, 4],
        [4, 5, 0, 3, 2, 3],
        [0, 3, 0, 2, 1, 0],
        [1, 2, 2, 0, 3, 4],
        [1, 0, 1, 2, 3, 3],
    ],
    k: 2,
    opsional: opsional
});

export const AllSimilaritas = (data, similaritas) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await similaritas(data);
                setResult(response.data);
                setError(null);
            } catch (err) {
                setError(err.response ? err.response.data.detail : 'Something went wrong');
                setResult(null);
            }
        };

        fetchData();
    }, [data, similaritas]);

    return { result, error };
};