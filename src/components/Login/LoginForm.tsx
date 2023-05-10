import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import useHttpClient from "../../shared/hooks/http-hook";
import AuthContext from "../../shared/context/auth-context";
import logotype from "/svg/logotype.svg";
import "../../index.css";

type Props = {
  handleError: (error: string | null) => void;
};

const LoginForm = ({ handleError }: Props) => {
  const { sendRequest } = useHttpClient();
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
        "http://localhost:5000/api/users/login",
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
      handleError((error as Error).message);
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
            src={logotype}
            alt="Logo"
            className="mx-auto mb-3 w-full pb-20"
          />
        )}
        <form className="w-full" onSubmit={submitHandler}>
          <h2 className="mb-4 justify-center text-center text-[32px] font-semibold not-italic font-Gilroy leading-[40px] text-[#292929]">
            Log in
          </h2>
          <div className="mb-4">
            <label
              className="mb-2 block font-Gilroy text-base font-medium text-[#292929] leading-[24px]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              ref={refEmail}
              className="focus:shadow-outline mt-0.5 w-full appearance-none rounded border px-3 py-2 font-Gilroy text-base font-medium text-[#272934] leading-[24px] shadow focus:outline-none "
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block font-Gilroy text-base font-medium leading-[24px] text-[#292929]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              ref={refPassword}
              className="focus:shadow-outline mb-2 mt-0.5 w-full appearance-none rounded border px-3 py-2 font-Gilroy text-base font-medium text-[#272934] leading-[24px] shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="mx-auto w-full content-center items-center justify-center rounded-md bg-buttonColor px-6 py-2 text-white hover:bg-green-900 font-Gilroy font-semibold leading-[24px] text-base"
            type="submit"
          >
            Log In
          </button>
          <div className="whitespace-nowrap flex justify-between items-center gap-2.5 mt-1 ">
            <label className="mt-3 text-rempassColor flex items-center">
              <input
                ref={refRememberMe}
                className="mr-2 w-[18px] h-[18px] leading-tight accent-[#1A3835]"
                type="checkbox"
              />
              <span className="font-Gilroy font-medium leading-[24px] text-base tracking-[-0.015em] text-[#292929]">
                Remember password
              </span>
            </label>
            <a
              className="mt-3 inline-block font-Gilroy font-medium leading-[24px] text-base tracking-[-0.015em] text-[#1A3835] underline hover:text-green-900 justify-end"
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
