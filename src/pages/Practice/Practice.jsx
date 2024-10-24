import React, { useState } from 'react';
import CardSteps from "../../components/Card/Main/CardSteps.jsx"
import { DropdownMethodBased, DropdownSimilarityMeasure } from "../../components/Form/form_Practice";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DetailPageBox, { HasilPerhitunganSimilaritas } from "../detailPageView/DetailPage";
import Navigator from '../../components/Navigate/Navigator';

import FormMeasure from "../../components/Form/FormMeasure";
import VidioTutorialModal from "../../components/modal/VidioTutorialModal";

function Practice() {
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    const toggleDescription = () => {
        setDescriptionVisible(!isDescriptionVisible);
    };


    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedSimilarity, setSelectedSimilarity] = useState('');

    const handleMethodChange = (method) => {
        setSelectedMethod(method);
    };

    const handleSimilarityChange = (similaritas) => {
        setSelectedSimilarity(similaritas);
    };

    return (
        <div className="p-4">
            {/* Section Of Navigate */}
            <Navigator />

            <section className='max-w-4xl mx-auto text-center py-10'>
                <h1 className='text-5xl font-bold font-poppins py-10 '>Practice Fungsi Similaritas</h1>
                <p className='font-sm font-poppins'>Pada Page Practice ini pengguna bisa  berexplorasi dan ingin melakukan experiment tentang perhitungan Fungsi Similaritas untuk pemahaman yang lebih lanjut.</p>
            </section>

            <VidioTutorialModal />

            <section className='max-w-4xl mx-auto text-center py-10'>
                <h1 className='text-4xl font-bold font-poppins py-10 '>Langkah-langkah</h1>
                <p className='font-sm font-poppins'>Langkah-langkah untuk menghitung fungsi similaritas data rating yang akan di gunakan yaitu :</p>
            </section>


            <section className='max-4xl mx-auto text-center'>
                <div className="flex flex-row items-center justify-center p-4">

                    <CardSteps
                        heading='Menyiapkan Data Rating'
                        description=' Menyiapkan Data rating yang akan digunakan untuk perhitungan fungsi similaritas'
                    />

                    <CardSteps
                        heading='Memilih Metode Digunakan'
                        description='Memilih metode yang ingin digunakan yaitu User-Based atau Item-Based '
                    />
                    <CardSteps
                        heading='Memilih Fungsi Similaritas'
                        description=' Memilih fungsi similaritas untuk perhitungan kemiripan yang ingin di cari '
                    />

                </div>

            </section>


            <section className='max-w-4xl mx-auto text-center py-5'>
                <div className='flex flex-row items-center justify-center'>
                    <div
                        className='w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>1
                    </div>
                    <h1 className='text-2xl font-bold font-poppins py-5 ml-3'>Buat Tabel Matrix:</h1>
                </div>
                {/*<Form_createTbl/>*/}
                <FormMeasure />

            </section>

            <section className='max-w-6xl mx-auto text-center py-5'>
                <h1 className='text-2xl font-semibold font-poppins py-10 underline underline-offset-1 '>Pilih Metode Sistem Rekomendasi dan
                    Fungsi Similaritas</h1>
                <div className='flex justify-around'>

                    <div className='flex flex-col items-center'>

                        <div className='flex flex-row items-center'>
                            <div
                                className='w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>3
                            </div>
                            <h1 className='text-2xl font-bold font-poppins py-10 px-3'>Pilih Metode Sistem Rekomendasi </h1>
                        </div>
                        <DropdownMethodBased onChange={handleMethodChange} />
                    </div>

                    <div className='flex flex-col items-center'>

                        <div className='flex flex-row items-center'>
                            <div
                                className='w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>4
                            </div>
                            <h1 className='text-2xl font-bold font-poppins py-10 px-3'>Pilih Fungsi Similaritas</h1>
                        </div>
                        <DropdownSimilarityMeasure onChange={handleSimilarityChange} />
                    </div>
                </div>
            </section>


            <section className='max-w-4xl mx-auto text-center my-10 py-10 '>
                <button onClick={toggleDescription}
                    className=" w-70 font-semibold font-poppins bg-card_green_primary border-2 border-black text-center text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
                    Cek Hasil Perhitungan Similaritas
                    {isDescriptionVisible ? <ExpandLessIcon className="ml-2 text-lg" /> :
                        <ExpandMoreIcon className="ml-2 text-lg" />}
                </button>
                {isDescriptionVisible && (
                    <section className='max-w-4xl mx-auto text-center my-10 py-10'>
                        <h1 className='text-4xl font-semibold font-poppins m-10'>Hasil dan Pembahasan :</h1>

                        <DetailPageBox method={selectedMethod} similaritas={selectedSimilarity} />
                        <HasilPerhitunganSimilaritas />
                    </section>
                )}
            </section>


        </div>
    );
}

export default Practice;
