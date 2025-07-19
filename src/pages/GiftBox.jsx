import React from 'react';
import Navbar from '../components/header-footer.jsx/Navbar';
import Footer from '../components/header-footer.jsx/Footer';
// import Orderpage from '../components/context/order';
// import Review from '../components/sections/reviewcard';
// import Rating from '../components/sections/rating';
import Orderconfirm from '../components/context/orderconfirm';
import Cart from '../components/context/cart';

const NewArrivals = () => {
  return (
    <>
    <Navbar />
    {/* <Orderpage /> */}
    {/* <Cart /> */}
    {/* <CheckoutPage /> */}
    <Orderconfirm />
    <Footer />
    </>
  );
};

export default NewArrivals;