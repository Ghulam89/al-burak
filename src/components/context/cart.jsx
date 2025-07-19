import React, { useEffect, useState } from 'react';
import '../../App.css';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, addToCart } from '../../store/nextSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state?.next?.productData || []);
  const userData = JSON.parse(localStorage.getItem("userId")) || null;

  // Calculate discounted price for each item
  const getDiscountedPrice = (item) => {
    if (!item.discount) return item.price;
    return item.price - item.price * (item.discount / 100);
  };

  // Subtotal calculation with discount
  const subtotal = productData.reduce(
    (sum, item) => sum + getDiscountedPrice(item) * item.quantity, 0
  );

  // Update quantity handler
  const handleQuantityChange = (item, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    dispatch(
      addToCart({
        ...item,
        quantity: quantity - item.quantity, // addToCart increases, so pass the difference
      })
    );
  };

  // Remove item handler
  const handleRemove = (_id) => {
    dispatch(deleteProduct(_id));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-[#191919] flex flex-col items-center py-10 px-5">
      <h1 className="text-lightGray text-4xl font-bold mb-10 text-center">Cart</h1>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 justify-center">
        {/* Product List Section */}
        <div className="bg-transparent p-8 md:w-7/12 w-full mb-5">
          <div className="grid grid-cols-4 gap-5 pb-5 mb-5 font-bold text-gold-500 border-b border-lightGray2">
            <div className='text-lightGray col-span-2'>Product</div>
            <div className='text-lightGray'>Quantity</div>
            <div className='text-lightGray'>Total</div>
          </div>
          {productData.length === 0 ? (
            <p className="text-center text-white mt-8">
              Your cart is empty.
            </p>
          ) : (
            productData.map(item => (
              <div key={item._id} className="grid grid-cols-4 gap-5 items-center py-4 text-gold-500">
                <div className="flex col-span-2 items-center gap-4">
                  <div className='relative w-[70px] h-[70px] mr-3 flex-shrink-0'>
                     <img 
                    src={item?.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-cover rounded-lg" 
                  />
                  </div>
                 
                  <div>
                    <div className="text-lg whitespace-nowrap text-lightGray font-bold">{item.title}</div>
                    <div className="text-lightGray">
                      Rs {getDiscountedPrice(item)}
                      {item.discount ? (
                        <span className="ml-2 text-xs line-through text-gray-400">Rs {item.price}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                    min="1"
                    className="w-12 h-12 rounded-lg text-center text-lg flex justify-center items-center border border-lightGray bg-transparent text-lightGray outline-none mb-1"
                  />
                  <button 
                    onClick={() => handleRemove(item._id)}
                    className="bg-transparent border-none mt-1 hover:border-b hover:border-white text-lightGray cursor-pointer text-xs no-underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="text-lightGray font-normal">
                  Rs {(item.quantity * getDiscountedPrice(item))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary/Checkout Section */}
        <div className="bg-lightGray rounded-3xl p-8 md:w-5/12 w-full text-black">
          <div className="flex justify-between mb-4 text-lg font-bold">
            <span>Subtotal</span>
            <span>Rs {subtotal}</span>
          </div>
          <div className="flex justify-between mb-4 text-2xl font-bold">
            <span>Total</span>
            <span>Rs {subtotal} PKR</span>
          </div>
          <p className="text-sm text-center mb-5">
            Taxes and shipping calculated at checkout
          </p>
          <textarea
            placeholder="Order note"
            className="w-full min-h-[150px] bg-transparent  placeholder:text-lightGray2 p-5 bg-gold-500 border border-black rounded-3xl text-sm font-inter text-black box-border resize-y outline-none mb-5"
          ></textarea>
          <Link to={'/checkout'}>
            <button 
              className="bg-black text-white py-4 px-6 border-none rounded-full text-base font-semibold cursor-pointer w-full flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors"
              disabled={productData.length === 0}
            >
              <FaLock /> Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;