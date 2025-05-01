"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LandingHeader({ logo }) {
  const pathname = usePathname();
  const [active, setActive] = useState(false)

  return (
    <header className="landing-header">
      <Link href={"/"} prefetch={true}>
        <Image
          alt=""
          width={250}
          height={50}
          src={
            logo === "black"
              ? "/assets/icons/logoBlack.svg"
              : "/assets/icons/logo.svg"
          }
          className="landing-header__logo-desktop"
        />
        <Image
          alt=""
          width={250}
          height={50}
          src={
           
            "/assets/icons/logo.svg"
          }
          className="landing-header__logo-mobile"

        />
      </Link>
      <nav>
        <Link
          href={"/about"}
          prefetch={true}
          className={
            pathname?.includes("about") ? "landing-header__active" : ""
          }
        >
          About Us
        </Link>
        <Link
          href={"/pricing"}
          prefetch={true}
          className={
            pathname?.includes("pricing") ? "landing-header__active" : ""
          }
        >
          Pricing
        </Link>
        <Link
          href={"/user"}
          prefetch={true}
          className={pathname?.includes("user") ? "landing-header__active" : ""}
        >
          Networks
        </Link>
      </nav>
      <div className="landing-header__button-group">
        <Link href="/login" prefetch={true}>
          Login
        </Link>
        <Link href="/register" prefetch={true}>
          Sign Up for free
        </Link>
      </div>

      <Image
        className="landing-header__hamburger"
        alt=""
        width={24}
        height={24}
        src={active ? "/assets/icons/close.svg" : "/assets/icons/hamburger.svg"}
        onClick={() => setActive(!active)}
      />

      <div className={active ? "landing-header__mobile-menu landing-header__mobile-menu-active" : "landing-header__mobile-menu"}>
        <nav>
          <Link
            href={"/about"}
            prefetch={true}
            className={
              pathname?.includes("about") ? "landing-header__active" : ""
            }
          >
            About Us
          </Link>
          <Link
            href={"/pricing"}
            prefetch={true}
            className={
              pathname?.includes("pricing") ? "landing-header__active" : ""
            }
          >
            Pricing
          </Link>
          <Link
            href={"/user"}
            prefetch={true}
            className={
              pathname?.includes("user") ? "landing-header__active" : ""
            }
          >
            Networks
          </Link>
        </nav>

        <div className="landing-header__mobile-menu__button-group">
          <Link href="/login">Login</Link>
          <Link href="/register">Sign Up for free</Link>
        </div>
      </div>
    </header>
  );
}
