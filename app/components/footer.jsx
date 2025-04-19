import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer">
    <div className="footer__inner">
      <div className="footer__inner__header">
       <Link href={"/"}>
       <Image
          alt=""
          width={250}
          height={50}
          src={"/assets/icons/logoBlack.svg"}
        />
       </Link>

        <nav>
          <Link href={"/about"}>About Us</Link>
          <Link href={"/blog"}>Blog</Link>
          <Link href={"/about#contact"}>Contact Us</Link>
          <Link href={"/pricing"}>Pricing</Link>
          <Link href={"/user"}>Explore Network</Link>
        </nav>

        <div className="footer__inner__header__socials">
        <Image
          alt=""
          width={32}
          height={32}
          src={"/assets/icons/linkedInIcon.svg"}
        />
        <Image
          alt=""
          width={32}
          height={32}
          src={"/assets/icons/twitterIcon.svg"}
        />
        <Image
          alt=""
          width={32}
          height={32}
          src={"/assets/icons/facebookIcon.svg"}
        />

        </div>
      </div>

      <div className="footer__inner__contact-group">
        <div className="footer__inner__contact-group__card1">
          <div className="footer__inner__contact-group__card1__title">
            Contact Us
          </div>
          <div className="footer__inner__contact-group__card1__grid">
            <div>Email: </div>
            <div>info@pigeonhire.com</div>
            <div>Phone:</div>
            <div>111-222-3331</div>
            <div>Address:</div>
            <div>0987 Andrew St Sunset City, Windoor State </div>
          </div>
        </div>

        <div className="footer__inner__contact-group__form">
          <input type="text" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer__inner__copy">
        <div>© 2025 Pigeonhire limited. All Right Reserved.</div>

        <div>
        <Link href={"/privacy-policy"} prefetch={true}>Privacy Policy</Link>
        <Image alt="" width={8} height={8} src={"/assets/icons/dot.svg"} />
        <Link href={"/terms"} prefetch={true}>Terms & Condition</Link>
        </div>
      </div>
    </div>
  </div>
  )
}
