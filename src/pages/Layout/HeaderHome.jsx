
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ScrollButton = () => {
    // const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const scrollToSection = () => {
        const section = document.getElementById("belajar");
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='flex justify-center gap-4 mt-20 mb-8'>
            <Link
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
            </Link>
        </div>
    );
}

const HeaderHome = ({ children }) => {
    return (<section className='relative h-screen flex flex-col justify-center items-center'>
        <div className='max-w-7xl mx-auto text-center relative z-10 px-4'>
            <h1 className="text-7xl font-bold font-poppins">{children}</h1>
            <ScrollButton />
        </div>
    </section>)
}

export default HeaderHome