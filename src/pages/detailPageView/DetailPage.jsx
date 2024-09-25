import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
    PearsonViewPage,
    PearsonViewPageItemBased,
    PearsonViewPageUserBased
} from "../../components/viewMath/PearsonViewPage";
import {CosineViewPageItemBased, CosineViewPageUserBased} from "../../components/viewMath/CosineViewPage";
import {
    AdjustedCosineViewPageItemBased,
    AdjustedCosineViewPageUserBased
} from "../../components/viewMath/AdjustedCosineViewPage";


export default function DetailPageBox() {
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
                        <h1 className='text-2xl font-bold font-poppins py-10'>Langkah-Langkah (User-based) dan Metode (Fungsi Similaritas)</h1>
                        <p className='text-sm px-10 font-sm font-poppins'>
                                {/*tempat untuk ganti-ganti similiarity untuk sesuai metode yang di submit*/}
                                {/*Pearson User Based*/}
                                <PearsonViewPageUserBased/>
                                {/*Pearson Item Based*/}
                                <PearsonViewPageItemBased/>
                                {/*Cosine User Based*/}
                                <CosineViewPageUserBased/>
                                {/*Cosine Item Based*/}
                                <CosineViewPageItemBased/>
                                {/*Adjusted User Based*/}
                                <AdjustedCosineViewPageUserBased/>
                                {/*Adjusted Item Based*/}
                                <AdjustedCosineViewPageItemBased/>
                        </p>
                    </section>
                </Box>
            </Container>
        </React.Fragment>
    );
}
