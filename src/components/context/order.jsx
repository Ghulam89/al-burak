import React, { useState, useEffect } from "react";
import User from "../../assets/images/user.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { toast } from "react-toastify";

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
    <div className="font-sans bg-[#E5D0A5] min-h-screen flex flex-col">
      <header className="bg-[#E5D0A5] px-8 py-4 min-h-20 flex justify-between items-center text-black">
        <div className="flex items-center">
          <h2 className="m-0 mr-8 text-black">Al-Buraq</h2>
          <nav className="flex gap-6">
            <a href="#" className="text-black no-underline font-bold text-lg">
              Shop
            </a>
            <a href="#" className="text-black no-underline font-bold text-lg">
              Orders
            </a>
          </nav>
        </div>
        <div className="relative flex items-center gap-2">
          <div
            className="text-3xl cursor-pointer flex items-center"
            onClick={toggleDropdown}
          >
            <img src={User} alt="User" className="w-8 h-8 rounded-full" />
          </div>
          <span className="text-black text-base" onClick={toggleDropdown}>
            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          <div
            className={`absolute top-14 right-0 p-2.5 bg-[#E5D0A5] rounded-xl shadow-lg z-10 min-w-[220px] 
            ${
              isDropdownOpen
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-2.5 invisible"
            } 
            transition-all duration-300 ease-out`}
          >
            <div className="px-4 py-3 font-bold text-[#333]">{userData?.email}</div>
            <a
              href="#"
              className="block px-4 py-3 cursor-pointer text-[#333] no-underline border-b border-[#C0B08E] hover:bg-[#F5E0B5] transition-colors duration-200"
            >
              Profile
            </a>
            <a
              href="#"
              className="block px-4 py-3 cursor-pointer text-[#333] no-underline border-b border-[#C0B08E] hover:bg-[#F5E0B5] transition-colors duration-200"
            >
              Setting
            </a>
            <a
               onClick={()=>logout()}
              href="#"
              className="block px-4 py-3 cursor-pointer text-[#333] no-underline hover:bg-[#F5E0B5] transition-colors duration-200"
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      <main className="bg-black flex-grow p-8 flex flex-col">
        <h1 className="text-white text-left mb-6">Orders</h1>

          <div className="bg-lightGray rounded-xl">
            <div className="p-8 w-full mb-5">
              <div className="grid grid-cols-4 gap-5 pb-5 mb-5 font-bold text-gold-500 border-b border-lightGray2">
                <div className="text-black col-span-2">Product</div>
                <div className="text-black">Quantity</div>
                <div className="text-black">Total</div>
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

      <footer className="flex justify-start gap-5 p-5 bg-black">
        <a href="#" className="text-white underline text-sm">
          Refund policy
        </a>
        <a href="#" className="text-white underline text-sm">
          Shipping policy
        </a>
        <a href="#" className="text-white underline text-sm">
          Privacy policy
        </a>
      </footer>
    </div>
  );
};

export default OrdersPage;