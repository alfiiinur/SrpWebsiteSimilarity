import React, { useState } from 'react';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import GifTut from '../../assets/vidioAsset/vidioTUT.gif'
import InfoIcon from '@mui/icons-material/Info';

const VideoTutorialModal = () => {
    return (
        <>
            <section className='max-w-6xl mx-auto text-center py-10'>
                <h1 className='text-4xl font-poppins font-bold text-blue-600 underline underline-offset-3 '>Video Tutorial</h1>
                <h2 className='mt-4 text-2xl font-semibold text-gray-700 cursor-pointer transition transform hover:scale-105 hover:text-blue-500'>
                    <InfoIcon className='mr-2 text-blue-500' />
                    Tekan pada setiap sel yang memiliki nilai untuk melihat detail perhitungan!
                </h2>

                {/* Card container */}
                <div
                    className='relative inline-block mt-8 shadow-lg rounded-lg overflow-hidden'> {/* Added shadow and rounded corners */}
                    <div
                        className='w-[800px] h-[500px] bg-white p-3 flex items-center justify-center'> {/* Background for the card */}
                        <img
                            src={GifTut}
                            alt="Video Tutorial Cover"
                            className='w-full h-full object-cover'
                        />
                    </div>

                </div>
            </section>
        </>
    );
};

export default VideoTutorialModal;


