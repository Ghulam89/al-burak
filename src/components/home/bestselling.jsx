import React, { use, useEffect, useState } from "react";
import '../../App.css';
import product from '../../assets/images/product.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import product1 from '../../assets/images/product1.png';
import product2 from '../../assets/images/product2.png';
import product3 from '../../assets/images/product3.png';
import product4 from '../../assets/images/product4.png';
import Button from "../common/Button";
import { addToCart } from "../../store/nextSlice";
import { useDispatch } from "react-redux";
import AddToCartSideMenu from "../header-footer.jsx/AddToCartSideMenu";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
const BestSelling = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  [data,setData]  = useState([
  
  ])
    
  const [showCartSideMenu,setShowCartSideMenu] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
   const toggleCartSideMenu = () => {
    setShowCartSideMenu(!showCartSideMenu);
    if (isMenuOpen) setIsMenuOpen(false);
  };


  const fetchProducts = async() =>{
   const response  = await axios.get(`${BaseUrl}/v1/product/featured`)
setData(response?.data?.data)
  }

  useEffect(()=>{
fetchProducts()
  },[])
  return (
    <>
     <div className="bg-white text-white p-4 md:p-10 font-sans">
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold font-[roboto]  text-black px-4  tracking-wider">
          New Arrivals
        </div>
      </div>
      <div className="   grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-4 md:gap-7">
        {data?.newArrivals?.map((item, index) => (
          <div 
            key={index} 
             className="relative"
           
          >
              
            <div className="bg-black   rounded-lg border border-black shadow-lg shadow-gold-100">
               
                <img
                  src={item?.images?.[0]}
                   onClick={() => navigate(`/product/${item?._id}`)}
                  alt="product"
                  className="w-full  h-[200px] sm:h-[300px] md:h-[400px] object-cover"
                />

               {/* <div className="absolute top-4 right-8 w-14 h-14 rounded-full border-4 border-lightGray  bg-black flex justify-center items-center">
                  <span className={`text-white text-lg md:text-4xl font-bold ${index === 1 ? 'text-red-500' : 'text-white'}`}>
                    ♥
                  </span>
                </div> */}
              </div>
             
            <div className="  sm:pt-7 pt-4 text-center sm:px-8 px-0 rounded-b-xl">
              <h3 className=" font-semibold  uppercase  text-black font-[inter] mb-1">
                {item?.name}
              </h3>
              <div className="">
               
              </div>
              <p className="text-black  font-semibold font-[inter] text-base md:text-lg lg:text-xl mb-4">
                Rs.{item?.sizes?.[0]?.price}
              </p>
              <Button type="button"  onClick={() => {
                              dispatch(
  addToCart({
    _id: item?._id,
    image: item?.images?.[0],
    quantity: 1,
    title: item?.name,
    sizeId: item?.sizes?.[0]?._id,
    price: item?.sizes?.[0]?.price,
    cutPrice: item?.sizes?.[0]?.discount > 0 
      ? item?.sizes?.[0]?.price * (1 - item?.sizes?.[0]?.discount / 100)
      : item?.sizes?.[0]?.price,
    ml: item?.sizes?.[0]?.ml,
    sku: item?.sizes?.[0]?.sku,
    stock: item?.sizes?.[0]?.stock
  })
);

                              toggleCartSideMenu();
                            }}
                             label={'Add To Bag'} className=" border border-black mx-auto whitespace-nowrap  w-full  font-semibold text-black rounded-md" />
            </div>
          </div>
        ))}
      </div>

       

    </div>
<div className="bg-white text-white p-4 md:p-10 font-sans">
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold font-[roboto]  text-black px-4  tracking-wider">
          Best Selling
        </div>
      </div>
      <div className="   grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-4 md:gap-7">
        {data?.bestSelling?.map((item, index) => (
          <div 
            key={index} 
             className="relative"
           
          >
              
            <div className="bg-black   rounded-lg border border-black shadow-lg shadow-gold-100">
               
                <img
                  src={item?.images?.[0]}
                   onClick={() => navigate(`/product/${item?._id}`)}
                  alt="product"
                  className="w-full  h-[200px] sm:h-[300px] md:h-[400px] object-cover"
                />

               {/* <div className="absolute top-4 right-8 w-14 h-14 rounded-full border-4 border-lightGray  bg-black flex justify-center items-center">
                  <span className={`text-white text-lg md:text-4xl font-bold ${index === 1 ? 'text-red-500' : 'text-white'}`}>
                    ♥
                  </span>
                </div> */}
              </div>
             
            <div className="  sm:pt-7 pt-4 text-center sm:px-8 px-0 rounded-b-xl">
              <h3 className=" font-semibold  uppercase  text-black font-[inter] mb-1">
                {item?.name}
              </h3>
              <div className="">
               
              </div>
              <p className="text-black  font-semibold font-[inter] text-base md:text-lg lg:text-xl mb-4">
                Rs.{item?.sizes?.[0]?.price}
              </p>
              <Button type="button"  onClick={() => {
                              dispatch(
  addToCart({
    _id: item?._id,
    image: item?.images?.[0],
    quantity: 1,
    title: item?.name,
    sizeId: item?.sizes?.[0]?._id,
    price: item?.sizes?.[0]?.price,
    cutPrice: item?.sizes?.[0]?.discount > 0 
      ? item?.sizes?.[0]?.price * (1 - item?.sizes?.[0]?.discount / 100)
      : item?.sizes?.[0]?.price,
    ml: item?.sizes?.[0]?.ml,
    sku: item?.sizes?.[0]?.sku,
    stock: item?.sizes?.[0]?.stock
  })
);

                              toggleCartSideMenu();
                            }}
                             label={'Add To Bag'} className=" border border-black mx-auto whitespace-nowrap  w-full  font-semibold text-black rounded-md" />
            </div>
          </div>
        ))}
      </div>

       

    </div>

    <div className="bg-white text-white p-4 md:p-10 font-sans">
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold font-[roboto]  text-black px-4  tracking-wider">
         Men Perfumes
        </div>
      </div>
      <div className="   grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-4 md:gap-7">
        {data?.mensProducts?.map((item, index) => (
          <div 
            key={index} 
             className="relative"
           
          >
              
            <div className="bg-black   rounded-lg border border-black shadow-lg shadow-gold-100">
               
                <img
                  src={item?.images?.[0]}
                   onClick={() => navigate(`/product/${item?._id}`)}
                  alt="product"
                  className="w-full  h-[200px] sm:h-[300px] md:h-[400px] object-cover"
                />

               {/* <div className="absolute top-4 right-8 w-14 h-14 rounded-full border-4 border-lightGray  bg-black flex justify-center items-center">
                  <span className={`text-white text-lg md:text-4xl font-bold ${index === 1 ? 'text-red-500' : 'text-white'}`}>
                    ♥
                  </span>
                </div> */}
              </div>
             
            <div className="  sm:pt-7 pt-4 text-center sm:px-8 px-0 rounded-b-xl">
              <h3 className=" font-semibold  uppercase  text-black font-[inter] mb-1">
                {item?.name}
              </h3>
              <div className="">
               
              </div>
              <p className="text-black  font-semibold font-[inter] text-base md:text-lg lg:text-xl mb-4">
                Rs.{item?.sizes?.[0]?.price}
              </p>
              <Button type="button"  onClick={() => {
                             dispatch(
  addToCart({
    _id: item?._id,
    image: item?.images?.[0],
    quantity: 1,
    title: item?.name,
    sizeId: item?.sizes?.[0]?._id,
    price: item?.sizes?.[0]?.price,
    cutPrice: item?.sizes?.[0]?.discount > 0 
      ? item?.sizes?.[0]?.price * (1 - item?.sizes?.[0]?.discount / 100)
      : item?.sizes?.[0]?.price,
    ml: item?.sizes?.[0]?.ml,
    sku: item?.sizes?.[0]?.sku,
    stock: item?.sizes?.[0]?.stock
  })
);

                              toggleCartSideMenu();
                            }}
                             label={'Add To Bag'} className=" border border-black mx-auto whitespace-nowrap  w-full  font-semibold text-black rounded-md" />
            </div>
          </div>
        ))}
      </div>

       

    </div>


     <div className="bg-white text-white p-4 md:p-10 font-sans">
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold font-[roboto]  text-black px-4  tracking-wider">
         Women Perfumes
        </div>
      </div>
      <div className="   grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-4 md:gap-7">
        {data?.womensProducts?.map((item, index) => (
          <div 
            key={index} 
             className="relative"
           
          >
              
            <div className="bg-black   rounded-lg border border-black shadow-lg shadow-gold-100">
               
                <img
                  src={item?.images?.[0]}
                   onClick={() => navigate(`/product/${item?._id}`)}
                  alt="product"
                  className="w-full  h-[200px] sm:h-[300px] md:h-[400px] object-cover"
                />

               {/* <div className="absolute top-4 right-8 w-14 h-14 rounded-full border-4 border-lightGray  bg-black flex justify-center items-center">
                  <span className={`text-white text-lg md:text-4xl font-bold ${index === 1 ? 'text-red-500' : 'text-white'}`}>
                    ♥
                  </span>
                </div> */}
              </div>
             
            <div className="  sm:pt-7 pt-4 text-center sm:px-8 px-0 rounded-b-xl">
              <h3 className=" font-semibold  uppercase  text-black font-[inter] mb-1">
                {item?.name}
              </h3>
              <div className="">
               
              </div>
              <p className="text-black  font-semibold font-[inter] text-base md:text-lg lg:text-xl mb-4">
                Rs.{item?.sizes?.[0]?.price}
              </p>
              <Button type="button"  onClick={() => {
                            dispatch(
  addToCart({
    _id: item?._id,
    image: item?.images?.[0],
    quantity: 1,
    title: item?.name,
    sizeId: item?.sizes?.[0]?._id,
    price: item?.sizes?.[0]?.price,
    cutPrice: item?.sizes?.[0]?.discount > 0 
      ? item?.sizes?.[0]?.price * (1 - item?.sizes?.[0]?.discount / 100)
      : item?.sizes?.[0]?.price,
    ml: item?.sizes?.[0]?.ml,
    sku: item?.sizes?.[0]?.sku,
    stock: item?.sizes?.[0]?.stock
  })
);
                              toggleCartSideMenu();
                            }}
                             label={'Add To Bag'} className=" border border-black mx-auto whitespace-nowrap  w-full  font-semibold text-black rounded-md" />
            </div>
          </div>
        ))}
      </div>

       

    </div>

    <div className="bg-white text-white p-4 md:p-10 font-sans">
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold font-[roboto]  text-black px-4  tracking-wider">
         Attar/Oud
        </div>
      </div>
      <div className="   grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-4 md:gap-7">
        {data?.attarProducts?.map((item, index) => (
          <div 
            key={index} 
             className="relative"
           
          >
              
            <div className="bg-black   rounded-lg border border-black shadow-lg shadow-gold-100">
               
                <img
                  src={item?.images?.[0]}
                   onClick={() => navigate(`/product/${item?._id}`)}
                  alt="product"
                  className="w-full  h-[200px] sm:h-[300px] md:h-[400px] object-cover"
                />

               {/* <div className="absolute top-4 right-8 w-14 h-14 rounded-full border-4 border-lightGray  bg-black flex justify-center items-center">
                  <span className={`text-white text-lg md:text-4xl font-bold ${index === 1 ? 'text-red-500' : 'text-white'}`}>
                    ♥
                  </span>
                </div> */}
              </div>
             
            <div className="  sm:pt-7 pt-4 text-center sm:px-8 px-0 rounded-b-xl">
              <h3 className=" font-semibold  uppercase  text-black font-[inter] mb-1">
                {item?.name}
              </h3>
              <div className="">
               
              </div>
              <p className="text-black  font-semibold font-[inter] text-base md:text-lg lg:text-xl mb-4">
                Rs.{item?.sizes?.[0]?.price}
              </p>
              <Button type="button"  onClick={() => {
                              dispatch(
  addToCart({
    _id: item?._id,
    image: item?.images?.[0],
    quantity: 1,
    title: item?.name,
    sizeId: item?.sizes?.[0]?._id,
    price: item?.sizes?.[0]?.price,
    cutPrice: item?.sizes?.[0]?.discount > 0 
      ? item?.sizes?.[0]?.price * (1 - item?.sizes?.[0]?.discount / 100)
      : item?.sizes?.[0]?.price,
    ml: item?.sizes?.[0]?.ml,
    sku: item?.sizes?.[0]?.sku,
    stock: item?.sizes?.[0]?.stock
  })
);

                              toggleCartSideMenu();
                            }}
                             label={'Add To Bag'} className=" border border-black mx-auto whitespace-nowrap  w-full  font-semibold text-black rounded-md" />
            </div>
          </div>
        ))}
      </div>

       

    </div>
      {/* Cart Side Menu */}
            {showCartSideMenu ? <AddToCartSideMenu onClose={()=>setShowCartSideMenu(false)}  />:null} 
               
        
    </>
   
  );
};

export default BestSelling;