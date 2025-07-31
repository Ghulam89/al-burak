import React, { useState, useEffect } from "react";
import '../../App.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

const ReviewCard = ({ name, rating, comment, createdAt,image}) => {
  const starIcons = "★".repeat(rating) + "☆".repeat(5 - rating);
  const reviewDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="max-w-6xl mx-auto py-3 border-b border-lightGray2">
      <div className="stars text-lg">{starIcons}</div>
      <div className="flex items-center gap-4 my-2">
        <div className=" flex items-center gap-2">
          <div>
            <img  src={image} />
          </div>
          <div>
            <div className="text-black text-lg font-semibold">{name || "Anonymous"}</div>
        <div className="text-lightGray2 text-sm">{reviewDate}</div>
          </div>
        </div>
      </div>
      <div className="review-text text-black">"{comment}"</div>
    </div>
  );
};

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Mock data for demonstration
  const mockReviews = [
    {
      user: { name: "John Doe" },
      rating: 5,
      image:require('../../assets/images/reviewimage1.png'),
      comment: "Absolutely love this product! The quality exceeded my expectations and it arrived sooner than expected.",
      createdAt: "2023-05-15T10:30:00Z"
    },
    {
      user: { name: "Jane Smith" },
      rating: 4,
            image:require('../../assets/images/reviewiamge2.png'),

      comment: "Great product overall, but the packaging could be improved. The item itself works perfectly though.",
      createdAt: "2023-06-22T14:45:00Z"
    },
    {
      user: { name: "Alex Johnson" },
      rating: 3,
      image:require('../../assets/images/reviewimage1.png'),
      comment: "It's okay for the price. Does what it's supposed to but nothing extraordinary.",
      createdAt: "2023-07-10T09:15:00Z"
    },
    {
      user: { name: "Sarah Williams" },
      rating: 5,
            image:require('../../assets/images/reviewiamge2.png'),
      comment: "Perfect! Exactly as described. Will definitely purchase again from this seller.",
      createdAt: "2023-08-05T16:20:00Z"
    },
    {
      user: { name: "Michael Brown" },
      rating: 2,
      image:require('../../assets/images/reviewiamge2.png'),
      comment: "Not what I expected. The product didn't match the description and arrived damaged.",
      createdAt: "2023-08-18T11:10:00Z"
    }
  ];

  useEffect(() => {
    const fetchProductReviews = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/v1/product/reveiw/${id}`);
        
        if (response.data.success && response.data.data) {
          setReviews(response.data.data);
          setProduct({ name: "Product Name" });
        } else {
          // If no reviews from API, use mock data
          setReviews(mockReviews);
          setProduct({ name: "Demo Product" });
        }
      } catch (err) {
        // setError(err.message);
        // // If API fails, use mock data instead
        // setReviews(mockReviews);
        // setProduct({ name: "Demo Product" });
      } finally {
        setLoading(false);
      }
    };

    fetchProductReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black flex items-center justify-center min-h-[200px]">
        <div className="text-lightGray2">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div style={{padding: "20px 0" }}> 
      

      <div className="max-w-6xl mx-auto pb-5 border-t-2">
      
        
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard 
              key={index}
              name={review.user?.name} 
              rating={review.rating}
              image={review.image}
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