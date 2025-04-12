"use client"
import Image from "next/image";
import FiltersSidebar from "./filtersSidebar";
import { useState } from "react";

export default function Filters() {
      const [open, setOpen] = useState(false)
  
  return (
    <div className="filters">
        <div className="filters__inner">

      <div className="filters__all"
      onClick={() => setOpen(true)}
      >
        <Image
          alt=""
          width={16}
          height={16}
          src={"/assets/icons/controls.svg"}
        />
        All filters
      </div>
      <div className="filters__item">Category

      <Image
          alt=""
          width={16}
          height={16}
          src={"/assets/icons/arrowDown.svg"}
        />
      </div>
      <div className="filters__item">Connectors</div>
      <div className="filters__item">Connector type
      <Image
          alt=""
          width={16}
          height={16}
          src={"/assets/icons/arrowDown.svg"}
        />
      </div>
      <div className="filters__item">Connector platform

      <Image
          alt=""
          width={16}
          height={16}
          src={"/assets/icons/arrowDown.svg"}
        />
      </div>
      <div className="filters__item">
        Communities
      </div>
      <div className="filters__item">
        Connectors
        <Image
          alt=""
          width={16}
          height={16}
          src={"/assets/icons/arrowDown.svg"}
        />
      </div>
      <div className="filters__item">Community type
      <Image
          alt=""
          width={16}
          height={16}
          src={"/assets/icons/arrowDown.svg"}
        />
      </div>
      <div className="filters__item">Community size</div>
      <div className="filters__item">Connectors</div>
      <div className="filters__item">Connectors</div>
        </div>

        <FiltersSidebar open={open} setOpen={setOpen} />
    </div>
  );
}
