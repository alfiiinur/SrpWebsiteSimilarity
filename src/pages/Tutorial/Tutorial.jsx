import React, { useState } from 'react';
import TabelView from "../../components/table/TabelView.jsx";
import CardSteps from "../../components/Card/Main/CardSteps.jsx";
import DropdownMethodBased from '../../components/Form/Tutorial/DropdownMethodBased.jsx';
import DropdownSimilarityMeasure from '../../components/Form/Tutorial/DropdownSimilarityMeasure.jsx';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailPageBox from "../detailPageView/DetailPageBox.jsx";
import Navigator from '../../components/Navigate/Navigator';
import VideoTutorialModal from '../../components/modal/VidioTutorialModal';
import BodyTutorial from '../Layout/Tutorial/BodyTutorial.jsx';
import FormLayoutTutorial from '../Layout/Tutorial/FormTutorial.jsx';
import NotationCard from '../../components/table/NotaionCard.jsx';

const Tutorial = () => {

    const form = [
        {
            header: "Pilih Metode Sistem Rekomendasi",
            element: <DropdownMethodBased
                onChange={(method) => {
                    setSelectedMethod(method);
                    handleTurnDescription(false)
                }} />
        },
        {
            header: "Pilih Fungsi Similaritas",
            element: <DropdownSimilarityMeasure
                onChange={(similaritas) => {
                    setSelectedSimilarity(similaritas);
                    handleTurnDescription(false)
                }} />
        },
    ]
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    const toggleDescription = () => {
        setDescriptionVisible(!isDescriptionVisible);
    };

    const handleTurnDescription = (condition) => {
        setDescriptionVisible(condition)
    }


    const [data] = useState([
        [5, 0, 4, 3, 5, 4],
        [4, 5, 0, 3, 2, 3],
        [0, 3, 0, 2, 1, 0],
        [1, 2, 2, 0, 3, 4],
        [1, 0, 1, 2, 3, 3]
    ]);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedSimilarity, setSelectedSimilarity] = useState('');

    return (
        <div className="p-4">
            {/* Section Of Navigate */}
            <Navigator />

            <BodyTutorial
                header={"Tutorial Fungsi Similaritas"}
                subheader={" Pada Page tutorial ini pengguna akan diberikan tutorial tentang perhitungan fungsi similaritas dalam Sistem Rekomendasi. Sehingga pengguna paham tentang perhitungan Fungsi Similaritas dengan berbagai metode yang bisa digunakan "}
            />

            <VideoTutorialModal />

            <BodyTutorial
                header={"Langkah-langkah"}
                subheader={"Langkah-langkah untuk menghitung fungsi similaritas data rating yang akan di gunakan yaitu :"}
            />


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

            <BodyTutorial
                header={"Data Rating"}
                subheader={"Data rating yaitu suatu kumpulan data yang telah diberikan rating pada item tertentu oleh user."}
            >
                <TabelView />
                <NotationCard opsional={selectedMethod.toLowerCase()} data={data} />
            </BodyTutorial>
            <FormLayoutTutorial
                data={form}
            />


            <section className='max-w-6xl mx-auto text-center my-10 py-10 relative'>
                <button onClick={toggleDescription}
                    className="w-70 font-semibold font-poppins bg-card_green_primary border-2 border-black text-center text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
                    Cek Hasil Perhitungan Similaritas
                    {isDescriptionVisible ? <ExpandLessIcon className="ml-2 text-lg" /> :
                        <ExpandMoreIcon className="ml-2 text-lg" />}
                </button>
                {isDescriptionVisible && (
                    <div className='flex flex-row '>
                        <BodyTutorial
                            header={"Hasil dan Pembahasan :"}
                            subheader={""}
                        >
                            <DetailPageBox
                                method={selectedMethod}
                                similarity={selectedSimilarity}
                                data={data}
                            />
                        </BodyTutorial>
                    </div>

                )}

            </section>


        </div>
    );
}

export default Tutorial;
