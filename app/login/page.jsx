import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div className="auth">
      <div className="auth__form">
        <Image
          alt=""
          className="auth__form__login-logo"
          width={240}
          height={48}
          src={"/assets/icons/logo.svg"}
        />

        <div className="auth__form__title text-center">
          Welcome back to Pigeonhire
        </div>
        <div className="auth__form__subtitle auth__form__subtitle-login text-center">
          Log in to continue discover, connect, and convert leads.{" "}
        </div>
        <form className="auth__form-login">
          <label htmlFor="email">Email address</label>

          <div className="auth__form__input-login">
            <input type="email" name="email" placeholder="e.g John Doe" />
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/email.svg"}
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="auth__form__input-login">
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

          <div className="auth__form__forgot">
            <div>
              <Image
                alt=""
                width={24}
                height={24}
                src={"/assets/icons/uncheckedBox.svg"}
              />
              Remember me
            </div>
            <div>
              <Link href={"/forgot-password"}>Forgot password?</Link>
            </div>
          </div>

          <button className="auth__button">Login</button>
        <div className="auth__login">
          Don’t have an account! <Link href="/register">Sign Up</Link>
        </div>
        <br />
        <br />
        <div className="auth__line"></div>
        <div className="auth__signup">or login with</div>
        <br />
        <button className="auth__oauth">
          <Image
            alt=""
            width={88}
            height={24}
            src={"/assets/icons/google.svg"}
          />
        </button>
        <br />
        <br />
        <br />
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
