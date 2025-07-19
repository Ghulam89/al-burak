import React from 'react';

const  Modal = ({ isOpen, onClose, children, className }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center  z-[1001] transition-opacity duration-300">
          <div className="bg-black  h-[80vh]  sm:max-w-3xl w-[90%] border-2 border-primary  relative font-[inter]">
           

            <div
              className={`inline-block align-bottom  text-left    shadow-xl transform transition-all    ${className} `}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
