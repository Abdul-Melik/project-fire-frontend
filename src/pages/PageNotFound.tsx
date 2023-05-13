import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "src/shared/context/auth-context";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleButtonClick = () => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className='flex h-[70vh] w-full flex-col items-center justify-center'>
      <div className='flex w-1/4 flex-col items-center'>
        <img src='../src/assets/svg/404Error.svg' alt='404 Error' />
      </div>
      <div className='mt-5 text-center font-gilroy-regular text-3xl font-bold'>
        The page can’t be found. It looks like nothing was found at this location.
      </div>
      <button
        className='mt-5 rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-2xl font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]'
        onClick={handleButtonClick}
      >
        {token ? "Go Home" : "Back to Login"}
      </button>
    </div>
  );
};

export default PageNotFound;
