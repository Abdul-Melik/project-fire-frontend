import React, { useEffect } from 'react'

const Projects = () => {

  useEffect(() => {
    const opt1 = document.getElementById('opt-1')!;
    const opt2 = document.getElementById('opt-2')!;
    const opt3 = document.getElementById('opt-3')!;
    const opt4 = document.getElementById('opt-4')!;
    const contentHeading = document.getElementById('content-heading')!;
    
    opt1.addEventListener('click', () => {
      contentHeading.textContent = "All Projects TEST";
    });
    
    opt2.addEventListener('click', () => {
      contentHeading.textContent = "Active";
    });
    
    opt3.addEventListener('click', () => {
      contentHeading.textContent = "Inactive";
    });

    opt4.addEventListener('click', () => {
        contentHeading.textContent = "Completed";
      });
  }, []); 

  return (
    <div className="flex h-screen not-italic">
      <div className="w-1/5 bg-green-100 border-r border-gray-300">
        <div className="p-8">
          <span className="font-medium">PROJECTS</span>
        </div>
      </div>
      <div className="page-content flex-1 p-4 mr-8 ml-4">
      <div className="content-categories flex items-center">
  <div className="font-bold flex-1 p-8 py-4 text-3xl">Projects</div>
  <button className="font-semibold text-base bg-buttonColor hover:bg-green-900 text-white py-2 px-4 rounded-md ml-auto">
    Create new project
  </button>
  </div>
          <div className="content-categories flex">
            <div className="label-wrapper"></div>
            <div className="flex-1 p-8 py-2">
             <div className="flex items-center justify-between py-4">
          <div className="flex">
            
            <div className="relative">
              <input
                type="radio"
                name="nav"
                id="opt-1"
                className="sr-only"
              />
              <label
                htmlFor="opt-1"
                className="border text-sm font-semibold text-[#43A57C] border-gray-400 py-2 px-4 rounded-l-md cursor-pointer transition-colors duration-200 ease-in-out hover:bg-green-100 focus:bg-[#F5FFFA]"
              >
                All projects
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                name="nav"
                id="opt-2"
                className="sr-only"
                defaultChecked
              />
              <label
                htmlFor="opt-2"
                className="border text-sm font-semibold text-[#43A57C] border-gray-400 py-2 px-4 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-green-100 focus:bg-green-100"
              >
                Active
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                name="nav"
                id="opt-3"
                className="sr-only"
              />
              <label
                htmlFor="opt-3"
                className="border  text-sm font-semibold text-[#43A57C] border-gray-400 py-2 px-4 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-green-100 focus:bg-green-100"
              >
                Inactive
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                name="nav"
                id="opt-4"
                className="sr-only"
              />
              <label
                htmlFor="opt-4"
                className="border text-sm font-semibold text-[#43A57C] border-gray-400 py-2 px-4 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out hover:bg-green-100 focus:bg-green-100"
              >
                Completed
              </label>
            </div>
          </div>
          
        </div>
        <div className="inline justify-center w-1/5">
          <h1 className="text-2xl font-bold mt-6" id="content-heading"></h1>
        </div>
        </div>
        </div>
        
        </div>
        </div>
        );
    
};

export default Projects;