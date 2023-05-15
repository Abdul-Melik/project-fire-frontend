import { useState } from "react";

import Modal from "src/shared/components/utils/Modal";
import LoginForm from "src/components/login/LoginForm";
import LogoBanner from "src/components/login/LogoBanner";

const Login = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Modal onCancel={() => setError(null)} header='Login error!' show={!!error} isError={!!error}>
        <p>{error}</p>
      </Modal>
      <div className='flex h-screen'>
        <div className='hidden lg:block lg:w-1/2'>
          <LogoBanner />
        </div>
        <div className='mx-4 flex flex-1 flex-col items-center justify-center p-4'>
          <LoginForm handleError={(error) => setError(error)} />
        </div>
      </div>
    </>
  );
};

export default Login;
