// "use client"
// import { useForm } from "react-hook-form";
// import { loginUser } from "../apis/auth";
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";

// export default function LoginForm(params) {
//     const [loading, setLoading] = useState(false)
//     const [passwordOpen, setPasswordOpen] = useState(false)
//     const dispatch = useDispatch();
//     const router = useRouter();

//     const onSubmit = async (data) => {
//         console.log("helloooo!");
        
//         // setError("");
//         setLoading(true);
    
//         try {
          
//           const response = await loginUser(data);

//           console.log("loginUser", response);
//           localStorage.setItem("token", response?.data?.accessToken);
//           document.cookie = `auth_token=${
//             response?.data?.accessToken
//           }; path=/; max-age=${60 * 60 * 24 * 7};`;
//           dispatch({
//             type: "USER_LOGIN_SUCCESS",
//             payload: {
//               token: response?.data?.accessToken
//             },
//           });
//           router.push("/user");
    
//           // toast.success("App created");
//           // setOpen(false);
//           // reloadFunction();
//           // reset();
//           // setAbiFileName("");
//           // setBytecodeFileName("");
//         } catch (error) {
//          toast.error(error?.response?.data?.msg || "An unexpected error occurred");
//               console.log("erroropop", error);

//         }finally {
//       setLoading(false);
//     }
//       };

//     const {
//         handleSubmit,
//         register,
//         reset,
//         formState: { errors },
//         setValue,
//         watch,
//       } = useForm();
//     return (
//         <form className="auth__form-login" onSubmit={handleSubmit(onSubmit)}>
//           <label htmlFor="email">Email address</label>

//           <div className="auth__form__input-login">
//             <input type="email" name="email" placeholder="e.g John Doe"
//             required
//             {...register("email")}

//             />
//             <Image
//               alt=""
//               width={24}
//               height={24}
//               src={"/assets/icons/email.svg"}
//             />
//           </div>

//           <label htmlFor="password">Password</label>
//           <div className="auth__form__input-login">
//             <input
//               type={passwordOpen ? "text" : "password"}
//               name="password"
//               placeholder="Enter your password"
//               required
//               {...register("password")}
              

//             />{" "}
//             <Image
//               alt=""
//               width={24}
//               height={24}
//               src={passwordOpen ? "/assets/icons/closedEye.svg" : "/assets/icons/openedEye.svg"}
//               onClick={() => setPasswordOpen(!passwordOpen)}
//               className="pointer"
//             />
//           </div>

//           <div className="auth__form__forgot">
//             <div>
//             <input type="checkbox" name="" id="" />

//               Remember me
//             </div>
//             <div>
//               <Link href={"/forgot-password"}>Forgot password?</Link>
//             </div>
//           </div>

//           <button className="auth__button" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
//         <div className="auth__login">
//           Don’t have an account! <Link href="/register">Sign Up</Link>
//         </div>
//         <br />
//         <br />
//         <div className="auth__line"></div>
//         <div className="auth__signup">or login with</div>
//         <br />
//         <button className="auth__oauth">
//           <Image
//             alt=""
//             width={88}
//             height={24}
//             src={"/assets/icons/google.svg"}
//           />
//         </button>
//         <br />
//         <br />
//         <br />
//         </form>
//     )
// }


"use client";
import { useForm } from "react-hook-form";
import { loginUser } from "../apis/auth";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function LoginForm(params) {
    const [loading, setLoading] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const setSecureCookie = (name, value, days = 7) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        const secure = process.env.NODE_ENV === 'production' ? 'Secure; SameSite=Strict' : '';
        document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; ${secure}`;
    };

    const onSubmit = async (data) => {
        setLoading(true);
    
        try {
            const response = await loginUser(data);
            const { accessToken, user } = response.data;

            // Store token in localStorage
            localStorage.setItem("token", accessToken);
            
            // Set secure cookies with user info
            setSecureCookie("auth_token", accessToken);
            setSecureCookie("user_id", user.id);
            setSecureCookie("user_email", user.email);
            setSecureCookie("user_name", user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim());

            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: {
                    token: accessToken,
                    userInfo: user
                },
            });
            
            router.push("/user");
            toast.success("Login successful!");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error?.response?.data?.msg || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="auth__form-login" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email address</label>
            <div className="auth__form__input-login">
                <input 
                    type="email" 
                    name="email" 
                    placeholder="e.g John Doe"
                    required
                    {...register("email")}
                    disabled={loading}
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
                    type={passwordOpen ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    required
                    {...register("password")}
                    disabled={loading}
                />
                <Image
                    alt=""
                    width={24}
                    height={24}
                    src={passwordOpen ? "/assets/icons/closedEye.svg" : "/assets/icons/openedEye.svg"}
                    onClick={() => setPasswordOpen(!passwordOpen)}
                    className="pointer"
                />
            </div>

            <div className="auth__form__forgot">
                <div>
                    <input type="checkbox" name="" id="" disabled={loading} />
                    Remember me
                </div>
                <div>
                    <Link href={"/forgot-password"}>Forgot password?</Link>
                </div>
            </div>

            <button className="auth__button" disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>
            
            <div className="auth__login">
                Don't have an account! <Link href="/register">Sign Up</Link>
            </div>
            <br />
            <br />
            <div className="auth__line"></div>
            <div className="auth__signup">or login with</div>
            <br />
            <button className="auth__oauth" type="button" disabled={loading}>
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
    );
}