import React from 'react';
import Main from '../components/sections/main';
import Navbar from '../components/header-footer.jsx/Navbar';
import Footer from '../components/header-footer.jsx/Footer';
import Attar from '../components/sections/attarhero';

const NewArrivals = () => {
  return (
    <>
    <Navbar />
    <Attar />
    <Main />
    <Footer />
    </>
  );
};

export default NewArrivals;