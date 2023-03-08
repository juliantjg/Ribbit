import React from 'react';
import LandingHomePage from '../../LandingHomePage';
import LandingAboutPage from '../../LandingAboutPage'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const index = () => {
  return (
    <main className="main">
      <LandingHomePage />
    </main>
  )
}

export default index;