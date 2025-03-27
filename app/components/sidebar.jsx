import Image from "next/image";
import SearchIcon from "./searchIcon";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Image alt="" width={200} height={40} src={"/assets/icons/logo.svg"} />
      </div>

      <div className="sidebar__form">
      <div>
        <SearchIcon />
      </div>

        <input type="text" placeholder="Explore networks" />
      </div>

      <div className="sidebar__nav">
        <div className="sidebar__nav__item">
          <Image
            alt=""
            width={24}
            height={24}
            src={"/assets/icons/network.svg"}
          />
          Manage Network
        </div>
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
