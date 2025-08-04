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
    < >
      <Navbar />

      <main className="flex-grow py-4 md:py-8 max-w-6xl w-full mx-auto flex flex-col">
        <h1 className="text-black text-lg font-bold text-left mb-6">My Orders</h1>

        <div className="border rounded-lg overflow-hidden">
          <div className="w-full mb-5 overflow-x-auto">
            <div className="grid grid-cols-4 gap-5 font-bold text-gold-500 border-b min-w-[600px]">
              <div className="text-black col-span-2 p-2.5">Products</div>
              <div className="text-black p-2.5">Items</div>
              <div className="text-black p-2.5">Total</div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : error ? (
              <p className="text-center text-red-500 mt-8 p-4">{error}</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-black mt-8 p-4">No orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="border-b min-w-[600px]">
                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <div>
                      <span className="font-semibold">Order #:</span> {order._id}
                    </div>
                    <div>
                      <span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className={`font-semibold ${
                      order.orderStatus === 'delivered' ? 'text-green-500' :
                      order.orderStatus === 'pending' ? 'text-yellow-500' :
                      order.orderStatus === 'cancelled' ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </div>
                  </div>
                  
                  {order.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-5 items-center py-4 min-w-[600px]">
                      <div className="flex col-span-2 items-center gap-4 pl-4">
                        <Link
                          to={`/order/${order._id}`}
                          className="relative w-[70px] h-[70px] mr-3 flex-shrink-0"
                        >
                          <img
                            src={item.productId?.images?.[0] || "https://via.placeholder.com/70"}
                            alt={item.productId?.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </Link>
                        <div>
                          <div className="text-lg whitespace-nowrap text-black font-bold">
                            {item.productId?.name}
                          </div>
                          <div className="text-gray-500">
                            {formatCurrency(item.priceAtPurchase)} each
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-lg text-center text-lg flex justify-center items-center border border-lightGray2 bg-transparent text-lightGray2 outline-none mb-1">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="text-black font-medium">
                        {formatCurrency(item.priceAtPurchase * item.quantity)}
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-4 bg-gray-50 flex justify-end">
                    <div className="font-bold">
                      Order Total: {formatCurrency(order.totalAmount)}
                    </div>
                  </div>
                </div>
              ))
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