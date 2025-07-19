import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import product from "../../assets/images/product.jpg";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import Navbar from "../header-footer.jsx/Navbar";
import Footer from "../header-footer.jsx/Footer";
import Banner from "./manhero";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/nextSlice";
import UserModal from "../context/UserModal";

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
      className={`fixed md:static inset-y-0 left-0 bg-black  p-5 w-64 z-40 flex-shrink-0 border-r border-amber-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 text-amber-300 hover:text-white"
      >
        <FiX size={24} />
      </button>
      <div className="mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-5  text-primary font-[inter] tracking-[9px]">
          Gender
        </h2>
        <label className="flex items-center text-lightGray mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="men"
            checked={selectedGender === "men"}
            onChange={() => handleGenderChange("men")}
            className="appearance-none text-lightGray w-4 h-4 md:w-5 md:h-5 rounded-full border-2  border-lightGray mr-3 checked:bg-primary relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          Men
        </label>
        <label className="flex items-center text-lightGray mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="women"
            checked={selectedGender === "women"}
            onChange={() => handleGenderChange("women")}
            className="appearance-none text-lightGray w-4 h-4 md:w-5 md:h-5 rounded-full border-2  border-lightGray mr-3 checked:bg-primary relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          Women
        </label>
        <label className="flex items-center text-lightGray mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="unisex"
            checked={selectedGender === "unisex"}
            onChange={() => handleGenderChange("unisex")}
            className="appearance-none text-lightGray w-4 h-4 md:w-5 md:h-5 rounded-full border-2  border-lightGray mr-3 checked:bg-primary relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          Unisex
        </label>
      </div>
      <div className="mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-5  text-primary font-[inter] tracking-[9px]">
          category
        </h2>
        {category.map((item, index) => (
          <label
            key={index}
            className="flex items-center text-lightGray mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer"
          >
            <input
              type="radio"
              name="categorys"
              value={item.name}
              checked={selectedArticle === item.name}
              onChange={() => handleCategoryChange(item.name)}
              className="appearance-none text-lightGray w-4 h-4 md:w-5 md:h-5 rounded-full border-2  border-lightGray mr-3 checked:bg-primary relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
            />
            {item.name}
          </label>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-5 text-amber-300 font-inter tracking-widest">
          Pricing
        </h2>
        <label className="flex items-center text-lightGray mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer">
          <input
            type="radio"
            name="pricing"
            value="price-asc"
            checked={selectedPricing === "price-asc"}
            onChange={() => handlePriceSort("price-asc")}
            className="appearance-none text-lightGray w-4 h-4 md:w-5 md:h-5 rounded-full border-2  border-lightGray mr-3 checked:bg-primary relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          Low to High
        </label>
        <label className="flex items-center text-lightGray mb-4 text-base md:text-lg font-[inter] tracking-[3px] cursor-pointer">
          <input
            type="radio"
            name="pricing"
            value="price-desc"
            checked={selectedPricing === "price-desc"}
            onChange={() => handlePriceSort("price-desc")}
            className="appearance-none text-lightGray w-4 h-4 md:w-5 md:h-5 rounded-full border-2  border-lightGray mr-3 checked:bg-primary relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-black checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          High to Low
        </label>
      </div>
    </div>
  );
};

const BestSelling = () => {
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const category = searchParams.get("category");
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all query parameters
      const gender = searchParams.get("gender");
      const category = searchParams.get("category");
      const sort = searchParams.get("sort");
      const search = searchParams.get("search");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const rating = searchParams.get("rating");

      // Build query string based on available parameters
      let queryString = "";
      if (gender) queryString += `&gender=${gender}`;
      if (category) queryString += `&category=${category}`;
      if (sort) queryString += `&sort=${sort}`;
      if (search) queryString += `&search=${search}`;
      if (minPrice) queryString += `&minPrice=${minPrice}`;
      if (maxPrice) queryString += `&maxPrice=${maxPrice}`;
      if (rating) queryString += `&rating=${rating}`;

      const response = await axios.get(`${BaseUrl}/v1/product?${queryString}`);
      setProducts(response.data.data);
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
      <Banner categoryName={category} />
      <div className="flex flex-col md:flex-row bg-black text-white border-t border-amber-500 p-2.5 font-inter min-h-screen">
        {/* Mobile Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-30 bg-black p-2 rounded-md border border-amber-300 text-amber-300"
        >
          <FiMenu size={24} />
        </button>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        <Sidebar
          isOpen={sidebarOpen}
          onClose={toggleSidebar}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <div className="flex-grow flex flex-col items-center md:pl-5 pt-16 md:pt-0">
          <div className="w-full flex justify-between items-center md:pr-5 py-3 mb-8 md:mb-5 px-4 md:px-0">
            <div>
              <h4 className="text-lightGray text-lg font-[inter]">
                {products.length}{" "}
                {products.length === 1 ? "Product" : "Products"}
              </h4>
            </div>
            <div>
              <select
                id="sort-by"
                value={searchParams.get("sort") || "default"}
                onChange={handleSortChange}
                className="px-3 py-1 md:px-4 md:py-2 bg-transparent border border-lightGray text-lightGray2 rounded font-inter font-bold text-sm md:text-base cursor-pointer"
              >
                <option value="default">Sort</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-amber-300 py-4">
                <div class="animate-spin rounded-full h-10 w-10 border-4 border-dotted  border-lightGray border-t-transparent"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-500 py-4">{error}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl px-4 pb-8">
              {products.map((item, index) => (
                <div key={index} className="relative mx-auto w-full max-w-sm">
                  <div className="bg-black border-8 border-lightGray rounded-tl-full rounded-tr-full overflow-hidden shadow-lg shadow-gold-100">
                    <Link to={`/product/${item?._id}`}>
                      <img
                        src={item?.images?.[0]}
                        alt="product"
                        className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
                      />
                    </Link>

                    <div className="absolute top-2 right-4 md:top-4 md:right-8 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 md:border-4 border-gray-300 bg-black flex justify-center items-center">
                      <span
                        className={`text-white text-xl md:text-2xl font-bold ${
                          index === 1 ? "text-red-500" : "text-white"
                        }`}
                      >
                        ♥
                      </span>
                    </div>
                  </div>

                  <div className="bg-black pt-4 md:pt-7 text-center w-full md:w-[230px] mx-auto rounded-b-xl">
                    <h3 className="font-bold text-lg md:text-2xl text-lightGray font-[inter] mb-1">
                      {item?.name}
                    </h3>
                    <div className="">
                      <p className="text-sm md:text-base lg:text-xl font-medium font-[inter] text-lightGray mb-2">
                        {item?.description}
                      </p>
                    </div>
                    <p className="text-amber-300 font-medium font-[inter] text-base md:text-lg lg:text-xl mb-4">
                      Rs. {item.sizes?.[0]?.price || "N/A"}
                    </p>
                    <button
                      onClick={() => {
                        dispatch(
                          addToCart({
                            _id: item?._id,
                            image: item?.images[0],
                            description: item?.description,
                            title: item?.name,
                            quantity: 1,
                          })
                        );
                        AddToCart(item);
                      }}
                      className="font-[inter] w-full h-[45px] sm:h-[50px] md:h-[64px] text-black bg-lightGray border-none font-inter rounded-lg cursor-pointer font-bold text-sm sm:text-base md:text-lg hover:bg-primary transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-lightGray py-8">
                No products found matching your criteria.
              </div>
            )
          )}
        </div>
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
