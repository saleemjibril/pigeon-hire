import Image from "next/image";
import Link from "next/link";
import LoginForm from "../components/loginForm";

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
        <LoginForm />
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

      <div className="home__mobile">
        View on desktop for better experience
      </div>
    </div>
  );
}
