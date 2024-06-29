import { React, useEffect, useState  } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { BsCalendar4Event } from "react-icons/bs";
import { GiPrayerBeads } from "react-icons/gi";
import { MdLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [check,setCheck]=useState(false);
  const [show, setShow] = useState(false);
  const [Menu, setMenu] = useState([
    { title: "اليوم", icon: <BsCalendar4Event />, path: "/"},
    { title: "أذكار", icon: <GiPrayerBeads />, path: "/Adkar"},
    { title: "أحاديث", icon: <MdLibraryBooks />, path: "/Hadith"},
  ]);
  const [cPath,setCPath]=useState()
  useEffect(()=>{
    const currentPath = window.location.pathname;
     setCPath(currentPath)
  },[check])
  return (
    <div
      className={`fixed z-10 top-12 left-0 mr-10 h-screen select-none ${
        show ? "w-52" : "w-20"
      } duration-300 py-2.5 px-3.5 bg-blue-sidebar `}
    >
      <IoIosArrowBack
        className={`bg-arrow-yellow  rounded-full text-xl absolute -right-2 top-5 cursor-pointer ${
          !show && "rotate-180"
        } `}
        onClick={() => setShow(!show)}
      />
      <ul>
      
        {Menu.map((item, index) => (
          <li key={index} >
            <Link onClick={()=>setCheck(!check) } to={item.path} >
              <div
                  
                className={`inline-flex items-center justify-between mb-5 text-dark-yellow ${
                  show ? "w-40" : null
                } ${cPath===item.path&&"bg-arrow-yellow text-white "}
              hover:bg-arrow-yellow p-2 rounded-lg hover:text-white duration-300
              `}
              >
                <span className={` text-4xl cursor-pointer block w-fit `}>
                  {item.icon}
                </span>
                <span
                  className={`font-bold italic text-xl ml-1 cursor-pointer ${
                    !show && "hidden"
                  } `}
                >
                  {item.title}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
