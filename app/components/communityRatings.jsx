"use client"
import Image from "next/image";
import ArrowDown from "./arrowDown";
import ReviewCard from "./reviewCard";
import { useEffect, useState } from "react";
import { createCommunityReview, getCommunityReviews } from "../apis/community";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import FilledStar from "@/public/assets/icons/filledStar.svg";
import EmptyStar from "@/public/assets/icons/emptyStar.svg";


export default function CommunityRatings({communityId, averageRating}) {
  const {token, userInfo} = useSelector((state) => state.auth);
console.log("userInfo", userInfo);

    const [loading, setLoading] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
  
    // Handle mouse enter on stars
    const handleMouseEnter = (starIndex) => {
      setHoveredRating(starIndex);
    };
  
    // Handle mouse leave from stars container
    const handleMouseLeave = () => {
      setHoveredRating(0);
    };
  
    // Handle click on stars
    const handleClick = (starIndex) => {
      setRating(starIndex);
    };
    
    // Create an array of 5 stars
    const stars = Array(5).fill(0);

    // Handle click on stars
    const handleSubmit = async (e) => {
      try {
        setLoading(true);
        e.preventDefault();
      if(rating === 0) {
        toast.error("Please select a rating before submitting");
      }
      if(!comment.trim()) {
        toast.error("Comment can't be empty");

      }
      const response = await createCommunityReview({
        rating, comment, reviewerId: userInfo?.user?.id
      }, communityId, token);

      console.log("createCommunityReview", response);
      toast.success("Thankyou for your review")
      setComment("");
      setRating(0);
      handleGetReviews();
      } catch (error) {
        console.log("Error submitting rating:", error);
        toast.error(error?.response?.data?.msg || "Error submitting rating. Please try again.");
  
      } finally {
        setLoading(false)
      }
      
    };

    const handleGetReviews = async () => {
      const response = await getCommunityReviews(communityId, token);

      console.log("getCommunityReviews", response);
      setReviews(response?.data?.reviews);
    }

    useEffect(() => {
      handleGetReviews();
    }, [])

    


    
  const countRatingsByScore = () => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    reviews?.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[review.rating]++;
      }
    });
    
    return counts;
  };

  const calculatePercentage = (count) => {
    const totalReviews = reviews?.length;
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  const ratingCounts = countRatingsByScore();



  const ratings = [5, 4, 3, 2, 1];
  return (
    <div className="ratings">
      <div className="ratings__title">Ratings</div>

      <div className="ratings__grid">
        <div className="ratings__grid__summary">
          <div className="ratings__grid__summary__title">{averageRating}</div>
          <div className="ratings__grid__summary__stars">
              <Image
              width={24}
              height={24}
              src={averageRating >= 1 ? FilledStar : EmptyStar}
              alt=""
            />
            <Image
              width={24}
              height={24}
              src={averageRating >= 2 ? FilledStar : EmptyStar}
              alt=""
            />
            <Image
              width={24}
              height={24}
              src={averageRating >= 3 ? FilledStar : EmptyStar}
              alt=""
            />
            <Image
              width={24}
              height={24}
              src={averageRating >= 4 ? FilledStar : EmptyStar}
              alt=""
            />
            <Image
              width={24}
              height={24}
              src={averageRating === 5 ? FilledStar : EmptyStar}
              alt=""
            />
          </div>
          <div className="ratings__grid__summary__subtitle">{reviews?.length} ratings</div>
        </div>
        <div className="ratings__grid__divider"></div>
        <div className="ratings__grid__range">
        {ratings?.map(rating => (
          <div className="ratings__grid__range__bar-cover" key={rating}>
            <div className="ratings__grid__range__bar">
              <div 
                className={`ratings__grid__range__bar__inner ratings__grid__range__bar__${rating}`}
                style={{ width: `${calculatePercentage(ratingCounts[rating])}%` }}
              ></div>
            </div>

            <div className="ratings__grid__review">
              <div>{rating}.0</div>
              <div>{ratingCounts[rating]} reviews</div>
            </div>
          </div>
        ))}
        </div>

       
      </div>
<div className="ratings__divider">

</div>
      <div className="ratings__reviews">
        <div className="ratings__reviews__title">Reviews</div>
<div className="ratings__reviews__cards">

     {reviews?.map((review) => 
    <ReviewCard review={review} />
    )}
</div>

        {/* <div className="ratings__reviews__dropdown">
          Read all reviews <ArrowDown color={"#F6911F"} />
        </div> */}

        <div className="ratings__reviews__divider"></div>
        <div className="ratings__reviews__submit">
          <div className="ratings__reviews__submit__title">
            Rate & Submit Review
          </div>
          <div className="ratings__reviews__submit__experience">
            How was your experience?
          </div>

          <div 
      className="ratings__reviews__submit__stars "
      onMouseLeave={handleMouseLeave}
    >
      {stars.map((_, index) => {
        // Star index is 1-based for better readability
        const starIndex = index + 1;
        
        // Determine if the star should be filled
        const isFilled = 
          hoveredRating > 0 
            ? starIndex <= hoveredRating // Show filled stars on hover
            : starIndex <= rating; // Show filled stars based on rating
        
        return (
          <div 
            key={index} 
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onClick={() => handleClick(starIndex)}
            className="star-container pointer"
          >
            <Image
              width={42}
              height={42}
              src={isFilled ? "/assets/icons/filledStar.svg" : "/assets/icons/emptyStar.svg"}
              alt={`Star ${starIndex}`}
            />
          </div>
        );
      })}
    </div>

          <textarea name="" id="" placeholder="Write about your experience"
          onChange={(e) => setComment(e.target.value)
          }
          value={comment}
          ></textarea>
          <button onClick={handleSubmit} disabled={loading}>{loading ? "Loading..." : "Submit Review"}</button>
        </div>
      </div>
    </div>
  );
}
