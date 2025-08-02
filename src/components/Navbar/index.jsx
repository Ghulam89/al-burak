import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Al-burak-logo.png";
import Customer from "../../assets/images/Customer.png";
import searchIcon from "../../assets/images/Search.png";
import cart from "../../assets/images/cart.png";
import heart from "../../assets/images/Favorite.png";
import Product from "../../assets/images/product.jpg";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Announcement from "./Announcement";
import { FaTimes, FaBars } from "react-icons/fa";
import AddToCartSideMenu from "../header-footer.jsx/AddToCartSideMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const productData = useSelector((state) => state?.next?.productData);
  const { userInfo } = useSelector((state) => state.next);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showCartSideMenu, setShowCartSideMenu] = useState(false);
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeSearchTab, setActiveSearchTab] = useState("Products");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [category, setCategory] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userId")) || null;
  const menuRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  const navbarRef = useRef(null);

  const [dummyProducts] = useState([
    { id: 1, name: "Prada", price: 3990, image: Product },
    { id: 2, name: "Prada", price: 3990, image: Product },
    { id: 3, name: "Prada", price: 3990, image: Product },
    { id: 4, name: "Prada", price: 3990, image: Product },
  ]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showSearchPopup && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchPopup]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setShowDropdown(false);
      setShowCartSideMenu(false);
    }
  };

  const toggleCartSideMenu = () => {
    setShowCartSideMenu(!showCartSideMenu);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    alert("Logged out");
  };

  const handleSearchIconClick = () => {
    setShowSearchPopup(true);
    setSearchResults(dummyProducts);
    setShowCartSideMenu(false);
  };

  const handleCloseSearchPopup = () => {
    setShowSearchPopup(false);
    setSearchTerm("");
    setSearchResults([]);
    setActiveSearchTab("Products");
  };

  const handleSearchInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      const filtered = dummyProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(dummyProducts);
    }
  };

  const fetchCategory = async () => {
    const respose = await axios.get(`${BaseUrl}/v1/category`);
    setCategory(respose.data.categories);
  };
  const handleSearchTabClick = (tab) => setActiveSearchTab(tab);

  const isMobileView = windowWidth <= 768;

  useEffect(() => {
    fetchCategory();
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userId");
    toast.success("Logout Successfully!");
    navigate("/");
  };

  const menuIcons = () => {
    return (
      <div className="flex gap-1 xs:gap-2 sm:gap-3 md:gap-4 items-center relative order-3">
        <button
          onClick={handleSearchIconClick}
          aria-label="Search"
          className="transition-transform duration-200 hover:scale-110"
        >
          <img className="w-full h-full mb-1" src={searchIcon} alt="Search" />
        </button>

        <Link to={"#"} className="relative">
          <button
            aria-label="Wishlist"
            className="transition-transform duration-200 hover:scale-110"
          >
            <img className="w-full h-full" src={heart} alt="Wishlist" />
          </button>
        </Link>

        <div className="relative">
          <button
            aria-label="Cart"
            onClick={toggleCartSideMenu}
            className="transition-transform duration-200 hover:scale-110"
          >
            <img className="w-full h-full" src={cart} alt="Cart" />
            {productData?.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-darkRed w-4 h-4 rounded-full flex justify-center items-center text-xs text-white font-bold">
                {productData.length}
              </div>
            )}
          </button>
          {showCartSideMenu && (
            <AddToCartSideMenu onClose={() => setShowCartSideMenu(false)} />
          )}
        </div>

        <div className="relative">
          <button
            className="transition-transform duration-200 hover:scale-110"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Account"
          >
            <img className="w-full h-full" src={Customer} alt="Account" />
          </button>
          {showDropdown && (
            <div className="absolute bg-white top-8 right-0 rounded-lg py-2 min-w-[160px] sm:min-w-[180px] shadow-lg z-50 border border-gray-200 animate-fadeIn">
              {userData ? (
                <>
                  <Link to="#" onClick={() => setShowDropdown(false)}>
                    <button className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-left text-xs sm:text-sm text-black hover:bg-gray-100 transition-colors duration-200">
                      Profile
                    </button>
                  </Link>
                  <Link to="#" onClick={() => setShowDropdown(false)}>
                    <button className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-left text-xs sm:text-sm text-black hover:bg-gray-100 transition-colors duration-200">
                      Settings
                    </button>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-left text-xs sm:text-sm text-black hover:bg-gray-100 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" onClick={() => setShowDropdown(false)}>
                    <button className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-left text-xs sm:text-sm text-black hover:bg-gray-100 transition-colors duration-200">
                      Register
                    </button>
                  </Link>
                  <Link to="#" onClick={() => setShowDropdown(false)}>
                    <button className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-left text-xs sm:text-sm text-black hover:bg-gray-100 transition-colors duration-200">
                      Login
                    </button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Announcement />
      {/* Navbar */}
      <nav className="flex justify-between border-b border-black items-center px-2 sm:px-4 md:px-6 lg:px-12 py-3 relative bg-white">
        {/* Mobile Menu Button - Only visible on mobile */}
        {isMobileView && (
          <button
            className="text-black text-xl cursor-pointer order-1"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        )}

        <div></div>

        {/* Logo - Moved to start on mobile */}
        <Link
          to="/"
          className={`${isMobileView ? "order-2 mx-auto" : "order-none"}`}
        >
          <img
            src={logo}
            alt="Al-Burak Logo"
            className="mx-auto sm:w-24 w-16 sm:h-24 ml-20 h-16 cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Icon Group */}
        {menuIcons()}
      </nav>

      {/* Main Navigation - Hidden on mobile */}
      {!isMobileView && (
     <nav
  ref={navbarRef}
  className={`flex justify-between items-center px-2 sm:px-4 md:px-6 lg:px-12 py-3 bg-white border-b border-black ${
    sticky
      ? "fixed top-0 left-0 right-0 z-50 shadow-lg bg-opacity-80 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      : "relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
  }`}
  style={{
    transform: sticky ? "translateY(0)" : "translateY(0)",
    animation: sticky ? "fadeInDown 0.5s ease-out" : "none"
  }}
>
          {sticky && (
            <Link to="/" className="order-none">
              <img
                src={logo}
                alt="Al-Burak Logo"
        className="order-none w-20"
                 initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
              />
            </Link>
          )}

          <ul className="flex flex-wrap items-center justify-center list-none gap-1 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 w-full px-1 overflow-x-auto whitespace-nowrap">
            {[
              { name: "Home", path: "/" },
              { name: "New Arrivals", path: "/shop" },
              { name: "Men Perfumes", path: "/shop" },
              { name: "Women Perfumes", path: "/shop" },
              { name: "Attar/Oud", path: "/shop" },
              { name: "Deals", path: "#" },
              { name: "Gift Box", path: "#" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="no-underline text-black font-medium text-[10px] xs:text-xs sm:text-sm md:text-base hover:text-primary px-1 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

           {sticky && (
      <div 
        className="flex gap-2 sm:gap-3 md:gap-4 items-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, staggerChildren: 0.1 }}
      >
        {menuIcons()}
      </div>
    )}
        </nav>
      )}

      {/* Mobile Menu - Slide from left */}
      {isMenuOpen && isMobileView && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[998] transition-opacity duration-300"
          onClick={toggleMenu}
        >
          <div
            ref={menuRef}
            className={`fixed top-0 transition-all duration-300 ease-in-out transform left-0 h-full w-3/4 max-w-xs bg-white border-r border-black z-[999] ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } shadow-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="Al-Burak Logo"
                  className="h-12 w-auto cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => {
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                />
              </div>
              <button
                className="text-black text-xl cursor-pointer transition-transform duration-200 hover:rotate-90"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-60px)]">
              <ul className="py-2">
                {[
                  { name: "Home", path: "/" },
                  { name: "New Arrivals", path: "/shop" },
                  { name: "Men Perfumes", path: "/shop" },
                  { name: "Women Perfumes", path: "/shop" },
                  { name: "Attar/Oud", path: "/shop" },
                  { name: "Deals", path: "#" },
                  { name: "Gift Box", path: "#" },
                ].map((item) => (
                  <li
                    key={item.name}
                    className="px-4 py-3 border-b transition-colors duration-200 hover:bg-gray-50"
                  >
                    <Link
                      to={item.path}
                      className="no-underline text-black font-medium text-sm block transition-colors duration-300 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

                <div className="px-4 py-3 border-b border-gray-800">
                  {!userData ? (
                    <>
                      <li className="list-none">
                        <Link
                          to="/login"
                          className="no-underline text-white font-medium text-sm block transition-colors duration-300 hover:text-primary mb-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </Link>
                      </li>
                      <li className="list-none">
                        <Link
                          to="/signup"
                          className="no-underline text-white font-medium text-sm block transition-colors duration-300 hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="list-none">
                        <Link
                          to="/dashboard"
                          className="no-underline text-white font-medium text-sm block transition-colors duration-300 hover:text-primary mb-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li className="list-none">
                        <Link
                          to="/settings"
                          className="no-underline text-white font-medium text-sm block transition-colors duration-300 hover:text-primary mb-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Settings
                        </Link>
                      </li>
                      <li className="list-none">
                        <button
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className="no-underline text-white font-medium text-sm block transition-colors duration-300 hover:text-primary"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Search Popup */}
      {showSearchPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-10 sm:pt-12 md:pt-20 z-[1001] px-2 transition-opacity duration-300">
          <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 w-full max-w-[400px] sm:max-w-[500px] relative animate-fadeInUp">
            <div className="flex items-center mb-3 border-b border-gray-200 pb-2">
              <input
                type="text"
                className="bg-transparent border-none text-black flex-grow text-sm sm:text-base outline-none px-2 transition-all duration-300 focus:ring-1 focus:ring-primary"
                placeholder="Search for..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                ref={searchInputRef}
              />
              <button
                onClick={handleCloseSearchPopup}
                className="bg-gray-200 border-none w-6 h-6 rounded-full text-black text-xs cursor-pointer flex justify-center items-center p-0 transition-colors duration-200 hover:bg-gray-300"
                aria-label="Close search"
              >
                ✖
              </button>
            </div>
            <div className="flex mb-3">
              {["Products", "Suggestions"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                    activeSearchTab === tab
                      ? "text-black border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => handleSearchTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
              {activeSearchTab === "Products" &&
                (searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      onClick={handleCloseSearchPopup}
                      className="no-underline"
                    >
                      <div className="flex items-center bg-gray-50 rounded p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover mr-2 sm:mr-3 transition-transform duration-200 hover:scale-105"
                        />
                        <div className="flex flex-col">
                          <span className="text-black font-medium text-xs sm:text-sm">
                            {product.name}
                          </span>
                          <span className="text-gray-600 text-xs">
                            Rs. {product.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : searchTerm.length > 0 ? (
                  <div className="text-gray-500 text-center my-4 text-xs sm:text-sm">
                    No products found for "{searchTerm}"
                  </div>
                ) : (
                  dummyProducts.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      onClick={handleCloseSearchPopup}
                      className="no-underline"
                    >
                      <div className="flex items-center bg-gray-50 rounded p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover mr-2 sm:mr-3 transition-transform duration-200 hover:scale-105"
                        />
                        <div className="flex flex-col">
                          <span className="text-black font-medium text-xs sm:text-sm">
                            {product.name}
                          </span>
                          <span className="text-gray-600 text-xs">
                            Rs. {product.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ))}
              {activeSearchTab === "Suggestions" && (
                <div className="text-gray-500 text-center my-4 text-xs sm:text-sm">
                  No suggestions available yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add this to your CSS or in a global stylesheet */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
