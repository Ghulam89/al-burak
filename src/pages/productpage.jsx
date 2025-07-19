import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../components/header-footer.jsx/Navbar';
import Footer from '../components/header-footer.jsx/Footer';
import Productpage from '../components/sections/productpage';
import Review from '../components/sections/reviewcard';
import Rating from '../components/sections/rating';
import BestSelling from '../components/home/bestselling';
import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";
import ReviewModal from "../components/context/ReviewModal";

const ProductPage = () => {

  const { id } = useParams();
  const [singleProduct,setSingleProduct] = useState({})
    


  const fetchSingleProduct  =  async()=>{
    const response  = axios.get(`${BaseUrl}/v1/product/${id}`) 
    setSingleProduct(response?.data?.data)
  }

  useEffect(()=>{
   fetchSingleProduct()
  },[])
  return (
    <>
    <Navbar />
    <Productpage singleProduct={singleProduct} />
    <Rating />
      <ReviewModal/>
    <Review />
    <BestSelling />
    <Footer />
    </>
  );
};

export default ProductPage;
