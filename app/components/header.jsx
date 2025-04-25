"use client"
import Image from "next/image";
import ListNetworkButton from "./listNetworkButton";
import { useSelector } from "react-redux";
import LandingHeader from "./landingHeader";

export default function Header() {

  const {token, userInfo} = useSelector((state) => state.auth);
  
  return (
    !!token ? 
    <header className="header">
      <div className="header__title-group">
        <div className="header__title">
          Explore networks (Communities & Connectors)
        </div>

        <ListNetworkButton />
      </div>

      <div className="header__group">
        <Image
          alt=""
          width={24}
          height={24}
          src={"/assets/icons/notifications.svg"}
        />

        <div className="header__account">
          <div className="header__account__initials">{userInfo?.user?.fname?.split('')[0]}</div>
          {userInfo?.user?.fname} {userInfo?.user?.lname}
          
        </div>
        
      </div>
    </header> : <LandingHeader />
  );
}
