"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsNavigation() {
  
      const pathname = usePathname();
    
      console.log("pathname", pathname);

  return (
    <div className="settings__navigation">
    <Link 
    href={"/user/settings/contact-info"}
    prefetch={true}
    className={pathname?.includes("contact-info") ? "settings__navigation__card settings__navigation__card-active" : "settings__navigation__card"}
    >
      <Image
        className="search__close"
        alt=""
        width={31}
        height={31}
        src={"/assets/icons/profile.svg"}
      />
      <div>
        <div className="settings__navigation__card__title">My Profile</div>
        <div className="settings__navigation__card__subtitle">
          Provide personal details and how we can reach you
        </div>
      </div>

      <Image
        className="search__close"
        alt=""
        width={24}
        height={24}
        src={"/assets/icons/arrowRight.svg"}
      />
    </Link>
    <Link 
    className={pathname?.includes("password") ? "settings__navigation__card settings__navigation__card-active" : "settings__navigation__card"}
    href={"/user/settings/password"}
    prefetch={true}
    >
      <Image
        className="search__close"
        alt=""
        width={31}
        height={31}
        src={"/assets/icons/password.svg"}
      />
      <div>
        <div className="settings__navigation__card__title">
          Password and Security
        </div>
        <div className="settings__navigation__card__subtitle">
          Update your password and secure your account{" "}
        </div>
      </div>

      <Image
        className="search__close"
        alt=""
        width={24}
        height={24}
        src={"/assets/icons/arrowRight.svg"}
      />
    </Link>
    <Link 
    className={pathname?.includes("payments") ? "settings__navigation__card settings__navigation__card-active" : "settings__navigation__card"}
    href={"/user/settings/payments"}
    >
      <Image
        className="search__close"
        alt=""
        width={31}
        height={31}
        src={"/assets/icons/payments.svg"}
      />
      <div>
        <div className="settings__navigation__card__title">
        Payments
        </div>
        <div className="settings__navigation__card__subtitle">
        Review payments methods and update card details
        </div>
      </div>

      <Image
        className="search__close"
        alt=""
        width={24}
        height={24}
        src={"/assets/icons/arrowRight.svg"}
      />
    </Link>
    <Link 
    className={pathname?.includes("notifications") ? "settings__navigation__card settings__navigation__card-active" : "settings__navigation__card"}
    href={"/user/settings/notifications"}
    >
      <Image
        className="search__close"
        alt=""
        width={31}
        height={31}
        src={"/assets/icons/pushNotifications.svg"}
      />
      <div>
        <div className="settings__navigation__card__title">
          Push Notifications
        </div>
        <div className="settings__navigation__card__subtitle">
          Toggle on/off notifications you want{" "}
        </div>
      </div>

      <Image
        className="search__close"
        alt=""
        width={24}
        height={24}
        src={"/assets/icons/arrowRight.svg"}
      />
    </Link>
  </div>

  );
}
