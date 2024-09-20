import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tutorial from './pages/Tutorial';
import Pracitce from './pages/Pracitce';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="bg-yellow-primary text-black-900 min-h-screen">
        {/* <Navbar /> */}
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/pracitce" element={<Pracitce />} />
          </Routes>
        </div>
      </div>
  </Router>
  );
}

export default App;
