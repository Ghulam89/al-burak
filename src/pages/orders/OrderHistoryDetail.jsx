import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { toast } from "react-toastify";
import SubscribeBanner from "../../components/home/subscribe";
import Footer from "../../components/header-footer.jsx/Footer";
import Navbar from "../../components/Navbar";
import { TbArrowBack } from "react-icons/tb";
import Button from "../../components/common/Button";
import axios from "axios";
import { FaCamera, FaRegStar, FaStar } from "react-icons/fa";

const OrderHistoryDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userId")) || null;
    setUserData(data);
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error("Order ID is missing");
        }

        const response = await fetch(`${BaseUrl}/v1/order/detail/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        if (data.success) {
          setOrder(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch order details");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userId");
    toast.success("Logout Successfully!");
    navigate("/");
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleAddReview = (product) => {
    setSelectedProduct(product);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedProduct(null);
    setRating(0);
    setReviewTitle("");
    setReviewComment("");
    setFile(null);
    setFilePreview(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

const handleSubmit = async (e, ids) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    const productId = ids;
    const formData = new FormData();
    formData.append("userId", userData?._id);
    formData.append("comment", reviewComment);
    formData.append("rating", rating.toString());
    formData.append("orderId", id);
    if (file) {
      formData.append("images", file);
    }

    const response = await axios.put(
      `${BaseUrl}/v1/product/add-reveiw/${productId}`,
      formData
    );

    if (response?.data?.success === true) {
      toast.success(response?.data?.message);
      closeReviewModal(); // Uncomment this to close modal on success
    } else {
      toast.error(response?.data?.message);
    }
  } catch (err) {
    toast.error(err?.response?.data?.message);
  } finally {
    setIsSubmitting(false);
  }
};

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-grow py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="flex-grow py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          <div className="text-center text-red-500 mt-8 p-4">
            {error}
            <div className="mt-4">
              <Link to="/dashboard">
                <Button
                  Icons={<TbArrowBack />}
                  className="border rounded-lg py-0.6 uppercase"
                  label={"Return to Account"}
                />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="flex-grow py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          <div className="text-center mt-8 p-4">
            <p>No order details found</p>
            <div className="mt-4">
              <Link to="/dashboard">
                <Button
                  Icons={<TbArrowBack />}
                  className="border rounded-lg py-0.6 uppercase"
                  label={"Return to Account"}
                />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const tax = Math.round(order.totalAmount * 0.08);
  const shipping = 0;

  return (
    <>
      <Navbar />

      <main className="flex-grow py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">MY ACCOUNT</h2>
          <Link to="/dashboard">
            <Button
              Icons={<TbArrowBack />}
              className="border rounded-lg py-0.6 uppercase"
              label={"Return to Account Details"}
            />
          </Link>

          <div className="px-4 sm:px-6 py-4 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base">
                ORDER #{order._id}
              </h3>
              <span className="text-gray-600 text-sm sm:text-base">
                Placed on {formatDate(order.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left text-xs px-4 sm:text-sm pb-2 font-medium">
                        PRODUCT
                      </th>
                      <th className="text-left text-xs px-4 sm:text-sm pb-2 font-medium hidden sm:table-cell">
                        SKU
                      </th>
                      <th className="text-left text-xs  px-4 sm:text-sm pb-2 font-medium">
                        PRICE
                      </th>
                      <th className="text-left text-xs px-4 sm:text-sm pb-2 font-medium">
                        QTY
                      </th>
                      <th className="text-left text-xs px-4 sm:text-sm pb-2 font-medium">
                        TOTAL
                      </th>
                      {/* <th className="text-left text-xs px-4 sm:text-sm pb-2 font-medium">
                        ACTION
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <>
                        <tr
                          key={index}
                          className={
                            index !== order.items.length - 1 ? "border-b" : ""
                          }
                        >
                          <td className="py-4">
                            <div className="flex items-center">
                              {item.productId.images &&
                              item.productId.images[0] ? (
                                <img
                                  src={item.productId.images[0]}
                                  alt={item.productId.name}
                                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded mr-2 sm:mr-4"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://via.placeholder.com/80";
                                  }}
                                />
                              ) : (
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded mr-2 sm:mr-4 flex items-center justify-center">
                                  <span className="text-xs text-gray-500">
                                    No Image
                                  </span>
                                </div>
                              )}
                              <div>
                                <span className="text-sm sm:text-base whitespace-nowrap px-4 block">
                                  {item.productId.name}
                                </span>
                                <span className="text-xs sm:text-sm whitespace-nowrap px-4 text-gray-500 sm:hidden">
                                  SKU: {item.selectedSizeId.slice(-5)}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 hidden sm:table-cell whitespace-nowrap px-4">
                            {item.selectedSizeId.slice(-5)}
                          </td>
                          <td className="py-4 text-sm sm:text-base whitespace-nowrap px-4">
                            Rs.{item.priceAtPurchase.toLocaleString()}
                          </td>
                          <td className="py-4 text-sm sm:text-base whitespace-nowrap px-4">
                            {item.quantity}
                          </td>
                          <td className="py-4 text-sm sm:text-base whitespace-nowrap px-4">
                            Rs.
                            {(
                              item.priceAtPurchase * item.quantity
                            ).toLocaleString()}
                          </td>
                          {/* <td className="py-4 text-sm sm:text-base whitespace-nowrap px-4">
                            {order?.orderStatus === "delivered" ? (
                              <button
                                className="bg-primary py-1 px-3 rounded-md"
                                onClick={() => handleAddReview(item.productId)}
                              >
                                Add Review
                              </button>
                            ) : null}
                          </td> */}
                        </tr>

                        <div className=" flex">
                          {order?.orderStatus === "delivered" && (
                            <div className=" bg-opacity-50  border mt-2">
                              <div className="bg-white max-w-2xl rounded-lg w-full ">
                                <div className="p-6">
                                  <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">
                                      Add Review for {item.productId.name}
                                    </h3>
                                  </div>

                                  <form
                                    onSubmit={(e)=>{handleSubmit(e,item.productId._id)}}
                                    className="space-y-4"
                                  >
                                    {error && (
                                      <div className="p-2 bg-red-100 text-red-700 rounded">
                                        {error}
                                      </div>
                                    )}

                                    <div>
                                      <label className="block mb-2 text-black font-normal text-base">
                                        RATING
                                      </label>
                                      <div className="flex gap-1 cursor-pointer">
                                        {[1, 2, 3, 4, 5].map((starIndex) => (
                                          <span
                                            key={starIndex}
                                            onClick={() => setRating(starIndex)}
                                            className={`text-2xl ${
                                              starIndex <= rating
                                                ? "text-yellow-500"
                                                : "text-gray-300"
                                            }`}
                                          >
                                            {starIndex <= rating ? (
                                              <FaStar />
                                            ) : (
                                              <FaRegStar />
                                            )}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <label
                                        htmlFor="reviewComment"
                                        className="block mb-2 text-black font-normal text-base"
                                      >
                                        REVIEW
                                      </label>
                                      <textarea
                                        id="reviewComment"
                                        value={reviewComment}
                                        onChange={(e) =>
                                          setReviewComment(e.target.value)
                                        }
                                        placeholder="Write your comment here"
                                        className="w-full px-3 py-3 border border-gray-300 text-sm text-black box-border outline-none min-h-[120px] resize-y"
                                        rows="5"
                                        required
                                      ></textarea>
                                    </div>

                                    <div>
                                      <label className="block mb-2 text-black font-normal text-base">
                                        PICTURE/VIDEO (OPTIONAL)
                                      </label>
                                      <label
                                        htmlFor="file-upload"
                                        className="w-40 h-36 border-2 border-dashed border-gray-300 flex flex-col justify-center items-center cursor-pointer overflow-hidden"
                                      >
                                        {filePreview ? (
                                          <img
                                            src={filePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                          />
                                        ) : file ? (
                                          <p className="text-xs text-gray-500 break-all text-center px-1">
                                            {file.name}
                                          </p>
                                        ) : (
                                          <>
                                            <FaCamera className="text-2xl text-gray-400 mb-1" />
                                            <span className="text-xs text-gray-500">
                                              Upload Image
                                            </span>
                                          </>
                                        )}
                                        <input
                                          id="file-upload"
                                          type="file"
                                          onChange={handleFileChange}
                                          className="hidden"
                                          accept="image/*,video/*"
                                        />
                                      </label>
                                    </div>

                                    <p className="text-black text-sm leading-relaxed">
                                      How we use your data: We'll only contact
                                      you about the review you left, and if
                                      necessary. By submitting your review, you
                                      agree to our terms, privacy and content
                                      policies.
                                    </p>

                                    <button
                                      type="submit"
                                      className="bg-black text-white px-8 py-4 border-none text-lg font-normal cursor-pointer w-full block transition-colors duration-200 hover:bg-primary hover:text-black"
                                      disabled={isSubmitting}
                                    >
                                      {isSubmitting
                                        ? "SUBMITTING..."
                                        : "SUBMIT REVIEW"}
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <div className="w-full sm:w-64">
                  <div className="flex justify-between py-2 border-b text-sm sm:text-base">
                    <span>Subtotal</span>
                    <span>Rs.{order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm sm:text-base">
                    <span>Shipping</span>
                    <span>Rs.{shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm sm:text-base">
                    <span>Tax (GST 8.0%)</span>
                    <span>Rs.{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-sm sm:text-base">
                    <span>Total</span>
                    <span>
                      Rs.{(order.totalAmount + shipping + tax).toLocaleString()}{" "}
                      {order.paymentMethod === "COD" ? "(COD)" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border rounded-lg p-4 sm:p-6">
              <h4 className="font-bold mb-3 sm:mb-4">SHIPPING ADDRESS</h4>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">
                <span className="font-semibold">Order Status:</span>{" "}
                {capitalizeFirstLetter(order.orderStatus || "pending")}
              </p>
              <p className="font-medium text-sm sm:text-base">
                {userData?.name}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                {order.shippingAddress.address}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                {order.shippingAddress.postalCode || "54000"}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                {order.shippingAddress.country}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                {order.shippingAddress.phoneNumber}
              </p>
            </div>

            <div className="border rounded-lg p-4 sm:p-6">
              <h4 className="font-bold mb-3 sm:mb-4">PAYMENT METHOD</h4>
              <p className="text-gray-600 text-sm sm:text-base">
                <span className="font-semibold">Method:</span>{" "}
                {order.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </p>
              {order.paymentMethod !== "COD" && (
                <p className="text-gray-600 text-sm sm:text-base mt-2">
                  <span className="font-semibold">Payment Status:</span>{" "}
                  {order.paymentStatus || "Paid"}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal */}

      <SubscribeBanner />
      <Footer />
    </>
  );
};

export default OrderHistoryDetail;
