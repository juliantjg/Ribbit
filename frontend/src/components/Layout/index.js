import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import LandingHomePage from '../LandingHomePage';
import LandingAboutPage from '../LandingAboutPage'
import LandingFunctionalitiesPage from '../LandingFunctionalitiesPage'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const index = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/mainLanding" element={<LandingHomePage />} />
        <Route path="/aboutLanding" element={<LandingAboutPage />} />
        <Route path="/functionalitiesLanding" element={<LandingFunctionalitiesPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default index;