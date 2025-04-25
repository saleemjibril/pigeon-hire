"use client"
import { useForm } from "react-hook-form";
import { loginUser } from "../apis/auth";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm(params) {
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        console.log("helloooo!");
        
        // setError("");
        setLoading(true);
    
        try {
          
          const response = await loginUser(data);

          console.log("loginUser", response);
          localStorage.setItem("token", response?.data?.record?.accessToken);
          document.cookie = `auth_token=${
            response?.data?.record?.accessToken
          }; path=/; max-age=${60 * 60 * 24 * 7};`;
          dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: {
              token: response?.data?.record?.accessToken
            },
          });
        //   router.push("/users");
    
          // toast.success("App created");
          // setOpen(false);
          // reloadFunction();
          // reset();
          // setAbiFileName("");
          // setBytecodeFileName("");
          setLoading(false);
        } catch (error) {
        //   setError(error?.response?.data?.msg);
          console.error("Error creating app:", error);
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
        <form className="auth__form-login" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email address</label>

          <div className="auth__form__input-login">
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
          <div className="auth__form__input-login">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              {...register("password")}

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

          <button className="auth__button" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
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
    )
}