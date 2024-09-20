import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/learning" className="hover:underline">Learning</Link>
        </li>
        <li>
          <Link to="/practice" className="hover:underline">Practice</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
