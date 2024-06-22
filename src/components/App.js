import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Favourites from './Favourites';
import Navbar from './Navbar';
import { HipLabsProvider } from './HiplabsContext';

function App() {
  return (
    <HipLabsProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </Router>
    </HipLabsProvider>
  );
}

export default App;
