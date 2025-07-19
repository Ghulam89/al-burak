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
  const logout = ()=>{
    localStorage.removeItem('userId')
    toast.success('Logout Successfully!')
    navigate('/')
  }

  return (
    <>
      {/* Shipping Banner */}
      <div className="bg-gradient-to-b text-primary from-black to-[#191919] text-sm sm:text-base text-gold-500 text-center py-2.5   font-semibold font-[inter] border-b border-black">
        For orders of Rs10,000 or more, enjoy free shipping all across Pakistan
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 md:px-12 py-3 md:py-7 bg-black border-b-2 md:border-none border-gold-300 h-28 md:h-auto relative flex-wrap">
        {/* Logo */}
        <Link to="/" className="order-1 md:order-none">
          <img
            src={logo}
            alt="Al-Burak Logo"
            className="h-11 md:h-24 w-auto cursor-pointer"
          />
        </Link>

        {/* Mobile Search Bar */}
        {isMobileView && (
          <div className="flex-grow mx-3 bg-black rounded-full p-2 h-10 w-6 border-2  border-primary flex items-center order-2">
            <input
              type="text"
              className="bg-transparent border-none  text-primary flex-grow outline-none text-sm pr-2"
              placeholder="Search here"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onFocus={handleSearchIconClick}
            />
            <div
              className="w-6 h-6 bg-contain bg-center bg-no-repeat cursor-pointer"
              style={{ backgroundImage: `url(${searchIcon})` }}
              onClick={handleSearchIconClick}
            />
          </div>
        )}

        {/* Desktop Nav Links */}
        {!isMobileView && (
          <ul className="flex list-none gap-6">
            <li>
              <Link
                to="/"
                className="no-underline  text-lightGray font-medium text-lg font-[inter] transition-colors duration-300 py-2 hover:text-gold-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="no-underline  text-lightGray font-medium text-lg font-[inter] transition-colors duration-300 py-2 hover:text-gold-500"
              >
                New Arrivals
              </Link>
            </li>
            {category?.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={`/shop?category=${item.name}`}
                    className="no-underline  text-lightGray font-medium text-lg font-[inter] transition-colors duration-300 py-2 hover:text-gold-500"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}

            <li>
              <Link
                to="/deals"
                className="no-underline  text-lightGray font-medium text-lg font-[inter] transition-colors duration-300 py-2 hover:text-gold-500"
              >
                Deals
              </Link>
            </li>
            <li>
              <Link
                to="/gift-box"
                className="no-underline  text-lightGray font-medium text-lg font-[inter] transition-colors duration-300 py-2 hover:text-gold-500"
              >
                Gift Box
              </Link>
            </li>
          </ul>
        )}

        {/* Icon Group */}
        <div className="flex gap-1 md:gap-4 items-center relative order-3 md:order-none">
          {/* Desktop Search Icon */}
          {!isMobileView && (
            <div
              className="w-7 h-7 rounded-full bg-contain bg-center bg-no-repeat cursor-pointer transition-transform duration-200 hover:scale-110"
              style={{ backgroundImage: `url(${searchIcon})` }}
              onClick={handleSearchIconClick}
            />
          )}

          {/* Desktop Customer Icon */}
          {!isMobileView && (
            <div className="relative">
              <div
                className="w-7 h-7 rounded-full bg-contain bg-center bg-no-repeat cursor-pointer transition-transform duration-200 hover:scale-110"
                style={{ backgroundImage: `url(${Customer})` }}
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute bg-primary top-10 right-0 bg-gold-200 rounded-lg py-2 min-w-[200px] z-50 shadow-lg">
                  {userData ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setShowDropdown(false)}
                      >
                        <button className="w-full px-5 py-2.5 border-none bg-transparent text-left cursor-pointer text-black font-semibold hover:bg-gold-300">
                          Profile
                        </button>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowDropdown(false)}
                      >
                        <button className="w-full px-5 py-2.5 border-none bg-transparent text-left cursor-pointer text-black font-semibold hover:bg-gold-300">
                          Settings
                        </button>
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full px-5 py-2.5 border-none bg-transparent text-left cursor-pointer text-black font-semibold hover:bg-gold-300"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                    <Link to="/signup" onClick={() => setShowDropdown(false)}>
                      <button className="w-full px-5 py-2.5 border-none bg-transparent text-left cursor-pointer text-black font-semibold hover:bg-gold-300">
                        Register
                      </button>
                    </Link>
                     <Link to="/login" onClick={() => setShowDropdown(false)}>
                      <button className="w-full px-5 py-2.5 border-none bg-transparent text-left cursor-pointer text-black font-semibold hover:bg-gold-300">
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
          <Link to={"/cart"}>
            <div
              className="w-7 h-7 rounded-full bg-contain bg-center  relative bg-no-repeat cursor-pointer transition-transform duration-200 hover:scale-110"
              style={{ backgroundImage: `url(${cart})` }}
            />
            <div className=" bg-darkRed w-5 h-5 rounded-full absolute -top-2 -right-2 flex justify-center items-center text-xs text-white font-bold">
              {productData?.length || 0}
            </div>
          </Link>
          {/* Hamburger Menu Icon */}
          {isMobileView && (
            <button
              className="text-primary  text-primary text-xl cursor-pointer ml-2.5 order-4 md:hidden"
              onClick={toggleMenu}
            >
              ☰
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && isMobileView && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-[998] flex justify-center items-center transition-opacity duration-300"
          onClick={toggleMenu}
        >
          <button
            className="absolute top-16 right-2.5 h-6 w-6  bg-primary border-none rounded-full text-black text-xl cursor-pointer z-[1000] flex justify-center items-center"
            onClick={toggleMenu}
          >
            &times;
          </button>
          <ul
            className="relative w-[95%] max-w-[500px] h-[340px] bg-black border-2  border-primary rounded-xl py-5 z-[999] flex flex-col justify-around overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {[
              "Home",
              "New Arrivals",
              "Men Perfumes",
              "Women Perfumes",
              "Attar/Out",
              "Deals",
              "Gift Box",
            ].map((item) => (
              <li key={item} className="list-none px-5 py-1 text-left">
                <Link
                  to={`/${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="no-underline   text-lightGray font-medium text-lg font-roboto block transition-colors duration-300  hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search Popup */}
      {showSearchPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-12 z-[1001] transition-opacity duration-300">
          <div className="bg-black rounded-3xl p-5 w-[90%] max-w-[540px] relative font-[inter]">
            <div className="flex items-center mb-5 border-b  border-lightGray2 pb-2.5">
              <div className="flex items-center flex-grow pb-1">
                <span className=" text-lightGray text-base mr-2.5">
                  Search for...
                </span>
                <input
                  type="text"
                  className="bg-transparent border-none  text-primary flex-grow text-base outline-none"
                  placeholder=""
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  ref={searchInputRef}
                />
              </div>
              <button
                onClick={handleCloseSearchPopup}
                className=" bg-primary border-none w-5 h-5 rounded-full text-black text-xs cursor-pointer flex justify-center items-center p-0"
              >
                ✖
              </button>
            </div>
            <div className="flex mb-5">
              {["Products", "Suggestions"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2.5 bg-transparent border-none font-bold cursor-pointer    text-primary text-sm transition-colors duration-200 ${
                    activeSearchTab === tab
                      ? " text-lightGray"
                      : " text-lightGray2"
                  }`}
                  onClick={() => handleSearchTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {activeSearchTab === "Products" &&
                (searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center bg-transparent rounded px-2 py-1.5 cursor-pointer transition-colors duration-200  hover:bg-lightGray2"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 mr-4  object-cover"
                      />
                      <div className="flex flex-col">
                        <span className=" text-lightGray font-bold text-lg">
                          {product.name}
                        </span>
                        <span className=" text-lightGray  text-sm">
                          Rs. {product.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))
                ) : searchTerm.length > 0 ? (
                  <div className="text-gray-400 text-center mt-5 italic">
                    No products found for "{searchTerm}"
                  </div>
                ) : (
                  dummyProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center bg-transparent rounded px-0 py-1.5 cursor-pointer transition-colors duration-200 hover:bg-gray-800"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-15 h-15 rounded mr-4 object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-primary font-bold text-base">
                          {product.name}
                        </span>
                        <span className="text-secondary font-bold text-sm">
                          Rs. {product.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))
                ))}
              {activeSearchTab === "Suggestions" && (
                <div className="text-gray-400 text-center mt-5 italic">
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
