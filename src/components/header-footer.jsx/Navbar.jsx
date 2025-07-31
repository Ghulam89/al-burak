import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Al-burak-logo.png";
import Customer from "../../assets/images/Customer.png";
import searchIcon from "../../assets/images/Search.png";
import cart from "../../assets/images/cart.png";
import Product from "../../assets/images/product.jpg";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import AddToCartSideMenu from "./AddToCartSideMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const productData = useSelector((state) => state?.next?.productData);
  const { userInfo } = useSelector((state) => state.next);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeSearchTab, setActiveSearchTab] = useState("Products");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [category, setCategory] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userId")) || null;
  const [showCartSideMenu, setShowCartSideMenu] = useState(false);

  // Dummy products data
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setShowDropdown(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    alert("Logged out");
  };

  const handleSearchIconClick = () => {
    setShowSearchPopup(true);
    setSearchResults(dummyProducts);
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
    localStorage.removeItem('userId')
    toast.success('Logout Successfully!')
    navigate('/')
  }

  const toggleCartSideMenu = () => {
    setShowCartSideMenu(!showCartSideMenu);
  };

  return (
    <>
      {/* Shipping Banner */}
      <div className="bg-gradient-to-b text-primary from-black to-[#191919] text-xs sm:text-sm md:text-base text-gold-500 text-center py-2 px-2 font-semibold font-[inter] border-b border-black">
        For orders of Rs10,000 or more, enjoy free shipping all across Pakistan
      </div>

      {/* Navbar */}
      <nav className="flex flex-wrap justify-between items-center px-4 md:px-6 lg:px-12 py-3 md:py-4 lg:py-5 bg-black border-b-2 md:border-none border-gold-300 h-auto relative">
        {/* Logo */}
        <Link to="/" className="order-1 md:order-none flex-shrink-0">
          <img
            src={logo}
            alt="Al-Burak Logo"
            className="h-8 sm:h-10 md:h-14 lg:h-20 w-auto cursor-pointer"
          />
        </Link>

        {/* Mobile Search Bar - Only visible on mobile */}
        {isMobileView && (
          <div className="flex-grow mx-2 sm:mx-3 bg-black rounded-full p-1 sm:p-2 h-8 sm:h-10 border-2 border-primary flex items-center order-2">
            <input
              type="text"
              className="bg-transparent border-none text-primary flex-grow outline-none text-xs sm:text-sm pr-2"
              placeholder="Search here"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onFocus={handleSearchIconClick}
            />
            <FiSearch 
              className="text-primary cursor-pointer" 
              onClick={handleSearchIconClick}
            />
          </div>
        )}

        {/* Desktop Nav Links - Hidden on mobile */}
        {!isMobileView && (
          <div className="flex justify-center mx-4 lg:mx-8 flex-grow max-w-2xl">
            <ul className="flex flex-wrap list-none gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-center">
              <li>
                <Link
                  to="/"
                  className="no-underline text-lightGray font-medium text-sm sm:text-base md:text-lg font-[inter] transition-colors duration-300 py-2 hover:text-gold-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="no-underline text-lightGray font-medium text-sm sm:text-base md:text-lg font-[inter] transition-colors duration-300 py-2 hover:text-gold-500"
                >
                  New Arrivals
                </Link>
              </li>
              {category?.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/shop?category=${item.name}`}
                    className="no-underline text-lightGray font-medium text-sm sm:text-base md:text-lg font-[inter] transition-colors duration-300 py-2 hover:text-gold-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="#"
                  className="no-underline text-lightGray font-medium text-sm sm:text-base md:text-lg font-[inter] transition-colors duration-300 py-2 hover:text-gold-500"
                >
                  Deals
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="no-underline text-lightGray font-medium text-sm sm:text-base md:text-lg font-[inter] transition-colors duration-300 py-2 hover:text-gold-500"
                >
                  Gift Box
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Icon Group */}
        <div className="flex gap-3 sm:gap-4 md:gap-5 items-center relative order-3 md:order-none">
          {/* Desktop Search Icon - Hidden on mobile */}
          {!isMobileView && (
            <button
              className="text-primary hover:text-gold-500 transition-colors"
              onClick={handleSearchIconClick}
              aria-label="Search"
            >
              <FiSearch size={isMobileView ? 20 : 22} />
            </button>
          )}

          {/* Desktop Customer Icon - Hidden on mobile */}
          {!isMobileView && (
            <div className="relative">
              <button
                className="text-primary hover:text-gold-500 transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
                aria-label="User account"
              >
                <FiUser size={isMobileView ? 20 : 22} />
              </button>
              {showDropdown && (
                <div className="absolute bg-primary top-10 right-0 bg-gold-200 rounded-lg py-2 min-w-[180px] md:min-w-[200px] z-50 shadow-lg">
                  {userData ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setShowDropdown(false)}
                      >
                        <button className="w-full px-4 py-2 md:px-5 md:py-2.5 border-none bg-transparent text-left cursor-pointer text-black font-semibold hover:bg-gold-300 text-sm md:text-base">
                          Profile
                        </button>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowDropdown(false)}
                      >
                        <button className="w-full px-4 py-2 md:px-5 md:py-2.5 border-none bg-transparent text-left cursor-pointer text-black font-semibold hover:bg-gold-300 text-sm md:text-base">
                          Settings
                        </button>
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full px-4 py-2 md:px-5 md:py-2.5 border-none bg-transparent text-left cursor-pointer text-black font-semibold hover:bg-gold-300 text-sm md:text-base"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/signup" onClick={() => setShowDropdown(false)}>
                        <button className="w-full px-4 py-2 md:px-5 md:py-2.5 border-none bg-transparent text-left cursor-pointer text-black font-semibold hover:bg-gold-300 text-sm md:text-base">
                          Register
                        </button>
                      </Link>
                      <Link to="/login" onClick={() => setShowDropdown(false)}>
                        <button className="w-full px-4 py-2 md:px-5 md:py-2.5 border-none bg-transparent text-left cursor-pointer text-black font-semibold hover:bg-gold-300 text-sm md:text-base">
                          Login
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Cart Icon */}
          <div className="relative">
            <button
              className="text-primary hover:text-gold-500 transition-colors"
              onClick={toggleCartSideMenu}
              aria-label="Shopping cart"
            >
              <FiShoppingCart size={isMobileView ? 20 : 22} />
            </button>
            <div className="bg-darkRed w-4 h-4 md:w-5 md:h-5 rounded-full absolute -top-1 -right-1 md:-top-2 md:-right-2 flex justify-center items-center text-xs text-white font-bold">
              {productData?.length || 0}
            </div>
          </div>

          {/* Hamburger Menu Icon - Only visible on mobile */}
          {isMobileView && (
            <button
              className="text-primary hover:text-gold-500 transition-colors ml-1"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}
        </div>

        {/* Cart Side Menu */}
        <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-black z-[1002] transform transition-transform duration-300 ease-in-out ${showCartSideMenu ? 'translate-x-0' : 'translate-x-full'} border-l border-primary`}>
          <div className="flex justify-between items-center p-4 border-b border-primary">
            <h3 className="text-primary text-xl font-bold">Your Cart</h3>
            <button 
              onClick={toggleCartSideMenu}
              className="text-primary hover:text-gold-500"
              aria-label="Close cart"
            >
              <FiX size={24} />
            </button>
          </div>
          <AddToCartSideMenu />
        </div>
      </nav>

      {/* Mobile Menu - Only visible on mobile when toggled */}
      {isMenuOpen && isMobileView && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-80 z-[998] flex justify-center items-start pt-16 transition-opacity duration-500 ${
      isMenuOpen ? "opacity-100" : "opacity-0"
    }`}
    onClick={toggleMenu}
  >
    <div
      className={`relative w-[90%] max-w-[400px] bg-black border-2 border-primary rounded-xl py-4 z-[999] flex flex-col overflow-y-auto transition-transform duration-500 ${
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
      onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 h-8 w-8 bg-primary border-none rounded-full text-black text-xl cursor-pointer z-[1000] flex justify-center items-center"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
            <ul className="mt-4">
              {[
                { name: "Home", path: "/" },
                { name: "New Arrivals", path: "/shop" },
                ...category.map(item => ({ name: item.name, path: `/shop?category=${item.name}` })),
                { name: "Deals", path: "#" },
                { name: "Gift Box", path: "#" }
              ].map((item) => (
                <li key={item.name} className="list-none px-4 py-3 text-left border-b border-gray-800 last:border-b-0">
                  <Link
                    to={item.path}
                    className="no-underline text-lightGray font-medium text-base font-roboto block transition-colors duration-300 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {!userData ? (
              <div className="px-4 py-3 border-t border-gray-800">
                <Link
                  to="/login"
                  className="block w-full text-center bg-primary text-black font-bold py-2 px-4 rounded mb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center bg-transparent border border-primary text-primary font-bold py-2 px-4 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="px-4 py-3 border-t border-gray-800">
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-center bg-primary text-black font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search Popup */}
      {showSearchPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-12 md:pt-20 z-[1001] transition-opacity duration-300">
          <div className="bg-black rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-5 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-[540px] relative font-[inter]">
            <div className="flex items-center mb-4 md:mb-5 border-b border-lightGray2 pb-2 md:pb-2.5">
              <div className="flex items-center flex-grow pb-1">
                <span className="text-lightGray text-sm md:text-base mr-2 md:mr-2.5">
                  Search for...
                </span>
                <input
                  type="text"
                  className="bg-transparent border-none text-primary flex-grow text-sm md:text-base outline-none"
                  placeholder=""
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  ref={searchInputRef}
                />
              </div>
              <button
                onClick={handleCloseSearchPopup}
                className="bg-primary border-none w-5 h-5 rounded-full text-black text-xs cursor-pointer flex justify-center items-center p-0"
                aria-label="Close search"
              >
                <FiX size={12} />
              </button>
            </div>
            <div className="flex mb-4 md:mb-5">
              {["Products", "Suggestions"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-none font-bold cursor-pointer text-sm md:text-base transition-colors duration-200 ${
                    activeSearchTab === tab
                      ? "text-lightGray border-b-2 border-primary"
                      : "text-lightGray2"
                  }`}
                  onClick={() => handleSearchTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 md:gap-4 max-h-[60vh] overflow-y-auto">
              {activeSearchTab === "Products" &&
                (searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link 
                      to={`/product/${product.id}`} 
                      key={product.id}
                      onClick={handleCloseSearchPopup}
                    >
                      <div className="flex items-center bg-transparent rounded px-2 py-1 md:px-2 md:py-1.5 cursor-pointer transition-colors duration-200 hover:bg-lightGray2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mr-3 md:mr-4 object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-lightGray font-bold text-sm sm:text-base md:text-lg">
                            {product.name}
                          </span>
                          <span className="text-lightGray text-xs sm:text-sm">
                            Rs. {product.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : searchTerm.length > 0 ? (
                  <div className="text-gray-400 text-center my-4 md:my-5 italic text-sm md:text-base">
                    No products found for "{searchTerm}"
                  </div>
                ) : (
                  dummyProducts.map((product) => (
                    <Link 
                      to={`/product/${product.id}`} 
                      key={product.id}
                      onClick={handleCloseSearchPopup}
                    >
                      <div className="flex items-center bg-transparent rounded px-2 py-1 md:px-2 md:py-1.5 cursor-pointer transition-colors duration-200 hover:bg-lightGray2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mr-3 md:mr-4 object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-lightGray font-bold text-sm sm:text-base md:text-lg">
                            {product.name}
                          </span>
                          <span className="text-lightGray text-xs sm:text-sm">
                            Rs. {product.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ))}
              {activeSearchTab === "Suggestions" && (
                <div className="text-gray-400 text-center my-4 md:my-5 italic text-sm md:text-base">
                  No suggestions available yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;