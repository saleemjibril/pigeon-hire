"use client";
import Image from "next/image";
import Link from "next/link";
import EmailSentModal from "../components/emailSentModal";
import { useState } from "react";
import { forgotPassword } from "../apis/auth";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      console.log("forgotPassword", response);
      localStorage.setItem("resetToken", response?.data?.resetToken);
      setOpen(true);
    } catch (error) {
      console.log("Error creating community:", error);
      toast.error(
        error?.response?.data?.msg ||
          "Error creating community. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
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
          <Image
            alt=""
            src="/assets/icons/backArrow.svg"
            width={24}
            height={24}
          />
          Back
        </div>

        <div className="auth__form__title text-center">Password Recovery</div>
        <div className="auth__form__subtitle auth__form__subtitle-login text-center">
          Kindly provide the email address linked to your account.{" "}
        </div>
        <form className="auth__form-login" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>

          <div className="auth__form__input-login">
            <input
              type="email"
              name="email"
              placeholder="e.g John Doe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/email.svg"}
            />
          </div>

          <button className="auth__button" disabled={loading}>{loading ? "Loading..." : "Continue"}</button>
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

      <div className="home__mobile">
        View on desktop for better experience
      </div>
    </div>
  );
}
