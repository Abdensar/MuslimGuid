import React, { useContext } from "react";
import "moment/locale/ar-ma";
import "moment-timezone";
import { FaShareAlt, FaStar } from "react-icons/fa";
import { PrayerContext } from "../components/Main";
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Adkar = () => {
  const {
    seCitie,
    ciOpen,
    setCiOpen,
    prayers,
    aprayerIndex,
    bprayerIndex,
    nDate,
    aTime,
    bTime,
    nTime,
    hijri,
    aType,
    seAType,
    setSeAType,
    currI,
    setCurrI,
    fAdkar,
    shareText,
    share,
    setShare,
    AFavorite,
    alPick,
    AlarmM,
  } = useContext(PrayerContext);

  return (
    <>
      <div
        className={`justify-self-center  m-3 mt-5 grid grid-cols-1  gap-x-1 ssm:gap-x-10  text-white border-b pb-2 
        ${bTime ? "ssm:grid-cols-4" : "ssm:grid-cols-3"}`}
      >
        <div className="justify-self-center ">
          <div
            className={`bg-transparent border rounded-md w-full pl-2 py-2 flex items-center justify-between  text-gray-400 ${
              seAType.name && "text-white"
            } cursor-pointer `}
            onClick={() => setCiOpen(!ciOpen)}
          >
            <span>{seAType.name ? seAType.name : aType[0].name}</span>
            <BiChevronDown
              className={`text-2xl  ${ciOpen && "rotate-180"} duration-300`}
            />
          </div>

          <ul
            className={`bg-transparent border-t-0 rounded-md  overflow-y-auto scrollbar max-h-0 text-right ${
              ciOpen && "max-h-40  border"
            } duration-300`}
          >
            {aType.map((aType, index) => (
              <li
                key={index}
                className={`hover:bg-white hover:text-black p-2 ${
                  aType.name === seAType.name ? "hidden" : "block"
                }`}
                onClick={() => {
                  setSeAType({
                    key: aType.key,
                    name: aType.name,
                  });
                  setCiOpen(!ciOpen);
                  setCurrI(0);
                }}
              >
                {aType.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={`justify-self-center `}>
          <h2 className="text-center text-base ssm:text-xl">
            تبقى حتى صلاة {prayers[aprayerIndex].name}
          </h2>
          <h1 className="text-center text-xl ssm:text-xl font-semibold">
            {aTime}
          </h1>
        </div>
        <div className={`justify-self-center ${!bTime && "hidden"}`}>
          <h2 className="text-center text-base ssm:text-xl">
            فاتت على صلاة {prayers[bprayerIndex].name}
          </h2>
          <h1 className="text-center text-xl ssm:text-xl font-semibold">
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
      <div className="grid grid-cols-1 m-auto ssm:px-10 ssm:m-3 place-items-center ">
        <div className="grid grid-cols-3">
          <BiChevronLeft
            className="text-5xl cursor-pointer justify-self-end text-dark-yellow m-0 hover:text-white font-semibold "
            onClick={() =>
              fAdkar.length &&
              (currI === 0 ? setCurrI(fAdkar.length - 1) : setCurrI(currI - 1))
            }
          />
          <h2 className=" inline text-2xl text-center place-content-center text-white font-semibold">
            {fAdkar.length ? `${currI + 1}/${fAdkar.length}` : "لا يوجد"}
          </h2>

          <BiChevronRight
            className="text-5xl  justify-self-start cursor-pointer text-dark-yellow m-0 hover:text-white font-semibold"
            onClick={() =>
              fAdkar.length &&
              (currI === fAdkar.length - 1 ? setCurrI(0) : setCurrI(currI + 1))
            }
          />
        </div>
        {fAdkar.map(
          (dikr, index) =>
            index === currI && (
              <>
                <div key={index} className={` h-full w-full ssm:w-3/4  `}>
                  <header className="bg-card-header justify-self-center  grid grid-cols-3 px-1 py-2 text-l h-fit ssm:p-3  ssm:text-3xl font-semibold italic">
                    <span className="inline-block justify-self-start text-center place-content-center ssm:text-start text-white">
                      {dikr.count}
                      {":المرات"}
                    </span>
                    <span className="inline-block justify-self-center text-center place-content-center  text-white">
                      {seAType.name}
                    </span>
                    <span
                      className="inline-block justify-self-end place-content-center "
                      onClick={() => {
                        AFavorite(index);
                        dikr.favorie = !dikr.favorie;
                      }}
                    >
                      <FaStar
                        className={` cursor-pointer ${
                          dikr.favorie ? "text-arrow-yellow" : "text-slate-800 "
                        }`}
                      />
                    </span>
                  </header>
                  <div className="bg-blue-sidebar h-fit text-center p-3 ssm:p-10  ">
                    <p
                      dir="rtl"
                      className=" text-white text-xl font-medium justify-self-center "
                    >
                      <span className="font-bold text-arrow-yellow">”</span>
                      {dikr.content}
                      <span className="font-bold text-arrow-yellow">“.</span>
                    </p>
                  </div>
                  <footer className="flex justify-between w-full bg-blue-sidebar p-3">
                    {dikr.reference && (
                      <div className="inline-block">
                        <span className="font-bold text-arrow-yellow text-2xl">
                          [
                        </span>
                        <h3 className="inline-block font-semibold text-white text-xl">
                          {dikr.reference}
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
                </div>
                {share &&
                  shareText(
                    `${dikr.content} \n[${dikr.reference}] \n[${
                      seAType.key === "favorie"
                        ? aType
                            .filter((fAType) => dikr.category === fAType.key)
                            .map((ftype) => ftype.name)
                        : seAType.name
                    }] \n المرات:${dikr.count}`
                  ) &&
                  setShare(false)}
              </>
            )
        )}
      </div>
     
    </>
  );
};

export default Adkar;
