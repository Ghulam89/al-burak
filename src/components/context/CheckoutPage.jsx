import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../utils/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../store/nextSlice";

const CheckoutPage = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userId")) || null
  );
  const productData = useSelector((state) => state?.next?.productData || []);
  console.log(productData);
  
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [note, setNote] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(!userData);
  const [tempEmail, setTempEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

   // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponMessageType, setCouponMessageType] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    city: "",
    state: "",
    town: "",
    address: "",
    famousSpot: "",
    phoneNumber: "",
    email: userData?.email || "",
  });

  // Discounted price helper
  const getDiscountedPrice = (item) => {
    if (!item.discount) return item.cutPrice;
    return item.cutPrice - item.cutPrice * (item.discount / 100);
  };

  // Subtotal and total
  const subtotal = productData.reduce(
    (sum, item) => sum + getDiscountedPrice(item) * item.quantity, 0
  );
  const shipping = 0;
  const totalAmount = subtotal + shipping;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!tempEmail) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(tempEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setEmailError("");
    try {
      const response = await axios.post(`${BaseUrl}/v1/customer`, {
        email: tempEmail,
      });
      if (response.data.success) {
        const user = response.data.data;
        localStorage.setItem("userId", JSON.stringify(user));
        setUserData(user);
        setFormData((prev) => ({ ...prev, email: tempEmail }));
        setShowEmailForm(false);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setEmailError(error.response.data.message);
      } else {
        setEmailError("Failed to process email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const OrderSuccess = ({ orderId }) => {
    return (
      <div className="bg-white min-h-screen p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between border-b border-black py-3.5 items-center">
            <h1 className="text-2xl md:text-3xl m-0 text-black font-medium">
              Al-Buraq
            </h1>
            <div>
              <img 
                src={require('../../assets/images/bag.png')} 
                alt="" 
                className="w-8 h-8 md:w-10 md:h-10"
              />
            </div>
          </div>

          <div className="mt-6 md:mt-10 text-center">
            <div className="text-lightGray bg-black w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full text-4xl md:text-6xl mb-4 flex justify-center items-center">
              ✓
            </div>
            <h2 className="text-xl md:text-2xl text-black font-bold mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-lightGray mb-4 md:mb-6 text-sm md:text-base">
              Your order has been placed and is being processed. You'll receive
              a confirmation email shortly.
            </p>

            <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mx-auto text-left max-w-md">
              <h3 className="text-lg font-semibold mb-3 md:mb-4">Order Details</h3>
              <p className="mb-2 text-sm md:text-base">
                <span className="text-black">Order ID:</span> {orderId}
              </p>
              <p className="mb-4 text-sm md:text-base">
                <span className="text-black">Status:</span> Processing
              </p>

              <div className="border-t border-lightGray2 pt-3 md:pt-4">
                <p className="text-xs md:text-sm text-black mb-2">
                  You can track your order status by creating an account with
                  the email you used for this order.
                </p>
                <Link
                  to={"/signup"}
                  className="inline-block bg-primary text-black py-2 mt-2 px-4 text-xs md:text-sm font-bold transition-colors rounded"
                >
                  Create Account
                </Link>
              </div>
            </div>

            <div className="mt-6 md:mt-8">
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-primary text-black py-2 md:py-3 px-4 md:px-6 rounded-md text-sm md:text-base font-bold hover:bg-yellow-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };



   // Apply coupon function
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage("Please enter a coupon code");
      setCouponMessageType("error");
      return;
    }
    
    if (!userData?._id) {
      setCouponMessage("Please complete email verification first");
      setCouponMessageType("error");
      return;
    }
    
    setCouponLoading(true);
    setCouponMessage("");
    
    try {
      const response = await axios.post(`${BaseUrl}/v1/coupon/apply`, {
        couponCode: couponCode.trim(),
        customerId: userData._id
      });
      
      if (response.data.success) {
        setAppliedCoupon(response.data.data);
        setCouponMessage(response.data.message || "Coupon applied successfully!");
        setCouponMessageType("success");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to apply coupon";
      setCouponMessage(message);
      setCouponMessageType("error");
    } finally {
      setCouponLoading(false);
    }
  };

  const updateCustomerAddress = async () => {
    try {
      const response = await axios.patch(`${BaseUrl}/v1/customer/address`, {
        email: formData.email,
        city: formData.city,
        country: formData.country,
        state: formData.state,
        town: formData.town,
        address: formData.address,
        famousSpot: formData.famousSpot,
        phoneNumber: formData.phoneNumber,
        name: formData.fullName,
      });
      if (response.data.success) {
        const user = response.data.data;
        localStorage.setItem("userId", JSON.stringify(user));
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  };

  const createOrder = async (updatedUser) => {
    try {
      const orderData = {
        customerId: updatedUser._id,
        items: productData.map((item) => ({
          productId: item._id,
          selectedSizeId: item.sizeId,
          quantity: item.quantity,
        })),
        paymentMethod: paymentMethod,
        note: note,
        totalAmount: totalAmount,
        couponId: appliedCoupon?._id || null,
      };
      const response = await axios.post(`${BaseUrl}/v1/order`, orderData);
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message
      ); 
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!userData?._id || productData.length === 0) return;
    setOrderLoading(true);
    try {
      const updatedUser = await updateCustomerAddress();
      if (!updatedUser) {
        throw new Error("Failed to update address");
      }
      const orderResponse = await createOrder(updatedUser);
      if (orderResponse.success) {
        setOrderId(orderResponse.data._id);
        navigate(`/order/${orderResponse?.data?._id}`);
        dispatch(resetCart());
      }
    } catch (error) {
      console.error("Order processing error:", error);
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        email: userData.email,
        fullName: userData.name || "",
        country: userData.shippingAddress?.country || "",
        city: userData.shippingAddress?.city || "",
        state: userData.shippingAddress?.state || "",
        town: userData.shippingAddress?.town || "",
        address: userData.shippingAddress?.address || "",
        famousSpot: userData.shippingAddress?.famousSpot || "",
        phoneNumber: userData.shippingAddress?.phoneNumber || "",
      }));
    }
  }, [userData]);

  if (orderCompleted) {
    return <OrderSuccess orderId={orderId} />;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between px-4 py-3.5 items-center border-b border-gray-200">
        <h1 className="text-2xl md:text-3xl m-0 text-black font-semibold">Al-Buraq</h1>
        <div>
          <img 
            src={require('../../assets/images/bag.png')} 
            alt="" 
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 md:py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Shipping Form */}
          <div className="lg:flex-[2.1] w-full  bg-white rounded-lg shadow-sm">
            <form onSubmit={handleSubmitOrder}>
              <div className="text-lg font-bold text-black mb-3 pb-2 border-b border-gray-200">
                Shipping Address
              </div>

              {showEmailForm ? (
                <div className="mb-4">
                  <label
                    htmlFor="tempEmail"
                    className="block mb-1 text-black text-xs"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="tempEmail"
                    name="tempEmail"
                    value={tempEmail}
                    onChange={(e) => {
                      setTempEmail(e.target.value);
                      if (!validateEmail(e.target.value)) {
                        setEmailError("Please enter a valid email address");
                        return;
                      }
                      setEmailError("");
                    }}
                    onBlur={async (e) => {
                      if (!tempEmail) {
                        setEmailError("Email is required");
                        return;
                      }

                      if (!validateEmail(tempEmail)) {
                        setEmailError("Please enter a valid email address");
                        return;
                      }

                      setLoading(true);
                      setEmailError("");

                      try {
                        const response = await axios.post(
                          `${BaseUrl}/v1/customer`,
                          {
                            email: tempEmail,
                          }
                        );

                        if (response.data.success) {
                          const user = response.data.data;
                          localStorage.setItem("userId", JSON.stringify(user));
                          setUserData(user);
                          setFormData((prev) => ({ ...prev, email: tempEmail }));
                          setShowEmailForm(false);
                        }
                      } catch (error) {
                        console.error("Error processing email:", error);
                        if (
                          error.response &&
                          error.response.data &&
                          error.response.data.message
                        ) {
                          setEmailError(error.response.data.message);
                        } else {
                          setEmailError(
                            "Failed to process email. Please try again."
                          );
                        }
                      } finally {
                        setLoading(false);
                      }
                    }}
                    placeholder="Enter Your Email"
                    className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                  {loading && (
                    <p className="text-yellow-500 text-xs mt-1">
                      Processing email...
                    </p>
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-1 text-black text-xs"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                    disabled
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmailForm(true);
                      setTempEmail(formData.email);
                    }}
                    className="text-yellow-500 text-xs mt-1 hover:underline"
                  >
                    Change email
                  </button>
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block mb-1 text-black text-xs"
                >
                  Full name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="mb-4">
                  <label
                    htmlFor="country"
                    className="block mb-1 text-black text-xs"
                  >
                    Country/Region *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter Country/Region"
                    className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block mb-1 text-black text-xs"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter City"
                    className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="state"
                    className="block mb-1 text-black text-xs"
                  >
                    State/Province *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter State/Province"
                    className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="town"
                    className="block mb-1 text-black text-xs"
                  >
                    Town *
                  </label>
                  <input
                    type="text"
                    id="town"
                    name="town"
                    value={formData.town}
                    onChange={handleInputChange}
                    placeholder="Enter Town"
                    className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                    required
                  />
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-1 text-black text-xs"
                  >
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter Address"
                    className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                    required
                  />
                </div>
                <div className="mb-4 sm:col-span-2">
                  <label
                    htmlFor="famousSpot"
                    className="block mb-1 text-black text-xs"
                  >
                    Famous Spot
                  </label>
                  <input
                    type="text"
                    id="famousSpot"
                    name="famousSpot"
                    value={formData.famousSpot}
                    onChange={handleInputChange}
                    placeholder="Enter Famous Spot"
                    className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-1 text-black text-xs"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Phone Number"
                    className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                    required
                  />
                </div>
              </div>

              <div className="text-lg font-bold text-black mb-3 pb-2 border-b border-gray-200">
                Payment Method
              </div>
              <div className="my-4">
                <div className="flex flex-col gap-2">
                  <label className="bg-white border rounded-md p-3 flex justify-between items-center cursor-pointer transition-colors border-primary">
                    <div className="flex items-center flex-grow">
                      <input
                        type="radio"
                        name="payment-method"
                        value="standard-delivery-pay"
                        checked={paymentMethod === "standard-delivery-pay"}
                        onChange={handlePaymentMethodChange}
                        className="mr-2 w-4 h-4 cursor-pointer accent-gray-600"
                      />
                      <strong className="text-black font-medium text-sm">
                        Standard Delivery
                      </strong>
                    </div>
                  </label>
                  <label className="bg-white border rounded-md p-3 flex justify-between items-center cursor-pointer transition-colors border-primary">
                    <div className="flex items-center flex-grow">
                      <input
                        type="radio"
                        name="payment-method"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={handlePaymentMethodChange}
                        className="mr-2 w-4 h-4 cursor-pointer accent-yellow-500"
                      />
                      <strong className="text-black font-medium text-sm">
                        COD
                      </strong>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="note"
                  className="block mb-1 text-black text-xs"
                >
                  Order Note (Optional)
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any special instructions..."
                  className="w-full p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                disabled={orderLoading || productData.length === 0 || showEmailForm}
                className="bg-black text-white py-3 font-[inter] px-5 rounded-md text-base font-semibold cursor-pointer w-full mt-6 hover:bg-primary hover:text-black transition-colors disabled:cursor-not-allowed disabled:opacity-70"
              >
                {orderLoading ? "Processing Order..." : "Complete Order"}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:flex-[1.5] w-full  ">
            <div className="border border-black p-4 md:p-5 bg-white  rounded-lg shadow-sm">
   <div className="mb-5 pb-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-black mb-3">Your Order</h2>
              {productData?.map((item) => (
                <div key={item._id} className="flex items-center my-3">
                  <div className="relative w-16 h-16 md:w-[70px] md:h-[70px] mr-3 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full bg-gray-700 rounded-lg overflow-hidden object-cover"
                    />
                  </div>
                  <div className="flex-grow flex justify-between items-start pt-1">
                    <div className="text-black font-medium text-sm md:text-base">
                      {item.title} (Qty: {item.quantity})
                    </div>
                    <div className="text-black font-medium text-sm md:text-base">
                      Rs {getDiscountedPrice(item) * item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <input
                  type="text"
                  placeholder="Discount code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow p-3 bg-gray-100 placeholder:text-black font-semibold text-black text-sm border-none rounded-md box-border"
                />
                <button 
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || appliedCoupon}
                  className="bg-black text-white py-2 px-4 rounded-md cursor-pointer text-sm font-bold hover:bg-gray-900 transition-colors sm:w-auto w-full disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {couponLoading ? "Applying..." : appliedCoupon ? "Applied" : "Apply"}
                </button>
            </div>

            
              {couponMessage && (
                <div className={`mb-4 p-3 rounded-md text-sm ${
                  couponMessageType === "success" 
                    ? "bg-[#a6f7b9] text-green border border-green" 
                    : " bg-[#f1f5f2] text-red border border-red"
                }`}>
                  {couponMessage}
                </div>
              )}

            <div className="mb-0 pt-1">
              <div className="flex justify-between mb-2 text-sm text-gray-300">
                <span className="text-black font-medium">
                  Subtotal {productData.length} items
                </span>
                <span className="text-black font-bold">
                  Rs {subtotal}
                </span>
              </div>
              <div className="flex justify-between mb-2 text-sm text-gray-300">
                <span className="text-black font-medium">Shipping</span>
                <span className="text-black font-bold">Rs {shipping}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-3 mt-4 border-t border-gray-200">
                <span className="text-black">Total</span>
                <span className="text-black">Rs { appliedCoupon?.discountValue?totalAmount-appliedCoupon?.discountValue:totalAmount}</span>
              </div>
            </div>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;