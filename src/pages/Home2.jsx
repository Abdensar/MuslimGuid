import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar-ma";
import "moment-timezone";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { PrayerContext } from "../components/Main";
import { FaPlayCircle, FaShareAlt, FaStar, FaStopCircle } from "react-icons/fa";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
moment.locale("ar-ma");
const Home = () => {
  const {
    seCitie,
    setSeCitie,
    ciOpen,
    setCiOpen,
    ciValue,
    setCiValue,
    prayers,
    setPrayers,
    aprayerIndex,
    bprayerIndex,
    cities,
    nDate,
    aTime,
    bTime,
    nTime,
    hijri,
    aType,
    seAType,
    hType,
    seHType,
    shareText,
    share,
    setShare,
    rDikr,
    rHadith,
    pNot,
    setPNot,
    alarmk,
    alValue,
    setAlValue,
    seAlarmk,
    setSeAlarmk,
  } = useContext(PrayerContext);
  const [alOpen, setAlOpen] = useState(false);
  const [pick, setPick] = useState(false);
  const [alarmI, setAlarmI] = useState();
  const pNotClick = (index) => {
    const updatedPNot = pNot.map((item, i) => {
      if (i === index) {
        return { ...item, active: !item.active };
      } else {
        return item;
      }
    });
    setPNot(updatedPNot);
  };
  const pAlarmClick = (I) => {
    const updatedPrayers = prayers.map((item, i) => {
      if (i === I) {
        return { ...item, alarm: seAlarmk.sound };
      } else {
        return item;
      }
    });
    setPrayers(updatedPrayers);
    console.log(prayers);
  };
  const [splay, setSPlay] = useState(true);
  const [tSound, setTSound] = useState();
  useEffect(() => {
    if (seAlarmk.sound) {
      setTSound()
      setTSound(new Audio(seAlarmk.sound));
    }
  }, [seAlarmk]);

  useEffect(() => {
    if (tSound) {
      if (splay) {
        tSound.play();
      } else {
        tSound.pause();
      }
    }
  }, [splay, tSound]);
  const Modli = (prI) => {
    return (
      <div
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          pick ? "visible bg-black/20" : "invisible"
        }`}
        onClick={() => {
          setPick(false);
          setSeAlarmk({
            sound: "",
            name: "",
          });
          setSPlay(true);
          setTSound()
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 transition-all ${
            pick ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <div className="justify-self-center ">
            <div
              className={`bg-transparent border rounded-md w-full pl-2 py-2 flex items-center justify-between  text-gray-800 ${
                seAlarmk.name && "text-black"
              } cursor-pointer `}
              onClick={() => setAlOpen(!alOpen)}
            >
              <span>{seAlarmk.name ? seAlarmk.name : "اختر الآذان"}</span>
              <BiChevronDown
                className={`text-2xl  ${alOpen && "rotate-180"} duration-300`}
              />
            </div>
            <ul
              className={`bg-transparent border-t-0 rounded-md  overflow-y-auto scrollbar max-h-0 text-right ${
                alOpen && "max-h-52  border"
              } duration-300`}
            >
              {alarmk.map((adhan, index) => (
                <li
                  key={index}
                  className={`hover:text-white hover:bg-black p-2 ${
                    adhan.name === seAlarmk.name && "bg-slate-700 text-withe"
                  }`}
                  onClick={() => {
                    setSeAlarmk({
                      sound: adhan.sound,
                      name: adhan.name,
                    });
                    setAlOpen(!alOpen);
                    pAlarmClick(prI);
                    setSPlay(true);
                  }}
                >
                  {adhan.name}
                </li>
              ))}
              {/* {pAlarmClick(I)} */}
            </ul>
          </div>
          {tSound && (
            <button onClick={() => setSPlay(!splay)}>
              {splay ? <FaPlayCircle /> : <FaStopCircle />}
            </button>
          )}
        </div>
        {console.log(alarmk)}
        {console.log(pick)}
      </div>
    );
  };
  return (
    <>
      <div
        className={`text-center m-3 mt-5 grid grid-cols-1  gap-x-1 ssm:gap-x-10  text-white border-b pb-2 
        ${bTime ? "ssm:grid-cols-4" : "ssm:grid-cols-3"}`}
      >
        <div className="justify-self-center ">
          <div
            className={`bg-transparent border rounded-md w-full pl-2 py-2 flex items-center justify-between  text-gray-400 ${
              seCitie.arabicName && "text-white"
            } cursor-pointer `}
            onClick={() => setCiOpen(!ciOpen)}
          >
            <span>
              {seCitie.arabicName
                ? seCitie.arabicName.length > 14
                  ? "..." + seCitie.arabicName.substring(0, 14)
                  : seCitie.arabicName
                : "اختر المدينة"}
            </span>
            <BiChevronDown
              className={`text-2xl  ${ciOpen && "rotate-180"} duration-300`}
            />
          </div>
          <ul
            className={`bg-transparent border-t-0 rounded-md  overflow-y-auto scrollbar max-h-0 text-right ${
              ciOpen && "max-h-52  border"
            } duration-300`}
          >
            <div className="flex items-center px-2 sticky z-1 top-0 bg-gray-700 ">
              <AiOutlineSearch className="text-3xl " />
              <input
                type="text"
                onChange={(e) => setCiValue(e.target.value)}
                value={ciValue}
                dir="rtl"
                placeholder="المدينة"
                className="bg-transparent p-2 text-lg w-full outline-none
                  text-right"
              />
            </div>
            {cities.map((citie, index) => (
              <li
                key={index}
                className={`hover:bg-white hover:text-black p-2 ${
                  citie.arabicName.startsWith(ciValue) ? "block" : "hidden"
                } ${
                  citie.arabicName === seCitie.arabicName &&
                  "bg-slate-50 text-black"
                }`}
                onClick={() => {
                  setSeCitie({
                    name: citie.name,
                    arabicName: citie.arabicName,
                  });
                  setCiOpen(!ciOpen);
                  setCiValue("");
                }}
              >
                {citie.arabicName}
              </li>
            ))}
          </ul>
        </div>
        <div className={`justify-self-center `}>
          <h2 className="text-center text-base ssm:text-xl">
            تبقى حتى صلاة {prayers[aprayerIndex].name}
          </h2>
          <h1 className="text-center text-xl ssm:text-3xl font-semibold">
            {aTime}
          </h1>
        </div>
        <div className={`justify-self-center ${!bTime && "hidden"}`}>
          <h2 className="text-center text-base ssm:text-xl">
            فاتت على صلاة {prayers[bprayerIndex].name}
          </h2>
          <h1 className="text-center text-xl ssm:text-3xl font-semibold">
            {bTime}
          </h1>
        </div>
        <div className="justify-self-left">
          <h2
            className="text-center ssm:text-start text-base ssm:text-l"
            dir="rtl"
          >
            {hijri.day} {hijri.month.ar} {hijri.year}|{nDate}
          </h2>
          <h1 className="text-center ssm:text-end text-xl ssm:text-3xl font-semibold">
            {seCitie.arabicName ? seCitie.arabicName : "المغرب"} {nTime}
          </h1>
        </div>
      </div>
      <div
        className="grid grid-cols-1 ssm:grid-cols-5 gap-12 px-7 place-content-between place-items-center m-3 mb-4 "
        dir="rtl"
      >
        {prayers.map((prayer, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg h-full">
            <div className=" flex flex-col">
              <div className="rounded-xl rounded-b-none overflow-hidden ">
                <img
                  src={prayer.img}
                  className="ssm:h-28 slg:h-full w-full"
                  alt=""
                />
              </div>
              <div className="flex justify-between ">
                <h5 className="inline-block font-medium text-2xl mr-2 mt-3 place-self-start">
                  {prayer.name}
                </h5>
                <button
                  className="inline-block text-dark-yellow text-3xl place-content-center"
                  onClick={() => {
                    pNotClick(index);
                  }}
                >
                  {prayer.not ? (
                    <IoMdNotifications />
                  ) : (
                    <IoMdNotificationsOutline
                      onClick={() => {
                        setPick(true);
                        setAlarmI(index);
                      }}
                    />
                  )}
                </button>
              </div>
              <h1 className="text-4xl font-extrabold italic mt-3 p-2 place-self-center">
                {prayer.time}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 ssm:grid-cols-2 gap-20 px-10 place-content-between plac-items-center m-3">
        <div className="bg-blue-sidebar">
          <>
            <div className={` h-fit w-full `}>
              <header className="bg-card-header justify-self-center  grid grid-cols-3 px-1 py-2 text-l h-fit ssm:p-3  ssm:text-3xl font-semibold italic">
                <span className="inline-block justify-self-start text-center place-content-center ssm:text-start text-white">
                  {rDikr.count}
                  {":المرات"}
                </span>
                <span className="inline-block justify-self-center text-center place-content-center  text-white">
                  {seAType.name}
                </span>
                <span
                  className="inline-block justify-self-end place-content-center "
                  onClick={() => {
                    rDikr.favorie = !rDikr.favorie;
                  }}
                >
                  <FaStar
                    className={` cursor-pointer ${
                      rDikr.favorie ? "text-arrow-yellow" : "text-slate-800 "
                    }`}
                  />
                </span>
              </header>
              <div className="bg-blue-sidebar max-h-72 place-self-center text-center p-3 ssm:p-6  overflow-y-auto scrollbar">
                <p
                  dir="rtl"
                  className=" text-white text-xl font-medium leading-relaxed justify-self-center "
                >
                  <span className="font-bold text-arrow-yellow">”</span>
                  {rDikr.content}
                  <span className="font-bold text-arrow-yellow">“.</span>
                </p>
              </div>
              <footer className="flex justify-between  w-full bg-blue-sidebar p-3">
                {rDikr.reference && (
                  <div className="inline-block">
                    <span className="font-bold text-arrow-yellow text-2xl">
                      [
                    </span>
                    <h3 className="inline-block font-semibold text-white text-xl">
                      {rDikr.reference}
                    </h3>
                    <span className="font-bold text-arrow-yellow text-2xl">
                      ]
                    </span>
                  </div>
                )}
                <div className=" inline-block ">
                  <button
                    className="rounded-full bg-card-header p-2"
                    onClick={() => setShare(true)}
                  >
                    <FaShareAlt className=" text-dark-yellow" />
                  </button>
                </div>
              </footer>
              {share &&
                shareText(`${rDikr.content} 
              ${rDikr.reference && `\n[${rDikr.reference}]`} 
              \n[${
                seAType.key === "favorie"
                  ? aType
                      .filter((fAType) => rDikr.category === fAType.key)
                      .map((ftype) => ftype.name)
                  : seAType.name
              }]
              ${rDikr.count && `\n المرات:${rDikr.count}`}`) &&
                setShare(false)}
            </div>
          </>
        </div>
        <div className="bg-blue-sidebar">
          <>
            <div className={` h-fit w-full`}>
              <header className="bg-card-header justify-self-center  grid grid-cols-3 px-1 py-2 text-l h-fit ssm:p-3  ssm:text-3xl font-semibold italic">
                <span className="inline-block justify-self-start text-center place-content-center ssm:text-start text-white"></span>
                <span className="inline-block justify-self-center text-center place-content-center  text-white">
                  {seHType.key === "favorie"
                    ? hType
                        .filter((fHType) => rHadith.category === fHType.key)
                        .map((ftype) => ftype.name)
                    : seHType.name}
                </span>
                <span
                  className="inline-block justify-self-end place-content-center "
                  onClick={() => {
                    rHadith.favorie = !rHadith.favorie;
                  }}
                >
                  <FaStar
                    className={` cursor-pointer ${
                      rHadith.favorie ? "text-arrow-yellow" : "text-slate-800 "
                    }`}
                  />
                </span>
              </header>
              <div className="bg-blue-sidebar max-h-72 text-center p-3 ssm:p-6 overflow-y-auto scrollbar">
                <p
                  dir="rtl"
                  className=" text-white text-xl font-medium leading-relaxed justify-self-center "
                >
                  <span className="font-bold text-arrow-yellow ">”</span>
                  {rHadith.arab}
                  <span className="font-bold text-arrow-yellow">“.</span>
                </p>
              </div>
              <footer className=" bg-blue-sidebar h-fit text-start p-3">
                <div className="justify-self-end">
                  <button
                    className="rounded-full bg-card-header p-2"
                    onClick={() => setShare(true)}
                  >
                    <FaShareAlt className="text-dark-yellow" />
                  </button>
                </div>
              </footer>
            </div>
            {share &&
              shareText(`${rHadith.arab}
                   \n [رواه:${
                     seHType.key === "favorie"
                       ? hType
                           .filter((fHType) => rHadith.category === fHType.key)
                           .map((ftype) => ftype.name)
                       : seHType.name
                   }]`) &&
              setShare(false)}
          </>
        </div>
      </div>
      {pick && Modli(alarmI)}
    </>
  );
};

export default Home;
