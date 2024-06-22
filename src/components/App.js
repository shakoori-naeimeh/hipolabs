import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Favourites from "./Favourites";
import Navbar from "./Navbar";
import { HiplabsProvider } from "./HiplabsContext";

function App() {
  return (
    <HiplabsProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </Router>
    </HiplabsProvider>
  );
}

export default App;
