import React, { useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Logo from "../imgs/Logo.png";
import { RiAccountCircleFill, RiLogoutCircleLine } from "react-icons/ri";
import { MdAccountCircle, MdAdminPanelSettings } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.profile-dropdown')) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
function slowScrollToTop(duration = 500) {
  const start = window.scrollY;
  const distance = -start;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // clamp 0–1
    window.scrollTo(0, start + distance * progress);

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}
  return (
    <div className='fixed flex justify-between top-0 w-full h-12 bg-blue-header select-none z-50'>
      <div className='flex items-center'>
          {location.pathname==="/"?(  <span  onClick={()=>{slowScrollToTop();
          }}>
          
        <img className="w-12  p-1 top-0 cursor-pointer " src={Logo} alt="" />
        </span>):(
          <Link to={'/'}> 
        <img className="w-12  p-1 top-0 cursor-pointer" src={Logo} alt="" />
          </Link>)}
        <span className='text-dark-yellow font-semibold italic text-xl ml-1'>
          MUSLIM GUIDE
        </span>
      </div>

      <div className='flex items-center gap-4 mr-4'>
        {user ? (
          <div className="relative profile-dropdown">
            {console.log(user)}
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 focus:outline-none"
            >
              <RiAccountCircleFill className="text-arrow-yellow text-3xl hover:text-white cursor-pointer" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
               
                <section className="flex w-full pb-2 border-b-2 px-1">
          <section className=" flex place-items-center">
            {user.image ? (
              <span className=" w-10 h-10 text-center mx-1 outline outline-4 outline-blue-900 select-none rounded-full hover:outline-blue-900/50 overflow-hidden">
                <img
                  src={user.image}
                  alt=""
                  className="object-top fill-transparent"
                />
              </span>
            ) : (
              <MdAccountCircle className="w-12 h-12 text-dark-yellow hover:text-dark-yellow/80" />
            )}
          </section>
          <section className="mx-2 font-semibold">
            <span className="block flex-wrap">{user.name}</span>
          </section>
        </section>
        <section className="my-2 font-semibold px-2">
          <Link
                  to="/user"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <IoSettingsOutline className="mr-2" />
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <RiLogoutCircleLine className="mr-2" />
                  Logout
                </button>
        </section>
                
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-dark-yellow text-sm">
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-dark-yellow text-white px-3 py-1 rounded text-sm hover:bg-arrow-yellow"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;