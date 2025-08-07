import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaShoppingCart, FaCreditCard, FaSpinner, FaCheck } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewModal from './ReviewModal';
import map from '../../assets/images/map.png';
import { IoMdCheckmark } from 'react-icons/io';
import Button from '../common/Button';
import { BaseUrl } from '../../utils/BaseUrl';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userId")) || null
  );
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/v1/order/detail/${id}`);
        if (response.data.success) {
          setOrderData(response?.data?.data);
        } else {
          setError('Failed to fetch order details');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateSubtotal = () => {
    if (!orderData?.items) return 0;
    return orderData.items.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);
  };

  const deliveryFee = 200;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center box-border overflow-x-hidden text-primary px-4 sm:px-0">
      {/* Header */}
      <header className="flex justify-between w-full max-w-6xl  py-3.5 items-center">
        <h1 className="text-2xl sm:text-3xl m-0 text-black font-medium">Al-Buraq</h1>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl  py-6 sm:py-8">
        {/* Thank You Message */}
        <section className="text-center mb-8 sm:mb-12 flex flex-col items-center gap-4 text-black">
          <div className='border border-[#628948] bg-[#EDF9E3] flex justify-center items-center rounded-full w-12 h-12 sm:w-14 sm:h-14'>
            <IoMdCheckmark size={30} className='text-[#628948] sm:w-10' />
          </div>
          
          <h1 className="text-xl sm:text-2xl font-semibold">Thank you for your order</h1>
        </section>

        {/* Status Tracker - Responsive */}
        <section className="flex justify-center items-center relative mb-10 sm:mb-16 w-full">
          <div className="flex justify-between items-center w-full max-w-2xl">
            {['Shopping cart', 'Checkout', 'Order completed'].map((step, index) => {
              const isCompleted = 
                (index === 0) || 
                (index === 1) || 
                (index === 2 && orderData?.orderStatus === 'completed');

              return (
                <div key={step} className="flex flex-col items-center text-center flex-1 relative">
                  {index > 0 && (
                    <div 
                      className={`absolute h-0.5 w-1/2 top-5 sm:top-7 -left-1/2 z-0 ${
                        isCompleted ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    ></div>
                  )}
                  
                  <div 
                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex justify-center items-center border-2 relative z-10 ${
                      isCompleted 
                        ? 'bg-primary border-primary text-white' 
                        : 'border-black text-black'
                    }`}
                  >
                    {index === 0 ? <FaShoppingCart size={18} className="sm:w-6" /> : 
                     index === 1 ? <FaCreditCard size={18} className="sm:w-6" /> : 
                     <FaCheckCircle size={18} className="sm:w-6" />}
                  </div>
                  
                  <span 
                    className={`mt-2 text-xs sm:text-sm ${
                      isCompleted ? 'text-primary font-semibold' : 'text-black font-normal'
                    }`}
                  >
                    {step.split(' ').map((word, i) => (
                      <span key={i} className="block sm:inline">{word}</span>
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Review Button */}
        {orderData?.orderStatus === 'completed' && (
          <section className="mb-6 sm:mb-8 text-center">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 sm:px-8 rounded-md transition-colors text-sm sm:text-base"
              aria-label="Add review for your order"
            >
              Add Review
            </button>
          </section>
        )}

        {/* Order Details Layout */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Left Column */}
          <div className="flex-1 space-y-3">
            {/* Order Detail Card */}
            <div className="border border-black rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
              <h2 className="text-lg font-bold text-black mb-3 sm:mb-4">Order Detail</h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order number</span>
                  <span className="font-medium text-gray-600">
                    {orderData?._id.substring(orderData?._id?.length - 6).toUpperCase()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className='text-gray-600'>{formatDate(orderData?.createdAt)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment method</span>
                  <span className='text-gray-600'>{orderData?.paymentMethod}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Order Status</span>
                  <span className='text-gray-600 capitalize'>{orderData?.orderStatus}</span>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className='text-gray-600'>Rs {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery fee</span>
                    <span className='text-gray-600'>Rs {deliveryFee?.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold pt-2">
                    <span className='text-gray-600'>Total</span>
                    <span className='text-gray-600'>Rs {orderData?.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg font-bold text-black mb-3 sm:mb-4">Customer Details</h2>
              
              <div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-black">Contact Information</h3>
                <div className="space-y-1 text-sm">
                  <p className='text-gray-600'>Email: {orderData?.customerId?.email || 'N/A'}</p>
                  <p className='text-gray-600'>Phone: {orderData?.shippingAddress?.phoneNumber || 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-black mb-1 sm:mb-2">Shipping Address</h3>
                <div className="space-y-1 text-sm">
                  <p className='text-black'>{orderData?.shippingAddress?.address || 'N/A'}</p>
                  <p className='text-black'>
                    {orderData?.shippingAddress?.town || ''}, {orderData?.shippingAddress?.city || ''}
                  </p>
                  <p className='text-black'>
                    {orderData?.shippingAddress?.state || ''}, {orderData?.shippingAddress?.country || ''}
                  </p>
                  {orderData?.shippingAddress?.famousSpot && (
                    <p className='text-black'>Near: {orderData?.shippingAddress.famousSpot}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="w-full lg:w-6/12 rounded-lg overflow-hidden mt-6 lg:mt-0">
            <img 
              src={map} 
              alt="Delivery location map" 
              className="w-full h-auto"
            />
            <h2 className='text-black font-semibold pt-2 text-lg'>Your order is confirmed</h2>
            <p className='text-gray-600 font-semibold py-2 sm:py-3 text-sm sm:text-base'>
              COD is only applicable on local orders below 50,000 PKR
            </p>
            <p className='text-gray-600 font-semibold text-sm sm:text-base'>
              If you order amount does not fall in the range or the shipping country is other than Pakistan, 
              our team will contact you for payment via bank transfer.
            </p>

            <div className='mt-4 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 items-center sm:items-end'>
              {userData?.profileCompleted===true ? (
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button 
                    label={'My Orders'} 
                    className='w-full border border-gray-600 shadow-lg py-2 text-gray-600 font-medium text-sm sm:text-base' 
                  />
                </Link>
              ) : (
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button 
                    label={'Track your order'} 
                    className='w-full border border-gray-600 shadow-lg py-2 text-gray-600 font-medium text-sm sm:text-base' 
                  />
                </Link>
              )}
             
              <Link to="/" className="w-full sm:w-auto">
                <Button 
                  label={'Continue Shopping'} 
                  className='w-full border border-gray-600 shadow-lg py-2 bg-black text-white font-medium text-sm sm:text-base' 
                />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      <ReviewModal 
        isModalOpen={isOpenModal}
        onClose={() => setIsModalOpen(false)}
        fetchData={orderData}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default OrderConfirmationPage;