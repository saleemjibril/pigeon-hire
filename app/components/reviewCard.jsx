import Image from "next/image";

export default function ReviewCard() {
  return (
    <div className="reviews-card">
      <div className="reviews-card__initials">O</div>
      <div className="reviews-card__inner">
        <div className="reviews-card__inner__title">Ololade Modupe</div>
        <div className="reviews-card__inner__stars">
          <Image
            width={16}
            height={16}
            src={"/assets/icons/filledStar.svg"}
            alt=""
          />
          <Image
            width={16}
            height={16}
            src={"/assets/icons/filledStar.svg"}
            alt=""
          />
          <Image
            width={16}
            height={16}
            src={"/assets/icons/filledStar.svg"}
            alt=""
          />
          <Image
            width={16}
            height={16}
            src={"/assets/icons/filledStar.svg"}
            alt=""
          />
          <Image
            width={16}
            height={16}
            src={"/assets/icons/emptyStar.svg"}
            alt=""
          />
        </div>
        <div className="reviews-card__inner__subtitle">
          “This community has been a game-changer! The networking opportunities
          and resources available have helped me secure funding for my startup.
          Highly recommend it to any entrepreneur looking to grow."
        </div>
      </div>
    </div>
  );
}
