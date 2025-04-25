"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FlippedCards() {
  const [isFlipped, setIsFlipped] = useState(null);

  useEffect(() => {
    console.log("isFlipped", isFlipped);
  }, [isFlipped]);

  return (
    <div className="landing__users">
      <div className="landing__users__title-group">
        <div>What our users look like</div>
        <div>
          Our platform helps users discover diverse opportunities for
          collaborations and partnerships, connecting them to key contacts and
          enabling impactful engagements outside the platform.
        </div>
      </div>

      <div className="landing__users__image-group">
        <div
          className={`flip-card ${
            isFlipped === 1 ? "flipped" : ""
          }`}
          onMouseEnter={() => setIsFlipped(1)}
          onMouseLeave={() => setIsFlipped(null)}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Image
                alt=""
                width={693}
                height={444}
                src={"/assets/user1.png"}
              />
            </div>
            <div className="flip-card-back" style={{background: "#8A3668"}}>
              <div className="flip-card-back__title">
              Powering Meaningful Connections
                </div>
              <div className="flip-card-back__subtitle">
              Connectors bridge the gap between communities and opportunities, linking like-minded individuals, businesses, and services for seamless engagement.
                </div>
            </div>
          </div>
        </div>
        <div
           className={`flip-card ${
            isFlipped === 2 ? "flipped" : ""
          }`}
          onMouseEnter={() => setIsFlipped(2)}
          onMouseLeave={() => setIsFlipped(null)}

        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Image
                alt=""
                width={595}
                height={488}
                src={"/assets/user2.png"}
              />
            </div>
            <div className="flip-card-back"style={{background: "#46B953"}}>

                <div className="flip-card-back__title">
                Where Conversations Thrive
                </div>
                <div className="flip-card-back__subtitle">
                Communities bring people together around shared interests, fostering discussions, collaborations, and endless possibilities.
                </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
