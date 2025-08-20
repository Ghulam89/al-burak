import React, { useState } from "react";
import {
  FaClosedCaptioning,
  FaMixcloud,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import Modal from "../modal";
import { BaseUrl } from "../../utils/BaseUrl";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const ReviewModal = ({
  isModalOpen,
  setIsModalOpen,
  closeModal,
  fetchData,
  productId,
  userId,
  orderId,
}) => {
  console.log(fetchData);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // Add this new state

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userId")) || null;
console.log(userData );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const productId = fetchData?._id;
      const formData = new FormData();
      formData.append("userId", userData?._id);
      formData.append("comment", reviewComment);
      formData.append("rating", rating.toString());
      formData.append("orderId", orderId);
      if (file) {
        formData.append("images", file);
      }

      const response = await axios.post(
        `${BaseUrl}/v1/product/review/${productId}`,
        formData
      );

      if (response?.data?.success === true) {
        toast.success(response?.data?.message);

        setRating(0);
        setReviewTitle("");
        setReviewComment("");
        setFile(null);
        closeModal();
        if (fetchData) {
          fetchData();
        }
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(err.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };
 // Modify your file input change handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="h-[80vh] rounded-xl overflow-y-auto px-4 w-full py-5"
    >
      <div
        onClick={() => setIsModalOpen(false)}
        className=" cursor-pointer w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center  float-right text-black"
      >
        <IoClose size={20} className=" text-black" />
      </div>
      <div className="font-sans bg-white min-h-screen flex flex-col items-center w-full mx-auto py-10 box-border">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl px-3 box-border"
        >
          {/* Error message */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block mb-2 text-black font-normal text-base">
              RATING
            </label>
            <div className="flex gap-1 cursor-pointer">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <span
                  key={starIndex}
                  onClick={() => setRating(starIndex)}
                  className={`text-2xl ${
                    starIndex <= rating ? "text-gold-500" : "text-[#EBC351]"
                  }`}
                >
                  {starIndex <= rating ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="reviewComment"
              className="block mb-2 text-black font-normal text-base"
            >
              REVIEW
            </label>
            <textarea
              id="reviewComment"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Write your comment here"
              className="w-full px-3 py-3  border-black border text-sm text-black box-border outline-none min-h-[120px] resize-y"
              rows="5"
              required
            ></textarea>
          </div>

        <div className="mb-6">
    <label className="block mb-2 text-black font-normal text-base">
      PICTURE/VIDEO (OPTIONAL)
    </label>
    <label
      htmlFor="file-upload"
      className="w-40 h-36 bg-black border-2 border-[#EBC351] flex flex-col justify-center items-center cursor-pointer overflow-hidden"
    >
      {filePreview ? (
        <img 
          src={filePreview} 
          alt="Preview" 
          className="w-full h-full object-cover"
        />
      ) : file ? (
        <p className="text-xs text-[#D1C09E] break-all text-center px-1">
          {file.name}
        </p>
      ) : (
        <FaCamera className="text-[50px] text-[#EBC351] mb-1" />
      )}
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}  // Use the new handler
        className="hidden"
        accept="image/*,video/*"
      />
    </label>
  </div>

          <p className="text-black text-sm mt-8 leading-relaxed">
            How we use your data: We'll only contact you about the review you
            left, and if necessary. By submitting your review, you agree to
            judge. our terms, privacy and content polices
          </p>

          <button
            type="submit"
            className="bg-black text-white px-8 py-4 border-none text-lg font-normal cursor-pointer mt-8 w-full block transition-colors duration-200 hover:bg-primary hover:text-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
