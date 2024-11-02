import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import TabelView from "../../components/table/TabelView";
import { useRef } from "react";
import { getInitialData } from '../../api/getDataSet';
import MeanMeasure from '../../components/MathSimilarity/Measure/Mean/MeanMeasure';
import MeanCenteredMeasure from '../../components/MathSimilarity/Measure/MeanCentered/MeanCenteredMeasure';
import SimilarityMeasure from '../../components/MathSimilarity/Measure/SimilarityMeasure';
import PredictionMeasure from '../../components/MathSimilarity/Measure/Prediction/PredictionMeasure';


export default function DetailPageBox({ method, similarity, data }) {
    const fungsiSimilaritas = useRef(null);



    const renderContent = () => {
        if (!method) {
            return <p>Pilih Fungsi Similarity untuk {method}.</p>;
        } else if (!similarity) {
            return (<p className='flex items-center text-xl font-semibold font-poppins text-red-600 '>
                <SdCardAlertIcon className='mr-2' /> {/* Adjust margin as needed */}
                Silakan pilih metode dan fungsi similarity terlebih dahulu.
            </p>);
        } else if (data.length === 0) {
            return (
                <p>Silakan isi data terlebih dahulu.</p>);
        }

        const initialData = getInitialData(data, method.toLowerCase());
        return (
            <div>
                <MeanMeasure
                    opsional={method.toLowerCase()}
                    similarity={similarity}
                    initialData={initialData}
                />
                <MeanCenteredMeasure
                    opsional={method.toLowerCase()}
                    similarity={similarity}
                    initialData={initialData}
                />
                <SimilarityMeasure
                    ref={fungsiSimilaritas}
                    opsional={method.toLowerCase()}
                    similarity={similarity}
                    initialData={initialData}
                />
                <PredictionMeasure
                    opsional={method.toLowerCase()}
                    similarity={similarity}
                    initialData={initialData}
                />
            </div>
        )
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
                        alignItems: 'flex-start',
                    }}
                >
                    <section className='max-w-4xl mx-auto text-center'>
                        <h1 className='text-2xl font-bold font-poppins py-5'>Langkah-Langkah {method} dan
                            Metode {similarity}</h1>
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
                        <h1 className='text-2xl font-bold font-poppins py-5'>Hasil Perhitungan Similarity</h1>
                        <p className='text-sm px-10 py-5 font-sm font-poppins'>
                            <TabelView />
                        </p>
                    </section>
                </Box>
            </Container>
        </React.Fragment>
    );
}
