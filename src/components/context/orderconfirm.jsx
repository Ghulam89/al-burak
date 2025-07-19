import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import logo from '../../assets/images/Al-burak-logo.png';
import map from '../../assets/images/map.jpg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewModal from './ReviewModal';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpenModal, setIsModalOpen] = useState(null);

  const closeModal  = ()=>{
    setIsModalOpen(false)

  }
    
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`https://api.alburaqscents.com/v1/order/detail/${id}`);
        setOrderData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleLogoClick = () => {
    console.log('Navigating to Home Page...');
    alert('Navigating to Home Page (dummy action)');
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate subtotal from items
  const calculateSubtotal = () => {
    if (!orderData?.items) return 0;
    return orderData.items.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);
  };

  // Calculate delivery fee (you might want to fetch this from API or set a fixed value)
  const deliveryFee = 200; // Example fixed value


  // --- RESPONSIVE STYLES (same as before) ---
  const responsiveStyles = `
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow-x: hidden;
    }

    /* Base styles (desktop first approach for some elements, mobile overrides later) */
    .order-confirmation-container {
        padding: 40px 0;
    }
    .header-style {
        width: 90%;
        max-width: 1200px;
    }
    .logo-style {
        width: 120px;
    }
    .thank-you-checkmark-icon {
        font-size: 60px;
    }
    .thank-you-text {
        font-size: 24px;
    }
    .status-tracker {
        gap: 80px;
        margin-bottom: 70px;
        max-width: 800px;
    }
    .status-icon-circle-base {
        width: 60px;
        height: 60px;
        font-size: 30px;
    }
    .status-label {
        font-size: 16px;
    }
    .main-content-layout-wrapper {
        flex-direction: row; /* Default desktop layout */
        width: 95%;
        max-width: 1100px;
        gap: 20px;
    }
    .left-column-wrapper {
        flex: 1 1 420px;
        gap: 15px;
    }
    .right-grey-box {
        flex: 1 1 650px;
    }
    .order-detail-container,
    .customer-details-section,
    .right-grey-box {
        padding: 18px;
        border-radius: 12px;
    }
    .detail-title, .customer-section-title {
        font-size: 18px;
    }
    .detail-row, .customer-info-item {
        font-size: 13px;
    }
    .total-detail-row {
        font-size: 15px;
    }


    /* Tablet adjustments (e.g., max-width 992px) */
    @media (max-width: 992px) {
        .order-confirmation-container {
            padding: 30px 0;
        }
        .main-content-layout-wrapper {
            max-width: 90%; /* Wider on tablets */
            gap: 25px; /* Adjust gap when stacked */
        }
        /* Status tracker elements remain largely same, might scale slightly */
        .status-tracker {
            gap: 40px;
            max-width: 90%;
        }
        .status-icon-circle-base {
            width: 50px;
            height: 50px;
            font-size: 26px;
        }
        .status-label {
            font-size: 14px;
        }
        .header-style {
            width: 90%;
        }
        .logo-style {
            width: 100px;
        }
    }

    /* Mobile adjustments (e.g., max-width 768px and below) - Focus on matching Capture.jpg */
    @media (max-width: 768px) {
        .order-confirmation-container {
            padding: 20px 0;
        }
        .thank-you-text {
            font-size: 20px;
        }
        .thank-you-checkmark-icon {
            font-size: 48px; /* Slightly smaller for mobile */
        }

        /* STATUS TRACKER: Single horizontal line, very compact */
        .status-tracker {
            flex-wrap: nowrap; /* PREVENT WRAPPING - KEEP HORIZONTAL */
            gap: 10px; /* VERY small gap for horizontal fit */
            margin-bottom: 50px;
            justify-content: space-between; /* Distribute items across available space */
            width: 90%; /* Allow it to take up more width on mobile */
            max-width: 300px; /* Constrain max width for compactness on phones */
            padding: 0 5px; /* Little padding to squeeze if needed */
            box-sizing: border-box;
        }
        .status-step {
            min-width: unset; /* Remove min-width */
            flex: 1; /* Allow steps to share space equally */
        }
        .status-icon-circle-base {
            width: 35px; /* Significantly smaller circles */
            height: 35px;
            font-size: 18px; /* Significantly smaller icons */
            margin-bottom: 5px; /* Reduced margin */
        }
        .status-label {
            font-size: 10px; /* Significantly smaller label text */
            line-height: 1.2; /* Adjust line height for small text */
        }

        /* MAIN CONTENT BOXES: Stacked, Grey box at bottom (matching Capture.jpg) */
        .main-content-layout-wrapper {
            flex-direction: column; /* Stack columns vertically */
            width: 90%; /* Take more width on mobile */
            max-width: 400px; /* Max width for phone-like dimensions */
            gap: 15px; /* Gap between stacked boxes */
        }
        .left-column-wrapper {
            order: 1; /* Order Detail + Customer Details at top */
            flex: 1 1 100%; /* Take full width when stacked */
            width: 100%;
        }
        .right-grey-box {
            order: 2; /* Grey box goes to the bottom */
            flex: 1 1 100%; /* Take full width when stacked */
            width: 100%;
             min-height: 250px;
        }
        .order-detail-container,
        .customer-details-section,
        .right-grey-box {
            padding: 15px; /* Reduce padding inside boxes */
            border-radius: 10px;
        }
        .detail-title, .customer-section-title {
            font-size: 16px;
            margin-bottom: 8px;
        }
        .detail-row, .customer-info-item {
            font-size: 12px;
            margin-bottom: 3px;
        }
        .total-detail-row {
            font-size: 14px;
            margin-top: 10px;
            padding-top: 6px;
        }
    }

    /* Very small mobile screens (e.g., max-width 480px) */
    @media (max-width: 480px) {
        .status-tracker {
            gap: 8px; /* Even smaller gap */
            max-width: 260px; /* Further constrain for very small screens */
        }
        .status-icon-circle-base {
            width: 30px; /* Even smaller circles */
            height: 30px;
            font-size: 16px; /* Even smaller icons */
        }
        .status-label {
            font-size: 9px; /* Even smaller label text */
        }
        .thank-you-checkmark-icon {
            font-size: 36px; /* Even smaller main checkmark */
        }
        .main-content-layout-wrapper {
            width: 95%; /* Utilize slightly more width on very small screens */
            gap: 10px;
        }
        .order-detail-container,
        .customer-details-section,
        .right-grey-box {
            padding: 12px; /* Even less padding */
        }
        .detail-title, .customer-section-title {
            font-size: 14px;
        }
        .detail-row, .customer-info-item {
            font-size: 11px;
        }
        .total-detail-row {
            font-size: 13px;
        }
    }
  `;

  // --- INLINE STYLES (same as before) ---
  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    color: '#E5D0A5',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0 20px',
    boxSizing: 'border-box',
  };

  const logoStyle = {
    cursor: 'pointer',
  };

  const thankYouMessageContainerStyle = {
    textAlign: 'center',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    color: '#E5D0A5',
  };

  const thankYouCheckmarkIconStyle = {
    color: '#E5D0A5',
  };

  const thankYouTextStyle = {
    fontWeight: 'bold',
    margin: 0,
  };

  const statusTrackerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const statusStepStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#E5D0A5',
    textAlign: 'center',
  };

  const statusIconCircleBaseStyle = {
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const statusIconCircleStyle = {
    ...statusIconCircleBaseStyle,
    backgroundColor: '#E5D0A5',
    border: 'none',
    color: 'black',
  };

  const statusLabelStyle = {
    color: '#E5D0A5',
    fontWeight: 'normal',
  };

  const mainContentLayoutWrapperStyle = {
    display: 'flex',
    alignItems: 'stretch',
    boxSizing: 'border-box',
    marginBottom: '40px',
  };

  const leftColumnWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  };

  const orderDetailContainerStyle = {
    backgroundColor: '#E5D0A5',
    boxSizing: 'border-box',
    color: 'black',
  };

  const customerDetailsSectionStyle = {
    boxSizing: 'border-box',
    color: '#E5D0A5',
    textAlign: 'left',
    padding: '0',
  };

  const rightGreyBoxStyle = {
    backgroundColor: '#D9D9D9',
    boxSizing: 'border-box',
    backgroundImage: `url(${map})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'black',
  };

  const detailTitleStyle = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 'bold',
    color: 'black',
  };

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'black',
    lineHeight: '1.4',
  };

  const detailLabelStyle = {
    fontWeight: 'normal',
    color: 'black',
  };

  const detailValueStyle = {
    color: 'black',
  };

  const totalDetailRowStyle = {
    ...detailRowStyle,
    fontWeight: 'bold',
    borderTop: '1px solid #C0B08E',
  };

  const customerSectionTitleStyle = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 'bold',
    color: '#E5D0A5',
  };

  const customerContactSectionStyle = {
    marginBottom: '8px',
  };

  const customerBillingSectionStyle = {
    marginBottom: '0',
  };

  const customerInfoItemStyle = {
    color: '#E5D0A5',
    lineHeight: '1.4',
  };

  return (
    <>
      <style>{responsiveStyles}</style>

      <div style={containerStyle} className="order-confirmation-container">
        {/* Header */}
        <div style={headerStyle} className="header-style">
          <img src={logo} alt="Al-Buraq Logo" style={logoStyle} className="logo-style" onClick={handleLogoClick} />
        </div>

        {/* Thank You Message */}
        <div style={thankYouMessageContainerStyle}>
          <FaCheckCircle style={thankYouCheckmarkIconStyle} className="thank-you-checkmark-icon" />
          <p style={thankYouTextStyle} className="thank-you-text">Thank you for the order</p>
        </div>

        {/* Status Tracker */}
        <div style={statusTrackerStyle} className="status-tracker">
          {/* Shopping cart */}
          <div style={statusStepStyle} className="status-step">
            <div style={statusIconCircleStyle} className="status-icon-circle-base"><FaShoppingCart /></div>
            <span style={statusLabelStyle} className="status-label">Shopping cart</span>
          </div>
          {/* Checkout */}
          <div style={statusStepStyle} className="status-step">
            <div style={statusIconCircleStyle} className="status-icon-circle-base"><FaCreditCard /></div>
            <span style={statusLabelStyle} className="status-label">Checkout</span>
          </div>
          {/* Order completed */}
          <div style={statusStepStyle} className="status-step">
            <div style={statusIconCircleStyle} className="status-icon-circle-base">
              <FaCheckCircle />
            </div>
            <span style={statusLabelStyle} className="status-label">Order completed</span>
          </div>
        </div>
<div className=' mb-5'>
           <button onClick={()=>setIsModalOpen(true)} className=' bg-primary py-2 px-8 text-black font-medium rounded-md'>Add Review</button>

</div>

        {/* Main Content Layout Wrapper */}
        <div style={mainContentLayoutWrapperStyle} className="main-content-layout-wrapper">
          {/* Left Column: Order Detail + Customer Details */}
          <div style={leftColumnWrapperStyle} className="left-column-wrapper">
            {/* Order Detail Box */}
            <div style={orderDetailContainerStyle} className="order-detail-container">
              <h3 style={detailTitleStyle} className="detail-title">Order detail</h3>
              <div style={detailRowStyle} className="detail-row">
                <span style={detailLabelStyle}>Order number</span>
                <span style={detailValueStyle}>{orderData?._id.substring(orderData?._id.length - 6)}</span>
              </div>
              <div style={detailRowStyle} className="detail-row">
                <span style={detailLabelStyle}>Date</span>
                <span style={detailValueStyle}>{formatDate(orderData?.createdAt)}</span>
              </div>
              <div style={detailRowStyle} className="detail-row">
                <span style={detailLabelStyle}>Payment method</span>
                <span style={detailValueStyle}>{orderData?.paymentMethod}</span>
              </div>

              <div style={{ marginTop: '30px' }}>
                <div style={detailRowStyle} className="detail-row">
                  <span style={detailLabelStyle}>Subtotal</span>
                  <span style={detailValueStyle}>Rs {calculateSubtotal().toLocaleString()}</span>
                </div>
                <div style={detailRowStyle} className="detail-row">
                  <span style={detailLabelStyle}>Delivery fee</span>
                  <span style={detailValueStyle}>Rs {deliveryFee.toLocaleString()}</span>
                </div>
                <div style={totalDetailRowStyle} className="total-detail-row">
                  <span style={detailLabelStyle}>Total</span>
                  <span style={detailValueStyle}>Rs {orderData?.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Details Section */}
            <div style={customerDetailsSectionStyle} className="customer-details-section">
              <h3 style={customerSectionTitleStyle} className="customer-section-title">Customer details</h3>

              <div style={customerContactSectionStyle}>
                <h4 style={customerSectionTitleStyle} className="customer-section-title">Contact</h4>
                <p style={customerInfoItemStyle} className="customer-info-item">Email: {orderData?.customerId?.email}</p>
                <p style={customerInfoItemStyle} className="customer-info-item">Phone: {orderData?.shippingAddress?.phoneNumber}</p>
              </div>

              <div style={customerBillingSectionStyle}>
                <h4 style={customerSectionTitleStyle} className="customer-section-title">Shipping address</h4>
                <p style={customerInfoItemStyle} className="customer-info-item">{orderData?.shippingAddress?.address}</p>
                <p style={customerInfoItemStyle} className="customer-info-item">{orderData?.shippingAddress?.town}, {orderData?.shippingAddress?.city}</p>
                <p style={customerInfoItemStyle} className="customer-info-item">{orderData?.shippingAddress?.state}, {orderData?.shippingAddress?.country}</p>
                <p style={customerInfoItemStyle} className="customer-info-item">Near: {orderData?.shippingAddress?.famousSpot}</p>
                <p style={customerInfoItemStyle} className="customer-info-item">Phone: {orderData?.shippingAddress?.phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Grey Placeholder Box */}
          <div style={rightGreyBoxStyle} className="right-grey-box">
            {/* Map is already set as background */}
          </div>
        </div>

        <ReviewModal fetchData={orderData} setIsModalOpen={setIsModalOpen} isModalOpen={isOpenModal} closeModal={closeModal}   /> 
      </div>
    </>
  );
};

export default OrderConfirmationPage;