import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import Footer from "../header-footer.jsx/Footer";
import SubscribeBanner from "../home/subscribe";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userId")) || null;
    setUserData(data);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = userData?._id;
        if (!userId) return;

        const response = await fetch(`${BaseUrl}/v1/order/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        if (data.success) {
          setOrders(data.data);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userData]);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('userId');
    toast.success('Logout Successfully!');
    navigate('/');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto flex flex-col">
        <div className="">
          <h2 className="text-xl font-bold mb-4">MY ACCOUNT</h2>

          {/* Main Content */}
          <div className="">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : error ? (
              <p className="text-center text-red-500 mt-8 p-4">{error}</p>
            ) : (
              <>
                <h1 className="text-md font-bold mb-4">ORDER HISTORY</h1>
                {orders.length === 0 ? (
                  <p className="text-center text-black mt-8 p-4">No orders found.</p>
                ) : (
                  <div className="border overflow-x-auto rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">ORDER</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">DATE</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">PAYMENT STATUS</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">FULFILLMENT STATUS</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">TOTAL</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                          <tr key={order._id}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                              <Link to={`/dashboard/order/${order._id}`}>#{order._id}</Link>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                              {formatDate(order.createdAt)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                              {order.paymentStatus || 'Pending'}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                              {order.orderStatus === 'delivered' ? 'Fulfilled' : 
                               order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Rs.{order.totalAmount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <h1 className="text-black text-lg sm:text-xl font-bold text-left mt-8 mb-4 sm:mb-6">ACCOUNT DETAILS</h1>
                <div className="border rounded-lg p-4">
                  {userData ? (
                    <>
                      <div className="mb-6">
                        <h2 className="text-lg font-bold mb-2">{userData.name}</h2>
                        <p className="text-gray-600">{userData.email}</p>
                      </div>
                      <div className="mb-6">
                        <h3 className="text-md font-semibold mb-2">SHIPPING ADDRESS</h3>
                        {userData.shippingAddress ? (
                          <>
                            <p className="text-gray-600">{userData.shippingAddress.address}</p>
                            <p className="text-gray-600">{userData.shippingAddress.city}, {userData.shippingAddress.state}</p>
                            <p className="text-gray-600">{userData.shippingAddress.country}</p>
                            <p className="text-gray-600">Phone: {userData.shippingAddress.phoneNumber}</p>
                          </>
                        ) : (
                          <p className="text-gray-600">No shipping address provided</p>
                        )}
                      </div>
                     
                    </>
                  ) : (
                    <p>No user data available</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <SubscribeBanner />
      <Footer />
    </>
  );
};

export default OrdersPage;