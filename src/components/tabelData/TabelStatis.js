import React, {useState} from "react";
import ReplayIcon from '@mui/icons-material/Replay';

function TabelViewDataStatis() {
    const [animationKey, setAnimationKey] = useState(0); // State to trigger animation restart

    const data = [
        ['1', '5', '0', '4', '3', '5', '4'],
        ['2', '4', '5', '0', '3', '2', '3'],
        ['3', '0', '3', '0', '2', '1', '0'],
        ['4', '1', '2', '2', '0', '3', '4'],
        ['5', '1', '0', '1', '2', '3', '3'],
    ];

    const headersData = ['U/I', '1', '2', '3', '4', '5', '6'];
    const m = headersData.length - 1; // Number of items (excluding U/I)
    const n = data.length; // Number of users

    // const restartAnimation = () => {
    //     setAnimationKey(prevKey => prevKey + 1); // Increment key to restart animation
    // };

    return (
        <div className="flex flex-col items-center justify-center mb-5">
            {/*<button onClick={restartAnimation} className="mb-5 p-2 bg-blue-500 text-white rounded">*/}
            {/*    <ReplayIcon /> Ulangi Animasi*/}
            {/*</button>*/}
            <h1 className='font-poppins'>Matriks data rating dibentuk berdasarkan data rating</h1>
            <p className='font-poppins'>Catatan : Data rating yang tidak diketahui <span className={'font-semibold text-red-600 '}>direpresentasikan</span>  dengan nilai <span className='italic'>rating</span> 0 </p>
            <h1 className='font-bold font-poppins my-5 '>MATRIKS RATING</h1>
            <table className="min-w-full border-collapse border border-black">
                <thead>
                <tr key={animationKey}>
                    {headersData.map((header, index) => (
                        <th
                            key={index}
                            className="border border-black px-4 py-2 bg-yellow-btn-primary table-header"
                            style={{ animationDelay: `${index * 0.2}s` }} // Delay based on index
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => {
                            const isFirstColumn = colIndex === 0;
                            const cellClass = cell === '0' || cell === ''
                                ? 'border border-black px-4 py-2 text-center bg-red-500 table-cell'
                                : `border border-black px-4 py-2 text-center table-cell ${isFirstColumn ? 'bg-blue-200' : ''}`;

                            return (
                                <td
                                    key={colIndex}
                                    className={cellClass}
                                    style={{
                                        animationDelay: `${headersData.length * 0.2 + rowIndex * 0.1 + colIndex * 0.05}s`
                                    }}
                                >
                                    {cell}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <h3 className="text-lg font-semibold my-2">Informasi Data Rating Matrix</h3>
                <h3 className="text-md font-semibold mb-2">Matrix data rating dibentuk berdasarkan data rating .</h3>

                <div className="flex space-x-6">
                    {/* Left Column */}
                    <div className="w-1/2 space-y-2">
                        <p><strong>n</strong>: {n}</p>
                        <p><strong>m</strong>: {m}</p>
                        <div className="flex flex-wrap">
                            <div className="w-1/5">
                                <p><strong className='italic'>r</strong><sub>11</sub>: 5</p>
                                <p><strong className='italic'>r</strong><sub>13</sub>: 4</p>
                                <p><strong className='italic'>r</strong><sub>14</sub>: 3</p>
                                <p><strong className='italic'>r</strong><sub>15</sub>: 5</p>
                                <p><strong className='italic'>r</strong><sub>16</sub>: 4</p>
                            </div>
                            <div className="w-1/5">
                                <p><strong className='italic'>r</strong><sub>11</sub>: 5</p>
                                <p><strong className='italic'>r</strong><sub>13</sub>: 4</p>
                                <p><strong className='italic'>r</strong><sub>14</sub>: 3</p>
                                <p><strong className='italic'>r</strong><sub>15</sub>: 5</p>
                                <p><strong className='italic'>r</strong><sub>16</sub>: 4</p>
                            </div>
                            <div className="w-1/5">
                                <p><strong className='italic'>r</strong><sub>11</sub>: 5</p>
                                <p><strong className='italic'>r</strong><sub>13</sub>: 4</p>
                                <p><strong className='italic'>r</strong><sub>14</sub>: 3</p>
                                <p><strong className='italic'>r</strong><sub>15</sub>: 5</p>
                                <p><strong className='italic'>r</strong><sub>16</sub>: 4</p>
                            </div>
                            <div className="w-1/5">
                                <p><strong className='italic'>r</strong><sub>11</sub>: 5</p>
                                <p><strong className='italic'>r</strong><sub>13</sub>: 4</p>
                                <p><strong className='italic'>r</strong><sub>14</sub>: 3</p>
                                <p><strong className='italic'>r</strong><sub>15</sub>: 5</p>
                                <p><strong className='italic'>r</strong><sub>16</sub>: 4</p>
                            </div>
                            <div className="w-1/5">
                                <p><strong className='italic'>r</strong><sub>11</sub>: 5</p>
                                <p><strong className='italic'>r</strong><sub>13</sub>: 4</p>
                                <p><strong className='italic'>r</strong><sub>14</sub>: 3</p>
                                <p><strong className='italic'>r</strong><sub>15</sub>: 5</p>
                                <p><strong className='italic'>r</strong><sub>16</sub>: 4</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-1/2 space-y-2">
                        <p><strong>Y<sub>u(j)</sub></strong>: himpunan sejumlah <em>l</em> <span
                            className="italic">item</span> yang telah diberi rating <span
                            className="italic">user</span> target <em>u</em>, yang telah merupakan tetangga terdekat
                            (atau <span className="italic">similar</span> dengan) <span
                                className="italic">item</span> <em>j</em>.
                        </p>
                        <p><strong>TopN<sub>u</sub></strong>: rekomendasi <span className="italic">top-N</span>
                            <span className="italic">item</span> untuk <span
                                className="italic">user</span> (target) <em>u</em></p>
                        <div className="flex flex-wrap">
                            <div className="w-1/2">
                                <p><strong className='italic'>I</strong><sub>13</sub>: {'{ 4,3,5 }'}</p>
                                <p><strong className='italic'>I</strong><sub>14</sub>: 3</p>
                                <p><strong className='italic'>I</strong><sub>15</sub>: 5</p>
                                <p><strong className='italic'>I</strong><sub>16</sub>: 4</p>
                                <p><strong className='italic'>I</strong><sub>11</sub>: 5</p>
                            </div>
                            <div className="w-1/2">
                                <p><strong className='italic'>U</strong><sub>11</sub>: 5</p>
                                <p><strong className='italic'>U</strong><sub>13</sub>: 4</p>
                                <p><strong className='italic'>U</strong><sub>14</sub>: 3</p>
                                <p><strong className='italic'>U</strong><sub>15</sub>: 5</p>
                                <p><strong className='italic'>U</strong><sub>16</sub>: 4</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabelViewDataStatis;