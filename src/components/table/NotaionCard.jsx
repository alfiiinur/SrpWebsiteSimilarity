
import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { getInitialData } from '../../api/getDataSet';
import MathJaxComponent from '../../MathJaxComponent';
import { Input } from '@headlessui/react';

export const TabelRatingData = ({ data, opsional }) => {
    const initialData = getInitialData(data, opsional);
    const [dataOnly] = useState(initialData.data);


    const [showModal, setShowModal] = useState(false);
    const [isNotation, setIsNotation] = useState(false)

    const [selectedData, setSelectedData] = useState({ user: null, itemIndex: null, value: null });

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

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

    const handleIsNotation = () => {
        setIsNotation(!isNotation)
    }

    const handleUserChange = (e) => {
        const userIndex = e.target.value ? parseInt(e.target.value) : null;
        setSelectedUser(userIndex)
    };

    const handleItemChange = (e) => {
        const itemIndex = e.target.value ? parseInt(e.target.value) : null;
        setSelectedItem(itemIndex)
    };



    return (
        <div className='flex flex-col mb-5 font-poppins'>
            <em>R ∈ R<sup> {user}×{item}</sup></em>

            <div className='w-[30%]'>
                <label class="inline-flex items-center cursor-pointer">
                    <Input
                        type="checkbox"
                        value=""
                        class="sr-only peer"
                        onChange={handleIsNotation}
                    />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-300"></div>
                    <span class="ms-3 text-sm font-medium text-gray-950">Tampilkan Notasi</span>
                </label>
            </div>


            <table className="w-[100%] h-[100%] border border-black mt-4 mr-3 text-center overflow-auto">
                <thead>
                    <tr className="bg-card_blue_primary text-white">
                        <th className="border border-black px-4 py-2">U/I</th>
                        {Array.from({ length: item }, (_, index) => (
                            <th key={index} className="border border-black px-4 py-2">
                                {!isNotation ? (index + 1) : <MathJaxComponent>{`\\[ i_{${index + 1}} \\]`}</MathJaxComponent>}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataOnly.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-black px-4 py-2 bg-gray-200">{!isNotation ? (rowIndex + 1) : <MathJaxComponent>{`\\[ u_{${rowIndex + 1}} \\]`}</MathJaxComponent>}</td>
                            {row.map((value, colIndex) => {
                                const cellClass = value === 0
                                    ? 'border border-black px-4 py-2 text-center bg-red-200'
                                    : 'border border-black px-4 py-2 text-center hover:bg-card_green_primary cursor-pointer';

                                return (
                                    <td
                                        key={colIndex}
                                        className={cellClass}
                                        onClick={() => handleCellClick(rowIndex, colIndex, value)} // Handle cell click
                                    >
                                        {!isNotation ? (value.toFixed ? value.toFixed(0) : value)
                                            : <MathJaxComponent>{`\\[ r_{${rowIndex + 1}${colIndex + 1}} \\]`}</MathJaxComponent>
                                        }
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg font-poppins">
                        <h2 className="text-lg font-semibold mb-4">Detail Data Rating r<sub className={'italic'}>ui</sub></h2>
                        <p className='mb-2 font-semibold text-md text-black'>
                            r<sub className={'italic'}>{selectedData.user}{selectedData.itemIndex + 1}</sub> = {selectedData.value}
                        </p>
                        <p className='my-2 font-medium text-md text-black'>
                            Rating dari user(u) {selectedData.user} untuk item(i) {selectedData.itemIndex + 1} adalah {selectedData.value}
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
                    <div className="w-1/2   space-y-2 text-start">
                        <p><i>m</i> : {user}</p>
                        <p><i>n</i> : {item}</p>
                    </div>

                    {/* Right Column */}
                    <div className="w-1/2 space-y-2 text-start ">
                        <div className="flex justify-between ">
                            <div className="w-1/2 mx-1 ">
                                <h2 className='font-medium my-2'> Data Himpunan User (U)</h2>
                                <select value={selectedUser !== null ? selectedUser : ''} onChange={handleUserChange}
                                    className="border border-gray-400 rounded w-full">
                                    <option value="">Select User</option>
                                    {Array.from({ length: user }, (_, index) => (
                                        <option key={index} value={index}>{`User ${index + 1}`}</option>
                                    ))}
                                </select>
                                {selectedUser !== null && (
                                    <div>
                                        <p>
                                            <strong className="italic">U<sub>{selectedUser + 1}</sub> : </strong>
                                            {'{' +
                                                dataOnly[selectedUser]
                                                    .map((value, index) => value !== 0 ? index + 1 : null)
                                                    .filter(index => index !== null)
                                                    .join(', ') +
                                                '}'}
                                        </p>
                                        <p>
                                            <strong className="italic">r<sub>{selectedUser + 1}*</sub> :
                                            </strong> {dataOnly[selectedUser]
                                                .filter(value => value !== 0) // Filter out values that are 0
                                                .join(', ')
                                            }
                                        </p>

                                    </div>

                                )}
                            </div>

                            <div className="w-1/2 mx-1">
                                <h2 className='font-medium my-2'> Data Himpunan Item (I)</h2>
                                <select value={selectedItem !== null ? selectedItem : ''} onChange={handleItemChange}
                                    className="border border-gray-400 rounded w-full">
                                    <option value="">Select Item</option>
                                    {Array.from({ length: item }, (_, index) => (
                                        <option key={index} value={index}>{`Item ${index + 1}`}</option>
                                    ))}
                                </select>
                                {selectedItem !== null && (
                                    <div>
                                        <p>
                                            <strong className="italic">I<sub>{selectedItem + 1} </sub> : </strong>
                                            {'{' +
                                                dataOnly[selectedItem]
                                                    .map((value, index) => value !== 0 ? index + 1 : null)
                                                    .filter(index => index !== null)
                                                    .join(', ') +
                                                '}'}
                                        </p>
                                        <p>
                                            <strong className="italic">r<sub>{selectedItem + 1}* </sub> : </strong>
                                            {dataOnly
                                                .map(row => row[selectedItem])
                                                .filter(value => value !== 0) // Filter out the values that are 0
                                                .join(', ')
                                            }
                                        </p>
                                    </div>

                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};


export const NotationCard = ({ data, opsional }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="bg-white shadow-md rounded-lg my-10 p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center underline underline-1">Notasi dan Penjelasan</h2>
            <div className="flex space-x-6">
                {/* Left Column */}
                <div className="w-1/2 space-y-2 font-poppins text-start">
                    <p><strong><i>m</i></strong> : jumlah <span className="italic">user</span></p>
                    <p><strong><i>n</i></strong> : jumlah <span className="italic">item</span></p>
                    <p><strong><i>U</i></strong> : himpunan <span className="italic">user</span></p>
                    <p><strong><i>I</i></strong> : himpunan <span className="italic">item</span></p>
                    <p><strong><i>I<sub>u</sub></i></strong> : himpunan <span className="italic">item</span> yang telah diberi
                        rating oleh <span className="italic">user</span> <em>u</em></p>
                </div>

                {/* Right Column */}
                <div className="w-1/2 space-y-2 font-poppins text-start">
                    <p><strong><em>R ∈ ℝ<sup> m×n</sup></em></strong> : Matriks yang berisi bilangan asli dengan panjang m dan lebar n
                    </p>
                    <p><strong>r<sub>uj</sub></strong> : rating <span className="italic">user</span>
                        <em> u</em> terhadap <span className="italic">item</span> <em>j</em></p>
                </div>
            </div>

            {/* Dropdown Button */}
            <button
                className="mt-6 w-full bg-card_blue_primary text-white px-4 py-3 rounded-lg flex justify-center items-center font-poppins font-semibold"
                onClick={toggleDropdown}
            >
                <FaChevronDown className="mr-2 " />
                {isOpen ? 'Sembunyikan Data Matrik Rating ' : 'Lihat Detail Matrik Rating'}
            </button>

            {/* Dropdown Card */}
            {isOpen && (
                <div className="mt-4 bg-gray-100 shadow rounded-lg p-4">
                    <TabelRatingData data={data} opsional={opsional} />


                </div>
            )}
        </div>

    );
};

export default NotationCard