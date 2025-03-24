import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div className="auth">
      <div className="auth__form">
        <Image
          alt=""
          className="auth__form__logo"
          width={160}
          height={32}
          src={"/assets/icons/logo.svg"}
        />

        <div className="auth__form__title">Grow your network</div>
        <div className="auth__form__subtitle">
          Join a network where connections turn into leads and drive success.
        </div>
        <form className="auth__form-register">
          <label htmlFor="fullName">Full name</label>
          <div className="auth__form__input">
            <input type="text" name="fullName" placeholder="e.g John Doe" />
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/user.svg"}
            />
          </div>
          <label htmlFor="email">Email address</label>

          <div className="auth__form__input">
            <input type="email" name="email" placeholder="e.g John Doe" />
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/email.svg"}
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="auth__form__input">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
            />{" "}
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/openedEye.svg"}
            />
          </div>

          {/* <div className="auth__form__password-instructions">
            <div>Must have:</div>
            <div>Include one uppercase letter.</div>
            <div>Include at least one number.</div>
            <div>At least 8 characters long.</div>
          </div> */}
          <label htmlFor="password">Confirm password</label>

          <div className="auth__form__input">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
            />{" "}
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/openedEye.svg"}
            />
          </div>

          <div className="auth__form__terms">
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/uncheckedBox.svg"}
            />
            <div>
              I agree to the <span>Terms & Data policy</span>
            </div>
          </div>

          <button className="auth__button">Sign Up</button>
          <div className="auth__login">
            Don’t have an account! <Link href="/login">Login</Link>
          </div>
          <div className="auth__line"></div>
          <div className="auth__signup">or Sign Up with</div>

          <button className="auth__oauth">
            <Image
              alt=""
              width={88}
              height={24}
              src={"/assets/icons/google.svg"}
            />
          </button>
        </form>

        <div className="auth__footer">
          <div className="auth__footer__copy">
            © 2025 Pigeonhire Inc. All Right Reserved.
          </div>
          <div className="auth__footer__links">
            <div>Privacy Policy</div>
            <Image alt="" src={"/assets/icons/dot.svg"} width={8} height={8} />
            <div>Terms & Condition</div>
          </div>
        </div>
      </div>

      <div className="auth__illustration"></div>
    </div>
  );
}
