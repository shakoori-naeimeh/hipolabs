import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Favourites from './components/Favourites';
import Navbar from './components/Navbar';
import { HipLabsProvider } from './components/reducers/hiplabsReducer';

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
