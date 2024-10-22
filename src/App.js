import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Tutorial from './pages/TutorialView/Tutorial';
import Practice from './pages/PracticeView/Practice';

function App() {
  return (
    <Router>
      <div className="bg-yellow-primary text-black-900 min-h-screen">

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/TutorialView/tutorial" element={<Tutorial />} />
            <Route path="/PracticeView/practice" element={<Practice />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
