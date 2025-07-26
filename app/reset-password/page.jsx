import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
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
        Enter New Password
        </div>
<br />
<br />
        <form className="auth__form-login">
          <label htmlFor="email">Password</label>

          <div className="auth__form__input-login">
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                      />{" "}
                      <Image
                        alt=""
                        width={24}
                        height={24}
                        src={"/assets/icons/openedEye.svg"}
                      />
                    </div>
          <label htmlFor="email">Confirm Password</label>

          <div className="auth__form__input-login">
                      <input
                        type="password"
                        name="password"
                      />{" "}
                      <Image
                        alt=""
                        width={24}
                        height={24}
                        src={"/assets/icons/openedEye.svg"}
                      />
                    </div>

          <button className="auth__button">Continue</button>
       
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
