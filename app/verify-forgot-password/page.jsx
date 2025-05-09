"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { resetPassword, verifyOtp } from "../apis/auth";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const router = useRouter();
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const otpInputs = document.querySelectorAll(
      ".auth__form__otp-input__input"
    );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("resetToken");
    let otp = `${otp1}${otp2}${otp3}${otp4}`;
    setLoading(true);
    try {
      const response = await verifyOtp(otp, token);
      if (response?.status === 200) {
        setStage(2)
      }
      console.log("verifyOtp", response);
      toast.success("OTP verified successfully. Please enter your new password")
      // router.push("/reset-password");
    } catch (error) {
      console.log("Error creating community:", error);
      toast.error(
        error?.response?.data?.msg ||
          "Error verifying OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("resetToken");
      const response = await resetPassword(password, token);

      console.log("resetPassword", response);
      toast.success("Password reset successfully. Please login");
      router.push("/login");
    } catch (error) {
      console.log("Error resetting password:", error);
      toast.error(
        error?.response?.data?.msg ||
          "Error resetting password Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth">
      {stage === 1 && (
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

          <div className="auth__form__title text-center">
            Enter Confirmation Code
          </div>
          <div className="auth__form__subtitle auth__form__subtitle-login text-center">
            Enter the 4 digits OTP code sent to your email address
          </div>
          <form className="auth__form-login" onSubmit={handleSubmit}>
            <div className="auth__form__otp-input">
              <input
                className="auth__form__otp-input__input"
                type="text"
                name="otp"
                maxLength={1}
                value={otp1}
                onChange={(e) => setOtp1(e.target.value)}
              />
              <input
                className="auth__form__otp-input__input"
                type="text"
                name="otp"
                maxLength={1}
                value={otp2}
                onChange={(e) => setOtp2(e.target.value)}
              />
              <input
                className="auth__form__otp-input__input"
                type="text"
                name="otp"
                maxLength={1}
                value={otp3}
                onChange={(e) => setOtp3(e.target.value)}
              />
              <input
                className="auth__form__otp-input__input"
                type="text"
                name="otp"
                maxLength={1}
                value={otp4}
                onChange={(e) => setOtp4(e.target.value)}
              />
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
              <Image
                alt=""
                src={"/assets/icons/dot.svg"}
                width={8}
                height={8}
              />
              <div>Terms & Condition</div>
            </div>
          </div>
        </div>
      )}

      {stage === 2 && (
        <div className="auth__form" onSubmit={handleSubmit2}>
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
                type={passwordOpen ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <Image
                alt=""
                width={24}
                height={24}
                src={
                  passwordOpen
                    ? "/assets/icons/closedEye.svg"
                    : "/assets/icons/openedEye.svg"
                }
                onClick={() => setPasswordOpen(!passwordOpen)}
                className="pointer"
              />
            </div>
            <label htmlFor="email">Confirm Password</label>

            <div className="auth__form__input-login">
              <input
                type={passwordOpen ? "text" : "password"}
                name="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />{" "}
              <Image
                alt=""
                width={24}
                height={24}
                src={
                  passwordOpen
                    ? "/assets/icons/closedEye.svg"
                    : "/assets/icons/openedEye.svg"
                }
                onClick={() => setPasswordOpen(!passwordOpen)}
                className="pointer"
              />
            </div>

            <button className="auth__button" disabled={loading}>
              {loading ? "Loading..." : "Continue"}
            </button>
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
              <Image
                alt=""
                src={"/assets/icons/dot.svg"}
                width={8}
                height={8}
              />
              <div>Terms & Condition</div>
            </div>
          </div>
        </div>
      )}

      <div className="auth__illustration"></div>
    </div>
  );
}
