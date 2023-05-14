import { useState } from "react";

import Modal from "src/shared/components/utils/Modal";
import LogoBanner from "src/components/login/LogoBanner";
import RegisterForm from "src/components/login/RegisterForm";

const Signup = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Modal onCancel={() => setError(null)} header='Login error!' show={!!error} isError={!!error}>
        <p>{error}</p>
      </Modal>
      <div className='flex'>
        <div className='hidden lg:block lg:w-1/2'>
          <LogoBanner />
        </div>
        <div className='mx-4 w-full flex-col items-center justify-center p-4 lg:w-1/2'>
          <RegisterForm handleError={(error) => setError(error)} />
        </div>
      </div>
    </>
  );
};

export default Signup;
