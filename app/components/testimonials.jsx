"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Testimonials() {
  useEffect(() => {
    // const nextBtn = document.querySelector(
    //   ".compliance__title__svg-group__next"
    // );
    const prevBtn = document.querySelector(
      ".landing__testimonials__inner__prev"
    );
    const slider = document.querySelector(".landing__testimonials__inner__cards");
    const card = document.querySelector(".landing__testimonials__inner__cards__card");
    let itemDimensions = card.getBoundingClientRect();
    let amountToSlide = (itemDimensions.width + 16);

    // nextBtn.addEventListener("click", () => {
    //   slider.scrollLeft += amountToSlide;
      
    // });

    prevBtn.addEventListener("click", () => {
      slider.scrollLeft -= amountToSlide;
    });
  }, []);

  return (
    <div className="landing__testimonials">
      <div className="landing__testimonials__title">User’s Stories</div>
      <div className="landing__testimonials__inner">
        <Image
          alt=""
          width={32}
          height={32}
          src={"/assets/icons/arrowLeft.svg"}
          className="landing__testimonials__inner__prev pointer"
        />
        <div className="landing__testimonials__inner__cards">
          <div className="landing__testimonials__inner__cards__card">
            <div className="landing__testimonials__inner__cards__card__title">
              <div>Gwala</div>

              <Image
                alt=""
                width={32}
                height={32}
                src={"/assets/icons/quote.svg"}
              />
            </div>

            <div className="landing__testimonials__inner__cards__card__subtitle">
              Our partnership with Pigeonhire during our campus ambassador
              program was a game-changer. The access to a range of communities
              and connectors resulted in unprecedented engagement and sales.
            </div>
          </div>
          <div className="landing__testimonials__inner__cards__card">
            <div className="landing__testimonials__inner__cards__card__title">
              <div>Alex Klaxic</div>

              <Image
                alt=""
                width={32}
                height={32}
                src={"/assets/icons/quote.svg"}
              />
            </div>

            <div className="landing__testimonials__inner__cards__card__subtitle">
              As a community leader, the visibility model has been
              transformative. We've partnered with businesses that truly
              resonate with our audience, enhancing both our community's value
              and our collaboration
            </div>
          </div>
          <div className="landing__testimonials__inner__cards__card">
            <div className="landing__testimonials__inner__cards__card__title">
              <div>Gwala</div>

              <Image
                alt=""
                width={32}
                height={32}
                src={"/assets/icons/quote.svg"}
              />
            </div>

            <div className="landing__testimonials__inner__cards__card__subtitle">
              Our partnership with Pigeonhire during our campus ambassador
              program was a game-changer. The access to a range of communities
              and connectors resulted in unprecedented engagement and sales.
            </div>
          </div>
          <div className="landing__testimonials__inner__cards__card">
            <div className="landing__testimonials__inner__cards__card__title">
              <div>Alex Klaxic</div>

              <Image
                alt=""
                width={32}
                height={32}
                src={"/assets/icons/quote.svg"}
              />
            </div>

            <div className="landing__testimonials__inner__cards__card__subtitle">
              As a community leader, the visibility model has been
              transformative. We've partnered with businesses that truly
              resonate with our audience, enhancing both our community's value
              and our collaboration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
