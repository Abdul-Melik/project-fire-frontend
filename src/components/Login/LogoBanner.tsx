import React from "react";
import logotype from '../../../public/svg/logotype.svg';
import "../../index.css"

function LogoBanner() {
  return (
    <div className="w-full flex items-center justify-center h-full bg-[url('../../public/svg/gradientbg.svg')] bg-no-repeat bg-cover logo-banner">
      <div
        className="w-full h-1/2 bg-cover bg-center  "
        style={{
          backgroundImage: `url(${logotype})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "300px",
          height: "150px"
          
          
          
        }}
      />
    </div>
  );
}
 
export default LogoBanner; 