"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  {
    url: "/assets/icons/slack.svg",
    width: 120,
    height: 48,
  },
  {
    url: "/assets/icons/instagram.svg",
    width: 173,
    height: 48,
  },
  {
    url: "/assets/icons/facebook.svg",
    width: 170,
    height: 48,
  },
  {
    url: "/assets/icons/whatsapp.svg",
    width: 179,
    height: 48,
  },
  {
    url: "/assets/icons/linkedin.svg",
    width: 155,
    height: 48,
  },
  {
    url: "/assets/icons/reddit.svg",
    width: 132,
    height: 48,
  },
];

export default function Socials() {
  const [duplicateCount, setDuplicateCount] = useState(2);

  useEffect(() => {
    const calculateDuplicates = () => {
      const viewportWidth = window.innerWidth;
      const itemWidth = 170; // Your item width
      const itemGap = 42;    // Gap between items
      const totalItemWidth = itemWidth + itemGap; // Total width each item occupies
      
      // Calculate how many items needed to fill viewport 3 times over, plus 1 extra
      const newDuplicateCount = Math.ceil((viewportWidth * 3) / totalItemWidth) + 1;
      setDuplicateCount(newDuplicateCount);
    };
  
    calculateDuplicates();
    window.addEventListener("resize", calculateDuplicates);
    return () => window.removeEventListener("resize", calculateDuplicates);
  }, []);

  const duplicatedItemsLeft = Array(duplicateCount).fill(images).flat();

  useEffect(() => {
    document.documentElement.style.setProperty('--item-count', images.length);
  }, [images.length]);

  return (
    <div className="landing__social-banner">
      <div className="landing__social-banner__title">
        Discover thousands of Communities, Connectors and Businesses
      </div>
      <div className="landing__social-banner__group">
        {duplicatedItemsLeft?.map((item, index) => (
          <Image
            alt=""
            width={item?.width}
            height={item?.height}
            src={item?.url}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
