import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Productpage from '../components/sections/productpage';
import Review from '../components/sections/reviewcard';
import BestSelling from '../components/home/bestselling';
import Navbar from "../components/Navbar";
import Footer from "../components/header-footer.jsx/Footer";
import SubscribeBanner from "../components/home/subscribe";

const ProductPage = () => {

  const { id } = useParams();
  const [singleProduct,setSingleProduct] = useState({})
    


  // const fetchSingleProduct  =  async()=>{
  //   const response  = axios.get(`${BaseUrl}/v1/product/${id}`) 
  //   setSingleProduct(response?.data?.data)
  // }

  useEffect(()=>{
  //  fetchSingleProduct()
  },[])
  return (
    <>
    <Navbar/>
    <Productpage singleProduct={singleProduct} />
    {/* <ReviewModal/> */}
    <Review />
    <BestSelling />
    <SubscribeBanner/>
    <Footer/>
    </>
  );
};

export default ProductPage;
