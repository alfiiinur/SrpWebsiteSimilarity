import { MathJaxContext, MathJax } from "better-react-mathjax";
import mathjaxConfig from "../../../../mathjax-config";

const ModalMean = ({ opsional, data, selectedIndex, selectedMean, close, meanRumusIdx, meanIndexExp, meanExpressionsValues }) => {

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Detail Perhitungan Mean <span
                    className='italic'>(μ)</span> {opsional.split("-")[0]} - {selectedIndex + 1}</h2>
                <div className='overflow-x-auto'>
                    <h2 className='font-semibold'>Data Rating (r)</h2>
                    <table className="border border-black mt-4 mx-auto text-center">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-black px-4 py-2">U/I</th>
                                {Array.from({ length: data[0].length }, (_, index) => (  // Menggunakan panjang kolom dari data
                                    <th key={index}
                                        className="border border-black px-4 py-2">{index + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="border border-black px-4 py-2 bg-gray-200">{rowIndex + 1}</td>
                                    {row.map((value, colIndex) => {
                                        const cellClass = value === 0
                                            ? 'border border-black px-4 py-2 text-center bg-red-200'
                                            : 'border border-black px-4 py-2 text-center';
                                        return (
                                            <td key={colIndex}
                                                // className="border border-black px-4 py-2 text-center"
                                                className={`${cellClass}`}
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
                {/* Menampilkan rumus mean menggunakan MathJax */}
                <MathJaxContext options={mathjaxConfig}>
                    <div className='flex justify-center items-center flex-col px-10'>
                        {/* Tampilkan hanya rumus dan hasil untuk user yang dipilih */}
                        {meanRumusIdx[selectedIndex]?.length > 0 ? (
                            <div className="text-center">
                                <MathJax >
                                    {meanRumusIdx[selectedIndex]}
                                </MathJax>
                            </div>
                        ) : (
                            <p className="text-center">Data untuk user ini tidak tersedia.</p>
                        )}

                        {meanIndexExp[selectedIndex]?.length > 0 ? (
                            <div className="text-center">
                                <MathJax >
                                    {meanIndexExp[selectedIndex]}
                                </MathJax>
                            </div>
                        ) : (
                            <p className="text-center">Data untuk user ini tidak tersedia.</p>
                        )}

                        {meanExpressionsValues[selectedIndex]?.length > 0 ? (
                            <div className="text-center">
                                <MathJax >
                                    {meanExpressionsValues[selectedIndex]}
                                </MathJax>
                            </div>
                        ) : (
                            <p className="text-center">Data untuk user ini tidak tersedia.</p>
                        )}
                    </div>
                </MathJaxContext>

                {/* Menampilkan perhitungan manual */}
                <p className="text-xl font-bold text-gray-700 text-center">Hasil mean dari
                    item {selectedIndex + 1} adalah = {selectedMean}</p>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={close} // Menutup modal saat tombol ditekan
                >
                    Tutup
                </button>
            </div>
        </div>
    )
}

export default ModalMean