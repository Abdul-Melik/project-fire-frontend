import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "src/shared/context/auth-context";
import Modal from "src/shared/components/utils/Modal";
import InputField from "src/shared/components/form-elements/InputField";

type Props = {
  handleError: (error: string | null) => void;
};

const LoginForm = ({ handleError }: Props) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/api/users/login`,
        {
          email,
          password,
          rememberMe,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = response.data;
      login(responseData.token, responseData.expiresIn, responseData.user);
      navigate("/home");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.error);
      } else {
        console.error("Unexpected error: ", error);
      }
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
    <div className='flex h-screen flex-col items-center justify-center'>
      {windowWidth < 1024 && (
        <div className='fixed inset-0 z-[-1]'>
          <img
            src='../src/assets/svg/gradient-background.svg'
            alt='Background'
            className='h-full w-full object-cover'
          />
        </div>
      )}
      <Modal onCancel={() => setError(null)} header='An error occurred!' show={!!error} isError={!!error}>
        <p>{error}</p>
      </Modal>
      {windowWidth < 1024 && (
        <div className='h-20'>
          <img src='../src/assets/svg/logo.svg' alt='Logo' className='mx-auto mb-3 h-[150px] w-[300px] pb-20' />
        </div>
      )}
      <div className='w-[450px] text-center'>
        <h2 className='mb-[42px] font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey'>
          Log In
        </h2>
        <form className='mb-[17px] items-center justify-center text-base' onSubmit={handleFormSubmit}>
          <InputField
            label='Email'
            htmlFor='email'
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            required={true}
            handleInput={(email) => setEmail(email)}
          />
          <InputField
            label='Password'
            htmlFor='password'
            type='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            required={true}
            handleInput={(password) => setPassword(password)}
          />
          <button
            className='mt-[13px] w-full rounded-md bg-deep-teal py-3 pl-3 font-gilroy-semi-bold font-semibold text-white hover:saturate-[400%]'
            type='submit'
          >
            Log in
          </button>
        </form>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center justify-start gap-[9px]'>
            <input
              className=' h-[18px] w-[18px] accent-deep-teal'
              type='checkbox'
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className='font-gilroy-medium font-medium tracking-[-0.015em] text-midnight-grey'>
              Remember password
            </span>
          </div>
          <a className='font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal underline' href='#'>
            Forgot Password?
          </a>
        </div>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center justify-start gap-[9px]'></div>
        </div>
        <div className='block h-3'></div>
        <a
          className='font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal underline'
          href='#'
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign Up!
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
