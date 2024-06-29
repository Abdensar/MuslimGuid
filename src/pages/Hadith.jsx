import React, { useContext } from "react";
import "moment/locale/ar-ma";
import "moment-timezone";
import { FaShareAlt, FaStar } from "react-icons/fa";
import { PrayerContext } from "../components/Main";
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";
const Hadith = () => {
  // return <div className="text-white text-4xl">Hadith: ﷺ ﷽</div>;
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
    hType,
    seHType,
    setSeHType,
    currH,
    setCurrH,
    fHadith,
    shareText,
    share,
    setShare,
    HFavorite,
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
              seHType.name && "text-white"
            } cursor-pointer `}
            onClick={() => setCiOpen(!ciOpen)}
          >
            <span>{seHType.name ? seHType.name : hType[0].name}</span>
            <BiChevronDown
              className={`text-2xl  ${ciOpen && "rotate-180"} duration-300`}
            />
          </div>

          <ul
            className={`bg-transparent border-t-0 rounded-md  overflow-y-auto scrollbar max-h-0 text-right ${
              ciOpen && "max-h-40  border"
            } duration-300`}
          >
            {hType.map((hType, index) => (
              <li
                key={index}
                className={`hover:bg-white hover:text-black p-2 ${
                  hType.name === seHType.name ? "hidden" : "block"
                }`}
                onClick={() => {
                  setSeHType({
                    key: hType.key,
                    name: hType.name,
                  });
                  setCiOpen(!ciOpen);
                  setCurrH(0);
                }}
              >
                {hType.name}
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
        <div>
          <div className="grid grid-cols-3">
            <BiChevronLeft
              className="text-5xl cursor-pointer justify-self-end text-dark-yellow m-0 hover:text-white font-semibold "
              onClick={() =>
                fHadith.length &&
                (currH === 0
                  ? setCurrH(fHadith.length - 1)
                  : setCurrH(currH - 1))
              }
            />
            <h2 className=" inline text-2xl text-center place-content-center text-white font-semibold">
              {fHadith.length ? `${currH + 1}/${fHadith.length}` : "لا يوجد"}
            </h2>

            <BiChevronRight
              className="text-5xl  justify-self-start cursor-pointer text-dark-yellow m-0 hover:text-white font-semibold"
              onClick={() =>
                fHadith.length &&
                (currH === fHadith.length - 1
                  ? setCurrH(0)
                  : setCurrH(currH + 1))
              }
            />
          </div>
        </div>

        {fHadith.map(
          (hadith, index) =>
            index === currH && (
              <>
                <div key={index} className={` h-full w-full ssm:w-3/4  `}>
                  <header className="bg-card-header justify-self-center  grid grid-cols-3 px-1 py-2 text-l h-fit ssm:p-3  ssm:text-3xl font-semibold italic">
                    <span className="inline-block justify-self-start text-center place-content-center ssm:text-start text-white"></span>
                    <span className="inline-block justify-self-center text-center place-content-center  text-white">
                      {seHType.key === "favorie"
                        ? hType
                            .filter((fHType) => hadith.category === fHType.key)
                            .map((ftype) => ftype.name)
                        : seHType.name}
                    </span>
                    <span
                      className="inline-block justify-self-end place-content-center "
                      onClick={() => {
                        HFavorite(index);
                        hadith.favorie = !hadith.favorie;
                      }}
                    >
                      <FaStar
                        className={` cursor-pointer ${
                          hadith.favorie
                            ? "text-arrow-yellow"
                            : "text-slate-800 "
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
                      {hadith.arab}
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
                  shareText(
                    `${hadith.arab} \n [رواه:${
                      seHType.key === "favorie"
                        ? hType
                            .filter((fHType) => hadith.category === fHType.key)
                            .map((ftype) => ftype.name)
                        : seHType.name
                    }]`
                  ) &&
                  setShare(false)}
              </>
            )
        )}
      </div>
     
    </>
  );
};

export default Hadith;
