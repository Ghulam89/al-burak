import React from 'react';
import Main from '../components/sections/main';
import Navbar from '../components/header-footer.jsx/Navbar';
import Footer from '../components/header-footer.jsx/Footer';
import Hero from '../components/sections/arrivalhero';

const NewArrivals = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <Main />
    <Footer />
    </>
  );
};

export default NewArrivals;