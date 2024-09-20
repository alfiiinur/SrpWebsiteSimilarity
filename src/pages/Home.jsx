import React from 'react';
import { useRef, useState } from 'react';
import ImageAs from '../assets/images/lear.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import {AccordionMeasure} from "../components/AccordionMeasure";




const ScrollButton = () => {
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const scrollToSection = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='flex justify-center gap-4 mt-20 mb-8'>
            <a
                href='#'
                onClick={scrollToSection}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className='font-bold font-poppins bg-yellow-btn-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-yellow-btn-primary flex items-center'
            >
                Learn More
                {isHovered ? (
                    <ArrowDownwardIcon className="ml-2 text-lg transition-transform" />
                ) : (
                    <ArrowForwardIcon className="ml-2 text-lg transition-transform" />
                )}
            </a>
        </div>
    );
};



function Home() {
  return (
    <div className='text-center'>
        <section className='relative h-screen flex flex-col justify-center items-center'>
            <div className='max-w-4xl mx-auto text-center relative z-10'>
                <h1 className="text-3xl text-center font-bold font-poppins">Media Pembelajarn</h1>
                <h1 className="text-7xl text-center font-bold font-poppins">Media Pembelajarn Similiarty Measure</h1>
                <ScrollButton/>
            </div>
        </section>



        <section className='max-w-4xl mx-auto text-center py-10'>
        <h2 className='text-5xl font-bold font-poppins mb-20'>Sekarang Waktunya Belajar dan Berlatih Similarity Measure</h2>
        <p className='text-md font-poppins'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec </p>
            <div className='grid grid-cols-1 my-20 md:grid-cols-2 gap-8'>
                <div className='bg-card_blue_primary border-4 border-black  shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4'>
                    {/* <!-- Gambar di kiri --> */}
                    <div className="flex-shrink-0">
                        <img src= {ImageAs} alt="Descriptive Alt Text" className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                    {/* <!-- Teks di kanan --> */}
                    <div className="flex-1 text-start">
                        <h3 className="text-xl text-white text-start font-bold font-poppins mb-2">Tutorail Similarty Measure</h3>
                        <p className="mb-6 text-start text-white font-poppins font-sm">Access a variety of resources and tutorials to enhance your skills.</p>
                        <a href="/tutorial" className="font-sm font-poppins bg-greenDrak-btn-primary border-2 border-black  text-white px-3 py-2 rounded-full hover:bg-blue-700 shadow-md">
                            Explore Now
                            <ArrowForwardIcon className="ml-2 text-lg" />
                            </a>
                            
                    </div>
                </div>
                
                <div className="bg-card_green_primary border-4 border-black  shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4">
                    {/* <!-- Gambar di kiri --> */}
                    <div className="flex-shrink-0">
                        <img src= {ImageAs} alt="Descriptive Alt Text" className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                    {/* <!-- Teks di kanan --> */}
                    <div className="flex-1 text-start">
                        <h3 className="text-xl text-white text-start font-bold font-poppins mb-2">Pracitce Similarty Measure</h3>
                        <p className="mb-6 text-start  text-white font-poppins font-sm">Access a variety of resources and tutorials to enhance your skills.</p>
                        <a href="/pracitce" className="font-sm font-poppins bg-purple-btn-primary border-2 border-black text-white px-3 py-2  rounded-full  shadow-md hover:bg-blue-700 ">
                            Pratice Now 
                            <ArrowForwardIcon className="ml-2 text-lg" />
                        </a>
                    </div>
                </div>
            </div>
        </section>



        <section className='max-w-4xl mx-auto text-center py-5'>
            <h1 className='text-5xl font-bold font-poppins py-10 '>About the Application</h1>
            <p className='font-sm font-poppins'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec massa maximus, id eleifend eros aliquet. Donec purus urna, lobortis ornare libero vel, ornare cursus ex. Pellentesque velit diam, dictum id posuere eget, semper vel tellus. Morbi tempor tincidunt diam, nec fermentum diam scelerisque sit amet. Sed pulvinar rhoncus dolor, eget ullamcorper tortor commodo id.</p>
        </section>

        <section className='max-w-4xl mx-auto text-center py-5'>
            <h1 className='text-5xl font-bold font-poppins py-10 '>Similarity Measure on Application</h1>
            <p className='font-sm font-poppins my-10 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec massa maximus, id eleifend eros aliquet. Donec purus urna, lobortis ornare libero vel, ornare cursus ex. Pellentesque velit diam, dictum id posuere eget, semper vel tellus. Morbi tempor tincidunt diam, nec fermentum diam scelerisque sit amet. Sed pulvinar rhoncus dolor, eget ullamcorper tortor commodo id.</p>
            <div className='space-y-4'>
                <AccordionMeasure
                    headingMeasure='Pearson Coeficient Corellation (PCC)'
                    descriptionMeasure='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.'

                />
                <AccordionMeasure
                    headingMeasure=' Vector Similarity (Cosine)'
                    descriptionMeasure='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.'

                />
                <AccordionMeasure
                    headingMeasure='Adjusted Vector Cosine '
                    descriptionMeasure='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.'

                />
                <AccordionMeasure
                    headingMeasure='Bhattacharyya Coefficient Similarity (BC)'
                    descriptionMeasure='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.'

                />
                <AccordionMeasure
                    headingMeasure=' Kullback-Leibler Distance (KL)'
                    descriptionMeasure='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.'

                />
            </div>
        </section>

        <section className='max-w-4xl mx-auto text-center py-5'>
            <h1 className='text-5xl font-bold font-poppins py-10 '>Biodata of Member</h1>
            <p className='font-sm font-poppins'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec massa maximus, id eleifend eros aliquet. Donec purus urna, lobortis ornare libero vel, ornare cursus ex. Pellentesque velit diam, dictum id posuere eget, semper vel tellus. Morbi tempor tincidunt diam, nec fermentum diam scelerisque sit amet. Sed pulvinar rhoncus dolor, eget ullamcorper tortor commodo id.</p>
            
            <div className='grid grid-cols-1 my-20 md:grid-cols-3 gap-8'>
                <div className='bg-card_blue_primary border-4 border-black  shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4'>
                    <div className="flex-1 text-end">
                        <div className="flex-shrink-0 justify-center items-center">
                            <img src= {ImageAs} alt="Descriptive Alt Text" className="w-32 h-32 object-cover rounded-lg " />
                        </div>
                        <h3 className="text-xl text-white text-start font-bold font-poppins mb-2">Nama Tim Pengembang 1</h3>
                        <p className="mb-4 text-start text-white font-poppins font-sm">Access a variety of resources and tutorials to enhance your skills.</p>
                    </div>
                </div>
                
                <div className="bg-card_green_primary border-4 border-black  shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4">
                    <div className="flex-1 text-end">
                        <div className="flex-shrink-0">
                            <img src= {ImageAs} alt="Descriptive Alt Text" className="w-32 h-32 object-cover rounded-lg" />
                        </div>
                        <h3 className="text-xl text-white text-start font-bold font-poppins mb-2">Nama Tim Pengembanv 2</h3>
                        <p className="mb-4 text-start text-white font-poppins font-sm">Access a variety of resources and tutorials to enhance your skills.</p>
                    </div>
                </div>
                <div className="bg-card_pink_primary border-4 border-black  shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4">
                    <div className="flex-1 text-end">
                        <div className="flex-shrink-0">
                            <img src= {ImageAs} alt="Descriptive Alt Text" className="w-32 h-32 object-cover rounded-lg" />
                        </div>
                        <h3 className="text-xl text-white text-start font-bold font-poppins mb-2">Nama Tim Pengembanv 3</h3>
                        <p className="mb-4 text-start text-white font-poppins font-sm">Access a variety of resources and tutorials to enhance your skills.</p>
                    </div>
                </div>
            </div>


        </section>

        <section className='max-w-4xl mx-auto text-center py-5'>
            <h1 className='text-5xl font-bold font-poppins py-10 '>Reference</h1>
            <p className='font-sm font-poppins'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec massa maximus, id eleifend eros aliquet. Donec purus urna, lobortis ornare libero vel, ornare cursus ex. Pellentesque velit diam, dictum id posuere eget, semper vel tellus. Morbi tempor tincidunt diam, nec fermentum diam scelerisque sit amet. Sed pulvinar rhoncus dolor, eget ullamcorper tortor commodo id.</p>
        </section>
    </div>
  );
}



export default Home;
