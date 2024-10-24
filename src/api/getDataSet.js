import { useState, useEffect } from 'react';

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