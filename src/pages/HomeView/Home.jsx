import React from 'react';
import { useRef, useState } from 'react';
import ImageAs from '../../assets/images/lear.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import {AccordionMeasure} from "../../components/AccordionMeasure";
import NavbarMenu from "../../components/Navbar";




const ScrollButton = () => {
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const scrollToSection = () => {
        const section = document.getElementById("belajar");
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
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
                Mulai Sekarang
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
          {/*<section className='max-w-4xl mx-auto text-center py-5'>*/}
          {/*    <NavbarMenu/>*/}
          {/*</section>*/}
          <section className='relative h-screen flex flex-col justify-center items-center'>
              <div className='max-w-6xl mx-auto text-center relative z-10 px-4'>
                  {/*<h1 className="text-3xl font-bold font-poppins">Media Pembelajarn Interaktif</h1>*/}
                  <h1 className="text-7xl font-bold font-poppins">Media Pembelajaran Interaktif Perhitungan Fungsi Similaritas </h1>
                  <ScrollButton/>
              </div>
          </section>

          <section id='belajar' className='max-w-4xl mx-auto text-center py-10 px-4'>
              <h2 className='text-5xl font-bold font-poppins mb-20'>Sekarang Waktunya Belajar dan Berlatih Fungsi Similaritas</h2>
              <p className='text-md font-poppins'>Pengguna bisa memilih untuk memulai pembelajaran sistem rekomendasi
                  dengan 2 pilihan yaitu Tutorial Fungsi Similaritas dan Pracitce Fungsi Similaritas nya.</p>
              <div className='grid grid-cols-1 my-20 md:grid-cols-2 gap-8'>
                  <div
                      className='bg-card_blue_primary border-4 border-black shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4'>
                      <div className="flex-shrink-0">
                          <img src={ImageAs} alt="Descriptive Alt Text" className="w-32 h-32 object-cover rounded-lg"/>
                      </div>
                      <div className="flex-1 text-start">
                          <h3 className="text-xl text-white font-bold font-poppins mb-2">Tutorial Fungsi Similaritas</h3>
                          <p className="mb-6 text-white text-justify text-medium font-poppins">Untuk belajar dan
                              mengenali cara perhitungan Fungsi Similaritas untuk yang baru ingin belajar terkait sistem
                              rekomendasi.</p>
                          <a href="/TutorialView/Tutorial"
                             className="font-sm font-poppins bg-greenDrak-btn-primary border-2 border-black text-white px-3 py-2 rounded-full hover:bg-blue-700 shadow-md">
                              Tutorial Now
                              <ArrowForwardIcon className="ml-2 text-lg"/>
                          </a>
                      </div>
                  </div>
                  <div
                      className="bg-card_green_primary border-4 border-black shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4">
                      <div className="flex-shrink-0">
                          <img src={ImageAs} alt="Descriptive Alt Text" className="w-32 h-32 object-cover rounded-lg"/>
                      </div>
                      <div className="flex-1 text-start">
                          <h3 className="text-xl text-white font-bold font-poppins mb-2">Practice Fungsi Similaritas</h3>
                          <p className="mb-6 text-white text-justify text-medium font-poppins">Untuk explorasi dan ingin
                              melakukan experiment tentang perhitungan Fungsi Similaritas untuk pemahaman yang lebih
                              lanjut </p>
                          <a href="/PracticeView/Pracitce"
                             className="font-sm font-poppins bg-purple-btn-primary border-2 border-black text-white px-3 py-2 rounded-full hover:bg-blue-700 shadow-md">
                              Practice Now
                              <ArrowForwardIcon className="ml-2 text-lg"/>
                          </a>
                      </div>
                  </div>
              </div>
          </section>

          {/* About Section */}
          <section className='max-w-4xl mx-auto text-center py-5 px-4'>
              <h1 className='text-5xl font-bold font-poppins py-10'>Tentang Aplikasi Website Media Pembelajaran</h1>
              <p className='font-sm font-poppins'>Media Pembelajaran berbasis website untuk User-Based dan Item-Based
                  pada Sistem Rekomendasi untuk mempermudah pembelajaran dengan cara yang lebih interaktif dan menarik
                  karena memiliki tahapan atau langkah-langkah yang jelas dan memiliki visualisasi yang mempermudah
                  pengguna
              </p>
          </section>

          {/* Fungsi Similaritas s Section */}
          <section className='max-w-4xl mx-auto text-center py-5 px-4'>
              <h1 className='text-5xl font-bold font-poppins py-10'>Fungsi Similaritas Yang Diterapkan Pada Website Media Pembelajaran</h1>
              <p className='font-sm font-poppins my-10'>Ini adalah kumpulan dari pengembangan aplikasi pembelajaran
                  berbasis website dengan menghitung Fungsi Similiaritas untuk user-based dan item-based</p>
              <div className='space-y-4'>
                  {[
                      {
                          title: 'Pearson Coefficient Correlation (PCC)',
                          description: 'Pengukuran ini diusulkan oleh Karl Pearson (Pearson, 1895) untuk mengukur hubungan linear dan digunakan secara luas dalam bidang statistik. Rumus PCC menghasilkan nilai antara 1 dan 1, di mana: 1 menunjukkan korelasi positif yang kuat, 1 menunjukkan korelasi negatif yang kuat, dan 0 menunjukkan tidak ada korelasi sama sekali (Resnick et al. 1994).'
                      },
                      {
                          title: 'Vector Similarity (Cosine)',
                          description: 'Teknik ini (Breese et al., 1998) menyajikan pengguna sebagai vektor peringkat yang dinilai oleh dirinya sendiri dan item sebagai vektor peringkat yang dinilai oleh sekumpulan pengguna (Cacheda et al., xxxx). Kosinus antara dua vektor yang mewakili dua pengguna (atau item) menunjukkan nilai kesamaan antara satu sama lain. Nilai yang mendekati 1 menunjukkan adanya korelasi yang kuat antara kedua variabel. Nilai yang mendekati 0 menunjukkan tidak adanya korelasi (variabel independen).'
                      },
                      {
                          title: 'Adjusted Vector Cosine',
                          description: 'Merupakan modifikasi dari cosine similarity yang mengurangi pengaruh bias dalam data, seperti ketika beberapa pengguna hanya memberikan rating untuk beberapa item. Ini memperhitungkan rata-rata rating pengguna untuk memberikan perbandingan yang lebih adil.'
                      },
                      {
                          title: 'Bhattacharyya Coefficient Similarity (BC)',
                          description: 'Jarak Bhattacharyya adalah ukuran statistik yang mengukur kesamaan antara dua distribusi probabilitas. Ukuran ini dinamai menurut Anil Kumar Bhattacharyya, seorang ahli statistik India-Amerika. Jarak ini didefinisikan untuk distribusi probabilitas kontinu dan didasarkan pada koefisien Bhattacharyya.'
                      },
                      {
                          title: 'Kullback-Leibler Distance (KL)',
                          description: 'Metrik divergensi Kullback-Leibler (entropi relatif) adalah pengukuran statistik dari teori informasi yang umumnya digunakan untuk mengukur perbedaan antara satu distribusi probabilitas dari distribusi probabilitas referensi.'
                      }
                  ].map((item, index) => (
                      <AccordionMeasure key={index} headingMeasure={item.title} descriptionMeasure={item.description}/>
                  ))}
              </div>
          </section>

          {/* Team Section */}
          <section className='max-w-5xl mx-auto text-center py-5'>
              <h1 className='text-5xl font-bold font-poppins py-10 '>Anggota Yang Terlibat</h1>
              <p className='font-sm font-poppins'>Tim pengembang media pembelajaran sistem rekomendasi dengan metode
                  Fungsi Similaritas  terdiri dari mahasiswa yang memiliki minat di bidang sistem rekomedasi.
                  Masing-masing anggota memiliki keahlian unik yang mendukung pengembangan platform, mulai dari analisis
                  data, pengembangan perangkat lunak, hingga desain antarmuka pengguna.</p>

              <div className='grid grid-cols-1 my-20 md:grid-cols-3 gap-8'>
                  <div
                      className='bg-card_blue_primary border-4 border-black  shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4'>
                      <div className="flex-1 text-end">
                          <div className=" flex-shrink-0 items-center flex justify-center">
                              <img src={ImageAs} alt="Descriptive Alt Text"
                                   className="w-32 h-32 object-cover rounded-lg "/>
                          </div>
                          <h3 className="text-xl text-white text-center font-bold font-poppins mb-2">Dr. Noor Ifada,
                              S.T., MISD.</h3>
                          {/*<p className="mb-4 text-center text-white font-poppins font-sm">Dosen Pembimbing MBKM RISET 2024</p>*/}
                      </div>
                  </div>

                  <div
                      className="bg-card_green_primary border-4 border-black  shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4">
                      <div className="flex-1 text-end">
                          <div className="flex-shrink-0 items-center flex justify-center">
                              <img src={ImageAs} alt="Descriptive Alt Text"
                                   className="w-32 h-32 object-cover rounded-lg"/>
                          </div>
                          <h3 className="text-xl text-white text-center font-bold font-poppins mb-2">ALFI NUR
                              DANIALIN</h3>
                          {/*<p className="mb-4 text-center text-white font-poppins font-sm">Mahasiswa </p>*/}
                      </div>
                  </div>
                  <div
                      className="bg-card_pink_primary border-4 border-black  shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4">
                      <div className="flex-1 text-end">
                          <div className="flex-shrink-0 items-center flex justify-center">
                              <img src={ImageAs} alt="Descriptive Alt Text"
                                   className="w-32 h-32 object-cover rounded-lg"/>
                          </div>
                          <h3 className="text-xl text-white text-center font-bold font-poppins mb-2">DIMAS DLIAYUR
                              RAHMAN</h3>
                          {/*<p className="mb-4 text-center text-white font-poppins font-sm">Access a variety of resources*/}
                          {/*    and tutorials to enhance your skills.</p>*/}
                      </div>
                  </div>
              </div>


          </section>

          {/* Reference Section */}
          <section className='max-w-4xl mx-auto text-center py-5 px-4'>
              <h1 className='text-5xl font-bold font-poppins py-10'>Reference</h1>
              <p className='font-sm font-poppins text-justify'>
                  <li>
                      Ifada, N., Rachman, F. H., Wahyuni, S. (2023). Character-based String Matching Similarity
                      Algorithms for Madurese Spelling Correction: A Preliminary Study. In International Conference on
                      Electrical Engineering and Informatics (ICEEI) (pp. 1-6). IEEE. DOI:
                      10.1109/ICEEI59426.2023.10346716
                  </li>
                  <li>
                      Ifada, N., Rachman, F. H., Wahyuni, S. (2023). Character-based String Matching Similarity
                      Algorithms for Madurese Spelling Correction: A Preliminary Study. In International Conference on
                      Electrical Engineering and Informatics (ICEEI) (pp. 1-6). IEEE. DOI:
                      10.1109/ICEEI59426.2023.10346716
                  </li>

              </p>
          </section>
      </div>

  );
}


export default Home;
