import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Favourites from "./Favourites";
import Navbar from "./common/Navbar";
import { HipolabsProvider } from "./contexts/HipolabsContext";

function App() {
  return (
    <HipolabsProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </Router>
    </HipolabsProvider>
  );
}

export default App;
