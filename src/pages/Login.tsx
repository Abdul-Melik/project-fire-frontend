import React from 'react'
import LogoBanner from '../components/Login/LogoBanner'
import LoginForm from '../components/Login/LoginForm'

type Props = {}

const Login = (props: Props) => {
  return (
    <div className="flex">
      <div className="hidden md:block md:w-1/2">
        <LogoBanner />
      </div>
      <div className="w-full md:w-1/2 flex-col justify-center mx-4 items-center p-4">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;