import Image from "next/image";
import FilledStar from "@/public/assets/icons/filledStar.svg";
import EmptyStar from "@/public/assets/icons/emptyStar.svg";


export default function ReviewCard({review}) {
  return (
    <div className="reviews-card">
      <div className="reviews-card__initials">{review?.Reviewer?.firstName?.split("")[0]}</div>
      <div className="reviews-card__inner">
        <div className="reviews-card__inner__title">{review?.Reviewer?.firstName} {review?.Reviewer?.lastName}</div>
        <div className="reviews-card__inner__stars">
          <Image
            width={16}
            height={16}
            src={review?.rating >= 1 ? FilledStar : EmptyStar}
            alt=""
          />
          <Image
            width={16}
            height={16}
            src={review?.rating >= 2 ? FilledStar : EmptyStar}
            alt=""
          />
          <Image
            width={16}
            height={16}
            src={review?.rating >= 3 ? FilledStar : EmptyStar}
            alt=""
          />
          <Image
            width={16}
            height={16}
            src={review?.rating >= 4 ? FilledStar : EmptyStar}
            alt=""
          />
          <Image
            width={16}
            height={16}
            src={review?.rating === 5 ? FilledStar : EmptyStar}
            alt=""
          />
        </div>
        <div className="reviews-card__inner__subtitle">
         {review?.comment}
        </div>
      </div>
    </div>
  );
}
