import React from 'react';
import { Link } from 'react-router-dom';

function NavbarMenu() {
  return (
      <div className="flex flex-col items-center justify-start">
        <div className="absolute top-0 left-0 right-0 flex justify-center space-x-4 p-4">
          <a href='/'
             className=" w-60 font-semibold font-poppins bg-greenDrak-btn-primary border-2 border-black text-center text-black px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
            Homepage
          </a>
          <a href='/TutorialView/tutorial'
             className="  w-60 font-semibold font-poppins bg-card_green_primary border-2 border-black text-center text-black px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
            Tutorial
          </a>
          <a href='/PracticeView/pracitce'
             className=" w-60 font-semibold font-poppins bg-blueCloud-btn-primary border-2 border-black text-center text-black px-6 py-3 rounded-full hover:bg-blue-700 shadow-md">
            Practice
          </a>
        </div>
      </div>
  );
}

export default NavbarMenu;
