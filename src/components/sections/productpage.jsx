import React, { useEffect, useState } from "react";
import Productimg from "../../assets/images/styledproduct.png";
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

const ProductPage = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const userData = JSON.parse(localStorage.getItem("userId")) || null;

  const dispatch = useDispatch();
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
      className={`px-5 py-1.5 font-bold text-sm border-2 rounded-lg ${
        selectedSize?.ml === size.ml
          ? " bg-primary border-primary text-black"
          : " text-primary border-primary"
      }`}
      onClick={() => setSelectedSize(size)}
    >
      {size.ml}ml
    </button>
  );

  const fetchSingleProduct = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/v1/product/${id}`);
      setSingleProduct(response?.data?.data);
      if (response?.data?.data?.sizes?.length > 0) {
        setSelectedSize(response.data.data.sizes[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  const calculatePrice = (size) => {
    if (!size) return 0;
    return size.price - size.price * (size.discount / 100);
  };

  const originalPrice = selectedSize?.price || 0;
  const discountedPrice = selectedSize ? calculatePrice(selectedSize) : 0;
  const discountPercentage = selectedSize?.discount || 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCustomer, setIsModalCustomer] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
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
        quantity:quantity,
      });

      if (response.data.success === true) {
        toast.success("Product added to cart successfully!");
        navigate("/cart");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
     toast.error(
        error.response?.data?.message)
    }
  };

  return (
    <div className="bg-black text-amber-400 font-sans min-h-screen p-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Column - Product Images */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6">
          {/* Thumbnails - Vertical on desktop, horizontal on mobile */}
          <div className="flex lg:flex-col gap-4 order-2 lg:order-1">
            {singleProduct?.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => selectImage(index)}
                className={`w-20 h-20 overflow-hidden ${
                  currentImageIndex === index
                    ? "border-4 border-white rounded-tl-full rounded-tr-full"
                    : "border-4 border-lightGray rounded-tl-full rounded-tr-full"
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

          {/* Main Image with Slider */}
          <div className="relative flex-1 order-1 lg:order-2">
            <div className="relative overflow-hidden h-[650px] border-8 border-lightGray rounded-tl-full rounded-tr-full">
              <img
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                src={singleProduct?.images?.[currentImageIndex]}
                alt="Main product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="flex-1 max-w-lg">
          <h1 className="text-4xl text-primary font-bold mb-2.5">
            {singleProduct?.name}
          </h1>

          <div className="flex items-center text-lg text-secondary">
            {"★".repeat(5)}
            <span className="ml-2 text-lightGray text-sm">
              {singleProduct?.reviews?.length || 0} reviews
            </span>
          </div>

          {selectedSize && (
            <div className="flex items-center gap-3 mb-1">
              <span className="text-red text-2xl text-darkRed font-bold">
                Rs. {discountedPrice.toFixed(2)}
              </span>
              {discountPercentage > 0 && (
                <>
                  <span className="text-lightGray text-xl line-through">
                    Rs. {originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-secondary text-black px-3 py-1 rounded-xl text-sm">
                    {discountPercentage}% off
                  </span>
                </>
              )}
            </div>
          )}

          <h4 className="text-xl text-lightGray mb-3">Quantity</h4>
          <div className="flex items-center border border-lightGray py-1.5 rounded-lg overflow-hidden w-fit mb-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 text-xl text-lightGray2"
              disabled={quantity <= 1}
            >
              <FaMinus />
            </button>
            <span className="px-4 text-xl text-lightGray font-bold">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 text-xl text-lightGray2"
            >
              <FaPlus />
            </button>
          </div>

          <h4 className="text-xl text-lightGray mb-3.5">Size</h4>
          <div className="flex gap-4 mb-6">
            {singleProduct?.sizes?.map((size, index) => (
              <SizeButton key={index} size={size} />
            ))}
          </div>

          <ul className="space-y-1 text-lightGray mb-5">
            <li className="flex items-center">
              <img src={Tik} alt="tick" className="w-6 mr-2" />
              400,000+ Happy customers
            </li>
            <li className="flex items-center">
              <img src={Safe} alt="safe" className="w-6 mr-2" />
              Easy Return & Exchange
            </li>
            <li className="flex items-center">
              <img src={Van} alt="van" className="w-6 mr-2" />
              Fast delivery all over Pakistan
            </li>
            <li className="flex items-center">
              <img src={Ready} alt="ready" className="w-6 mr-2" />
              Product ready to ship
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    _id: singleProduct?._id,
                    image: singleProduct?.images[0],
                    description: singleProduct?.description,
                    title: singleProduct?.name,
                    quantity: quantity,
                    sizeId: selectedSize._id,
                    price: selectedSize.price,
                  })
                );
                navigate("/cart");
              }}
              className="w-full py-4 border-2 border-primary text-primary font-bold text-xl rounded-full"
            >
              Add to cart
            </button>
            <button  onClick={() => {
                dispatch(
                  addToCart({
                    _id: singleProduct?._id,
                    image: singleProduct?.images[0],
                    description: singleProduct?.description,
                    title: singleProduct?.name,
                    quantity: quantity,
                    sizeId: selectedSize._id,
                  })
                );
                navigate("/checkout");
              }} className="w-full py-4 bg-primary text-black font-bold text-xl rounded-full">
              Buy now
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 border border-amber-200 text-amber-200 text-xl rounded-lg"
            >
              Description
            </button>
            <button className="w-full py-3 border border-amber-200 text-amber-200 text-xl rounded-lg">
              Shipping Information
            </button>
          </div>
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
      
    </div>
  );
};

export default ProductPage;
