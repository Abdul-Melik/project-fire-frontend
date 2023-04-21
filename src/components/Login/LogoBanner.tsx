import React from "react";
import logotype from '../../../public/svg/logotype.svg';

function LeftScreen() {
  return (
    <div className="w-full flex items-center justify-center h-full bg-[url('../../public/svg/gradientbg.svg')] bg-no-repeat bg-cover">
  <div className="w-full h-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${logotype})`, 
  backgroundSize: "50% auto", 
  backgroundRepeat: "no-repeat", }} />
  </div> 
 
  ); 
}   
 
export default LeftScreen; 