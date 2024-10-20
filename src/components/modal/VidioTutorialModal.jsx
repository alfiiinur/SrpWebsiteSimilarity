import React, { useState } from 'react';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import GifTut from '../../assets/vidioAsset/vidioTUT.gif'

const VideoTutorialModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleBackdropClick = (e) => {
        // Tutup modal jika area di luar konten diklik
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <section className='max-w-4xl mx-auto text-center py-10'>
            <h1 className='text-2xl font-poppins font-semibold'>Video Tutorial</h1>

            {/* Shape with play button */}
            <div className='relative inline-block mt-8'>
                <div className='w-80 h-64 p-4 bg-gray-300 flex items-center justify-center rounded-lg cursor-pointer'
                     onClick={handleOpen}>
                    <img src={GifTut} alt="Video Tutorial Cover"
                         className='absolute inset-0 w-full h-full object-cover rounded-lg'/>
                    <div className='bg-white rounded-full p-3 shadow-lg z-10'>
                        <PlayCircleFilledWhiteIcon />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
                     onClick={handleBackdropClick}
                >
                    <div className='bg-white p-4 max-w-full h-auto rounded'>
                        <iframe
                            width="700"
                            height="400"
                            src={GifTut}
                            title="Video Tutorial"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VideoTutorialModal;



