import React from "react";
import logotype from '../../../public/svg/logotype.svg';



function LeftScreen() {
  return (
    <div className='screen'>
  <div className='logo' style={{ backgroundImage: `url(${logotype})`, 
  backgroundSize: "50% auto", 
  backgroundRepeat: "no-repeat", }} />
</div>

  ); 
} 
 
export default LeftScreen; 