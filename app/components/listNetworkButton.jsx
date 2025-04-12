"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ListNetworkButton() {
    const [open, setOpen] = useState(false)
  return (
    <div className="header__title-group__list-network">
      <button
      onClick={() => setOpen(!open)}
      >
        <Image alt="" width={24} height={24} src={"/assets/icons/plus.svg"} />
        List a network
      </button>

      {open && 
        <>
        <div className="header__title-group__list-network__dropdown">
        <Link href={"/user/list-community"} prefetch={true}>List a community</Link>
        <Link href={"/user/list-connector"} prefetch={true}>List as a connector</Link>
      </div>
      <div className="header__title-group__list-network__dropdown-cover"
      onClick={() => setOpen(false)}
      ></div>
      </>
      }
    </div>
  );
}
