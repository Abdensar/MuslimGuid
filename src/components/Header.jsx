import React from 'react'
import Logo from "../imgs/Logo.png";
import { RiAccountCircleFill } from "react-icons/ri";
import {Link}from "react-router-dom"
const Header = () => {
  return (
    
      <div className='fixed flex justify-between top-0 w-full h-12 bg-blue-header select-none  z-11'>
        <div className='flex items-center '>
        <Link to={"/"}>
        <img className="w-12  p-1 top-0 cursor-pointer" src={Logo} alt="" />
        </Link>
      <span className='text-dark-yellow font-semibold italic text-xl ml-1'>MUSLIM GUIDE</span>
        </div>
        <div className='text-arrow-yellow cursor-pointer text-5xl hover:text-white mr-1'>
          <Link to={"/User"}>
          <RiAccountCircleFill/>
          </Link>
        </div>
      </div>
  )
}

export default Header
