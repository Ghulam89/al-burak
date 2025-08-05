import React, { useEffect, useState } from "react";
import Productimg from "../../assets/images/styledproduct.png";
import product1 from '../../assets/images/product1.png';
import product2 from '../../assets/images/product2.png';
import product3 from '../../assets/images/product3.png';
import product4 from '../../assets/images/product4.png';
import Tik from "../../assets/images/tik.png";
import Safe from "../../assets/images/safehande.png";
import Van from "../../assets/images/van.png";
import Ready from "../../assets/images/ready.png";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserModal from "../context/UserModal";
import DescriptionModal from "../context/DescriptionModal";
import { toast } from "react-toastify";
import { addToCart } from "../../store/nextSlice";
import { useDispatch } from "react-redux";
import AddToCartSideMenu from "../header-footer.jsx/AddToCartSideMenu";
import ShippingModal from "../context/ShippingModal";

const ProductPage = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({
    name: "",
    images: [],
    sizes: [],
    reviews: [],
    description: "",
    itemDetails: []
  });
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userId")) || null;

  const dispatch = useDispatch();
  const [showCartSideMenu, setShowCartSideMenu] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const toggleCartSideMenu = () => {
    setShowCartSideMenu(!showCartSideMenu);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === singleProduct?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? singleProduct?.images?.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const SizeButton = ({ size }) => (
    <button
      className={`px-3 sm:px-5 py-1 font-bold text-sm border-2 rounded-lg ${
        selectedSize?.ml === size.ml
          ? "bg-black border-black text-white"
          : "text-black border-black"
      }`}
      onClick={() => setSelectedSize(size)}
    >
      {size.ml}ml
    </button>
  );

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BaseUrl}/v1/product/${id}`);
      setSingleProduct(response?.data?.data);
      // Set first size as selected by default if sizes exist
      if (response?.data?.data?.sizes?.length > 0) {
        setSelectedSize(response.data.data.sizes[0]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch product");
      toast.error(err.response?.data?.message || "Failed to fetch product");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]); // Only depend on id

  const calculatePrice = (size) => {
    if (!size) return 0;
    return size.price - size.price * (size.discount / 100);
  };

  const originalPrice = selectedSize?.price || 0;
  const discountedPrice = selectedSize ? calculatePrice(selectedSize) : 0;
  const discountPercentage = selectedSize?.discount || 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShippingModal, setIsShippingModal] = useState(false);
  const [isModalCustomer, setIsModalCustomer] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ShippingcloseModal = () => {
    setIsShippingModal(false);
  };
  const closeCustomerModal = () => {
    setIsModalCustomer(false);
  };

  const navigate = useNavigate();

  const AddToCart = async () => {
    try {
      if (!selectedSize) {
        toast.error("Please select a size");
        return;
      }

      const response = await axios.post(`${BaseUrl}/v1/cart`, {
        userId: userData?._id,
        productId: singleProduct._id,
        sizeId: selectedSize._id,
        quantity: quantity,
      });

      if (response.data.success === true) {
        toast.success("Product added to cart successfully!");
        navigate("/cart");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  // Skeleton Loader Components
  const ImageSkeleton = () => (
    <div className="relative mb-4 sm:mb-6">
      <div className="relative overflow-hidden h-64 sm:h-96 md:h-[550px] border rounded-2xl border-black bg-gray-200 animate-pulse"></div>
    </div>
  );

  const ThumbnailSkeleton = () => (
    <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 animate-pulse rounded"></div>
      ))}
    </div>
  );

  const TextSkeleton = ({ width = 'full', height = 'h-4' }) => (
    <div className={`bg-gray-200 rounded ${height} ${width === 'full' ? 'w-full' : `w-${width}`} animate-pulse mb-2`}></div>
  );

  const ButtonSkeleton = () => (
    <div className="w-full py-3 sm:py-4 bg-gray-200 rounded-full animate-pulse"></div>
  );

  const SizeSkeleton = () => (
    <div className="flex flex-wrap gap-2 sm:gap-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );

  return (
    <div className="bg-white text-amber-400 font-sans min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 sm:gap-12">
        {/* Left Column - Product Images */}
        <div className="w-full lg:w-6/12">
          {isLoading ? (
            <>
              <ImageSkeleton />
              <ThumbnailSkeleton />
            </>
          ) : (
            <>
              {/* Main Image */}
              <div className="relative mb-4 sm:mb-6">
                <div className="relative overflow-hidden h-64 sm:h-96 md:h-[550px] border rounded-2xl border-black">
                  {singleProduct?.images?.length > 0 ? (
                    <img
                      src={singleProduct.images[currentImageIndex]}
                      alt="Main product"
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      No image available
                    </div>
                  )}
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
                {singleProduct?.images?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden ${
                      currentImageIndex === index
                        ? "border-2 border-black"
                        : "border border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Column - Product Info */}
        <div className="w-full lg:w-6/12 lg:pl-4">
          {isLoading ? (
            <>
              <TextSkeleton width="3/4" height="h-8" />
              <TextSkeleton width="1/2" height="h-6" />
              <div className="my-6">
                <TextSkeleton width="1/4" height="h-6" />
                <div className="flex items-center gap-2 my-2">
                  <TextSkeleton width="1/6" height="h-8" />
                  <TextSkeleton width="1/6" height="h-8" />
                </div>
              </div>
              <div className="my-6">
                <TextSkeleton width="1/4" height="h-6" />
                <div className="w-24 h-10 bg-gray-200 rounded-lg my-2 animate-pulse"></div>
              </div>
              <div className="my-6">
                <TextSkeleton width="1/4" height="h-6" />
                <SizeSkeleton />
              </div>
              <div className="space-y-3 my-6">
                {[...Array(4)].map((_, index) => (
                  <TextSkeleton key={index} width="full" height="h-5" />
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <ButtonSkeleton />
                <ButtonSkeleton />
              </div>
              <div className="space-y-3">
                <ButtonSkeleton />
                <ButtonSkeleton />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-black font-bold mb-2">
                {singleProduct?.name}
              </h1>

              <div className="flex items-center text-lg text-secondary mb-4">
                {"★".repeat(5)}
                <span className="ml-2 text-gray-500 text-sm">
                  {singleProduct?.reviews?.length || 0} reviews
                </span>
              </div>

              {selectedSize && (
                <div className="flex items-center gap-2 sm:gap-3 mb-4">
                  <span className="text-xl sm:text-2xl text-darkRed font-bold">
                    Rs. {discountedPrice.toFixed(2)}
                  </span>
                  {discountPercentage > 0 && (
                    <>
                      <span className="text-black text-lg sm:text-xl line-through">
                        Rs. {originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-secondary text-black px-2 sm:px-3 py-1 rounded-xl text-xs sm:text-sm">
                        {discountPercentage}% off
                      </span>
                    </>
                  )}
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-lg sm:text-xl text-black mb-2">Quantity</h4>
                <div className="flex items-center border border-black py-1 rounded-lg overflow-hidden w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 sm:px-4 text-lg text-black"
                    disabled={quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="px-3 sm:px-4 text-lg text-black font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 sm:px-4 text-lg text-black"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg sm:text-xl text-black mb-2">Size</h4>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {singleProduct?.sizes?.map((size, index) => (
                    <SizeButton key={index} size={size} />
                  ))}
                </div>
              </div>

              <ul className="space-y-1 mb-6 text-sm sm:text-base">
                <li className="flex items-center text-black">
                  <img src={Tik} alt="tick" className="w-5 sm:w-6 mr-2" />
                  400,000+ Happy customers
                </li>
                <li className="flex items-center text-black">
                  <img src={Safe} alt="safe" className="w-5 sm:w-6 mr-2" />
                  Easy Return & Exchange
                </li>
                <li className="flex items-center text-black">
                  <img src={Van} alt="van" className="w-5 sm:w-6 mr-2" />
                  Fast delivery all over Pakistan
                </li>
                <li className="flex items-center text-black">
                  <img src={Ready} alt="ready" className="w-5 sm:w-6 mr-2" />
                  Product ready to ship
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={() => {
                    if (!selectedSize) {
                      toast.error("Please select a size");
                      return;
                    }
                    dispatch(
                      addToCart({
                        _id: singleProduct._id,
                        image: singleProduct.images[0] || product4,
                        description: singleProduct.description,
                        title: singleProduct.name,
                        quantity: quantity,
                        sizeId: selectedSize._id,
                        price: discountedPrice,
                        cutPrice: originalPrice
                      })
                    );
                    toggleCartSideMenu();
                  }}
                  className="w-full py-3 sm:py-4 border-2 border-black text-black font-bold text-lg sm:text-xl rounded-full"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => {
                    if (!selectedSize) {
                      toast.error("Please select a size");
                      return;
                    }
                    dispatch(
                      addToCart({
                        _id: singleProduct._id,
                        image: singleProduct.images[0] || product4,
                        description: singleProduct.description,
                        title: singleProduct.name,
                        quantity: quantity,
                        sizeId: selectedSize._id,
                        price: discountedPrice,
                        cutPrice: originalPrice
                      })
                    );
                    navigate("/checkout");
                  }}
                  className="w-full py-3 sm:py-4 bg-black text-white font-bold text-lg sm:text-xl rounded-full"
                >
                  Buy now
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-2 sm:py-3 border border-black text-black text-lg sm:text-xl rounded-lg"
                >
                  Description
                </button>
                <button 
                  onClick={() => setIsShippingModal(true)} 
                  className="w-full py-2 sm:py-3 border border-black text-black text-lg sm:text-xl rounded-lg"
                >
                  Shipping Information
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <UserModal
        setIsModalOpen={setIsModalCustomer}
        isModalOpen={isModalCustomer}
        closeModal={closeCustomerModal}
      />
      <DescriptionModal
        data={singleProduct}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      <ShippingModal
        data={singleProduct}
        setIsModalOpen={setIsShippingModal}
        isModalOpen={isShippingModal}
        closeModal={ShippingcloseModal}
      />

      {showCartSideMenu && (
        <AddToCartSideMenu onClose={() => setShowCartSideMenu(false)} />
      )}
    </div>
  );
};

export default ProductPage;