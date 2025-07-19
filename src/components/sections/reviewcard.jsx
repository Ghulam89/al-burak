import React, { useState, useEffect } from "react";
import '../../App.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

const ReviewCard = ({ name, rating, comment, createdAt }) => {
  const starIcons = "★".repeat(rating) + "☆".repeat(5 - rating);
  const reviewDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="max-w-6xl mx-auto py-3 border-b border-lightGray2">
      <div className="stars text-lg">{starIcons}</div>
      <div className="flex items-center gap-4 my-2">
        <div className="text-primary text-lg font-semibold">{name || "Anonymous"}</div>
       
      </div>
      <div className="review-text text-lightGray2">"{comment}"</div>
    </div>
  );
};

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

 
  useEffect(() => {
    const fetchProductReviews = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/v1/product/reveiw/${id}`);
        
        // Check if response has data array
        if (response.data.success && response.data.data) {
          // If the API returns an array of reviews
          setReviews(response.data.data);
          // If you need the product name, you might need a separate API call
          // Or modify your backend to include product info in the response
          setProduct({ name: "Product Name" }); // Replace with actual product name
        } else {
          setReviews([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black  flex items-center justify-center">
        <div className="text-lightGray2">Loading reviews...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#000",padding: "20px 0" }}>
      <style>
        {`
          .stars {
            color: #EBC351;
          }
          .review-text {
            font-size: 16px;
            line-height: 1.5;
            color: #E5D0A5;
          }
          @media (max-width: 600px) {
            .review-text {
              font-size: 14px;
            }
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto">
        
       {reviews.length > 0 ? (
  reviews.map((review, index) => (
    <ReviewCard 
      key={index}
      name={review.user.name} 
      rating={review.rating}
      comment={review.comment}
      createdAt={review.createdAt}
    />
  ))
) : (
  <div className="text-lightGray2 text-center py-10">
    No reviews yet for this product.
  </div>
)}
      </div>
    </div>
  );
};

export default ReviewSection;