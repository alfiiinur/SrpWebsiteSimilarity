import React,{ useState } from 'react';
import TabelView from "../components/Tabel_Data";
import CardSteps from "../components/Card";
import iconsCalculator from  "../assets/icons/Calculator.png";
import  iconsTutorial from "../assets/icons/Video.png";
import {DropdownMethodBased, DropdownSimilarityMeasure} from "../components/form/form_createTbl";
import {isDisabled} from "@testing-library/user-event/dist/utils";
import PercentIcon from '@mui/icons-material/Percent';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailPageBox from "./detailPageView/DetailPage";

function Tutorial() {

    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    const toggleDescription = () => {
        setDescriptionVisible(!isDescriptionVisible);
    };

  return (
      <div className="p-4">
          <section className='max-w-4xl mx-auto text-center py-5'>
              <div className="flex flex-col items-center justify-start">
                  <div className="absolute top-0 left-0 right-0 flex justify-center space-x-4 p-4">
                      <a href='/'
                         className=" w-60 font-semibold font-poppins bg-greenDrak-btn-primary border-2 border-black text-center text-black px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
                          Homepage
                      </a>
                      <a href='/tutorial'
                         className="  w-60 font-semibold font-poppins bg-card_green_primary border-2 border-black text-center text-black px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
                          Tutorial
                      </a>
                      <a href='/pracitce' // typo 'pracitce' diubah menjadi 'practice'
                         className=" w-60 font-semibold font-poppins bg-blueCloud-btn-primary border-2 border-black text-center text-black px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
                          Practice
                      </a>
                  </div>
              </div>
          </section>


          <section className='max-w-4xl mx-auto text-center py-10'>
              <h1 className='text-5xl font-bold font-poppins py-10 '>Tutorial Similarity Measure</h1>
              <p className='font-sm font-poppins'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
                  aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec massa maximus,
                  id eleifend eros aliquet. Donec purus urna, lobortis ornare libero vel, ornare cursus ex. Pellentesque
                  velit diam, dictum id posuere eget, semper vel tellus. Morbi tempor tincidunt diam, nec fermentum diam
                  scelerisque sit amet. Sed pulvinar rhoncus dolor, eget ullamcorper tortor commodo id.</p>
          </section>
          <section className='max-w-4xl mx-auto text-center py-5'>
              <h1 className='text-2xl font-bold font-poppins py-10 '>Data Toy</h1>
              <TabelView/>
          </section>

          <section className='max-w-4xl mx-auto text-center py-10'>
              <h1 className='text-4xl font-bold font-poppins py-10 '>Langkah-langkah</h1>
              <p className='font-sm font-poppins'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
                  aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec massa maximus,
                  id eleifend eros aliquet. Donec purus urna, lobortis ornare libero vel, ornare cursus ex. Pellentesque
                  velit diam, dictum id posuere eget, semper vel tellus. Morbi tempor tincidunt diam, nec fermentum diam
                  scelerisque sit amet. Sed pulvinar rhoncus dolor, eget ullamcorper tortor commodo id.</p>
          </section>


          <section className='max-4xl mx-auto text-center py-10'>
              <div className="flex flex-row items-center justify-center p-4">

                  <CardSteps
                      heading='Menyiapkan Dataset'
                      description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec '
                  />

                  <CardSteps
                      heading='Memilih Ukuran Data Matriks'
                      description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec '
                  />

                  <CardSteps
                      heading='Mengisi Data Sparsity'
                      description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec '
                  />

                  <CardSteps
                      heading='Memilih Method Similarity'
                      description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec '
                  />
                  <CardSteps
                      heading='Cek Hasil Pembahasan'
                      description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et aliquet risus. In mollis orci felis, a tempus purus dictum id. Nam bibendum lectus nec '
                  />


              </div>

          </section>

          <section className='max-w-6xl mx-auto text-center py-5'>
              <h1 className='text-2xl font-semibold font-poppins py-10 underline underline-offset-1 '>Pilih Method dan Similiarity Measure</h1>
              <div className='flex justify-around'>
                  <div className='flex flex-col items-center'>
                      <div className='flex flex-row items-center'>
                          <div
                              className='w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>1
                          </div>
                          <h1 className='text-2xl font-bold font-poppins py-10 px-3'>Sparsity</h1>
                      </div>


                      <div>
                          <div
                              className="outline outline-1 inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-yellow-primary px-3 py-2 text-md font-poppins font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <input
                                  id="sparsity"
                                  name="sparsity"
                                  type="number"
                                  placeholder="5"
                                  disabled={true}
                                  className="w-20 border-none bg-transparent focus:outline-none text-gray-900"
                              />
                              <div className="flex items-center">
                                  <PercentIcon className="h-2 text-gray-500"/>
                              </div>
                          </div>
                      </div>

                  </div>

                  <div className='flex flex-col items-center'>

                      <div className='flex flex-row items-center'>
                          <div
                              className='w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>2
                          </div>
                          <h1 className='text-2xl font-bold font-poppins py-10 px-3'>Pilih Method Based</h1>
                      </div>
                      <DropdownMethodBased/>
                  </div>

                  <div className='flex flex-col items-center'>

                  <div className='flex flex-row items-center'>
                          <div
                              className='w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>3
                          </div>
                          <h1 className='text-2xl font-bold font-poppins py-10 px-3'>Pilih Similarity Measure</h1>
                      </div>
                      <DropdownSimilarityMeasure/>
                  </div>
              </div>
          </section>


          <section className='max-w-4xl mx-auto text-center my-10 py-10 '>
              <button onClick={toggleDescription}
                 className=" w-70 font-semibold font-poppins bg-card_green_primary border-2 border-black text-center text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
                 Cek Hasil Perhitungan Similarity
                  {isDescriptionVisible ? <ExpandLessIcon className="ml-2 text-lg" /> : <ExpandMoreIcon className="ml-2 text-lg" />}
              </button>
              {isDescriptionVisible && (
                  <section className='max-w-4xl mx-auto text-center my-10 py-10'>
                      <h1 className='text-4xl font-semibold font-poppins m-10'>Output :</h1>
                      <h1 className='text-2xl text-card_green_primary underline underline-1 font-poppins font-semibold py-10'>Hasil
                          Perhitungan Similarity Measure </h1>
                      <TabelView/>

                      <DetailPageBox/>
                  </section>
              )}
          </section>

      </div>
  );
}

export default Tutorial;
