import React, {useState, useEffect, useRef, useCallback} from 'react';
import {PearsonViewPageItemBased, PearsonViewPageUserBased} from "../components/viewMath/PearsonViewPage";
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import  * as d3 from "d3";
import {getPearsonPC} from "../api/api";

export default function Test(){
    const [dropdown1, setDropdown1] = useState('');
    const [dropdown2, setDropdown2] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = () => {
        if (dropdown1 === 'user-based' && dropdown2 === 'metode A') {
            setResult(<PearsonViewPageUserBased/>);
        } else if (dropdown1 === 'user-based' && dropdown2 === 'metode B') {
            setResult(<PearsonViewPageItemBased/>);
        } else if (dropdown1 === 'item-based' && dropdown2 === 'metode A') {
            setResult('Anda memilih Item-Based dengan Metode A');
        } else if (dropdown1 === 'item-based' && dropdown2 === 'metode B') {
            setResult('Anda memilih Item-Based dengan Metode B');
        } else {
            setResult(null);
        }
    };
    return(
        <div style={{padding: '20px'}}>
            <h1>Pilih Metode</h1>
            {/*<div>*/}
            {/*    <label>*/}
            {/*        Pilih Tipe:*/}
            {/*        <select value={dropdown1} onChange={(e) => setDropdown1(e.target.value)}>*/}
            {/*            <option value="">-- Pilih --</option>*/}
            {/*            <option value="user-based">User-Based</option>*/}
            {/*            <option value="item-based">Item-Based</option>*/}
            {/*        </select>*/}
            {/*    </label>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <label>*/}
            {/*        Pilih Metode:*/}
            {/*        <select value={dropdown2} onChange={(e) => setDropdown2(e.target.value)}>*/}
            {/*            <option value="">-- Pilih --</option>*/}
            {/*            <option value="metode A">Metode A</option>*/}
            {/*            <option value="metode B">Metode B</option>*/}
            {/*        </select>*/}
            {/*    </label>*/}
            {/*</div>*/}
            {/*<button onClick={handleSubmit}>Submit</button>*/}

            {/*{result && <h2>{result}</h2>}*/}
            <div>
                {/*<BasicScatter/>*/}
                <TestApiGet/>
            </div>
        </div>

    )
}


const data = [
    {
        id: 'data-0',
        x1: 329.39,
        x2: 391.29,
        y1: 443.28,
        y2: 153.9,
    },
    {
        id: 'data-1',
        x1: 96.94,
        x2: 139.6,
        y1: 110.5,
        y2: 217.8,
    },
    {
        id: 'data-2',
        x1: 336.35,
        x2: 282.34,
        y1: 175.23,
        y2: 286.32,
    },
];

// Fungsi untuk menghitung jarak Euclidean
const calculateDistance = (pointA, pointB) => {
    return Math.sqrt(Math.pow(pointA.x1 - pointB.x1, 2) + Math.pow(pointA.y1 - pointB.y1, 2));
};

export function BasicScatter() {
    const svgRef = useRef();
    const targetIndex = 0; // Ganti dengan indeks item target

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const targetPoint = data[targetIndex];

        // Mencari tetangga terdekat
        const neighbors = data
            .map((point, index) => {
                if (index !== targetIndex) {
                    return { ...point, distance: calculateDistance(targetPoint, point) };
                }
                return null;
            })
            .filter(Boolean);

        const nearestNeighbor = neighbors.reduce((closest, point) => {
            return point.distance < closest.distance ? point : closest;
        }, { distance: Infinity });

        const animateCircle = () => {
            svg.selectAll('circle').remove(); // Hapus lingkaran sebelumnya

            svg
                .append('circle')
                .attr('cx', nearestNeighbor.x1)
                .attr('cy', nearestNeighbor.y1)
                .attr('r', 0)
                .attr('fill', 'none')
                .attr('stroke', 'red')
                .attr('stroke-width', 2)
                .transition()
                .duration(1000)
                .attr('r', 20)
                .transition()
                .duration(1000)
                .attr('r', 0)
                .on('end', animateCircle); // Panggil kembali untuk loop
        };

        animateCircle(); // Mulai animasi

    }, [targetIndex]);

    return (
        <div style={{ position: 'relative' }}>
            <ScatterChart
                width={600}
                height={300}
                series={[
                    {
                        label: 'Series A',
                        data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                    },
                    {
                        label: 'Series B',
                        data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                    },
                ]}
            />
            <svg ref={svgRef} width={600} height={300} style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
    );
}



export function TestApiGet() {
    const [data, setData] = useState({
        data: [
            [5, 0, 4, 3, 5, 4],
            [4, 5, 0, 3, 2, 3],
            [0, 3, 0, 2, 1, 0],
            [1, 2, 2, 0, 3, 4],
            [1, 0, 1, 2, 3, 3],
        ],
        k: 2,
        opsional: 1
    })


    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);


    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await getPearsonPC(data);
            setResult(response.data);
            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data.detail : 'Something went wrong');
            setResult(null);
        }
    }, [data]);

    const RenderTableMean = () => {
        if (!result || !result['mean-list']) return null;
        return (
            <table className="border border-black mt-4">
                <thead>
                <tr className=" bg-gray-200">
                    <th className="border border-black px-4 py-2">U</th>
                    <th className="border border-black px-4 py-2">Mean</th>
                </tr>
                </thead>
                <tbody>
                {result['mean-list'].map((mean, index) => (
                    <tr key={index}>
                        <td className="border border-black px-4 py-2">{index + 1}</td>
                        <td className="border border-black px-4 py-2">
                            <div className="text-center">
                                {mean}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        );
    };

    const RenderTabelMeanCenterd = () => {
        if (!result || !result['mean-centered']) return null;

        const numberOfColumns = result['mean-centered'][0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <table className="border border-black mt-4">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">U/I</th>
                    {Array.from({ length: numberOfColumns }, (_, index) => (
                        <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {result['mean-centered'].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2">{rowIndex + 1}</td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} className="border border-black px-4 py-2 text-center">
                                {value.toFixed(1)} {/* Format desimal */}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };


    const RenderTabelSimilarity = () => {
        if (!result || !result['similarity']) return null;

        const numberOfColumns = result['similarity'][0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <table className="border border-black mt-4">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">U/U</th>
                    {Array.from({ length: numberOfColumns }, (_, index) => (
                        <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {result['similarity'].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2">{rowIndex + 1}</td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} className="border border-black px-4 py-2 text-center">
                                {value.toFixed(1)} {/* Format desimal */}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };


    const RenderTabelPrediksi = () => {
        if (!result || !result['prediction']) return null;

        const numberOfColumns = result['prediction'][0].length; // Ambil jumlah kolom dari baris pertama

        return (
            <table className="border border-black mt-4">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">U/I</th>
                    {Array.from({ length: numberOfColumns }, (_, index) => (
                        <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {result['prediction'].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2">{rowIndex + 1}</td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} className="border border-black px-4 py-2 text-center">
                                {value.toFixed(3)} {/* Format desimal */}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };



    return (
        <div>
            <h1>Similiarity pearson api</h1>
            <form onSubmit={handleSubmit}>
                <button type='submit'>Get Perason PPC GET API DATA</button>
            </form>
            {
                error && <div className='text-red-800'> {error}</div>
            }
            {RenderTableMean()}
            {RenderTabelMeanCenterd()}
            {RenderTabelSimilarity()}
            {RenderTabelPrediksi()}
        </div>
    )

}