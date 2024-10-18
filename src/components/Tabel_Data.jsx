// src/App.js
import React, {useState} from 'react';
import {FaChevronDown} from "react-icons/fa";
import TabelViewDataStatis from "./tabelData/TabelStatis";
import {AllSimilaritas, getInitialData} from "../api/getDataSet";

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




export const TabelRatingData = ({ opsional }) => {
    const initialData = getInitialData(opsional);
    const [dataOnly, setDataOnly] = useState(initialData.data);


    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState({ user: null, itemIndex: null, value: null });

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [ratingValue, setRatingValue] = useState(null);

    const user = dataOnly.length; // Number of items (rows)
    const item = dataOnly.length > 0 ? dataOnly[0].length : 0; // Number of users (columns)

    const handleCellClick = (rowIndex, colIndex, value) => {
        setSelectedData({ user: rowIndex + 1, itemIndex: colIndex, value });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedData({ user: null, itemIndex: null, value: null });
    };



    const handleUserChange = (e) => {
        const userIndex = e.target.value ? parseInt(e.target.value) : null;
        setSelectedUser(userIndex);
        // setSelectedItem(null); // Reset item selection
    };

    const handleItemChange = (e) => {
        const itemIndex = e.target.value ? parseInt(e.target.value) : null;
        setSelectedItem(itemIndex);
        // setSelectedUser(null); // Reset user selection
    };



    return (
        <div className='flex flex-col mb-5 font-poppins'>
            <table className="border border-black mt-4 mr-3 text-center">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-black px-4 py-2">U/I</th>
                    {Array.from({ length: item }, (_, index) => (
                        <th key={index} className="border border-black px-4 py-2">{index + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {dataOnly.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                        {row.map((value, colIndex) => {
                            const cellClass = value === 0
                                ? 'border border-black px-4 py-2 text-center bg-red-200'
                                : 'border border-black px-4 py-2 text-center hover:bg-yellow-200 cursor-pointer';

                            return (
                                <td
                                    key={colIndex}
                                    className={cellClass}
                                    onClick={() => handleCellClick(rowIndex, colIndex, value)} // Handle cell click
                                >
                                    {value.toFixed ? value.toFixed(0) : value}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal for detailed view */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg font-poppins">
                        <h2 className="text-lg font-semibold mb-4">Detail Data Rating r<sub className={'italic'}>ui</sub></h2>
                        <p className='mb-2 font-semibold text-md text-black'>
                            r<sub className={'italic'}>{selectedData.user}{selectedData.itemIndex + 1}</sub> = {selectedData.value}
                        </p>
                        <p className='my-2 font-medium text-md text-black'>
                            User {selectedData.user}, Item {selectedData.itemIndex + 1} = {selectedData.value}
                        </p>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                            Tutup
                        </button>
                    </div>
                </div>
            )}
            <div>
                <h3 className="text-lg font-semibold my-2">Informasi Data Rating Matrix</h3>
                <h3 className="text-md font-semibold mb-2">Matrix data rating dibentuk berdasarkan data rating.</h3>

                <div className="flex items-start justify-start space-x-6">
                    {/* Left Column */}
                    <div className="w-1/2   space-y-2">
                        <p><strong>user</strong>: {user}</p>
                        <p><strong>item</strong>: {item}</p>
                    </div>

                    {/* Right Column */}
                    <div className="w-1/2 space-y-2">
                        <div className="flex justify-between ">
                            <div className="w-1/2 mx-1">
                                <h2> Data User (U)</h2>
                                <select value={selectedUser !== null ? selectedUser : ''} onChange={handleUserChange}
                                        className="border border-gray-400 rounded w-full">
                                    <option value="">Select User</option>
                                    {Array.from({length: user}, (_, index) => (
                                        <option key={index} value={index}>{`User ${index + 1}`}</option>
                                    ))}
                                </select>
                                {selectedUser !== null && (
                                    <p>
                                        <strong className="italic">Ratings:</strong> {dataOnly[selectedUser]
                                        .filter(value => value !== 0) // Filter out values that are 0
                                        .join(', ')
                                    }
                                    </p>
                                )}
                            </div>

                            <div className="w-1/2 mx-1">
                                <h2> Data Item (I)</h2>
                                <select value={selectedItem !== null ? selectedItem : ''} onChange={handleItemChange}
                                        className="border border-gray-400 rounded w-full">
                                    <option value="">Select Item</option>
                                    {Array.from({length: item}, (_, index) => (
                                        <option key={index} value={index}>{`Item ${index + 1}`}</option>
                                    ))}
                                </select>
                                {selectedItem !== null && (
                                    <p>
                                        <strong className="italic">Ratings:</strong>
                                        {dataOnly
                                            .map(row => row[selectedItem])
                                            .filter(value => value !== 0) // Filter out the values that are 0
                                            .join(', ')
                                        }
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};


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
                    <p><strong>I<sub>u</sub></strong>: himpunan <span className="italic">item</span> yang telah diberi
                        rating oleh <span className="italic">user</span> <em>u</em></p>
                    <p><strong>R</strong>: matriks <span className="italic">item</span> dimana <em>R ∈ R<sup> m×n</sup></em>
                    </p>
                    <p><strong>r<sub>uj</sub></strong>: rating <span className="italic">user</span>
                        <em>u</em> terhadap <span className="italic">item</span> <em>j</em></p>
                </div>

                {/* Right Column */}
                <div className="w-1/2 space-y-2 font-poppins">
                    <p><strong>I<sub>u</sub></strong>: himpunan <span className="italic">item</span> yang belum diberi
                        rating oleh <span className="italic">user</span> <em>u</em></p>
                    <p><strong>r<sub>uj</sub></strong>: prediksi rating <span
                        className="italic">user</span> (target) <em>u</em> terhadap <span className="italic">item</span>
                        <em>j</em></p>
                    <p><strong>l</strong>: jumlah <span className="italic">item</span> tetangga terdekat</p>
                    <p><strong>Y<sub>u(j)</sub></strong>: himpunan sejumlah <em>l</em> <span
                        className="italic">item</span> yang telah diberi rating <span
                        className="italic">user</span> target <em>u</em>, yang telah merupakan tetangga terdekat
                        (atau <span className="italic">similar</span> dengan) <span className="italic">item</span>
                        <em>j</em>. <em>Catatan: |X<sub>u(j)</sub>| ≤ k</em></p>
                    <p><strong>TopN<sub>u</sub></strong>: rekomendasi <span className="italic">top-N</span> <span
                        className="italic">item</span> untuk <span className="italic">user</span> (target) <em>u</em></p>
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
                    <TabelRatingData opsional={1}/>


                </div>
            )}
        </div>

    );
};

