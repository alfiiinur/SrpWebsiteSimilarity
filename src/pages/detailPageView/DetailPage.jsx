import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function DetailPageBox() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="max-w-5xl">
                <Box
                    sx={{
                        bgcolor: '#FDF9ED',
                        height: '100vh',
                        border: '1px solid black',
                        borderRadius: 1,
                        margin: 3,
                        padding: 2,
                        boxShadow: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-center', // Ubah ke 'flex-start' jika ingin menempel ke atas
                    }}
                >
                    <section className='max-w-4xl mx-auto text-center'>
                        <h1 className='text-2xl font-bold font-poppins py-10'>Practice Similarity Measure</h1>
                        <p className='text-sm px-10 font-sm font-poppins'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec massa maximus, id eleifend eros aliquet. Donec purus urna, lobortis ornare libero vel, ornare cursus ex. Pellentesque velit diam, dictum id posuere eget, semper vel tellus. Morbi tempor tincidunt diam, nec fermentum diam scelerisque sit amet. Sed pulvinar rhoncus dolor, eget ullamcorper tortor commodo id.
                        </p>
                    </section>
                </Box>
            </Container>
        </React.Fragment>
    );
}
