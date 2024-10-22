import { Input } from "@headlessui/react";
import React, { useState } from "react";
import TableMatrix from "../table/TableMatrix";
import * as helper from "../../helper/helper.js"
import PercentIcon from "@mui/icons-material/Percent";
import TuneIcon from "@mui/icons-material/Tune";

export default function FormMeasure() {
    const [n, setN] = useState(0);
    const [m, setM] = useState(0);
    const [sparsity, setSparsity] = useState(0);
    const [range, setRange] = useState({
        min: 1,
        max: 5,
    });
    const [data, setData] = useState([]);

    const getValueRangeMin = (value) => {
        const rangeData = { ...range }
        rangeData.min = Number(value)
        setRange(rangeData)
    };

    const getValueRangeMax = (value) => {
        const rangeData = { ...range }
        rangeData.max = Number(value)
        setRange(rangeData)
    };

    const getValueM = (value) => {
        setM(Number(value));
    };

    const getValueN = (value) => {
        setN(Number(value));
    };

    const getValueSparsity = (value) => {
        setSparsity(Number(value));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const result = helper.makeSparsity(n, m, sparsity, range);
        setData(result);
    };

    return (
        <>
            <div className={'max-w-2xl mx-auto py-10'}>
                <form className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center'>
                    {/* User Input */}
                    <div className='flex flex-col mb-3 md:col-span-3'>
                        <div className="flex flex-col mb-3">
                            <label
                                className="mb-2 text-2xl text-start font-poppins font-semibold text-gray-900">Jumlah User:</label>
                            <div
                                className="outline outline-1 inline-flex items-center rounded-md bg-yellow-primary px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300">
                                <Input
                                    id="userInput"
                                    name="userInput"
                                    placeholder="Masukkan Panjang Matrix"
                                    type="text"
                                    className="w-full border-none bg-transparent font-poppins focus:outline-none text-gray-900"
                                    onChange={(e) => getValueM(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Item Input */}
                        <div className="flex flex-col mb-3">
                            <label
                                className="mb-2 text-2xl text-start font-poppins font-semibold text-gray-900">Jumlah Item:</label>
                            <div
                                className="outline outline-1 inline-flex items-center rounded-md bg-yellow-primary px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300">
                                <Input
                                    id="itemInput"
                                    name="itemInput"
                                    placeholder="Masukkan Panjang Matrix"
                                    type="text"
                                    className="w-full border-none bg-transparent font-poppins focus:outline-none text-gray-900"
                                    onChange={(e) => getValueN(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                        {/*<button type="button"*/}
                        {/*        className="w-30 ml-5 bg-purple-btn-primary text-white font-semibold px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none flex items-center">*/}
                        {/*    <TuneIcon className="mr-2"/>*/}
                        {/*    Generate Random*/}
                        {/*</button>*/}

                        {/* Sparsity Section */}
                        <div className='flex flex-col mb-3 md:col-span-3'>
                            <div className='flex mx-auto text-center items-center my-4 mb-10'>
                                <div
                                    className='w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>2
                                </div>
                                <h1 className='text-2xl font-bold font-poppins px-3'>Sparsity</h1>
                            </div>
                            {/*<label*/}
                            {/*    className='mb-2 text-2xl text-start font-poppins font-semibold text-gray-900'>Sparsity:</label>*/}
                            <div className='max-w-2xl flex flex-row items-center'>
                                <div
                                    className="outline outline-1 inline-flex justify-center items-center gap-x-1.5 rounded-md bg-yellow-primary px-3 py-2 text-md font-poppins font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                                    <Input
                                        id="sparsity"
                                        name="sparsity"
                                        placeholder="sparsity..."
                                        className="w-24 border-none bg-transparent focus:outline-none text-gray-900"
                                        type="text"
                                        onChange={(e) => getValueSparsity(e.target.value)}
                                    />
                                    <div className="flex items-center">
                                        <PercentIcon className="h-5 text-gray-500"/>
                                    </div>

                                </div>
                                {/*<button type="button"*/}
                                {/*        className="w-30 ml-5 bg-purple-btn-primary text-white font-semibold px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none flex items-center">*/}
                                {/*    <TuneIcon className="mr-2"/>*/}
                                {/*    Generate Random*/}
                                {/*</button>*/}
                            </div>
                        </div>

                        {/*<div className="mb-3">*/}
                        {/*    <label>Range :</label>*/}
                        {/*    <Input*/}
                        {/*        type="text"*/}
                        {/*        onChange={(e) => getValueRangeMin(e.target.value)}*/}
                        {/*    />*/}
                        {/*    -*/}
                        {/*    <Input*/}
                        {/*        type="text"*/}
                        {/*        onChange={(e) => getValueRangeMax(e.target.value)}*/}
                        {/*    />*/}
                        {/*</div>*/}


                        {/* Submit Button */}
                        <div className='md:col-span-3 flex justify-center mt-5'>
                            <button
                                type="button"
                                onClick={submitHandler}
                                className='bg-purple-btn-primary text-white font-semibold px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none flex items-center'
                            >
                                <TuneIcon className="mr-2"/> Submit Form
                            </button>
                        </div>
                </form>
            </div>


            {data.length > 0 && <TableMatrix Data={data}/>
            }
        </>
    );
}