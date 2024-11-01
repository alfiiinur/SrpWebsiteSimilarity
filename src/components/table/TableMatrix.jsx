import React, { useState } from "react";
import { NotationCard } from "../Tabel_Data";

function InputList({ children, change }) {
    const handleInputChange = (e) => {
        const value = e.target.value;

        if (/^\d*\.?\d*$/.test(value)) {
            change(e)
        }
    };
    return (
        <input
            type="text"
            placeholder={children}
            onChange={handleInputChange}
            value={children === "?" ? "" : children}
            className={`w-full px-4 py-2 text-center ${children === "?" ? 'bg-red-200 text-black' : 'bg-transparent text-black'}`}
        />
    );
}

export default function TableMatrix({ Data, onDataChange, onDescriptionChange }) {
    const [data, setData] = useState(Data)

    const changeData = (i, j, value) => {
        let currentData = [...data];
        if (!currentData[i]) {
            currentData[i] = [];
        }
        currentData[i][j] = Number(value);
        setData(currentData);
        onDataChange(currentData);
        onDescriptionChange(false);
    };

    return (
        <div className="flex flex-col justify-center">
            <h1 className='text-2xl font-bold font-poppins py-10'>Hasil Tabel Matrix</h1>
            <div className="flex justify-center items-center min-h-[40vh]">
                <table className="min-w-full max-w-4xl border-collapse border border-black text-black font-poppins">
                    <thead>
                        <tr>
                            <th className="border border-black px-4 py-2 text-center bg-card_green_primary">U/I</th>
                            {Data[0].map((_, index) => (
                                <th key={index} className="border border-black px-4 py-2 bg-yellow-btn-primary">{index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Data.map((value, i) => (
                            <tr key={i}>
                                <td className="border border-black px-4 py-2 text-center bg-blue-200">{i + 1}</td>
                                {value.map((value1, j) => (
                                    <td key={j} className="border border-black text-center text-black bg-transparent">
                                        <InputList change={(e) => changeData(i, j, e.target.value)}>{value1 === 0 ? "?" : value1}</InputList>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-left max-w-4xl">
                <p className="font-bold">Keterangan:</p>
                <ul className="flex flex-row p-2 space-y-2">
                    <li className="flex items-center">
                        <div className="w-10 h-5 bg-red-500 border border-black mr-2 flex items-center justify-center text-white">
                            ?
                        </div>
                        Cell berwarna merah menandakan data rating yang tidak diketahui atau Data Sparsity
                    </li>
                    <li className="flex items-center">
                        <div className="w-10 h-5 bg-blue-200 border border-black mr-2"></div>
                        Menandakan User yang telah memberikan nilai
                    </li>
                    <li className="flex items-center">
                        <div className="w-10 h-5 bg-yellow-btn-primary border border-black mr-2"></div>
                        Menandakan Item yang telah di berikan rating oleh user
                    </li>
                </ul>
            </div>
            <NotationCard />
        </div>
    );
}
