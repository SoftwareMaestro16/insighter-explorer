import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main"; 
import Stats from "./components/Stats/Stats";
import AddressInfo from "./components/AddressInfo/AddressInfo";

function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:address" element={<AddressInfo />} />
      </Routes>
    </Router>
  );
}

export default RouterPage;