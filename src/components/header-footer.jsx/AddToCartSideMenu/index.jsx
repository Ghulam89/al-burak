import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productImage from "../../../assets/images/product1.png";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import Button from "../../common/Button";

const AddToCartSideMenu = ({ onClose }) => {
  const products = [
    {
      id: 1,
      name: "Creed Aventus- 100ml",
      price: 2099,
      image: productImage,
      quantity: 1,
    },
    {
      id: 2,
      name: "Creed Aventus- 100ml",
      price: 2099,
      image: productImage,
      quantity: 1,
    },
    {
      id: 3,
      name: "Coco Chanel",
      price: 2099,
      image: productImage,
      quantity: 1,
    },
    {
      id: 4,
      name: "Coco Chanel",
      price: 2099,
      image: productImage,
      quantity: 1,
    },
  ];

  const [cartItems, setCartItems] = useState(products);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-[1001] flex justify-end bg-white bg-opacity-50">
      <div
        className={`bg-white w-full max-w-md h-full overflow-y-auto transform transition-transform duration-300 ease-in-out shadow-lg ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-black">Shopping Cart</h2>
          <button onClick={handleClose} className="text-black">
            <FaTimes size={18} />
          </button>
        </div>

        <div className="  border border-green bg-[#ecf9fc] text-center text-green p-4">

          <p>Just One step away from completing your order.</p>
          
        </div>

        {/* Items */}
        <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
          {cartItems.map((product) => (
            <div key={product.id} className="flex items-start gap-4 pb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md border"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="   font-semibold text-black">{product.name}</p>
                </div>
                <p className=" text-black font-semibold mt-1  flex items-center gap-2 line-through">
                  Rs. {product.price.toLocaleString()}{" "}
                  <p className="  text-darkRed font-semibold  line-through">
                    Rs. {product.price.toLocaleString()}
                  </p>
                </p>
                <div className=" flex items-center gap-2 mt-3">
                  <div className="flex items-center border-2 border-black  rounded-xl">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                      className="w-7 h-7 flex items-center justify-center  text-[#23344E] rounded-r hover:bg-gray-200"
                    >
                      <FaPlus size={12} />
                    </button>
                    <span className="w-8 h-7 flex items-center justify-center text-black text-sm">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, product.quantity - 1)
                      }
                      className="w-7 h-7 flex items-center justify-center  text-[#23344E]  hover:bg-gray-200"
                    >
                      <FaMinus size={12} />
                    </button>
                  </div>

                  <button onClick={() => removeItem(product.id)}>
                    <img src={require("../../../assets/images/del.png")} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t   space-y-4">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-black text-base font-medium">Subtotal:</span>
            <span className="text-black  text-base font-semibold">
              Rs {subtotal.toLocaleString()}
            </span>
          </div>

          <Link to="/checkout" onClick={handleClose} className="">
            <Button
              label={"Proceed to Checkout"}
              className="block w-full bg-black text-white text-center py-2.5  font-medium hover:bg-primary hover:text-black transition"
            />
          </Link>

          <Link to="/shop" onClick={handleClose}>
            <Button
              label={" Continue Shopping"}
              className="block w-full border mt-5    border-black text-black text-center py-2.5 font-medium  hover:bg-primary hover:border-primary transition"
            />
          </Link>

          <p className="text-xs text-black text-center">
            Taxes included. Shipping calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddToCartSideMenu;
