import React from "react";
import LogoBanner from "../components/login/LogoBanner";
import LoginForm from "../components/login/LoginForm";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="flex">
      <div className="hidden md:block md:w-1/2">
        <LogoBanner />
      </div>
      <div className="mx-4 w-full flex-col items-center justify-center p-4 md:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
