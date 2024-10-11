// src/App.js
import React, {useState} from 'react';
import {FaChevronDown} from "react-icons/fa";
import TabelViewDataStatis from "./tabelData/TabelStatis";

function TabelView() {
    const data = [
        ['1', '5', '?', '4', '3', '5', '4'],
        ['2', '4', '5', '?', '3', '2', '3'],
        ['3', '?', '3', '?', '2', '1', '?'],
        ['4', '1', '2', '2', '?', '3', '4'],
        ['5', '1', '?', '1', '2', '3', '3'],
    ];

    const headers = ['U/I', '1', '2', '3', '4', '5', '6'];

    return (
        <div className="flex flex-col items-center justify-center">
            <table className="min-w-full border-collapse border border-black">
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="border border-black px-4 py-2 bg-yellow-btn-primary">
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
                            const isFirstColumn = colIndex === 0; // Mengecek apakah kolom pertama
                            const cellClass = cell === '?' || cell === ''
                                ? 'border border-black px-4 py-2 text-center bg-red-500'
                                : `border border-black px-4 py-2 text-center ${isFirstColumn ? 'bg-blue-200' : ''}`; // Warnai kolom pertama

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
            <div className="mt-4 text-left">
                <p className="font-bold">Keterangan:</p>
                <ul className="flex space-x-4">
                    <li className="flex items-center">
                        <div
                            className="w-10 h-5 bg-red-500 border border-1 border-black mr-2 flex items-center justify-center text-white">
                            ?
                        </div>
                        Cell berwarna merah menandakan data rating yang tidak diketahui atau Data Sparsity
                    </li>
                    <li className="flex items-center">
                        <div className="w-10 h-5 bg-blue-200 border border-1 border-black mr-2"></div>
                        Menandakan User yang telah memberikan nilai
                    </li>
                    <li className="flex items-center">
                        <div className="w-10 h-5 bg-yellow-btn-primary border border-1 border-black mr-2"></div>
                        Menandakan Item yang telah di diberikan rating oleh user
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default TabelView;





export const NotationCard = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="bg-white shadow-md rounded-lg my-10 p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center underline underline-1">Notasi dan Penjelasan</h2>
            <div className="flex space-x-6">
                {/* Left Column */}
                <div className="w-1/2 space-y-2 font-poppins">
                    <p><strong>m</strong>: jumlah <span className="italic">user</span></p>
                    <p><strong>n</strong>: jumlah <span className="italic">item</span></p>
                    <p><strong>U</strong>: himpunan <span className="italic">user</span></p>
                    <p><strong>I</strong>: himpunan <span className="italic">item</span></p>
                    <p><strong>I<sub>u</sub></strong>: himpunan <span className="italic">item</span> yang telah diberi rating oleh <span className="italic">user</span> <em>u</em></p>
                    <p><strong>R</strong>: matriks <span className="italic">item</span> dimana <em>R ∈ R<sup> m×n</sup></em></p>
                    <p><strong>r<sub>uj</sub></strong>: rating <span className="italic">user</span> <em>u</em> terhadap <span className="italic">item</span> <em>j</em></p>
                </div>

                {/* Right Column */}
                <div className="w-1/2 space-y-2 font-poppins">
                    <p><strong>I<sub>u</sub></strong>: himpunan <span className="italic">item</span> yang belum diberi rating oleh <span className="italic">user</span> <em>u</em></p>
                    <p><strong>r<sub>uj</sub></strong>: prediksi rating <span className="italic">user</span> (target) <em>u</em> terhadap <span className="italic">item</span> <em>j</em></p>
                    <p><strong>l</strong>: jumlah <span className="italic">item</span> tetangga terdekat</p>
                    <p><strong>Y<sub>u(j)</sub></strong>: himpunan sejumlah <em>l</em> <span className="italic">item</span> yang telah diberi rating <span className="italic">user</span> target <em>u</em>, yang telah merupakan tetangga terdekat (atau <span className="italic">similar</span> dengan) <span className="italic">item</span> <em>j</em>. <em>Catatan: |X<sub>u(j)</sub>| ≤ k</em></p>
                    <p><strong>TopN<sub>u</sub></strong>: rekomendasi <span className="italic">top-N</span> <span className="italic">item</span> untuk <span className="italic">user</span> (target) <em>u</em></p>
                </div>
            </div>

            {/* Dropdown Button */}
            <button
                className="mt-6 w-full bg-cyan-500 text-white px-4 py-3 rounded-lg flex justify-center items-center"
                onClick={toggleDropdown}
            >
                <FaChevronDown className="mr-2" />
                {isOpen ? 'Sembunyikan Data Rating Matrix' : 'Lihat Detail Data Rating Matrix'}
            </button>

            {/* Dropdown Card */}
            {isOpen && (
                <div className="mt-4 bg-gray-100 shadow rounded-lg p-4">
                    <TabelViewDataStatis/>


                </div>
            )}
        </div>

    );
};

