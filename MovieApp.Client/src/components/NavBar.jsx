import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { BiMovie } from "react-icons/bi";

export default function NavBar() {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-stone-100 border-b border-gray-400 w-full relative z-10"> {/* Set z-index to a higher value */}
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-between items-center h-20 mx-auto px-4">
          <a href="/">
            <div className="flex items-center">
              <BiMovie size={25} className="mx-2" />
              <h1 className="text-xl font-bolt text-stone-800 m-4">Movie App</h1>
            </div>
          </a>
          <ul className="hidden md:flex">
            <li className="p-4"><a href="/" className="font-sans text-lg hover:underline">Home</a></li>
            <li className="p-4"><a href="#" className="font-sans text-lg hover:underline">Login</a></li>
          </ul>
          <div onClick={handleNav} className={`block md:hidden`}>
            {!nav ? <IoClose size={20} /> : <IoMenu size={20} />}
          </div>
          <div className={`md:hidden fixed left-0 top-0 w-[60%] h-full border-r bg-stone-100 ease-in-out duration-400 ${nav ? 'hidden' : ''}`}>
            <a href="/">
              <div className="flex items-center h-20 mx-auto px-4">
                <BiMovie size={25} className="mx-2" />
                <h1 className="text-xl font-bolt text-stone-800 m-4">Movie App</h1>
              </div>
            </a>
            <ul className="pt-0">
              <li className="p-4 border-b border-gray-100"><a href="/" className="font-sans text-lg hover:underline">Home</a></li>
              <li className="p-4 border-b border-gray-100"><a href="#" className="font-sans text-lg hover:underline">Login</a></li>
              <li className="p-4 border-b border-gray-100"><a href="#" className="font-sans text-lg hover:underline">Swagger</a></li>
              <li className="p-4 border-b border-gray-100"><a href="#" className="font-sans text-lg hover:underline">Github</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
