import React, { use } from "react";
import '../../App.css';
import product from '../../assets/images/product.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import product1 from '../../assets/images/product1.png';
import product2 from '../../assets/images/product2.png';
import product3 from '../../assets/images/product3.png';
import product4 from '../../assets/images/product4.png';
import Button from "../common/Button";
import AddToCartSideMenu from "../header-footer.jsx/AddToCartSideMenu";
import { addToCart } from "../../store/nextSlice";
import { useDispatch } from "react-redux";
const NewArrivals = () => {
  const {id} = useParams();
  const navigate = useNavigate();
const dispatch = useDispatch()

  const [showCartSideMenu,setShowCartSideMenu] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
     const toggleCartSideMenu = () => {
      setShowCartSideMenu(!showCartSideMenu);
      if (isMenuOpen) setIsMenuOpen(false);
    };

  const  data  = [
    {
      id:1,
      product:product1,
      title:'Jimmy choo',
      price:'3,990'
    },
    {
      id:2,
      product:product2,
      title:'Jimmy choo',
      price:'3,990'
    },
    {
      id:3,
      product:product3,
      title:'Jimmy choo',
      price:'3,990'
    },
    {
      id:4,
      product:product4,
      title:'Jimmy choo',
      price:'3,990'
    },
  ]
  return (
    <div className="bg-white text-white p-4 md:p-10 font-sans">
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold font-[roboto]  text-black px-4  tracking-wider">
           New Arrivals
        </div>
      </div>
      <div className="   grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 gap-4 md:gap-7">
        {data?.map((item, index) => (
          <div 
            key={index} 
             className="relative"
            // onClick={() => navigate(`/product/${index + 1}`)}
          >
              
            <div className="bg-black   rounded-lg border border-black shadow-lg shadow-gold-100">
               
                <img
                 onClick={() => navigate(`/product/${item?.id}`)}
                  src={item?.product}
                  alt="product"
                  className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
                />

               {/* <div className="absolute top-4 right-8 w-14 h-14 rounded-full border-4 border-lightGray  bg-black flex justify-center items-center">
                  <span className={`text-white text-lg md:text-4xl font-bold ${index === 1 ? 'text-red-500' : 'text-white'}`}>
                    ♥
                  </span>
                </div> */}
              </div>
             
            <div className="  sm:pt-7 pt-4 text-center sm:px-8 px-2 rounded-b-xl">
              <h3 className=" font-semibold  uppercase  text-black font-[inter] mb-1">
                {item?.title}
              </h3>
              <div className="">
               
              </div>
              <p className="text-black  font-semibold font-[inter] text-base md:text-lg lg:text-xl mb-4">
                Rs.{item?.price}
              </p>
              <Button  onClick={() => {
                                            dispatch(
                                              addToCart({
                                                _id: item?.id,
                                                image:item?.product,
                                                quantity:1,
                                                title: item?.title,
                                                price: item.price,
                                                cutPrice:item.price
                                              })
                                            );
              
                                            toggleCartSideMenu();
                                          }} label={'Add To Bag'} className=" border whitespace-nowrap border-black mx-auto  w-full  font-semibold text-black rounded-md" />
            </div>
          </div>
        ))}
      </div>
                  {showCartSideMenu ? <AddToCartSideMenu onClose={()=>setShowCartSideMenu(false)}  />:null} 

    </div>
  );
};

export default NewArrivals;