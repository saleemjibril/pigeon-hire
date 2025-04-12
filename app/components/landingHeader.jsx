"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LandingHeader({logo}) {
    const pathname = usePathname();
  
  return (
    <header className="landing-header">
      <Link href={"/"} prefetch={true}>
      <Image alt="" width={250} height={50} src={logo === "black" ? "/assets/icons/logoBlack.svg" : "/assets/icons/logo.svg"} 
      
      />
      </Link>
      <nav>
        <Link href={"/about"} prefetch={true}className={
          pathname?.includes("about") ?
          "landing-header__active" : ""}>About Us</Link>
        <Link 
        href={"/pricing"} prefetch={true}
        className={
          pathname?.includes("pricing") ?
          "landing-header__active" : ""}>Pricing</Link>
        <Link 
        href={"/user"} prefetch={true}
        className={
          pathname?.includes("user") ?
          "landing-header__active" : ""}>Networks</Link>
      </nav>
      <div className="landing-header__button-group">
        <button>Login</button>
        <button>Sign Up for free</button>
      </div>
    </header>
  );
}
