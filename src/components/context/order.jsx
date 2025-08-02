import React, { useState, useEffect } from "react";
import User from "../../assets/images/user.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import Footer from "../header-footer.jsx/Footer";
import SubscribeBanner from "../home/subscribe";

const OrdersPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("userId")) || null;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = userData?._id;
        if (!userId) return;

        const response = await fetch(`${BaseUrl}/v1/order/${userId}`);
        const data = await response.json();
        if (data.success) {
          setOrders(data.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userData]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem('userId')
    toast.success('Logout Successfully!')
    navigate('/')
  }

  return (
    <div className="font-sans  min-h-screen flex flex-col">
      <Navbar/>

      <main className=" flex-grow p-8 flex flex-col">
        <h1 className="text-black text-lg font-bold text-left mb-6">My Account</h1>

          <div className=" border">
            <div className=" w-full mb-5">
              <div className="grid grid-cols-4 gap-5  font-bold text-gold-500 border-b">
                <div className="text-black col-span-2 p-2.5">Product</div>
                <div className="text-black p-2.5">Quantity</div>
                <div className="text-black p-2.5">Total</div>
              </div>

              
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2  border-black"></div>
          </div>
        ) : (
              orders.length === 0 ? (
                <p className="text-center text-black mt-8">No orders found.</p>
              ) : (
                orders.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-4 gap-5 items-center py-4 text-gold-500"
                  >
                    <div className="flex col-span-2 items-center gap-4">
                      <Link
                        to={`/dashboard/order/${item?._id}`}
                        className="relative w-[70px] h-[70px] mr-3 flex-shrink-0"
                      >
                        <img
                          src={item?.items?.[0]?.productId?.images?.[0]}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>

                      <div>
                        <div className="text-lg whitespace-nowrap text-black font-bold">
                          {item?.items?.[0]?.productId?.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        value={item.items?.[0]?.quantity}
                        disabled
                        className="w-12 h-12 rounded-lg text-center text-lg flex justify-center items-center border border-lightGray2 bg-transparent text-lightGray2 outline-none mb-1"
                      />
                      <button className="bg-transparent border-none font-medium mt-1 text-lightGray2 cursor-pointer text-sm no-underline">
                        Remove
                      </button>
                    </div>
                    <div className="text-black font-medium">
                      Rs {item.totalAmount}
                    </div>
                  </div>
                ))
              )
               )}
            </div>
          </div>
       
      </main>
     <SubscribeBanner/>
    <Footer/>
    </div>
  );
};

export default OrdersPage;