import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import product from "../../assets/images/product.jpg";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import Footer from "../header-footer.jsx/Footer";
import Banner from "./manhero";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/nextSlice";
import UserModal from "../context/UserModal";
import Navbar from "../Navbar";

import product1 from "../../assets/images/product1.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";
import product4 from "../../assets/images/product4.png";
import Button from "../common/Button";
import AddToCartSideMenu from "../header-footer.jsx/AddToCartSideMenu";


// Skeleton Loader Components
const ProductSkeleton = () => (
  <div className="relative w-full animate-pulse">
    <div className="bg-gray-200 rounded-lg h-[250px] sm:h-[300px] md:h-[400px]"></div>
    <div className="pt-7 text-center sm:px-8 px-4 rounded-b-xl">
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

const FilterSkeleton = () => (
  <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
);

const PaginationSkeleton = () => (
  <div className="flex justify-center items-center gap-2 mb-8">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
    ))}
  </div>
); 

// Sidebar Component
const Sidebar = ({ isOpen, onClose, searchParams, setSearchParams }) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [selectedGender, setSelectedGender] = useState(
    searchParams.get("gender") || null
  );
  const [selectedArticle, setSelectedArticle] = useState(
    searchParams.get("category") || null
  );
  const [selectedPricing, setSelectedPricing] = useState(
    searchParams.get("sort") || null
  );

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    const newParams = new URLSearchParams(searchParams);
    if (gender) {
      newParams.set("gender", gender);
    } else {
      newParams.delete("gender");
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (category) => {
    setSelectedArticle(category);
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set("category", category);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  const handlePriceSort = (sort) => {
    setSelectedPricing(sort);
    const newParams = new URLSearchParams(searchParams);
    if (sort) {
      newParams.set("sort", sort);
    } else {
      newParams.delete("sort");
    }
    setSearchParams(newParams);
  };

  const fetchCategory = async () => {
    const respose = await axios.get(`${BaseUrl}/v1/category`);
    setCategory(respose.data.categories);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div
  className={`fixed top-0 left-0 h-screen bg-white p-5 w-64 z-40  z-50 transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out overflow-y-auto`}
>
      <div className=" mb-3  flex justify-between items-center">
        <h2  className=" text-black text-lg">Filter</h2>
        <button
        onClick={onClose}
        className=" absolute top-4 right-4 text-black hover:text-black"
      >
        <FiX size={24} />
      </button>
      </div>
      <div className="mb-8">
        <h2 className="text-xl md:text-3xl  font-bold  mb-5 text-black font-[inter] tracking-[9px]">
          Gender
        </h2>
        <label className="flex items-center text-black mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="men"
            checked={selectedGender === "men"}
            onChange={() => handleGenderChange("men")}
            className="appearance-none text-black w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-black mr-3 checked:bg-black relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          Men
        </label>
        <label className="flex items-center text-black mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="women"
            checked={selectedGender === "women"}
            onChange={() => handleGenderChange("women")}
            className="appearance-none text-black w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-black mr-3 checked:bg-black relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          Women
        </label>
        <label className="flex items-center text-black mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="unisex"
            checked={selectedGender === "unisex"}
            onChange={() => handleGenderChange("unisex")}
            className="appearance-none text-black w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-black mr-3 checked:bg-black relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          Unisex
        </label>
      </div>
      <div className="mb-8">
        {/* <h2 className="text-xl md:text-3xl font-bold mb-5 text-black font-[inter] tracking-[9px]">
          category
        </h2> */}
        {category.map((item, index) => (
          <label
            key={index}
            className="flex items-center text-black mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer"
          >
            <input
              type="radio"
              name="categorys"
              value={item.name}
              checked={selectedArticle === item.name}
              onChange={() => handleCategoryChange(item.name)}
              className="appearance-none text-black w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-black mr-3 checked:bg-black relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
            />
            {item.name}
          </label>
        ))}
      </div>
      <div className="mb-8 border-t">
        <h2 className="text-xl md:text-2xl font-bold mb-5 text-black font-inter tracking-widest">
          Pricing
        </h2>
        <label className="flex items-center text-black mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer">
          <input
            type="radio"
            name="pricing"
            value="price-asc"
            checked={selectedPricing === "price-asc"}
            onChange={() => handlePriceSort("price-asc")}
            className="appearance-none text-black w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-black mr-3 checked:bg-black relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          Low to High
        </label>
        <label className="flex items-center text-black mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer">
          <input
            type="radio"
            name="pricing"
            value="price-desc"
            checked={selectedPricing === "price-desc"}
            onChange={() => handlePriceSort("price-desc")}
            className="appearance-none text-black w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-black mr-3 checked:bg-black relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          High to Low
        </label>
      </div>
    </div>
  );
};
const BestSelling = () => {
  const [showCartSideMenu, setShowCartSideMenu] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleCartSideMenu = () => {
    setShowCartSideMenu(!showCartSideMenu);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userId")) || null;
  const [isModalCustomer, setIsModalCustomer] = useState(false);
  const closeCustomerModal = () => setIsModalCustomer(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalProducts: 0
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (
      sidebarOpen &&
      !e.target.closest(".sidebar") &&
      !e.target.closest(".sidebar-toggle")
    ) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all query parameters
      const gender = searchParams.get("gender");
      const category = searchParams.get("category");
      const newArrivals = searchParams.get("newArrivals");
      const sort = searchParams.get("sort");
      const search = searchParams.get("search");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const rating = searchParams.get("rating");
      const page = searchParams.get("page") || pagination.page;
      const limit = searchParams.get("limit") || pagination.limit;

      // Build query string based on available parameters
      let queryString = `page=${page}&limit=${limit}`;
      if (gender) queryString += `&gender=${gender}`;
      if (category) queryString += `&category=${category}`;
      if (newArrivals === "true") queryString += `&newArrivals=true`;
      if (sort) queryString += `&sort=${sort}`;
      if (search) queryString += `&search=${search}`;
      if (minPrice) queryString += `&minPrice=${minPrice}`;
      if (maxPrice) queryString += `&maxPrice=${maxPrice}`;
      if (rating) queryString += `&rating=${rating}`;

      const response = await axios.get(`${BaseUrl}/v1/product?${queryString}`);
      setProducts(response.data.data);
      
      // Update pagination state
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
        totalProducts: response.data.totalProducts
      });
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const handleSortChange = (event) => {
    const newParams = new URLSearchParams(searchParams);
    if (event.target.value === "default") {
      newParams.delete("sort");
    } else {
      newParams.set("sort", event.target.value);
    }
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const AddToCart = async (product) => {
    try {
      if (!userData) {
        toast.error("Please login to add items to cart");
        setIsModalCustomer(true);
        return;
      }

      const selectedSize = product.sizes?.[0];

      const response = await axios.post(`${BaseUrl}/v1/cart`, {
        userId: userData?._id,
        productId: product._id,
        sizeId: selectedSize?._id,
        quantity: 1,
      });

      if (response.data.success === true) {
        toast.success("Product added to cart successfully!");
        navigate("/cart");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding to cart");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row bg-white text-white p-2.5 font-inter min-h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={toggleSidebar}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        <div className="flex-grow flex flex-col items-center pt-16 md:pt-0 overflow-y-auto">
          <div className="w-full flex justify-between items-center max-w-7xl py-3 mb-8 md:mb-5 px-4 md:px-0">
            {loading ? (
              <FilterSkeleton />
            ) : (
              <div onClick={toggleSidebar} className="flex gap-2 items-center cursor-pointer">
                <img src={require('../../assets/images/filter.png')} alt="" />
                <h3 className="text-black font-semibold">Filter</h3>
              </div>
            )}
            
            {loading ? (
              <FilterSkeleton />
            ) : (
              <div>
                <select
                  id="sort-by"
                  value={searchParams.get("sort") || "default"}
                  onChange={handleSortChange}
                  className="px-3 py-1 md:px-4 md:py-2 bg-transparent border text-black border-black text-black2 rounded font-inter font-bold text-sm md:text-base cursor-pointer"
                >
                  <option value="default">Sort</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full max-w-7xl pb-8">
              {[...Array(8)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-black text-center py-10">
              Error loading products: {error}
            </div>
          ) : products.length === 0 ? (
            <div className="text-black text-center py-10">
              No products found matching your criteria
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full max-w-7xl pb-8">
                {products.map((item, index) => (
                  <div key={index} className="relative w-full">
                    <div className="bg-black rounded-lg border border-black shadow-lg shadow-gold-100">
                      <img
                        src={item?.images?.[0]}
                        onClick={() => navigate(`/product/${item?._id}`)}
                        alt="product"
                        className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
                      />
                    </div>

                    <div className="pt-7 text-center sm:px-8 px-4 rounded-b-xl">
                 <h3 className="font-semibold text-base uppercase text-black font-[inter] mb-1 line-clamp-2 h-12 overflow-hidden">
                        {item?.name}
                      </h3>
                      <p className="text-black font-semibold font-[inter] text-base md:text-lg lg:text-xl mb-4">
                        Rs.{item?.sizes?.[0]?.price}
                      </p>
                      <Button
                        type="button"
                        onClick={() => {
                          dispatch(
                            addToCart({
                              _id: item?._id,
                              image: item?.images?.[0],
                              quantity: 1,
                              title: item?.name,
                              price: item?.sizes?.[0]?.price,
                              cutPrice: item?.sizes?.[0]?.price,
                            })
                          );
                          toggleCartSideMenu();
                        }}
                        label={"Add To Bag"}
                        className="border border-black mx-auto w-full font-semibold text-black rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {loading ? (
                <PaginationSkeleton />
              ) : pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-4 py-2 rounded-md ${pagination.page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 rounded-md ${pagination.page === pageNum ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`px-4 py-2 rounded-md ${pagination.page === pagination.totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                  >
                    Next
                  </button>
                </div>
              )}

              <div className="text-black mb-4">
                {loading ? (
                  <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
                ) : (
                  `Showing ${products.length} of ${pagination.totalProducts} products`
                )}
              </div>
            </>
          )}
        </div>

        {showCartSideMenu ? (
          <AddToCartSideMenu onClose={() => setShowCartSideMenu(false)} />
        ) : null}
      </div>
      <Footer />
      <UserModal
        setIsModalOpen={setIsModalCustomer}
        isModalOpen={isModalCustomer}
        closeModal={closeCustomerModal}
      />
    </>
  );
};

export default BestSelling;