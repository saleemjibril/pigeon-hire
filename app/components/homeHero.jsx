"use client";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect } from "react";

export function HomeHero(params) {
    const tl = gsap.timeline();

    useLayoutEffect(() => {
        // Your initial settings remain the same
      
        // gsap.set(".landing__hero__inner__button-group", {
        //   y: "-300px",
        //   opacity: 0,
        // });
        // gsap.set(".landing__hero__inner__banner", {
        //   y: "100px",
        //   opacity: 0,
        // });
      

        // gsap.set(".landing__hero__inner__title__span1", {
        //     display: "block",
        //     y: "25px",
        //     opacity: 0,
        //     // clipPath: "polygon(0 60%, 100% 60%, 100% 100%, 0% 100%)"
        //     // Optional: slight vertical offset
        //   });
        // gsap.set(".landing__hero__inner__title__span2", {
        //     display: "block",
        //     y: "50px",
        //     opacity: 0
        //     // Optional: slight vertical offset
        //   });
        
        //   // Create a timeline
          
        //   // Animate text coming "forward" from behind
        //   tl.to(".landing__hero__inner__title", {
        //     scale: 1,
        //     opacity: 1,
        //     y: 0,
        //     duration: 0.8,
        //     ease: "back.out(1.7)" // Single bounce effect
        //   });

        // Create a timeline if you haven't already
        
        tl.to('.landing__hero__inner__button-group', {
          y: "0",
          duration: 1.5,           // Add duration back in
          opacity: 1,
          ease: "back.out(2)" // Single bounce with back easing
        })
        
        tl.to('.landing__hero__inner__banner', {
          y: "0",
          duration: 1.5,           // Add duration back in
          opacity: 1,
          ease: "back.out(2)" // Single bounce with back easing
        }, "-=1.2")
        tl.to('.landing__hero__inner__title__span1', {
          y: "0",
          duration: 1.4,           // Add duration back in
        //   clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          opacity: 1,

        }, "-=1.6")
        tl.to('.landing__hero__inner__title__span2', {
          y: "0",
          duration: 1.2,           // Add duration back in
          opacity: 1,
        }, "-=1.6")
        
    
      }, []);
  return (
    <div className="landing__hero">
      <div className="landing__hero__inner">
        <div className="landing__hero__inner__title">
          <Image
            alt=""
            width={52}
            height={52}
            src={"/assets/icons/bubbles.svg"}
          />
          <div className="landing__hero__inner__title__inner"> 

            <div className="landing__hero__inner__title__span1">Reach your Target Audience, Right </div><div className="landing__hero__inner__title__span2">Where they Engage.</div>
          </div>
          <Image alt="" width={52} height={52} src={"/assets/icons/star.svg"} />
        </div>
        <div className="landing__hero__inner__button-group">
          <Link href="/register" prefetch={true}>
            Sign Up
          </Link>
          <Link href="/user" prefetch={true}>
            Browse Networks
          </Link>
        </div>

        <Image alt="" className="landing__hero__inner__banner" width={1090} height={527} src={"/assets/hero.png"} />
      </div>
    </div>
  );
}
