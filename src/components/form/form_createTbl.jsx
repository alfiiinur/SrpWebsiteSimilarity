import React, {useState} from 'react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import TuneIcon from '@mui/icons-material/Tune';

export function Form_createTbl(){
    return (
        <div className="max-w-2xl mx-auto py-10">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center">
                {/* Kolom Kiri */}
                <div className="flex flex-col">
                    <label htmlFor="input1"
                           className="mb-5 text-2xl text-start font-poppins font-semibold text-gray-900">Panjang:</label>
                    <div
                        className="outline outline-1 inline-flex items-center rounded-md bg-yellow-primary px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300">
                        <input
                            id="input1"
                            name="input1"
                            type="number"
                            placeholder="Masukkan Panjang Matrix"
                            className="w-full border-none bg-transparent font-poppins focus:outline-none text-gray-900"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="input2"
                           className="mb-5 text-2xl text-start font-poppins font-semibold text-gray-900">Lebar:</label>
                    <div
                        className="outline outline-1 inline-flex items-center rounded-md bg-yellow-primary px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300">
                        <input
                            id="input2"
                            name="input2"
                            type="number"
                            placeholder="Masukkan Lebar Matrix"
                            className="w-full border-none bg-transparent  font-poppins focus:outline-none text-gray-900"
                        />
                    </div>
                </div>

                {/* Tombol */}
                <div className="flex flex-col mt-12 justify-center items-center">
                    <button type="submit"
                            className="w-30 bg-purple-btn-primary text-white font-semibold px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none flex items-center">
                        <TuneIcon className="mr-2"/>
                        Generate Random
                    </button>
                </div>
            </form>
        </div>

    )
}


export function DropdownMethodBased() {

    const [selectMetode, setSelectMetode] = useState('Pilih Metode')

    const handleChange = (method) => {
        setSelectMetode(method);
    }

    return (

        <FormControl>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton
                        className="outline outline-1 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-yellow-primary px-3 py-2 text-sm font-semibold font-poppins text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-yellow-50">
                        {selectMetode}
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                    </MenuButton>
                </div>

                <Menu.Items
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => handleChange('User-Based')}
                                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                >
                                    User-Based
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => handleChange('Item-Based')}
                                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                >
                                    Item-Based
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        </FormControl>
    )
}



export function DropdownSimilarityMeasure() {

    const [selectSimiliarty, setSelectSimiliarity] = useState('Pilih Similarity Measure')

    const handleChange = (method) => {
        setSelectSimiliarity(method)
    }

    return (
        <FormControl>
            <Menu as="div" className="relative  inline-block text-left ">
            <div>
                <MenuButton
                    className=" outline outline-1 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-yellow-primary px-3 py-2 text-sm font-semibold font-poppins text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-yellow-50">
                    {selectSimiliarty}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400"/>
                </MenuButton>
            </div>

            <Menu.Items
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <Menu.Item>
                        {({active}) => (
                            <button
                                onClick={() => handleChange('Pearson Coreallation Coeficient (PCC)')}
                                className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                >
                                Pearson Coreallation Coeficient (PCC)
                            </button>
                        )}

                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <button
                                onClick={() => handleChange('Vectore Cosine')}
                                className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                            >
                                Vectore Cosine
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <button
                                onClick={() => handleChange('Adjusted Vector Cosine')}
                                className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                            >
                                Adjusted Vector Cosine
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <button
                                onClick={() => handleChange('Bhattacharyya Coefficient Similarity (BC)')}
                                className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                            >
                                Bhattacharyya Coefficient Similarity (BC)
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <button
                                onClick={() => handleChange('Kullback-Leibler Distance (KL)')}
                                className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                            >
                                Kullback-Leibler Distance (KL)
                            </button>
                        )}

                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
        </FormControl>
    )
}




