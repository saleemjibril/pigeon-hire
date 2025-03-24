"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  useEffect(() => {
    const otpInputs = document.querySelectorAll(".auth__form__otp-input__input");

    otpInputs.forEach((input, index) => {
      input.addEventListener("input", (event) => {
        const inputValue = event.target.value;

        if (inputValue && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && index > 0 && !input.value) {
          otpInputs[index - 1].focus();
          event.preventDefault();
        }
      });
    });
  }, []);

   const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/reset-password");
  }
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

        <div className="auth__form__back">
          <Image alt="" src="/assets/icons/backArrow.svg" width={24} height={24} />
          Back
        </div>

        <div className="auth__form__title text-center">
        Enter Confirmation Code
        </div>
        <div className="auth__form__subtitle auth__form__subtitle-login text-center">
        Enter the 4 digits OTP code sent to your email address
        </div>
        <form className="auth__form-login" onSubmit={handleSubmit}>

          <div className="auth__form__otp-input">
            <input className="auth__form__otp-input__input" type="text" name="otp" maxLength={1} />
            <input className="auth__form__otp-input__input" type="text" name="otp" maxLength={1} />
            <input className="auth__form__otp-input__input" type="text" name="otp" maxLength={1} />
            <input className="auth__form__otp-input__input" type="text" name="otp" maxLength={1} />
            <input className="auth__form__otp-input__input" type="text" name="otp" maxLength={1} />
            <input className="auth__form__otp-input__input" type="text" name="otp" maxLength={1} />
           
          </div>

          <button className="auth__button">Continue</button>
          <div className="auth__resend">
          Didn’t get the code? <span>Resend Code</span>
          </div>
       
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
    </div>
  );
}
