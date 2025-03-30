"use client"
import Image from "next/image";
import ArrowDown from "./arrowDown";
import ReviewCard from "./reviewCard";
import { useState } from "react";

export default function CommunityRatings() {
    // State to track the current rating
    const [rating, setRating] = useState(0);
    // State to track which star is being hovered over
    const [hoveredRating, setHoveredRating] = useState(0);
  
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
  return (
    <div className="ratings">
      <div className="ratings__title">Ratings</div>

      <div className="ratings__grid">
        <div className="ratings__grid__summary">
          <div className="ratings__grid__summary__title">5.0</div>
          <div className="ratings__grid__summary__stars">
            <Image
              width={24}
              height={24}
              src={"/assets/icons/filledStar.svg"}
              alt=""
            />
            <Image
              width={24}
              height={24}
              src={"/assets/icons/filledStar.svg"}
              alt=""
            />
            <Image
              width={24}
              height={24}
              src={"/assets/icons/filledStar.svg"}
              alt=""
            />
            <Image
              width={24}
              height={24}
              src={"/assets/icons/filledStar.svg"}
              alt=""
            />
            <Image
              width={24}
              height={24}
              src={"/assets/icons/emptyStar.svg"}
              alt=""
            />
          </div>
          <div className="ratings__grid__summary__subtitle">56 ratings</div>
        </div>
        <div className="ratings__grid__divider"></div>
        <div className="ratings__grid__range">
          <div className="ratings__grid__range__bar-cover">
            <div className="ratings__grid__range__bar">
              <div className="ratings__grid__range__bar__inner ratings__grid__range__bar__five"></div>
            </div>

            <div className="ratings__grid__review">
          <div>5.0</div>
          <div>10 reviews</div>
          </div>
          </div>
          <div className="ratings__grid__range__bar-cover">

          <div className="ratings__grid__range__bar">
            <div className="ratings__grid__range__bar__inner ratings__grid__range__bar__four"></div>
          </div>

          <div className="ratings__grid__review">
          <div>4.0</div>
          <div>8 reviews</div>
          </div>
          </div>
          <div className="ratings__grid__range__bar-cover">

          <div className="ratings__grid__range__bar">
            <div className="ratings__grid__range__bar__inner ratings__grid__range__bar__three"></div>
          </div>

          <div className="ratings__grid__review">
          <div>3.0</div>
          <div>8 reviews</div>
          </div>
          </div>
          <div className="ratings__grid__range__bar-cover">

          <div className="ratings__grid__range__bar">
            <div className="ratings__grid__range__bar__inner ratings__grid__range__bar__two"></div>
          </div>

          <div className="ratings__grid__review">
          <div>2.0</div>
          <div>4 reviews</div>
          </div>
          </div>
          <div className="ratings__grid__range__bar-cover">

          <div className="ratings__grid__range__bar">
            <div className="ratings__grid__range__bar__inner ratings__grid__range__bar__one"></div>
          </div>

          <div className="ratings__grid__review">
          <div>1.0</div>
          <div>2 reviews</div>
          </div>
          </div>
        </div>

       
      </div>
<div className="ratings__divider">

</div>
      <div className="ratings__reviews">
        <div className="ratings__reviews__title">Reviews</div>
<div className="ratings__reviews__cards">

     <ReviewCard />
     <ReviewCard />
     <ReviewCard />
</div>

        <div className="ratings__reviews__dropdown">
          Read all reviews <ArrowDown color={"#F6911F"} />
        </div>

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

          <textarea name="" id="" placeholder="Write about your experience"></textarea>
          <button>Submit Review</button>
        </div>
      </div>
    </div>
  );
}
