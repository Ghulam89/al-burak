import React, { useState } from 'react';
import { FaClosedCaptioning, FaMixcloud, FaRegStar, FaStar } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa';
import Modal from '../modal';
import { BaseUrl } from '../../utils/BaseUrl';
import { IoClose } from 'react-icons/io5';

const ReviewModal = ({ isModalOpen, setIsModalOpen, closeModal, fetchData, productId, userId, orderId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userId")) || null;

  const handleSubmit = async (e) => {

    
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('userId', userData?._id);
      formData.append('comment', reviewComment);
      formData.append('rating', rating);
      formData.append('orderId', fetchData?._id);
      if (file) {
        formData.append('images', file);
      }
      // if (reviewTitle) {
      //   formData.append('title', reviewTitle);
      // }

      const response = await fetch(`${BaseUrl}/v1/product/review/${fetchData?.items?.[0]?.productId?._id}`, {
        method: 'POST',
        body: formData,
       
      });


      const data = await response.json();
      console.log('Review submitted successfully:', data);
      
      // Reset form
      setName('');
      setEmail('');
      setRating(0);
      setReviewTitle('');
      setReviewComment('');
      setFile(null);
      
      // Close modal and refresh data
      closeModal();
      if (fetchData) {
        fetchData();
      }
      
      alert('Review submitted successfully!');
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="h-[80vh] rounded-xl overflow-y-auto px-4 w-full py-5"
    >
        <div onClick={()=>setIsModalOpen(false)} className=' cursor-pointer w-6 h-6 bg-primary rounded-full flex justify-center items-center  float-right text-black'> 
          <IoClose size={20} className=' text-black' />
        </div>
      <div className="font-sans bg-black min-h-screen flex flex-col items-center w-full mx-auto py-10 box-border">
        <form 
          onSubmit={handleSubmit} 
          className="bg-black rounded-3xl px-5 w-[90%] box-border"
        >
          {/* Error message */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-[#EBC351] font-normal text-base">
              NAME
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-3 bg-[#E5D0A5] border-none text-sm text-black box-border outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-[#EBC351] font-normal text-base">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-3 bg-[#E5D0A5] border-none text-sm text-black box-border outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-[#EBC351] font-normal text-base">
              RATING
            </label>
            <div className="flex gap-1 cursor-pointer">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <span
                  key={starIndex}
                  onClick={() => setRating(starIndex)}
                  className={`text-2xl ${starIndex <= rating ? 'text-gold-500' : 'text-[#EBC351]'}`}
                >
                  {starIndex <= rating ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="reviewTitle" className="block mb-2 text-[#EBC351] font-normal text-base">
              REVIEW TITLE
            </label>
            <input
              type="text"
              id="reviewTitle"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Give your review a title"
              className="w-full px-3 py-3 bg-[#E5D0A5] border-none text-sm text-black box-border outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="reviewComment" className="block mb-2 text-[#EBC351] font-normal text-base">
              REVIEW
            </label>
            <textarea
              id="reviewComment"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Write your comment here"
              className="w-full px-3 py-3 bg-[#E5D0A5] border-none text-sm text-black box-border outline-none min-h-[120px] resize-y"
              rows="5"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-[#EBC351] font-normal text-base">
              PICTURE/VIDEO (OPTIONAL)
            </label>
            <label 
              htmlFor="file-upload" 
              className="w-40 h-36 bg-black border-2 border-[#EBC351] flex flex-col justify-center items-center cursor-pointer overflow-hidden"
            >
              {file ? (
                <p className="text-xs text-[#D1C09E] break-all text-center px-1">
                  {file.name}
                </p>
              ) : (
                <FaCamera className="text-[50px] text-[#EBC351] mb-1" />
              )}
              <input
                id="file-upload"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                accept="image/*,video/*"
              />
            </label>
          </div>

          <p className="text-[#EBC351] text-sm mt-8 leading-relaxed">
            How we use your data: We'll only contact you about the review you left, and if necessary. By submitting your review, you agree to judge. our terms, privacy and content polices
          </p>

          <button 
            type="submit" 
            className="bg-[#E5D0A5] text-black px-8 py-4 border-none text-lg font-normal cursor-pointer mt-8 w-full block transition-colors duration-200 hover:bg-[#EBC351]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;