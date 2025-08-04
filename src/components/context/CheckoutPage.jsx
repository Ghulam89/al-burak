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
      <div className="bg-white min-h-screen  p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between border-b border-black py-3.5 items-center">
            <h1 className="text-3xl m-0 text-black font-medium">
              Al-Buraq
            </h1>
          <div>
          <img src={require('../../assets/images/bag.png')} alt="" />
        </div>
          </div>

          <div className="mt-10 text-center">
            <div className="   text-lightGray bg-black w-20 h-20 mx-auto rounded-full text-6xl mb-4 flex justify-center items-center">
              ✓
            </div>
            <h2 className="text-2xl  text-black font-bold mb-2">
              Order Placed Successfully!
            </h2>
            <p className=" text-lightGray mb-6">
              Your order has been placed and is being processed. You'll receive
              a confirmation email shortly.
            </p>

            <div className="  bg-white shadow-lg rounded-lg p-6 mx-auto text-left">
              <h3 className="text-lg font-semibold  mb-4">Order Details</h3>
              <p className="mb-2">
                <span className="  text-black">Order ID:</span> {orderId}
              </p>
              <p className="mb-4">
                <span className="text-black">Status:</span> Processing
              </p>

              <div className="border-t  border-lightGray2 pt-4">
                <p className="text-sm text-black mb-2">
                  You can track your order status by creating an account with
                  the email you used for this order.
                </p>
                <Link
                  to={"/signup"}
                  className="bg-primary text-black py-2 mt-3 px-4  text-sm font-bold transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-primary text-black py-3 px-6 rounded-md text-base font-bold hover:bg-yellow-600 transition-colors"
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
        // setOrderCompleted(true);
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
    <div className="bg-white">
      <div className="flex justify-between   px-4 py-3.5 items-center text-gray-100">
        <h1 className="text-3xl m-0 text-black  font-semibold">Al-Buraq</h1>
        <div>
          <img src={require('../../assets/images/bag.png')} alt="" />
        </div>
      </div>

      <div className="flex items-start  sm:px-4  px-2 mx-auto overflow-hidden flex-wrap">
        <div className="flex-[2.1] p-5 min-w-[350px] box-border">
          <form onSubmit={handleSubmitOrder}>
            <div className="text-lg font-bold text-black mb-3 pb-2">
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
                    // Validate email format as user types
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                  required
                />
              </div>
              <div className="mb-4">
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                  required
                />
              </div>
              <div className="mb-4">
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                  required
                />
              </div>
            </div>

            <div className="text-lg font-bold text-black mb-3 pb-2">
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
                  className="w-[calc(100%-20px)] p-2.5 rounded-md bg-white border border-gray-600 text-black text-sm box-border"
                rows="3"
              />
            </div>

            <button
              type="submit"
              disabled={orderLoading || productData.length === 0 || showEmailForm}
              className="bg-black text-white py-3 font-[inter] px-5 rounded-md text-base  font-semibold cursor-pointer w-full mt-6 hover:bg-primary hover:text-black transition-colors  disabled:cursor-not-allowed"
            >
              {orderLoading ? "Processing Order..." : "Complete Order"}
            </button>
          </form>
        </div>

        <div className="flex-1 p-5 bg-white border border-black rounded-lg min-w-[350px] box-border">
          <div className="mb-5 pb-5">
            {productData?.map((item) => (
              <div key={item._id} className="flex items-center my-3">
                <div className="relative w-[70px] h-[70px] mr-3 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full bg-gray-700 rounded-lg overflow-hidden object-cover"
                  />
                </div>
                <div className="flex-grow flex justify-between items-start pt-1">
                  <div className="text-black font-medium">
                    {item.title} (Qty: {item.quantity})
                  </div>
                  <div className="text-black font-medium">
                    Rs {getDiscountedPrice(item) * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between gap-5 mb-5">
            <input
              type="text"
              placeholder="Discount code"
              className="flex-grow p-3.5 bg-gray-100 placeholder:text-black font-semibold text-black text-sm border-none rounded-md box-border"
            />
            <button className="bg-black text-white py-2 px-4 rounded-md cursor-pointer text-sm font-bold hover:bg-gray-900 transition-colors">
              Apply
            </button>
          </div>

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
            <div className="flex justify-between text-base font-bold text-white pt-3 mt-4">
              <span className="text-black">Total</span>
              <span className="text-black">Rs {totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
