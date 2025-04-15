"use client";
import Image from "next/image";
import SearchIcon from "./searchIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NetworkIcon from "@/public/assets/icons/network";
import UpgradeModal from "./upgradePlanModal";
import { useState } from "react";
import UpgradeModalPay from "./upgradePlanModalPay";
import LeadsIcon from "@/public/assets/icons/leads";
import SettingsIcon from "@/public/assets/icons/settings";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState("");

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

        <div>Explore networks</div>
      </div>

      <div className="sidebar__nav">
        <Link className={pathname?.includes("manage-network") ? "sidebar__nav__item sidebar__nav__item-active" : "sidebar__nav__item"} href="/user/manage-network" prefetch={true}>
          <NetworkIcon color={pathname?.includes("manage-network") && "#000"} />
          Manage Network
        </Link>
        <Link className={pathname?.includes("leads") ? "sidebar__nav__item sidebar__nav__item-active" : "sidebar__nav__item"} href="/user/leads" prefetch={true}>
        <LeadsIcon color={pathname?.includes("leads") && "#000"} />

          Leads
        </Link>
        <Link className={pathname?.includes("settings") ? "sidebar__nav__item sidebar__nav__item-active" : "sidebar__nav__item"} href="/user/settings/contact-info" prefetch={true}>
        <SettingsIcon color={pathname?.includes("settings") && "#000"} />
          
          Settings
        </Link>
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
        <button
        onClick={() => setOpen(true)}
        >
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

      <UpgradeModal open={open} setOpen={setOpen} />
    </div>
  );
}
