import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
    PearsonViewPage,
    PearsonViewPageItemBased,
    PearsonViewPageUserBased
} from "../../components/viewMath/PearsonViewPage";
import { CosineViewPageItemBased, CosineViewPageUserBased } from "../../components/viewMath/CosineViewPage";
import {
    AdjustedCosineViewPageItemBased,
    AdjustedCosineViewPageUserBased
} from "../../components/viewMath/AdjustedCosineViewPage";
import { KullbackViewPageItemBased, KullbackViewPageUserBased } from "../../components/viewMath/KullbackLViewPage";
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import { BhattacharyyaViewItemBased, BhattacharyyaViewUserBased } from "../../components/viewMath/BhattacharyyaViewPage";
import TabelView from "../../components/Tabel_Data";
import { useRef } from "react";


export default function DetailPageBox({ method, similaritas }) {
    // const { meanRef, meanCenteredRef, fungsiSimilaritas, prediksi } = refs;

    const meanRef = useRef(null);
    const meanCenteredRef = useRef(null);
    const fungsiSimilaritas = useRef(null);
    const prediksi = useRef(null);

    const renderContent = () => {
        if (method === 'User-Based') {
            switch (similaritas) {
                case 'Pearson Coreallation Coeficient (PCC)':
                    return <PearsonViewPageUserBased meanRef={meanRef} meanCenteredRef={meanCenteredRef} fungsiSimilaritas={fungsiSimilaritas} prediksi={prediksi} />;

                case 'Vectore Cosine':
                    return CosineViewPageUserBased();
                case 'Adjusted Vector Cosine':
                    return AdjustedCosineViewPageUserBased();
                case 'Bhattacharyya Coefficient Similarity (BC)':
                    return BhattacharyyaViewUserBased();
                case 'Kullback-Leibler Distance (KL)':
                    return KullbackViewPageUserBased();
                default:
                    return <p>Pilih Fungsi Similiartias untuk user-based.</p>;
            }
        } else if (method === 'Item-Based') {
            switch (similaritas) {
                case 'Pearson Coreallation Coeficient (PCC)':
                    return <PearsonViewPageItemBased meanRef={meanRef} meanCenteredRef={meanCenteredRef} fungsiSimilaritas={fungsiSimilaritas} prediksi={prediksi} />;
                case 'Vectore Cosine':
                    return CosineViewPageItemBased();
                case 'Adjusted Vector Cosine':
                    return AdjustedCosineViewPageItemBased();
                case 'Bhattacharyya Coefficient Similarity (BC)':
                    return BhattacharyyaViewItemBased();
                case 'Kullback-Leibler Distance (KL)':
                    return KullbackViewPageItemBased();
                default:
                    return <p>Pilih Fungsi Similiartias untuk Item-Based.</p>;
            }
        }
        // Add more conditions as needed
        return <p className='flex items-center text-xl font-semibold font-poppins text-red-600 '>
            <SdCardAlertIcon className='mr-2' /> {/* Adjust margin as needed */}
            Silahkan pilih metode dan fungsi similaritas terlebih dahulu.
        </p>;
    };


    return (

        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="max-w-5xl">
                <Box
                    sx={{
                        bgcolor: '#FDF9ED',
                        height: 'auto',
                        border: '1px solid black',
                        borderRadius: 1,
                        margin: 3,
                        padding: 2,
                        boxShadow: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start', // Change this to 'flex-start' for better alignment
                    }}
                >
                    <section className='max-w-4xl mx-auto text-center'>
                        <h1 className='text-2xl font-bold font-poppins py-5'>Langkah-Langkah {method} dan
                            Metode {similaritas}</h1>
                        <p className='text-sm px-10 py-5 font-sm font-poppins'>
                            {/* Tempat untuk ganti-ganti similarity untuk sesuai metode yang di submit */}
                            {renderContent()}
                        </p>
                    </section>
                </Box>
            </Container>
        </React.Fragment>
    );
}


export function HasilPerhitunganSimilaritas() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="max-w-5xl">
                <Box
                    sx={{
                        bgcolor: '#FDF9ED',
                        height: 'auto',
                        border: '1px solid black',
                        borderRadius: 1,
                        margin: 3,
                        padding: 2,
                        boxShadow: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-center',
                    }}
                >
                    <section className='max-w-4xl mx-auto text-center'>
                        <h1 className='text-2xl font-bold font-poppins py-5'>Hasil Perhitungan Similaritas</h1>
                        <p className='text-sm px-10 py-5 font-sm font-poppins'>
                            <TabelView />
                        </p>
                    </section>
                </Box>
            </Container>
        </React.Fragment>
    );
}
