import React, { useState } from 'react';

const VideoTutorialModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <section className='max-w-2xl mx-auto text-center py-10'>
            <h1 className='text-2xl font-poppins font-semibold'>Video Tutorial</h1>

            {/* Shape with play button */}
            <div className='relative inline-block mt-8'>
                <div className='w-64 h-64  bg-gray-300 flex items-center justify-center cursor-pointer'
                     onClick={handleOpen}>
                    <div className='bg-white rounded-full p-2'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M14.752 11.168l-2.56 1.426a1 1 0 01-1.493-.866V6.84a1 1 0 011.493-.866l2.56 1.426a1 1 0 010 1.732z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-4 rounded'>
                        <button onClick={handleClose} className='absolute top-2 right-2 text-red-500'>
                            X
                        </button>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/VIDEO_ID" // Ganti VIDEO_ID dengan ID video yang diinginkan
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



