import Image from "next/image";
import ListNetworkButton from "./listNetworkButton";

export default function Header() {
  return (
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
          <div className="header__account__initials">O</div>
          Ololade Grace
        </div>
      </div>
    </header>
  );
}
