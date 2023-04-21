import React, { useContext, useRef } from "react";
import useHttpClient from "../../shared/hooks/http-hook";
import useAuth from "../../shared/hooks/auth-hook" 
import AuthContext from "../../shared/context/auth-context" 
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logotype from '../../public/images/logotype.svg';
import "../../index.css" 


const LoginForm = () => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const refEmail = useRef<HTMLInputElement | null>(null);
  const refPassword = useRef<HTMLInputElement | null>(null);
  const refRememberMe =useRef<HTMLInputElement | null>(null);

  const submitHandler = async (event:React.FormEvent) => {
    event.preventDefault()
    
    try {
    const responseData = await sendRequest(
      "https://project-fire.onrender.com/api/users/login",
      "POST",
      JSON.stringify({
         email: (refEmail.current as HTMLInputElement).value,
         password: (refPassword.current as HTMLInputElement).value,
         rememberMe: (refRememberMe.current as HTMLInputElement).checked
      }),
      {
         "Content-Type": "application/json"
      }
   );
   auth.login(
    responseData.token, 
    responseData.expiresIn,
    responseData.user.id
 );
    navigate("/dashboard")

  } catch (error) {
    console.log(error)
  }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-1/1 h-screen flex items-center justify-center ">
      <div className="w-full max-w-sm">
  {windowWidth < 768 && (
    <img src="../../../public/svg/logotype.svg" alt="Logo" className="w-full mx-auto mb-3 pb-20" />
  )}
        <form className="w-full" onSubmit={submitHandler}>
          <h2 className="text-xl font-bold mb-4 justify-center text-center leading-10">Log in</h2>
          <div className="mb-4"> 
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email
            </label>
            <input
              ref={refEmail}
              className="shadow mt-0.5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password
            </label>
            <input
              ref={refPassword}
              className="shadow mt-0.5 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="bg-buttonColor hover:bg-green-900 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline justify-center items-center mx-auto w-full content-center"
            type="submit">Log In
          </button>
          <div className="flex items-center justify-between bloc">
            <label className="block mt-3 text-rempassColor">
              <input
                ref={refRememberMe}
                className="mr-2 leading-tight accent-[#1A3835]"
                type="checkbox"
              />
              <span className="text-sm">Remember password</span>
            </label>
            <a
              className="inline-block mt-2 align-baseline underline font-bold text-sm text-textColor hover:text-green-900"
              href="#">Forgot Password?
            </a>
          </div>
          <div className="flex items-center justify-center mt-6"></div>
        </form>
      </div>
    </div>
  );
        };


export default LoginForm;
