import React, { useContext, useRef } from "react";
import useHttpClient from "../../shared/hooks/http-hook";
import useAuth from "../../shared/hooks/auth-hook";
import AuthContext from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logotype from "../../public/images/logotype.svg";
import "../../index.css";

const LoginForm = () => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const refEmail = useRef<HTMLInputElement | null>(null);
  const refPassword = useRef<HTMLInputElement | null>(null);
  const refRememberMe = useRef<HTMLInputElement | null>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        "https://project-fire.onrender.com/api/users/login",
        "POST",
        JSON.stringify({
          email: (refEmail.current as HTMLInputElement).value,
          password: (refPassword.current as HTMLInputElement).value,
          rememberMe: (refRememberMe.current as HTMLInputElement).checked,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(
        responseData.token,
        responseData.expiresIn,
        responseData.user.id
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-1/1 flex h-screen items-center justify-center ">
      <div className="w-full max-w-sm">
        {windowWidth < 768 && (
          <img
            src="../../../public/svg/logotype.svg"
            alt="Logo"
            className="mx-auto mb-3 w-full pb-20"
          />
        )}
        <form className="w-full" onSubmit={submitHandler}>
          <h2 className="mb-4 justify-center text-center text-xl font-bold leading-10">
            Log in
          </h2>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              ref={refEmail}
              className="focus:shadow-outline mt-0.5 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              ref={refPassword}
              className="focus:shadow-outline mb-3 mt-0.5 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="focus:shadow-outline mx-auto w-full content-center items-center justify-center rounded bg-buttonColor px-6 py-2 font-bold text-white hover:bg-green-900 focus:outline-none"
            type="submit"
          >
            Log In
          </button>
          <div className="bloc flex items-center justify-between">
            <label className="mt-3 block text-rempassColor">
              <input
                ref={refRememberMe}
                className="mr-2 leading-tight accent-[#1A3835]"
                type="checkbox"
              />
              <span className="text-sm">Remember password</span>
            </label>
            <a
              className="mt-2 inline-block align-baseline text-sm font-bold text-textColor underline hover:text-green-900"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center"></div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
