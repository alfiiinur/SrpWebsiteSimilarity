import React, {useState} from 'react';
import iconsCalculator from "../../assets/icons/Calculator.png";
import iconsTutorial from "../../assets/icons/Video.png";
import TabelView from "../../components/Tabel_Data";
import CardSteps from "../../components/Card";
import PercentIcon from "@mui/icons-material/Percent";
import TuneIcon from '@mui/icons-material/Tune';
import {DropdownMethodBased, DropdownSimilarityMeasure, Form_createTbl} from "../../components/form/form_createTbl";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DetailPageBox from "../detailPageView/DetailPage";
import NavbarMenu from "../../components/Navbar";

function Practice() {
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    const toggleDescription = () => {
        setDescriptionVisible(!isDescriptionVisible);
    };

  return (
      <div className="p-4">
          <section className='max-w-4xl mx-auto text-center py-5'>
              <NavbarMenu/>
          </section>

          <section className='max-w-4xl mx-auto text-center py-10'>
              <h1 className='text-5xl font-bold font-poppins py-10 '>Practice Fungsi Similaritas</h1>
              <p className='font-sm font-poppins'>Pada Page tutorial ini pengguna akan diberikan tutorial tentang perhitungan fungsi similaritas dalam Sistem Rekomendasi. Sehingga pengguna paham tentang perhitungan Fungsi Similaritas dengan berbagai metode yang bisa digunakan.</p>
          </section>

          <section className='max-w-4xl mx-auto text-center py-10'>
              <h1 className='text-4xl font-bold font-poppins py-10 '>Langkah-langkah</h1>
              <p className='font-sm font-poppins'>Langkah-langkah untuk menghitung fungsi similaritas data rating yang akan di gunakan yaitu :</p>
          </section>


          <section className='max-4xl mx-auto text-center py-10'>
              <div className="flex flex-row items-center justify-center p-4">

                  <CardSteps
                      heading='Membuat Tabel Matrix'
                      description='  Membuat tabel matrix yang berfungsi sebagai representasi data. Tabel ini akan menampung rating dari pengguna terhadap berbagai item, memungkinkan analisis lebih lanjut mengenai pola dan hubungan di dalam data  '
                  />

                  <CardSteps
                      heading='Menentukan Sparsity'
                      description=' Sparsity memberikan gambaran tentang proporsi data yang hilang dibandingkan dengan data yang tersedia, yang penting untuk memahami efektivitas sistem rekomendasi. '
                  />

                  <CardSteps
                      heading='Pilih Metode Sistem Rekomendasi '
                      description=' Memilih metode sistem rekomendasi apa yang ingin digunakan, menggunakan Item-Based atau User-Based '
                  />

                  <CardSteps
                      heading='Pilih Fungsi Similaritas'
                      description=' Memilih metode yang tepat untuk menghitung similaritas. Terdapat berbagai metode yang bisa digunakan untuk menghitung similaritas '
                  />

              </div>

          </section>


          <section className='max-w-4xl mx-auto text-center py-5'>
              <div className='flex flex-row items-center justify-center'>
                  <div
                      className='w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>1
                  </div>
                  <h1 className='text-2xl font-bold font-poppins py-5 ml-3'>Buat Tabel Matrix:</h1>
              </div>
              <Form_createTbl/>

          </section>

          <section className='max-w-2xl mx-auto text-center py-5'>
              <div className='flex flex-col items-center'>
                  <div className='flex flex-row items-center'>
                      <div
                          className='w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>2
                      </div>
                      <h1 className='text-2xl font-bold font-poppins py-10 px-3'>Sparsity</h1>
                  </div>

                  <div className='max-w-2xl flex flex-row items-center'>
                      <form className='flex items-center'>
                          <div
                              className="outline outline-1 inline-flex  justify-center items-center gap-x-1.5 rounded-md bg-yellow-primary px-3 py-2 text-md font-poppins font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                              <input
                                  id="sparsity"
                                  name="sparsity"
                                  type="number"
                                  placeholder="sparsity..."
                                  className="w-24 border-none bg-transparent focus:outline-none text-gray-900"
                              />
                              <div className="flex items-center">
                                  <PercentIcon className="h-5 text-gray-500"/>
                              </div>
                          </div>
                          <button type="submit"
                                  className="w-30 ml-5 bg-purple-btn-primary text-white font-semibold px-3 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none flex items-center">
                              <TuneIcon className="mr-2"/>
                              Generate Random
                          </button>

                      </form>
                  </div>
              </div>
          </section>

          <section className='max-w-4xl mx-auto text-center py-5'>
              <h1 className='text-2xl font-bold font-poppins py-10 '>Hasil Tabel Matrix </h1>
              <TabelView/>
          </section>

          <section className='max-w-6xl mx-auto text-center py-5'>
              <h1 className='text-2xl font-semibold font-poppins py-10 underline underline-offset-1 '>Pilih Metode Sistem Rekomendasi dan
                  Fungsi Similaritas</h1>
              <div className='flex justify-around'>

                  <div className='flex flex-col items-center'>

                      <div className='flex flex-row items-center'>
                          <div
                              className='w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>3
                          </div>
                          <h1 className='text-2xl font-bold font-poppins py-10 px-3'>Pilih Metode Sistem Rekomendasi </h1>
                      </div>
                      <DropdownMethodBased/>
                  </div>

                  <div className='flex flex-col items-center'>

                      <div className='flex flex-row items-center'>
                          <div
                              className='w-10 h-10 font-poppins rounded-full bg-green-500 text-white flex items-center justify-center text-lg'>4
                          </div>
                          <h1 className='text-2xl font-bold font-poppins py-10 px-3'>Pilih Fungsi Similaritas</h1>
                      </div>
                      <DropdownSimilarityMeasure/>
                  </div>
              </div>
          </section>


          <section className='max-w-4xl mx-auto text-center my-10 py-10 '>
              <button onClick={toggleDescription}
                      className=" w-70 font-semibold font-poppins bg-card_green_primary border-2 border-black text-center text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
                  Cek Hasil Perhitungan Similaritas
                  {isDescriptionVisible ? <ExpandLessIcon className="ml-2 text-lg"/> :
                      <ExpandMoreIcon className="ml-2 text-lg"/>}
              </button>
              {isDescriptionVisible && (
                  <section className='max-w-4xl mx-auto text-center my-10 py-10'>
                      <h1 className='text-4xl font-semibold font-poppins m-10'>Hasil dan Pembahasan :</h1>
                      <h1 className='text-2xl text-card_green_primary underline underline-1 font-poppins font-semibold py-10'>Hasil Perhitungan Fungsi Similaritas </h1>
                      <TabelView/>

                      <DetailPageBox/>




                  </section>
              )}
          </section>


      </div>
  );
}

export default Practice;
