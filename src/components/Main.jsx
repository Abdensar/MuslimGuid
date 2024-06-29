import React, { useEffect, useState, createContext, useRef } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ar-ma";
import "moment-timezone";
// ####################### json importing  ###################################
import Cities from "../jsonFiles/Cities.json";
import Adkar from "../jsonFiles/Adkar.json";
import Hadith from "../jsonFiles/Hadith.json";
// ####################### img  importing  ###################################
import Fajr from "../imgs/Fajr.png";
import Dhuhr from "../imgs/Dhuhr.png";
import Asr from "../imgs/Asr.png";
import Maghrib from "../imgs/Maghrib.png";
import Isha from "../imgs/Isha.png";
// ####################### adhan importing  ###################################
import Adhan1 from "../adhan/1D.mp3";
import Adhan2 from "../adhan/2D.mp3";
import Adhan3 from "../adhan/3QD.mp3";
import Adhan4 from "../adhan/4D.mp3";
import Adhan5 from "../adhan/5D.mp3";
import Adhan6 from "../adhan/6D.mp3";
import Adhan7 from "../adhan/7D.mp3";
import Adhan8 from "../adhan/8D.mp3";
import Adhan9 from "../adhan/9D.mp3";
import Adhan10 from "../adhan/10QD.mp3";
import Takbir1 from "../adhan/1T.mp3";
import Takbir2 from "../adhan/2T.mp3";
import Takbir3 from "../adhan/3T.mp3";
import Takbir4 from "../adhan/4T.mp3";
import Takbir5 from "../adhan/5T.mp3";
import Takbir6 from "../adhan/6T.mp3";
import Takbir7 from "../adhan/7T.mp3";
import Takbir8 from "../adhan/8T.mp3";
import Takbir9 from "../adhan/9T.mp3";
import Takbir10 from "../adhan/10T.mp3";
// ####################### DOM importing  ###################################
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  FaFilePdf,
  FaPlayCircle,
  FaShareAlt,
  FaStopCircle,
} from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

moment.locale("ar-ma");
export const PrayerContext = createContext();
const Main = ({ children }) => {
  // ####################### Alarm  SECTION  ###################################
  const [pNot, setPNot] = useState([
    { id: 1, name: "Fajr", active: false },
    { id: 2, name: "Dohr", active: false },
    { id: 3, name: "Asr", active: false },
    { id: 4, name: "Maghrib", active: false },
    { id: 5, name: "Aisha", active: false },
  ]);
  const [alNot, setAlNot] = useState([
    { id: 1, name: "Fajr", alarm: "" },
    { id: 2, name: "Dohr", alarm: "" },
    { id: 3, name: "Asr", alarm: "" },
    { id: 4, name: "Maghrib", alarm: "" },
    { id: 5, name: "Aisha", alarm: "" },
  ]);
  const [adhan, setAdhan] = useState([
    { sound: Adhan1, name: "الاذان الاول" },
    { sound: Adhan2, name: "الاذان الثاني" },
    { sound: Adhan3, name: "الاذان الثالث" },
    { sound: Adhan4, name: "الاذان الرابع" },
    { sound: Adhan5, name: "الاذان الخامس" },
    { sound: Adhan6, name: "الاذان السادس" },
    { sound: Adhan7, name: "الاذان السابع" },
    { sound: Adhan8, name: "الاذان الثامن" },
    { sound: Adhan9, name: "الاذان التاسع" },
    { sound: Adhan10, name: "الاذان العاشر" },
  ]);

  const [takbir, setTakbir] = useState([
    { sound: Takbir1, name: "التكبير الاول" },
    { sound: Takbir2, name: "التكبير الثاني" },
    { sound: Takbir3, name: "التكبير الثالث" },
    { sound: Takbir4, name: "التكبير الرابع" },
    { sound: Takbir5, name: "التكبير الخامس" },
    { sound: Takbir6, name: "التكبير السادس" },
    { sound: Takbir7, name: "التكبير السابع" },
    { sound: Takbir8, name: "التكبير الثامن" },
    { sound: Takbir9, name: "التكبير التاسع" },
    { sound: Takbir10, name: "التكبير العاشر" },
  ]);

  const [alarmk, setAlarmk] = useState([...adhan, ...takbir]);
  const [seAlarmk, setSeAlarmk] = useState({ sound: "", name: "" });
  const [alValue, setAlValue] = useState("");
  const [pick, setPick] = useState(false);
  const [alarmI, setAlarmI] = useState();
  const [alOpen, setAlOpen] = useState(false);
  const [splay, setSPlay] = useState(false);
  const [tSound, setTSound] = useState();

  // #######################  PRAYER ELEMENT SECTION  ###################################
  const [hijri, setHijri] = useState({
    day: "",
    month: {
      ar: "",
    },
    year: "",
  });
  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const [prayers, setPrayers] = useState([
    {
      key: "Fajr",
      img: Fajr,
      name: "الفجر",
      time: timings.Fajr,
      not: pNot[0].active,
      alarm: alNot[0].alarm,
    },
    {
      key: "Dhuhr",
      img: Dhuhr,
      name: "الظهر",
      time: timings.Dhuhr,
      not: pNot[1].active,
      alarm: alNot[1].alarm,
    },
    {
      key: "Asr",
      img: Asr,
      name: "العصر",
      time: timings.Asr,
      not: pNot[2].active,
      alarm: alNot[2].alarm,
    },
    {
      key: "Maghrib",
      img: Maghrib,
      name: "المغرب",
      time: timings.Maghrib,
      not: pNot[3].active,
      alarm: alNot[3].alarm,
    },
    {
      key: "Isha",
      img: Isha,
      name: "العشاء",
      time: timings.Isha,
      not: pNot[4].active,
      alarm: alNot[4].alarm,
    },
  ]);
  const [aprayerIndex, setAprayerIndex] = useState(3);
  const [aprayerObject, setAprayerObject] = useState(prayers[aprayerIndex]);
  const [bprayerIndex, setBprayerIndex] = useState(3);
  const [cities, setCities] = useState(Cities);
  const [seCitie, setSeCitie] = useState({
    name: "",
    arabicName: "",
  });
  const [nDate, setNDate] = useState("");
  const [nYear, setNYear] = useState("");
  const [nMonth, setNMonth] = useState("");
  const [nDay, setNDay] = useState("");
  const [nTime, setNTime] = useState();
  const [aTime, setATime] = useState();
  const [alTime, setAlTime] = useState();
  const [bTime, setBTime] = useState();
  const [ciValue, setCiValue] = useState("");
  const [ciOpen, setCiOpen] = useState(false);
  const getPIndex = () => {
    const momentNow = moment();
    let APrayerI = 0;
    let BPrayerI = 0;
    const fajrTime = moment(timings["Fajr"], "hh:mm");
    const dhuhrTime = moment(timings["Dhuhr"], "hh:mm");
    const asrTime = moment(timings["Asr"], "hh:mm");
    const sunsetTime = moment(timings["Sunset"], "hh:mm");
    const ishaTime = moment(timings["Isha"], "hh:mm");

    if (momentNow.isAfter(fajrTime) && momentNow.isBefore(dhuhrTime)) {
      APrayerI = 1;
    } else if (momentNow.isAfter(dhuhrTime) && momentNow.isBefore(asrTime)) {
      APrayerI = 2;
    } else if (momentNow.isAfter(asrTime) && momentNow.isBefore(sunsetTime)) {
      APrayerI = 3;
    } else if (momentNow.isAfter(sunsetTime) && momentNow.isBefore(ishaTime)) {
      APrayerI = 4;
    } else {
      APrayerI = 0;
    }

    if (momentNow.isAfter(fajrTime) && momentNow.isBefore(dhuhrTime)) {
      BPrayerI = 0;
    } else if (momentNow.isAfter(dhuhrTime) && momentNow.isBefore(asrTime)) {
      BPrayerI = 1;
    } else if (momentNow.isAfter(asrTime) && momentNow.isBefore(sunsetTime)) {
      BPrayerI = 2;
    } else if (momentNow.isAfter(sunsetTime) && momentNow.isBefore(ishaTime)) {
      BPrayerI = 3;
    } else {
      BPrayerI = 4;
    }
    setAprayerIndex(APrayerI);
    setBprayerIndex(BPrayerI);
  };
  const getTiming = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${
        seCitie.name === "" ? "Tan-Tan" : seCitie.name
      }&country=Morocco`
    );
    setTimings(response.data.data.timings);
    setHijri(response.data.data.date.hijri);
  };

  const getPTiming = () => {
    const updatedPrayers = [
      {
        key: "Fajr",
        img: Fajr,
        name: "الفجر",
        time: timings.Fajr,
        not: pNot[0].active,
        alarm: alNot[0].alarm,
      },
      {
        key: "Dhuhr",
        img: Dhuhr,
        name: "الظهر",
        time: timings.Dhuhr,
        not: pNot[1].active,
        alarm: alNot[1].alarm,
      },
      {
        key: "Asr",
        img: Asr,
        name: "العصر",
        time: timings.Asr,
        not: pNot[2].active,
        alarm: alNot[2].alarm,
      },
      {
        key: "Maghrib",
        img: Maghrib,
        name: "المغرب",
        time: timings.Maghrib,
        not: pNot[3].active,
        alarm: alNot[3].alarm,
      },
      {
        key: "Isha",
        img: Isha,
        name: "العشاء",
        time: timings.Isha,
        not: pNot[4].active,
        alarm: alNot[4].alarm,
      },
    ];
    setPrayers(updatedPrayers);
  };
  const getTime = () => {
    const timeZone = moment.tz.guess();
    const da = moment.tz(timeZone).format("Do MMMM YYYY ");
    const ye = moment.tz(timeZone).format("YYYY");
    const mo = moment.tz(timeZone).format("MM");
    const dy = moment.tz(timeZone).format("Do");
    const ti = moment.tz(timeZone).format("HH:mm:ss");
    setNDate(da);
    setNYear(ye);
    setNMonth(mo);
    setNDay(dy);
    setNTime(ti);
  };
  const countTimer = () => {
    // const momentNow = nDate;
    const bprayerObject = prayers[bprayerIndex];
    const bprayerTime = timings[bprayerObject.key];
    let BTime = moment().diff(moment(bprayerTime, "HH:mm:ss"));
    if (BTime > 0) {
      BTime -= 24 * 60 * 60 * 1000;
    }
    const bduration = moment.duration(BTime);
    const fBTime = moment.utc(bduration.asMilliseconds()).format("HH:mm:ss");
    const houre = moment.utc(1711587600000 / 2).format("HH:mm:ss");
    fBTime < houre ? setBTime(fBTime) : setBTime(null);

    const aprayerObject = prayers[aprayerIndex];
    const aprayerTime = timings[aprayerObject.key];
    let ATime = moment(aprayerTime, "HH:mm:ss").diff(moment());
    if (ATime < 0) {
      ATime += 24 * 60 * 60 * 1000;
    }
    if (ATime > 0) {
      // ATime = moment("18:55:40", "HH:mm:ss").diff(moment());
      // console.log(ATime);
    }
    setAlTime(ATime);
    const aduration = moment.duration(ATime);
    const fATime = moment.utc(aduration.asMilliseconds()).format("HH:mm:ss");
    setATime(fATime);
  };

  const pNotClick = (index) => {
    const updatedPNot = pNot.map((item, i) => {
      if (i === index) {
        return { ...item, active: !item.active };
      } else {
        return item;
      }
    });
    setPNot(updatedPNot);
    // console.log("pnot:"+pNot);
    // console.log(prayers)
  };
  const pAlarmClick = (I, sound) => {
    const updatedAlNot = alNot.map((item, i) => {
      if (i === I) {
        return { ...item, alarm: sound };
      } else {
        return item;
      }
    });
    // console.log("prayers1"+prayers);
    setAlNot(updatedAlNot);
    console.log("sound:");
    console.log(sound);
    console.log("prayers:");
    console.log(prayers);
    console.log("alnot:");
    console.log(alNot);
    console.log("updatedPrayers:");
    console.log(updatedAlNot);
  };

  const NotModl = (prI) => {
    return (
      <div
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          pick ? "visible bg-black/20" : "invisible"
        }`}
        onClick={() => {
          // pAlarmClick(prI,seAlarmk);
          setPick(false);
          setSeAlarmk({
            sound: "",
            name: "",
          });
          setSPlay(false);
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl ml-40 mr-auto ssm:m-auto shadow p-6 transition-all ${
            pick ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <div className="justify-self-center ">
            <div
              className={`bg-transparent border rounded-md w-full pl-2 py-2 flex items-center justify-between  text-gray-800 ${
                seAlarmk.name && "text-black"
              } cursor-pointer `}
              onClick={() => {
                setAlOpen(!alOpen);
              }}
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
                  onClick={async () => {
                    setSeAlarmk({
                      sound: adhan.sound,
                      name: adhan.name,
                    });
                    // {pAlarmClick(prI, adhan.sound)}
                    setAlOpen(!alOpen);
                    // console.log(prayers);
                    setSPlay(false);
                  }}
                >
                  {adhan.name}
                </li>
              ))}
              {/* */}
              {/* {pAlarmClick(I)} */}
            </ul>
          </div>
          {tSound && (
            <button onClick={() => setSPlay(!splay)}>
              {splay ? <FaPlayCircle /> : <FaStopCircle />}
            </button>
          )}
        </div>
      </div>
    );
  };
  const getAlarm = async () => {
    if (alTime < 1000 && alTime > 0) {
      const sound = new Audio(aprayerObject.alarm || Takbir1);
      await sound.play();
      if (
        alert(
          `حان موعد آذان صلاة ${aprayerObject.name}\nاضغط موافق لإيقاف التنبيه.`
        ) == null
      ) {
        sound.currentTime = 0;
        sound.pause();
      }
    }
  };
  // #######################  PDF SECTION  ###################################

  const refPdf = useRef();
  const [allPTimings, setAllPTimings] = useState([
    {
      timings: {
        Fajr: "05:20",
        Dhuhr: "13:45",
        Asr: "17:03",
        Maghrib: "20:45",
        Isha: "22:00",
      },
      date: {
        gregorian: {
          date: "01-06-2024",
        },
        hijri: {
          day: 24,
          weekday: {
            ar: "السبت",
          },
          month: {
            ar: "ذوالقعدة",
          },
          year: 1445,
        },
      },
    },
    {
      timings: {
        Fajr: "05:20",
        Dhuhr: "13:45",
        Asr: "17:03",
        Maghrib: "20:45",
        Isha: "22:00",
      },
      date: {
        gregorian: {
          date: "01-06-2024",
        },
        hijri: {
          day: 24,
          weekday: {
            ar: "السبت",
          },
          month: {
            ar: "ذوالقعدة",
          },
          year: 1445,
        },
      },
    },
  ]);

  const getAllTiming = async () => {
    const year = cYear || nYear || "2024";
    const month = cMonth || nMonth || "06";
    const city = seCitie.name || "Tan-Tan";

    const response = await axios.get(
      `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=Morocco`
    );
    const apiData = response.data.data;
    const formattedDataArray = apiData.map((data, index) => ({
      timings: {
        Fajr: data.timings.Fajr,
        Dhuhr: data.timings.Dhuhr,
        Asr: data.timings.Asr,
        Maghrib: data.timings.Maghrib,
        Isha: data.timings.Isha,
      },
      date: {
        gregorian: {
          date: data.date.gregorian.date,
        },
        hijri: {
          day: data.date.hijri.day,
          weekday: {
            ar: data.date.hijri.weekday.ar,
          },
          month: {
            ar: data.date.hijri.month.ar,
          },
          year: data.date.hijri.year,
        },
      },
    }));
    setAllPTimings(formattedDataArray);
  };
  const [pickP, setPickP] = useState(false);
  const [cYear, setCYear] = useState();
  const [cMonth, setCMonth] = useState();

  const getPrint = useReactToPrint({
    content: () => refPdf.current,
    documentTitle: "التوقيت الشهري",
    onAfterPrint: () => alert("Print Succfuly"),
  });

  const PModel = () => {
    return (
      <>
        <div
          className={`fixed w-screen inset-0 flex justify-center items-center transition-colors ${
            pickP ? "visible bg-black/40" : "invisible"
          }`}
          onClick={() => setPickP(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`sticky z-20 w-3/4 bg-gray-700 rounded-xl shadow h-82p ssm:h-2/3 p-3  ssm:p-6 ssm:px-7 place-content-between  place-items-center ml-auto mr-2 ssm:m-3 transition-all ${
              pickP ? "scale-100 opacity-100" : "scale-125 opacity-0"
            }`}
          >
            <div className=" sticky top-0 grid grid-cols-3">
              <button
                className="justify-self-center rounded-lg p-2 text-3xl bg-blue-sidebar text-dark-yellow"
                onClick={() => getPrint()}
              >
                <FaFilePdf />
              </button>
              <div className=" justify-self-center grid grid-cols-3">
                <BiChevronLeft
                  className="text-5xl cursor-pointer justify-self-end text-dark-yellow m-0 hover:text-white font-semibold "
                  onClick={() =>
                    cMonth === 12
                      ? (setCMonth(1), setCYear(+cYear + 1))
                      : setCMonth(+cMonth + 1)
                  }
                />
                <h2 className=" inline text-2xl text-center place-content-center text-white font-semibold">
                  {moment().year(cYear).format("YYYY") +
                    moment()
                      .month(cMonth - 1)
                      .format("MMMM")}
                </h2>
                <BiChevronRight
                  className="text-5xl  justify-self-start cursor-pointer text-dark-yellow m-0 hover:text-white font-semibold"
                  onClick={() =>
                    cMonth === 1
                      ? (setCMonth(12), setCYear(cYear - 1))
                      : setCMonth(cMonth - 1)
                  }
                />
              </div>
              <span></span>
            </div>
            <div className="overflow-y-scroll scrollbar w-full mt-4 h-82p ssm:h-82p ssm:m-2">
              <div ref={refPdf}>
                <table className=" text-center text-lg  ssm:text-2xl">
                  <thead className="sticky right-0 ssm:top-0 border-x-2 bg-slate-400">
                    <th className="p-1 ssm:p-3">العشاء</th>
                    <th className="p-1 ssm:p-3">المغرب</th>
                    <th className="p-1 ssm:p-3 ">العصر</th>
                    <th className="p-1 ssm:p-3">الظهر</th>
                    <th className="p-1 ssm:p-3">الفجر</th>
                    <th className="p-1 ssm:p-3">اليوم</th>
                  </thead>
                  <tbody>
                    {allPTimings.map((pTime, index) => (
                      <tr key={index}>
                        <td className="p-2 ssm:p-5 border-2">
                          {pTime.timings.Isha}
                        </td>
                        <td className="p-2 ssm:p-5 border-2">
                          {pTime.timings.Maghrib}
                        </td>
                        <td className="p-2 ssm:p-5 border-2">
                          {pTime.timings.Asr}
                        </td>
                        <td className="p-2 ssm:p-5 border-2">
                          {pTime.timings.Dhuhr}
                        </td>
                        <td className="p-2 ssm:p-5 border-2">
                          {pTime.timings.Fajr}
                        </td>
                        <td className="p-2 ssm:p-5 border-2 text-lg ssm:text-2xl font-semibold">
                          <span>{pTime.date.gregorian.date}</span>
                          <br />
                          <span>
                            {pTime.date.hijri.weekday.ar}
                            {pTime.date.hijri.day}
                            {pTime.date.hijri.month.ar}
                            {pTime.date.hijri.year}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // #######################  USEEFFECT SECTION  ###################################

  useEffect(() => {
    getTime();
    getTiming();
  }, []);
  useEffect(() => {
    getTiming();
  }, [seCitie]);
  useEffect(() => {
    getPIndex();
    getPTiming();
    countTimer();
    const intervalId = setInterval(() => {
      getTime();
      countTimer();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timings, aTime]);
  useEffect(() => {
    getPTiming();
  }, [pNot, alNot]);
  useEffect(() => {
    getPIndex();
    setAprayerObject(prayers[aprayerIndex]);
  }, [aTime, aprayerObject, aprayerIndex, prayers]);
  useEffect(() => {
    const active = aprayerObject.not;
    active && getAlarm();
  }, [aTime]);

  useEffect(() => {
    if (seAlarmk.sound) {
      setTSound(new Audio(seAlarmk.sound));
      pAlarmClick(alarmI, seAlarmk.sound);
      setSPlay(true);
    } else {
      setSPlay(false);
    }
  }, [seAlarmk]);

  useEffect(() => {
    if (tSound) {
      if (splay) {
        tSound.play();
      } else {
        tSound.pause();
        // tSound.currentTime=0
      }
    }
  }, [splay, tSound]);
  useEffect(() => {
    setCMonth(nMonth);
    setCYear(nYear);
    setAllPTimings([]);
    getAllTiming();
  }, [pickP]);
  useEffect(() => {
    setAllPTimings([]);
    getAllTiming();
  }, [cMonth]);
  useEffect(() => {
    const randomDikr = getRandomObject(adkar);
    const randomHadith = getRandomObject(hadith);
    setRDikr(randomDikr);
    setRHadith(randomHadith);
    // console.log(rDikr);
  }, [nDay]);
  // #######################  ADKAR ELEMENT SECTION  ###################################
  const [adkar, setAdkar] = useState(Adkar);
  const [aType, setAType] = useState([
    { key: "favorie", name: "الاذكار المفضلة" },
    { key: "morning", name: "اذكار الصباح" },
    { key: "night", name: "اذكار المساء" },
    { key: "after Salat", name: "أذكار بعدالصلاة" },
    { key: "tasbih", name: "تسابيح" },
    { key: "sleep", name: "اذكار النوم" },
    { key: "Quoran Doae", name: "أدعية قرآنية" },
    { key: "wake Up", name: "أذكار الاستيقاظ" },
  ]);
  const [seAType, setSeAType] = useState({
    key: "morning",
    name: "اذكار الصباح",
  });
  const [currI, setCurrI] = useState(0);
  const fAdkar = adkar.filter((fdikr) =>
    seAType.key === "favorie" ? fdikr.favorie : fdikr.category === seAType.key
  );
  // #######################  HADITH ELEMENT SECTION  ###################################
  const [hadith, setHadith] = useState(Hadith);
  const [hType, setHType] = useState([
    { key: "favorie", name: "الاحاديث المفضلة" },
    { key: "abu-daud", name: "أبوداود" },
    { key: "ahmad", name: "أحمد" },
    { key: "darimi", name: "الدارمي" },
    { key: "bukhari", name: "صَحِيحُ الْبُخَارِي" },
    { key: "ibnu-majah", name: "ابن ماجه" },
    { key: "malik", name: "مالك" },
    { key: "muslim", name: "مسلم" },
    { key: "nasai", name: "سنن النسائي" },
    { key: "tirmidzi", name: "الترمذي" },
  ]);
  const [seHType, setSeHType] = useState({
    key: "bukhari",
    name: "صَحِيحُ الْبُخَارِي",
  });
  const [currH, setCurrH] = useState(0);
  const fHadith = hadith.filter((fhadith) =>
    seHType.key === "favorie"
      ? fhadith.favorie
      : fhadith.category === seHType.key
  );
  // #######################  Share ELEMENT SECTION  ###################################
  const [share, setShare] = useState(false);
  const shareText = async (text) => {
    try {
      await navigator.share({
        title: "Share via",
        text: `${text}\n${window.location.href}`,
      });
      // console.log(URL);
      // console.log(window.location.href);

      console.log("Shared successfully");
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };
  // #######################  Robject  SECTION  ###################################
  const [rDikr, setRDikr] = useState({ Object: null, Index: null });
  const [rHadith, setRHadith] = useState({ Object: null, Index: null });
  const getRandomObject = (array) => {
    const Index = Math.floor(Math.random() * array.length);
    const Object = array[Index];
    return { Object, Index };
  };
  // const RHadith=getRandomObject(hadith)

  // #######################  save ELEMENT SECTION  ###################################
  const [check, setCheck] = useState(false);
  const AFavorite = (index) => {
    const updatedAdkar = [...adkar];
    updatedAdkar[index].favorite = !updatedAdkar[index].favorite;
    setAdkar(updatedAdkar);
    setCheck(!check);
  };
  // useEffect(() => {
  //   const savedAdkar = JSON.parse(localStorage.getItem('adkar'));
  //   if (savedAdkar) {
  //     setAdkar(Adkar)
  //     savedAdkar.map((sdikr)=>{
  //       const updatedDikr= adkar.map((item) => {
  //         if (item.content === sdikr.content) {
  //           return { ...item, favorie: sdikr.favorie };
  //         } else {
  //           return item;
  //         }
  //       });
  //       setAdkar(updatedDikr);
  //     })
  //   } else {
  //    setAdkar(Adkar)
  //   }
  // }, [nDay]);

  // useEffect(() => {
  //   localStorage.setItem('adkar', JSON.stringify(adkar));
  // }, [check]);

  // useEffect(() => {
  //   const savedHadith = JSON.parse(localStorage.getItem('hadith'));
  //   if (savedHadith) {
  //     setHadith(Hadith)
  //     savedHadith.map((shadith)=>{
  //       const updatedHadith= hadith.map((item) => {
  //         if (item.arab === shadith.arab) {
  //           return { ...item, favorie: shadith.favorie };
  //         } else {
  //           return item;
  //         }
  //       });
  //       setHadith(updatedHadith);
  //     })
  //   } else {
  //     setHadith(Hadith)
  //   }
  // }, [nDay]);

  // useEffect(() => {
  //   localStorage.setItem('hadith', JSON.stringify(hadith));
  // }, [check]);

  const HFavorite = (index) => {
    const updatedHadith = [...hadith];
    updatedHadith[index].favorite = !updatedHadith[index].favorite;
    setHadith(updatedHadith);
    setCheck(!check);
  };

  return (
    <div className="static w-screen  ml-20 mt-12 bg-body-brown h-full select-none p-4 ">
      <div className="">
        <PrayerContext.Provider
          value={{
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
            adkar,
            setAdkar,
            aType,
            setAType,
            seAType,
            setSeAType,
            currI,
            setCurrI,
            fAdkar,
            hadith,
            hType,
            seHType,
            setSeHType,
            currH,
            setCurrH,
            fHadith,
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
            nMonth,
            nYear,
            pick,
            setPick,
            alarmI,
            setAlarmI,
            alOpen,
            setAlOpen,
            pNotClick,
            pAlarmClick,
            splay,
            setSPlay,
            tSound,
            setTSound,
            NotModl,
            refPdf,
            PModel,
            getPrint,
            cMonth,
            setCMonth,
            cYear,
            setCYear,
            pickP,
            setPickP,
            getAllTiming,
            allPTimings,
            setAllPTimings,
            HFavorite,
            AFavorite,
          }}
        >
          {children}
        </PrayerContext.Provider>
      </div>
    </div>
  );
};
export default Main;
