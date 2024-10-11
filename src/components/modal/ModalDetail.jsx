// import {MathJaxContext} from "better-react-mathjax";
// import mathjaxConfig from "../../mathjax-config";
// import MathJaxComponent from "../../MathJaxComponent";
// import React, {useState} from "react";
//
//
// export function ModalMeanUser(){
//     const [selectedMean, setSelectedMean] = useState(null); // State untuk menyimpan mean yang dipilih
//
//     const [selectedRowData, setSelectedRowData] = useState(null);
//
//     const handleMeanClick = (mean, index) => {
//         setSelectedMean(mean); // Simpan nilai mean yang ditekan
//         // setSelectedRowData({ data: userData, index });
//         setShowModal(true); // Tampilkan modal
//     };
//
//     const closeModal = () => {
//         setShowModal(false); // Sembunyikan modal
//         setSelectedMean(null); // Reset nilai mean yang dipilih
//         setSelectedRowData(null)
//     };
//
//
//     const data2 = [
//         [5, 0, 4, 3, 5, 4], // User 1
//         // [4, 5, 0, 3, 2, 3], // User 2
//         // [0, 3, 0, 2, 1, 0], // User 3
//         // [1, 2, 2, 0, 3, 4], // User 4
//         // [1, 0, 1, 2, 3, 3], // User 5
//     ];
//
//
//
//     const MeanIndex = () => {
//         return data2.map((userData, index) => {
//             // const meanValue = calculateMean(userData);
//             // const nonZeroValues = userData.filter((val) => val !== 0).join(" + ");
//             // const countNonZero = userData.filter((val) => val !== 0).length;
//
//             const nonZeroIndices = userData
//                 .map((val, idx) => (val !== 0 ? idx + 1 : null)) // Mengambil indeks (dimulai dari 1)
//                 .filter((idx) => idx !== null) // Menghapus nilai null
//
//             const nonZeroIndicesString = nonZeroIndices.join(" + "); // Menggabungkan indeks yang bukan nol
//
//             // Menghitung jumlah indeks yang bukan nol
//             const countNonZero = nonZeroIndices.length;
//
//
//
//             return  `\\[ \\mu_{u} = \\frac{\\sum_i\\in ${nonZeroIndicesString}}{\\left[${countNonZero}\\right]}   \\forall u\\in\\left\\{1...5\\right\\} \\]`;
//         });
//     }
//     const MeanHasil = () => {
//         return data2.map((userData, index) => {
//             // const meanValue = calculateMean(userData);
//             const nonZeroValues = userData.filter((val) => val !== 0).join(" + ");
//             const countNonZero = userData.filter((val) => val !== 0).length;
//
//
//             return  `\\[ \\mu_{${index + 1}} = \\frac{${nonZeroValues}}{${countNonZero}}   \\forall u\\in\\left\\{1...5\\right\\} \\]`;
//         });
//     };
//
//     const meanIndexExp = MeanIndex();
//
//     const meanExpressionsValues = MeanHasil();
//
//     return (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <h2 className="text-lg font-semibold mb-4">Detail Mean</h2>
//                 <p className="text-gray-700">Mean yang dipilih: {selectedMean}</p>
//                 {/* Menampilkan rumus mean menggunakan MathJax */}
//                 <MathJaxContext options={mathjaxConfig}>
//                     <div className='flex justify-start items-start flex-col px-10'>
//
//                         {meanIndexExp.map((math, index) => (
//                             <MathJaxComponent key={index} math={math}/>
//                         ))}
//                     </div>
//                 </MathJaxContext>
//
//                 <MathJaxContext options={mathjaxConfig}>
//                     <div className='flex justify-start items-start flex-col px-10'>
//
//                         {meanExpressionsValues.map((math, index) => (
//                             <MathJaxComponent key={index} math={math}/>
//                         ))}
//                     </div>
//                 </MathJaxContext>
//
//                 {/* Menampilkan perhitungan manual */}
//
//                 <button
//                     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                     onClick={closeModal} // Menutup modal saat tombol ditekan
//                 >
//                     Tutup
//                 </button>
//             </div>
//         </div>
//     )
// }