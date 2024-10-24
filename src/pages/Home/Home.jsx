import React from 'react';
import ImageAs from '../../assets/images/lear.png';
import { AccordionMeasure } from "../../components/AccordionMeasure";
import LayoutHome from '../Layout/Home/LayoutHome.jsx';
import CardHome from '../../components/Card/Home/CardHome.jsx';
import CardAnggotaHome from '../../components/Card/Home/CardAnggotaHome.jsx';
import HeaderHome from '../Layout/Home/HeaderHome.jsx';
import BodyHome from '../Layout/Home/BodyHome.jsx';



const Home = () => {
    const listOfSimilarity = [
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
        }
    ]

    return (
        <LayoutHome>

            <HeaderHome>Media Pembelajaran Interaktif Sistem Rekomendasi Perhitungan Fungsi Similarity </HeaderHome>

            <BodyHome
                idName={"belajar"}
                header={"Pilih Tutorial atau Practice Untuk Perhitungan Fungsi Similaritas"}
                subheader={"Pengguna bisa memilih untuk memulai pembelajaran sistem rekomendasi dengan 2 pilihan yaitu Tutorial Fungsi Similaritas dan Practice Fungsi Similaritas nya."}
                hirarki={'2'}
                type="grid"
            >
                <CardHome
                    Image={ImageAs}
                    bgColor={"bg-card_blue_primary"}
                    Heading={"Tutorial Fungsi Similaritas"}
                    buttonName={"Tutorial Now"}
                    anchor={"/Tutorial"}
                > Untuk belajar dan
                    mengenali cara perhitungan Fungsi Similaritas untuk yang baru ingin belajar terkait sistem
                    rekomendasi.</CardHome>

                <CardHome
                    Image={ImageAs}
                    bgColor={"bg-card_green_primary"}
                    Heading={"Practice Fungsi Similaritas"}
                    buttonName={"Practice Now"}
                    anchor={"/practice"}
                > Untuk eksplorasi dan ingin
                    melakukan experiment tentang perhitungan Fungsi Similaritas untuk pemahaman yang lebih
                    lanjut </CardHome>
            </BodyHome>

            {/* About Section */}

            <BodyHome
                header={"Tentang Aplikasi Website Media Pembelajaran"}
                type="casual"
                hirarki='2'
                subheader={"Media Pembelajaran berbasis website untuk User-Based dan Item-Based pada Sistem Rekomendasi untuk mempermudah pembelajaran dengan cara yang lebih interaktif dan menarik karena memiliki tahapan atau langkah-langkah yang jelas dan memiliki visualisasi yang mempermudah pengguna"}
            ></BodyHome>

            {/* Fungsi Similaritas s Section */}
            <BodyHome
                header={"Fungsi Similaritas Yang Diterapkan Pada Website Media Pembelajaran"}
                hirarki='1'
                type='space'
                subheader={"Ini adalah kumpulan dari pengembangan aplikasi pembelajaran berbasis website dengan menghitung Fungsi Similiaritas untuk user-based dan item-based"}
            >
                {listOfSimilarity.map((item, index) => (
                    <AccordionMeasure key={index} headingMeasure={item.title} descriptionMeasure={item.description} />
                ))}
            </BodyHome>

            {/* Team Section */}

            <BodyHome
                header={"Anggota Yang Terlibat"}
                subheader={"Tim pengembang media pembelajaran sistem rekomendasi dengan metode Fungsi Similaritas terdiri dari mahasiswa yang memiliki minat di bidang sistem rekomedasi. Masing-masing anggota memiliki keahlian unik yang mendukung pengembangan platform, mulai dari analisis data, pengembangan perangkat lunak, hingga desain antarmuka pengguna."}
                type='grid'
            >
                <CardAnggotaHome
                    Image={ImageAs}
                    Color={"bg-card_blue_primary"}
                    Nama={"Dr. Noor Ifada, S.T., MISD."}
                    Identitas={"NIDN : 0017037802 "}
                />

                <CardAnggotaHome
                    Image={ImageAs}
                    Color={"bg-card_green_primary"}
                    Nama={"Alfi Nur danialin"}
                    Identitas={"NIM : 210411100059"}
                />

                <CardAnggotaHome
                    Image={ImageAs}
                    Color={"bg-card_pink_primary"}
                    Nama={"Dimas Dliyaur Rahman"}
                    Identitas={"NIM : 210411100080"}
                />
            </BodyHome>

            {/* Reference Section */}
            <BodyHome
                header={"Reference"}
                subheader={""}
                type='casual'
            >
                <li>
                    Ifada, N., Rachman, F. H., Wahyuni, S. (2023). Character-based String Matching Similarity Algorithms for Madurese Spelling Correction: A Preliminary Study. In International Conference on Electrical Engineering and Informatics (ICEEI) (pp. 1-6). IEEE. DOI: 10.1109/ICEEI59426.2023.10346716
                </li>
                <li>
                    Ifada, ., Rachman, F. H., Wahyuni, S. (2023). Character-based String Matching Similarity Algorithms for Madurese Spelling Correction: A Preliminary Study. In International Conference on Electrical Engineering and Informatics (ICEEI) (pp. 1-6). IEEE. DOI: 10.1109/ICEEI59426.2023.10346716
                </li>
            </BodyHome>
        </LayoutHome>

    );
}

export default Home