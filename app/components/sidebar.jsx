"use client";
import Image from "next/image";
import SearchIcon from "./searchIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NetworkIcon from "@/public/assets/icons/network";

export default function Sidebar() {
  const pathname = usePathname();

  console.log("pathname", pathname);
  

  return (
    <div className="sidebar">
      <Link href="/" prefetch={true} className="sidebar__logo">
        <Image alt="" width={200} height={40} src={"/assets/icons/logo.svg"} />
      </Link>

      <div className="sidebar__form">
      <div>
        <SearchIcon />
      </div>

        <input type="text" placeholder="Explore networks" />
      </div>

      <div className="sidebar__nav">
        <Link className={pathname?.includes("manage-network") ? "sidebar__nav__item sidebar__nav__item-active" : "sidebar__nav__item"} href="/user/manage-network" prefetch={true}>
          <NetworkIcon color={pathname?.includes("manage-network") && "#000"} />
          Manage Network
        </Link>
        <div className="sidebar__nav__item">
          <Image
            alt=""
            width={24}
            height={24}
            src={"/assets/icons/leads.svg"}
          />
          Leads
        </div>
        <div className="sidebar__nav__item">
          <Image
            alt=""
            width={24}
            height={24}
            src={"/assets/icons/settings.svg"}
          />
          Settings
        </div>
        <div className="sidebar__nav__item">
          <Image
            alt=""
            width={24}
            height={24}
            src={"/assets/icons/logout.svg"}
          />
          Logout
        </div>
      </div>

      <div className="sidebar__plan">

        <div className="sidebar__plan__inner">

        <div className="sidebar__plan__inner__title">Free plan</div>
        <div className="sidebar__plan__inner__line"></div>
        <button>
          <Image
            alt=""
            width={24}
            height={24}
            src={"/assets/icons/lightning.svg"}
          />
          Upgrade plan
        </button>
        </div>
      </div>

      <div className="sidebar__account">
        <div className="sidebar__account__initials">O</div>
        <div>
          <div className="sidebar__account__name">Ololade Grace</div>
          <div className="sidebar__account__email">
            @ololadegrace.ot@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
