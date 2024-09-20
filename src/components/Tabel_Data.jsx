// src/App.js
import React from 'react';

function TabelView() {
    const data = [
        ['1', '5', '?', '4', '3', '5', '4'],
        ['2', '4', '5', '?', '3', '2', '3'],
        ['3', '?', '3', '?', '2', '1', '?'],
        ['4', '1', '2', '2', '?', '3', '4'],
        ['5', '1', '?', '1', '2', '3', '3'],
    ];

    const headers  = ['U/I', '1', '2', '3', '4' , '5', '6']

    return (
        <div className="flex flex-col items-center justify-center">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="border border-gray-300 px-4 py-2 bg-yellow-btn-primary">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => {
                            // Menentukan kelas berdasarkan nilai sel
                            const cellClass = cell === '?' || cell === '' ? 'border border-gray-300 px-4 py-2 text-center bg-red-500' : 'border border-gray-300 px-4 py-2 text-center';
                            return (
                                <td key={colIndex} className={cellClass}>
                                    {cell}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
        ;
}

export default TabelView;
