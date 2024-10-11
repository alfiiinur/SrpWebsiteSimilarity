import React, {useCallback, useEffect, useState} from 'react'
import {MathJaxContext} from "better-react-mathjax";
import mathjaxConfig from "../../mathjax-config";
import MathJaxComponent from "../../MathJaxComponent";
import {FunctionMeasureDropdown} from "./DropdownFunction/FunctionMeasureDropdown";
import {AllSimilaritas, getInitialData} from "../../api/getDataSet";


// MEAN USER-BASED

const meanExpressionsUserBased = [
    `\\[ \\mu_{u} = \\frac{\\sum_i\\in I_{u} r_{ui}}{\\left[I_{u}\\right]}   \\forall u\\in\\left\\{1...m\\right\\} \\]`,

];


//keterangan rumus mean

const DetailRumusMeanUserBased = [
    `\\[ \\mu_{u} = \\text{Rata-rata pada user u} \\] `,
    `\\[ Iu = \\text{Himpunan item yang telah diberi rating oleh user u} \\] `,
    `\\[ r_{ui} = \\text{Rating user u terhadap item i} \\]`
]



export function MeanMeasureUserBased({opsional, similaritas}) {
    const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
    const [selectedUserIndex, setSelectedUserIndex] = useState(null); // State untuk menyimpan user yang dipilih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [selectedRowData, setSelectedRowData] = useState(null);


    const handleMeanClick = (mean, index) => {
        setSelectedMean(mean); // Simpan nilai mean yang ditekan
        setSelectedUserIndex(index)
        setShowModal(true); // Tampilkan modal
    };

    const closeModal = () => {
        setShowModal(false); // Sembunyikan modal
        setSelectedMean(null); // Reset nilai mean yang dipilih
        setSelectedRowData(null)
    };


    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);

    const { result, error } = AllSimilaritas(data, similaritas);


    const data2 = [
        [5, 0, 4, 3, 5, 4], // User 1
        [4, 5, 0, 3, 2, 3], // User 2
        [0, 3, 0, 2, 1, 0], // User 3
        [1, 2, 2, 0, 3, 4], // User 4
        [1, 0, 1, 2, 3, 3], // User 5
    ];

    const getUserCount = () => {
        return data2.length;
    };

    const MeanRumusIndex = () => {
        return data2.map((userData, index) => {


            return    `\\[ \\mu_{${index+1}} = \\frac{\\sum_i\\in I_{${index+1}} r_{${index+1}i}}{I_{${index+1}}}   \\forall u\\in\\left\\{${index+1}...${getUserCount()}\\right\\} \\]`;
        });
    };


    const MeanIndex = () => {
        return data2.map((userData, index) => {
            const nonZeroIndices = userData
                .map((val, idx) => (val !== 0 ? idx + 1 : null)) // Mengambil indeks (dimulai dari 1)
                .filter((idx) => idx !== null) // Menghapus nilai null

            const nonZeroIndicesString = nonZeroIndices.join(" + "); // Menggabungkan indeks yang bukan nol

            // Menghitung jumlah indeks yang bukan nol
            const countNonZero = nonZeroIndices.length;



            return  `\\[ \\mu_{${index+1}_{index}} = \\frac{( ${nonZeroIndicesString})}{${countNonZero}}   \\forall u\\in\\left\\{${index+1}...${getUserCount()}\\right\\} \\]`;
        });
    }
    const MeanHasil = () => {
        return data2.map((userData, index) => {
            // const meanValue = calculateMean(userData);
            const nonZeroValues = userData.filter((val) => val !== 0).join(" + ");
            const countNonZero = userData.filter((val) => val !== 0).length;


            return  `\\[ \\mu_{${index +1 }} = \\frac{${nonZeroValues}}{${countNonZero}}   \\forall u\\in\\left\\{${index+1}...${getUserCount()}\\right\\} \\]`;
        });
    };

    const meanRumusIdx = MeanRumusIndex();

    const meanIndexExp = MeanIndex();

    const meanExpressionsValues = MeanHasil();

    const RenderUserTableMean = () => {
        if (!result || !result['mean-list']) {
            return <p>Loading or no data available...</p>;  // Tambahkan penanganan error atau loading
        }
        return (
            <div className='flex justify-center mt-4'>

                <table className="border border-black mt-4">
                    <thead>
                    <tr className=" bg-gray-200">
                        <th className="border border-black px-4 py-2">U</th>
                        <th className="border border-black italic px-4 py-2">μ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {result['mean-list'].map((mean, index) => (
                        <tr key={index} className='hover:bg-card_green_primary'>
                            <td className="border border-black px-4 py-2 ">{index + 1}</td>
                            <td className="border border-black px-4 py-2 ">
                                <div className="text-center cursor-pointer hover:underline "
                                     onClick={() => handleMeanClick(mean, index)}
                                >
                                {mean}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

                {/* Modal Card */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Detail Perhitungan  Mean <span className='italic'>(μ)</span>  </h2>
                            {/* Menampilkan rumus mean menggunakan MathJax */}
                            <MathJaxContext options={mathjaxConfig}>
                                <div className='flex justify-start items-start flex-col px-10'>
                                    {/* Tampilkan hanya rumus dan hasil untuk user yang dipilih */}
                                    {/*<MathJaxComponent math={meanRumusIdx[selectedUserIndex]} />*/}
                                    {/*<MathJaxComponent math={meanIndexExp[selectedUserIndex]} />*/}
                                    {/*<MathJaxComponent math={meanExpressionsValues[selectedUserIndex]} />*/}

                                    {meanRumusIdx[selectedUserIndex]?.length > 0 ? (
                                        <MathJaxComponent math={meanRumusIdx[selectedUserIndex]} />
                                    ) : (
                                        <p>Data untuk user ini tidak tersedia.</p>
                                        )}

                                    {meanIndexExp[selectedUserIndex]?.length > 0 ? (
                                        <MathJaxComponent math={meanIndexExp[selectedUserIndex]} />
                                    ): (
                                        <p>Data untuk user ini tidak tersedia.</p>
                                    )}

                                    {meanExpressionsValues[selectedUserIndex]?.length > 0 ? (
                                        <MathJaxComponent math={meanExpressionsValues[selectedUserIndex]} />
                                    ): (
                                        <p>Data untuk user ini tidak tersedia.</p>
                                    )}


                                </div>
                            </MathJaxContext>

                            {/* Menampilkan perhitungan manual */}
                            <p className="text-xl font-bold text-gray-700">Hasil mean dari user {selectedUserIndex+1}  adalah : {selectedMean}</p>
                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={closeModal} // Menutup modal saat tombol ditekan
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}

            </div>

        );
    };

    return (
        <div className='mt-5'>
            <div className="flex items-center ">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Mencari Mean Rating</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>
                    {meanExpressionsUserBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusMeanUserBased}/>
            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Mean User-Based</h1>

                {/*<MeanUserDetail/>*/}
                <RenderUserTableMean />
            </div>


        </div>
    );
}


//MEAN ITEM-BASED

const meanExpressionsItemBased = [
    `\\[ U_{i} = \\frac{\\sum_u\\in U_{i} r_{ui}}{\\left[U_{i}\\right]}   \\forall u\\in\\left\\{1...m\\right\\} \\]`
]

//keterangan rumus mean

const DetailRumusMeanItemBased = [
    `\\[ \\mu_{i} = \\text{Rata-rata pada user u} \\] `,
    `\\[ Ui = \\text{Himpunan user yang telah memberikan rating oleh pada item i} \\] `,
    `\\[ r_{uv} = \\text{Rating user u terhadap item i} \\]`
]

export function MeanMeasureItemBased({opsional, similaritas}){
    const initialData = getInitialData(opsional);
    const [data, setData] = useState(initialData);

    const { result, error } = AllSimilaritas(data, similaritas);
    const RenderItemTableMean = () => {
        if (!result || !result['mean-list']) return null;
        return (
            <div className='flex justify-center mt-4'>

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

            </div>

        );
    };
    return(
        <div className='mt-5'>
            <div className="flex items-center">
                <div className="border-l-4 border-card_blue_primary h-10 mr-4"/>
                {/* Vertical Line */}
                <h1 className='font-poppins font-semibold text-black'>Mencari Mean Rating Item-Based</h1>
            </div>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-start items-start flex-col px-10'>

                    {meanExpressionsItemBased.map((math, index) => (
                        <MathJaxComponent key={index} math={math}/>
                    ))}
                </div>
            </MathJaxContext>
            <FunctionMeasureDropdown DetailRumus={DetailRumusMeanItemBased}/>

            <div className=' px-10 py-5'>
                <h1 className='text-xl font-semibold font-poppins underline underline-offset-8 decoration-4 decoration-card_blue_primary'>Hasil
                    Mean Item-Based</h1>
                {/*    call api */}
                <RenderItemTableMean/>
            </div>
        </div>
    )
}