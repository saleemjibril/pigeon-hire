import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../components/registerForm";


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
        <RegisterForm />

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
