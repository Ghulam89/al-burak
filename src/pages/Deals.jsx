import React from 'react';
import Main from '../components/sections/main';
import Navbar from '../components/header-footer.jsx/Navbar';
import Footer from '../components/header-footer.jsx/Footer';
import Deals from '../components/sections/dealhero';

const NewArrivals = () => {
  return (
    <>
    <Navbar />
    <Deals />
    <Main />
    <Footer />
    </>
  );
};

export default NewArrivals;