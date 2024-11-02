import { getFormulaMeanCenteredIndex, getFormulaMeanCenteredValue } from "../Formula/FormulaMeanCentered";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ModalMeanCenteredMeasure = ({ similarity, selectedIndex, selectedValue, dataOnly, result, opsional, close }) => {

    const dataModify = dataOnly

    const MeanCenteredIndex = ({ rowIndex, colIndex }) => {
        const expression = getFormulaMeanCenteredIndex(rowIndex, colIndex, opsional)
        return (
            <MathJax>
                {expression}
            </MathJax>
        )
    }

    const MeanCenteredValue = ({ rowIndex, colIndex, data, result }) => {
        const expression = getFormulaMeanCenteredValue(rowIndex, colIndex, data, result, opsional, similarity)
        return (
            <MathJax>
                {expression}
            </MathJax>
        )
    }

    return (<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-auto max-h-[80%] overflow-y-auto ">
            <h1 className='text-lg font-semibold mb-4'>Detail Menghitung <span
                className='italic'>Mean-Centerd</span> untuk setiap Data rating yang diketahui </h1>

            {/* Menampilkan rumus mean menggunakan MathJax */}

            <div className='flex flex-row justify-center m-3 overflow-x-auto'>
                {/*tabel data rating */}
                <div className="overflow-x-auto">
                    <h2 className='font-semibold'>Data Rating (r)</h2>
                    <table className="border border-black mt-4 mr-3">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-black px-4 py-2">I/U</th>
                                {Array.from({ length: dataModify[0].length }, (_, index) => (  // Menggunakan panjang kolom dari data
                                    <th key={index}
                                        className="border border-black px-4 py-2">{index + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataModify.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                    {row.map((value, colIndex) => {
                                        const isSelected = similarity === "Adjusted Vector Cosine" ?
                                            (opsional === "item-based" ? (selectedIndex[0] === rowIndex && selectedIndex[1] === colIndex) : (selectedIndex[0] === colIndex && selectedIndex[1] === rowIndex))
                                            : (opsional === "item-based" ? (selectedIndex[0] === rowIndex && selectedIndex[1] === colIndex) : (selectedIndex[1] === colIndex && selectedIndex[0] === rowIndex));
                                        const cellClass = value === 0
                                            ? 'border border-black px-4 py-2 text-center text-red-500'
                                            : 'border border-black px-4 py-2 text-center';
                                        if (isSelected) {

                                            console.log(rowIndex, colIndex, selectedIndex[0], selectedIndex[1]);
                                        }
                                        return (
                                            <td key={rowIndex}
                                                // className="border border-black px-4 py-2 text-center"
                                                className={`${cellClass} ${isSelected ? 'bg-card_green_primary' : ''}`}
                                            >
                                                {value.toFixed ? value.toFixed(0) : value} {/* Format desimal hanya jika diperlukan */}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2 className='font-semibold'>Hasil Mean Rating (μ)</h2>
                    <table className="borDder border-black mt-4 ml-3">
                        <thead>
                            <tr className=" bg-gray-200">
                                <th className="border border-black px-4 py-2">U</th>
                                <th className="border border-black italic px-4 py-2">μ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result['mean-list'].map((mean, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-4 py-2 ">{index + 1}</td>
                                    <td className={`border border-black px-4 py-2 text-center
                                         ${selectedIndex[opsional === "user-based" ? 0 : 1] === index ? 'bg-yellow-200' : ''}`}>
                                        <div className='text-center'
                                        >
                                            {mean}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center my-4">
                <WarningAmberIcon className="text-yellow-500 mr-2" />
                <h2 className="text-md font-semibold">
                    Catatan jika ada <span className='text-red-600 underline'>data rating adalah 0</span>  kemudian dikurangi dengan mean (μ) akan
                    menghasilkan <span className='text-red-600 underline'>nilai 0</span> atau diabaikan.
                </h2>
            </div>

            <h2 className='font-semibold text-xl'>Rumus Mean-Centerd </h2>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-center items-center flex-col px-10'>
                    {<MeanCenteredIndex
                        rowIndex={selectedIndex[0]}
                        colIndex={selectedIndex[1]}
                        opsional={opsional}
                    />}
                </div>
            </MathJaxContext>
            <MathJaxContext options={mathjaxConfig}>
                <div className='flex justify-center items-center flex-col px-10'>
                    {selectedIndex ? (
                        <MeanCenteredValue
                            rowIndex={selectedIndex[0]}
                            colIndex={selectedIndex[1]}
                            data={dataModify}
                            result={result}
                        />
                    ) : (
                        <p>No expression selected.</p>
                    )}
                </div>
            </MathJaxContext>


            <h2 className='font-semibold text-xl text-gray-700'>Hasil dari Mean-Centerd
                adalah {selectedValue.toFixed(2)} </h2>


            {/* Menampilkan perhitungan manual */}

            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={close} // Menutup modal saat tombol ditekan
            >
                Tutup
            </button>
        </div>
    </div>)
}

export default ModalMeanCenteredMeasure