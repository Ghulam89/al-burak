import React from "react";
import Modal from "../modal";
const ShippingModal = ({ isModalOpen, setIsModalOpen, closeModal,data}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className=" h-[80vh] overflow-y-auto px-4 rounded-3xl"
      
    >
       
        <div className="space-y-4">
          <div>
            <div className=" flex justify-between items-center py-4">
              <h2></h2>
              <div>
                <h3 className=" font-semibold  text-lg  text-black m-0">Shipping Information</h3>
              </div>
              
              <button 
              className=" h-6 w-6  bg-black border-none rounded-full text-white text-xl cursor-pointer z-[1000] flex justify-center items-center"
              onClick={closeModal}
            >
              &times;
            </button>
            </div>
            <p className=" text-black mt-1">
              {data?.description}
            </p>
          </div>

         
        </div>
      
    </Modal>
  );
};

export default ShippingModal;
