"use client"
import Image from "next/image";
import Link from "next/link";
import EmailSentModal from "../components/emailSentModal";
import { useState } from "react";

export default function ForgotPassword() {
  const [open, setOpen] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true)
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
        Password Recovery
        </div>
        <div className="auth__form__subtitle auth__form__subtitle-login text-center">
        Kindly provide the email address linked to your account.        </div>
        <form className="auth__form-login" onSubmit={handleSubmit}>
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

      <EmailSentModal open={open} setOpen={setOpen} />
    </div>
  );
}
