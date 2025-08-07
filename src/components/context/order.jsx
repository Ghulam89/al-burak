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
  const userData = JSON.parse(localStorage.getItem("userId")) || null;

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto flex flex-col">
        <h1 className="text-black text-lg sm:text-xl font-bold text-left mb-4 sm:mb-6">My Orders</h1>

        <div className="border rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500 mt-8 p-4">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-black mt-8 p-4">No orders found.</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y ">
                <thead className="">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black  tracking-wider">
                      Order Details
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black  tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black  tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr className="bg-gray-50">
                        <td colSpan="3" className="px-4 py-3 whitespace-nowrap text-sm sm:text-base">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div className="mb-2 sm:mb-0">
                              <span className="font-semibold">Order #:</span> {order._id}
                            </div>
                            <div className="mb-2 sm:mb-0">
                              <span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                            
                            <div className={`font-semibold ${
                              order.orderStatus === 'delivered' ? 'text-green-500' :
                              order.orderStatus === 'pending' ? ' text-primary' :
                              order.orderStatus === 'cancelled' ? 'text-red-500' : 'text-gray-500'
                            }`}>
                              {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                            </div>
                          </div>
                        </td>
                      </tr>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20">
                                <Link to={`/order/${order._id}`}>
                                  <img
                                    src={item.productId?.images?.[0] || "https://via.placeholder.com/70"}
                                    alt={item.productId?.name}
                                    className="h-full w-full object-cover rounded-lg"
                                  />
                                </Link>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm sm:text-base font-medium text-gray-900">
                                  {item.productId?.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatCurrency(item.priceAtPurchase)} each
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className=" whitespace-nowrap text-sm sm:text-base text-gray-500 text-center">
                            <div className=" w-9 h-9 flex justify-center items-center  border border-lightGray rounded-md">
                              {item.quantity}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                            {formatCurrency(item.priceAtPurchase * item.quantity)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td colSpan="3" className="px-4 py-3 text-right text-sm sm:text-base font-bold">
                          Order Total: {formatCurrency(order.totalAmount)}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <SubscribeBanner />
      <Footer />
    </>
  );
};

export default OrdersPage;