import React, { useContext, useState } from "react";
import { MyContext } from "../../contexts/MyContext";

const Login: React.FC = () => {
  const { setUserData } = useContext(MyContext);
  const [input, setInput] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    })); 
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    /* const responseData = await sendRequest(
               "http://localhost:5000/api/users/login",
               "POST",
               JSON.stringify({
                  email: emailRef.current.value,
                  password: passwordRef.current.value
               }),
               {
                  "Content-Type": "application/json"
               }
            );
            */
    event.preventDefault();
    setUserData(input);
    setInput({ email: "", password: "" })
    console.log(handleSubmit);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  

  return ( 
    <div className="w-1/1 h-screen flex items-center justify-center ">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 justify-center text-center leading-10">Log in</h2>
        <div className="mb-4"> 
          <label className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">Email</label>
          <input className="shadow mt-0.5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"/></div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">Password</label>
          <input
            className="shadow mt-0.5 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"/></div>
        <button 
            className="bg-buttonColor hover:bg-green-900 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline justify-center items-center mx-auto w-full content-center"
            type="button">Log In</button>
        <div className="flex items-center justify-between bloc">
          <label className="block mt-3 text-rempassColor">
            <input className="mr-2 leading-tight accent-[#1A3835]" type="checkbox" />
            <span className="text-sm">Remember password</span>
          </label>
          <a className="inline-block mt-2 align-baseline underline font-bold text-sm text-textColor hover:text-green-900"
            href="#">Forgot Password?</a>
        </div>
        <div className="flex items-center justify-center mt-6">
          
        </div>
      </form>
    </div>
  );
}

export default Login;