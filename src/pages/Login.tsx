import React from "react";
import LogoBanner from "../components/login/LogoBanner";
import LoginForm from "../components/login/LoginForm";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <LogoBanner />
      </div>
      <div className="w-1/2">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
