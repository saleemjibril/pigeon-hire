"use client"
import Image from "next/image";
import { useState } from "react";

export default function FiltersSidebar({open, setOpen}) {
    const [filter, setFilter] = useState("all")
  return (
    open &&
    <div className="filters-sidebar">
      <div className="filters-sidebar__header">
        <div>Filters</div>

        <Image
          alt=""
          width={24}
          height={24}
          src={"/assets/icons/close.svg"}
          onClick={() => setOpen(false)}
          className="pointer"
        />
      </div>
      <div 
      className={filter === "all" ? "filters-sidebar__input-group filters-sidebar__input-group__active" : "filters-sidebar__input-group"}
      onClick={() => setFilter("all")}
      >
        <div>All</div>

        <input type="radio" name="" id="" checked={filter === "all"} />
      </div>
      <div 
      className={filter === "communities" ? "filters-sidebar__input-group filters-sidebar__input-group__active" : "filters-sidebar__input-group"}
      onClick={() => setFilter("communities")}
      >
        <div>Communities</div>

        <input type="radio" name="" id="" checked={filter === "communities"} />
      </div>
      <div 
      className={filter === "connectors" ? "filters-sidebar__input-group filters-sidebar__input-group__active" : "filters-sidebar__input-group"}
      onClick={() => setFilter("connectors")}
      >
        <div>Connectors</div>

        <input type="radio" name="" id="" checked={filter === "connectors"} />
      </div>
    </div>
  );
}
