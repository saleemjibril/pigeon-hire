import Image from "next/image";

export default function Footer() {
  return (
    <div className="footer">
    <div className="footer__inner">
      <div className="footer__inner__header">
        <Image
          alt=""
          width={250}
          height={50}
          src={"/assets/icons/logoBlack.svg"}
        />

        <nav>
          <div>About Us</div>
          <div>Blog</div>
          <div>Contact Us</div>
          <div>Pricing</div>
          <div>Explore Network</div>
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
        <div>Privacy Policy</div>
        <Image alt="" width={8} height={8} src={"/assets/icons/dot.svg"} />
        <div>Terms & Condition</div>
        </div>
      </div>
    </div>
  </div>
  )
}
