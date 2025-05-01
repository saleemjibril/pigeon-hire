"use client"
import { useForm } from "react-hook-form";
import { registerUser } from "../apis/auth";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function RegisterForm(params) {
  const dispatch = useDispatch();
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [passwordOpen, setPasswordOpen] = useState(false)

    const onSubmit = async (data) => {
        console.log("helloooo!");
        
        // setError("");
        setLoading(true);
    
        try {
          
          const response = await registerUser(data);

          console.log("registerUser", response);
          // localStorage.setItem("token", response?.data?.record?.verificationToken);
          // document.cookie = `auth_token=${
          //   response?.data?.record?.verificationToken
          // }; path=/; max-age=${60 * 60 * 24 * 7};`;
          // dispatch({
          //   type: "USER_LOGIN_SUCCESS",
          //   payload: {
          //     token: response?.data?.record?.verificationToken,
          //     userInfo: response?.data?.record
          //   },
          // });
          
          toast.success("Registration successful. Please check your email to verify your account.");
          router.push("/login");
    
          // toast.success("App created");
          // setOpen(false);
          // reloadFunction();
          // reset();
          // setAbiFileName("");
          // setBytecodeFileName("");
          setLoading(false);
        } catch (error) {
          toast.error(error?.response?.data?.msg);
          console.log("Error creating app:", error);
          setLoading(false);
        }
      };

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
        setValue,
        watch,
      } = useForm();
    return (
        <form className="auth__form-register" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstName">First name</label>
          <div className="auth__form__input">
            <input type="text" name="firstName" placeholder="e.g John Doe"
            required
            {...register("firstName")}
            />
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/user.svg"}
            />
          </div>

          <label htmlFor="lastName">Last name</label>
          <div className="auth__form__input">
            <input type="text" name="lastName" placeholder="e.g John Doe"
            required
            {...register("lastName")}
            />
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/user.svg"}
            />
          </div>
          <label htmlFor="email">Email address</label>

          <div className="auth__form__input">
            <input type="email" name="email" placeholder="e.g John Doe"
            required
            {...register("email")}
            />
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
              type={passwordOpen ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
            {...register("password")}
            />{" "}
            <Image
              alt=""
              width={24}
              height={24}
              src={passwordOpen ? "/assets/icons/closedEye.svg" : "/assets/icons/openedEye.svg"}
              onClick={() => setPasswordOpen(!passwordOpen)}
              className="pointer"
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
              type={passwordOpen ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />{" "}
            <Image
              alt=""
              width={24}
              height={24}
              src={passwordOpen ? "/assets/icons/closedEye.svg" : "/assets/icons/openedEye.svg"}
              onClick={() => setPasswordOpen(!passwordOpen)}
              className="pointer"
            />
          </div>

          <div className="auth__form__terms">
            <input required type="checkbox" name="" id="" />
            <div>
              I agree to the <span>Terms & Data policy</span>
            </div>
          </div>

          <button className="auth__button" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
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
    )
}