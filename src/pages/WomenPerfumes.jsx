import React from 'react';
import Main from '../components/sections/main';
import Navbar from '../components/header-footer.jsx/Navbar';
import Footer from '../components/header-footer.jsx/Footer';
import Women from '../components/sections/womenhero';

const NewArrivals = () => {
  return (
    <>
    <Navbar />
    <Women />
    <Main />
    <Footer />
    </>
  );
};

export default NewArrivals;