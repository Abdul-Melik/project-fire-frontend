import React from 'react'
import LogoBanner from '../components/Login/LogoBanner'
import LoginForm from '../components/Login/LoginForm'

type Props = {}

const Login = (props: Props) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <LogoBanner />
      </div>
      <div className="w-1/2">
        <LoginForm
        />
      </div> 
    </div> 
  )
}

export default Login