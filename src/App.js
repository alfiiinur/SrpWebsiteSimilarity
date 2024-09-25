import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomeView/Home';
import Tutorial from './pages/TutorialView/Tutorial';
import Pracitce from './pages/PracticeView/Pracitce';
import Test from "./pages/tetsaja";


function App() {
  return (
    <Router>
      <div className="bg-yellow-primary text-black-900 min-h-screen">

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/TutorialView/tutorial" element={<Tutorial />} />
            <Route path="/PracticeView/pracitce" element={<Pracitce />} />
            <Route path="/tetsaja" element={<Test />} />
          </Routes>
        </div>
      </div>
  </Router>
  );
}

export default App;
