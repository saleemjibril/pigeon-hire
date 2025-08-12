"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


export default function Socials() {
  const [duplicateCount, setDuplicateCount] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  const images = [
    {
      url: "/assets/icons/slack.svg",
      width: isMobile ? 101.15789031982422 : 120,
      height: isMobile ? 40.421051025390625 : 48,
    },
    {
      url: "/assets/icons/instagram.svg",
      width: isMobile ? 146.15789794921875 : 173,
      height: isMobile ? 40.421051025390625 : 48,
    },
    {
      url: "/assets/icons/facebook.svg",
      width: isMobile ? 146.15789794921875 : 170,
      height: isMobile ? 40.421051025390625 : 48,
    },
    {
      url: "/assets/icons/whatsapp.svg",
      width: isMobile ? 149.15789794921875 : 179,
      height: isMobile ? 40.421051025390625 : 48,
    },
    {
      url: "/assets/icons/retailStore.svg",
      width: isMobile ? 160.15789794921875 : 190,
      height: isMobile ? 40.421051025390625 : 48,
    },
    {
      url: "/assets/icons/linkedin.svg",
      width: isMobile ? 136.15789031982422 : 155,
      height: isMobile ? 40.421051025390625 : 48,
    },
    {
      url: "/assets/icons/reddit.svg",
      width: isMobile ? 105.15789794921875 : 132,
      height: isMobile ? 40.421051025390625 : 48,
    }
  ];

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


useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);




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
