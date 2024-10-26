import { useState, useEffect } from 'react';
import { getACosine, getCosine, getPearsonPC } from './api';

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

const handleSimilarityFunction = similarity => {
    switch (similarity) {
        case "Pearson Coreallation Coeficient (PCC)":
            return getPearsonPC

        case "Vectore Cosine":
            return getCosine
        case "Adjusted Vector Cosine":
            return getACosine
        default:
            return
    }
}

export const AllSimilaritas = (data, similaritas) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const callSimilaritas = handleSimilarityFunction(similaritas)
                const response = await callSimilaritas(data);
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