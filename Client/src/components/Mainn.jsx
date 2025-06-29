import React, { createContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ar-ma';
import 'moment-timezone';
import { BiChevronDown, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { FaFilePdf, FaPlayCircle, FaStopCircle } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import Cities from "../jsonFiles/Cities.json";
// ####################### img  importing  ###################################
import Fajr from "../imgs/Fajr.png";
import Dhuhr from "../imgs/Dhuhr.png";
import Asr from "../imgs/Asr.png";
import Maghrib from "../imgs/Maghrib.png";
import Isha from "../imgs/Isha.png";
// Import audio files
const adhanFiles = [
  require('../adhan/1D.mp3'),
  require('../adhan/2D.mp3'),
  require('../adhan/3QD.mp3'),
  require('../adhan/4D.mp3'),
  require('../adhan/5D.mp3'),
  require('../adhan/6D.mp3'),
  require('../adhan/7D.mp3'),
  require('../adhan/8D.mp3'),
  require('../adhan/9D.mp3'),
  require('../adhan/10QD.mp3'),
];

const takbirFiles = [
  require('../adhan/1T.mp3'),
  require('../adhan/2T.mp3'),
  require('../adhan/3T.mp3'),
  require('../adhan/4T.mp3'),
  require('../adhan/5T.mp3'),
  require('../adhan/6T.mp3'),
  require('../adhan/7T.mp3'),
  require('../adhan/8T.mp3'),
  require('../adhan/9T.mp3'),
  require('../adhan/10T.mp3'),
];

// Create context providers
export const PrayerContext = createContext();
export const AdkarContext = createContext();
export const HadithContext = createContext();
export const AlarmContext = createContext();
export const UIStateContext = createContext();
export const PDFContext = createContext();
export const UserContext = createContext();


const Main = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser')) || {};

  const [user, setUser] = useState(storedUser);
  const getInitialPrayers = (storedUser) => {
  const defaultPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((key, i) => ({
    key,
    img: [Fajr, Dhuhr, Asr, Maghrib, Isha][i],
    name: ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"][i],
    time: "",
    not: storedUser?.prayerNotifications?.[i]?.not || false,
    alarm: storedUser?.prayerNotifications?.[i]?.alarm || ""
  }));
  return defaultPrayers;
};

const persistUserData = (key, value) => {
  const userData = JSON.parse(localStorage.getItem('currentUser')) || {};
  userData[key] = value;
  localStorage.setItem('currentUser', JSON.stringify(userData));
};
  //================= PRAYER CONTEXT VALUES =================
    const [seCitie, setSeCitie] = useState(storedUser.city || { 
    name: "", 
    arabicName: "" 
  });
  const [timings, setTimings] = useState({});
  const [hijri, setHijri] = useState({ day: "", month: { ar: "" }, year: "" });
  const [nDate, setNDate] = useState("");
  const [nTime, setNTime] = useState("");
  const [aTime, setATime] = useState("");
  const [bTime, setBTime] = useState("");
const [prayers, setPrayers] = useState(() => getInitialPrayers(storedUser));
  const [aprayerIndex, setAprayerIndex] = useState(0);
  const [bprayerIndex, setBprayerIndex] = useState(0);
  const [cYear, setCYear] = useState(moment().year());
  const [cMonth, setCMonth] = useState(moment().month() + 1);
 const [favorites, setFavorites] = useState(storedUser.favorites || {
    adkar: [],
    hadith: []
  });
    const [chatHistory, setChatHistory] = useState(storedUser.chatHistory || []);
  const handleCityChange = useCallback((newCity) => {
    setSeCitie(newCity);
    persistUserData('city', newCity);
  }, []);
  const pNotClick = useCallback((index) => {
    setPrayers(prev => {
      const updated = prev.map((p, i) => 
        i === index ? { ...p, not: !p.not } : p
      );
      persistUserData('prayerNotifications', updated);
      return updated;
    });
  }, []);
  const pAlarmClick = useCallback((I, sound) => {
    setPrayers(prev => {
      const updated = prev.map((item, i) => 
        i === I ? { ...item, alarm: sound } : item
      );
      persistUserData('prayerNotifications', updated);
      return updated;
    });
  }, []);
  //================= ADKAR CONTEXT VALUES =================
  const [adkar, setAdkar] = useState([]);
  const [aType] = useState([
    { key: "favorie", name: "الاذكار المفضلة" },
    { key: "morning", name: "اذكار الصباح" },
    { key: "night", name: "اذكار المساء" },
    { key: "after Salat", name: "أذكار بعدالصلاة" },
    { key: "tasbih", name: "تسابيح" },
    { key: "sleep", name: "اذكار النوم" },
    { key: "Quoran Doae", name: "أدعية قرآنية" },
    { key: "wake Up", name: "أذكار الاستيقاظ" }
  ]);
  const [seAType, setSeAType] = useState({ key: "morning", name: "اذكار الصباح" });
  const [rAType, setRAType] = useState({ key: "morning", name: "اذكار الصباح" });
  const [currI, setCurrI] = useState(0);
  const [faAdkar, setFaAdkar] = useState([]);

  //================= HADITH CONTEXT VALUES =================
  const [hadith, setHadith] = useState([]);
  const [hType] = useState([
    { key: "favorie", name: "الاحاديث المفضلة" },
    { key: "abu-daud", name: "أبوداود" },
    { key: "ahmad", name: "أحمد" },
    { key: "darimi", name: "الدارمي" },
    { key: "bukhari", name: "صَحِيحُ الْبُخَارِي" },
    { key: "ibnu-majah", name: "ابن ماجه" },
    { key: "malik", name: "مالك" },
    { key: "muslim", name: "مسلم" },
    { key: "nasai", name: "سنن النسائي" },
    { key: "tirmidzi", name: "الترمذي" }
  ]);
  const [seHType, setSeHType] = useState({ key: "bukhari", name: "صَحِيحُ الْبُخَارِي" });
  const [rHType, setRHType] = useState({ key: "bukhari", name: "صَحِيحُ الْبُخَارِي" });
  const [currH, setCurrH] = useState(0);
  const [faHadith, setFaHadith] = useState([]);

  //================= ALARM CONTEXT VALUES =================
  const [alarmk] = useState([
    ...adhanFiles.map((sound, i) => ({ sound, name: `الاذان ${i+1}` })),
    ...takbirFiles.map((sound, i) => ({ sound, name: `التكبير ${i+1}` }))
  ]);
  const [seAlarmk, setSeAlarmk] = useState({ sound: "", name: "" });
  const [alarmI, setAlarmI] = useState(0);
  const [splay, setSPlay] = useState(false);
  const [tSound, setTSound] = useState(null);

  //================= UI STATE CONTEXT VALUES =================
  const [ciOpen, setCiOpen] = useState(false);
  const [ciValue, setCiValue] = useState("");
  const [pick, setPick] = useState(false);
  const [pickP, setPickP] = useState(false);
  const [alOpen, setAlOpen] = useState(false);
  const [share, setShare] = useState(false);

  //================= PDF CONTEXT VALUES =================
  const refPdf = useRef();
  const [allPTimings, setAllPTimings] = useState([]);
  const getPrint = useReactToPrint({
    content: () => refPdf.current,
    documentTitle: "التوقيت الشهري"
  });

  //================= CORE FUNCTIONS =================
  // Prayer time calculations
  const getTiming = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${seCitie.name || "Tan-Tan"}&country=Morocco`
      );
      const data=response.data.data
        setPrayers(prevPrayers => prevPrayers.map(prayer => ({
      ...prayer,
      time: data.timings[prayer.key] // Match prayer key with API response keys
    })));
      setTimings(data.timings);
      setHijri(data.date.hijri);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  }, [seCitie.name]);

  const getPIndex = useCallback(() => {
    const momentNow = moment();
    const prayerTimes = [
      moment(timings.Fajr, "HH:mm"),
      moment(timings.Dhuhr, "HH:mm"),
      moment(timings.Asr, "HH:mm"),
      moment(timings.Maghrib, "HH:mm"),
      moment(timings.Isha, "HH:mm")
    ];

    let nextPrayerIndex = 0;
    for (let i = 0; i < prayerTimes.length; i++) {
      if (momentNow.isBefore(prayerTimes[i])) {
        nextPrayerIndex = i;
        break;
      }
    }
    setAprayerIndex(nextPrayerIndex);
    setBprayerIndex((nextPrayerIndex - 1 + prayerTimes.length) % prayerTimes.length);
  }, [timings]);

  const countTimer = useCallback(() => {
    const currentPrayer = prayers[aprayerIndex];
    const prayerTime = moment(timings[currentPrayer.key], "HH:mm");
    const now = moment();
    
    let remainingTime = prayerTime.diff(now);
    if (remainingTime < 0) remainingTime += 24 * 60 * 60 * 1000;
    // if (remainingTime > 0) remainingTime = moment("12:59:00", "HH:mm:ss").diff(moment());
    
    setATime(moment.utc(remainingTime).format("HH:mm:ss"));
    
    const previousPrayer = prayers[bprayerIndex];
    const elapsedTime = now.diff(moment(timings[previousPrayer.key], "HH:mm"));
    setBTime(elapsedTime > 0 ? moment.utc(elapsedTime).format("HH:mm:ss") : null);
  }, [prayers, aprayerIndex, bprayerIndex, timings]);

  // Adkar/Hadith functions
const AFavorite = useCallback(async (index) => {

     setAdkar(prev => {
    const updated = [...prev];
    updated[index].favorie = !updated[index].favorie;
    
    const favoriteIds = updated.filter(a => a.favorie).map(a => a.id);
    persistUserData('favorites', {
      ...storedUser.favorites,
      adkar: favoriteIds
    });
    
    return updated;
  });
     if (user) {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/user/favorites/adkar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          adkarId: adkar[index].id,
          isFavorite: adkar[index].favorie 
        })
      });
    } catch (error) {
      console.error('Failed to update favorites', error);
    }
  }
  // Save to backend if user is logged in
 
}, [adkar,user]);
const updateChatHistory = useCallback((newMessage) => {
  setChatHistory(prev => {
    const updated = [...prev, newMessage];
    persistUserData('chatHistory', updated);
    return updated;
  });
}, []);

  const HFavorite = useCallback(async (index) => {
   setHadith(prev => {
    const updated = [...prev];
    updated[index].favorie = !updated[index].favorie;
    
    const favoriteIds = updated.filter(h => h.favorie).map(h => h.id);
    persistUserData('favorites', {
      ...storedUser.favorites,
      hadith: favoriteIds
    });
    
    return updated;
  });
     if (user) {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/user/favorites/hadith', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          adkarId: hadith[index].id,
          isFavorite: hadith[index].favorie 
        })
      });
    } catch (error) {
      console.error('Failed to update favorites', error);
    }
  }
  }, [hadith,user]);

  // UI functions
  const shareText = useCallback(async (text) => {
    try {
      await navigator.share({
        title: "Share via",
        text: `${text}\n${window.location.href}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }, []);


  // PDF functions
  const getAllTiming = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/calendarByCity/${cYear}/${cMonth}?city=${seCitie.name || "Tan-Tan"}&country=Morocco`
      );
      setAllPTimings(response.data.data.map(day => ({
        timings: day.timings,
        date: day.date
      })));
    } catch (error) {
      console.error("Error fetching monthly times:", error);
    }
  }, [cYear, cMonth, seCitie.name]);

  //================= EFFECTS =================
  // Initial data load
  const[cLoad,setCLoad]=useState(false);
  useEffect(() => {
    const loadData = async () => {
      try {
        const [adkarData, hadithData] = await Promise.all([
        import('../jsonFiles/Adkar.json'),
          import('../jsonFiles/Hadith.json')
        ]);
        setAdkar(adkarData.default);
        setHadith(hadithData.default); // Limit initial load
        setCLoad(!cLoad)
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    
    loadData();
    getTiming();
  }, [getTiming]);

  // Timer setup
  useEffect(() => {
    const updateDateTime = () => {
      const now = moment();
      setNTime(now.format("HH:mm:ss"));
      setNDate(now.format("Do MMMM YYYY"));
      countTimer();
    };
    
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, [countTimer]);

  // Prayer time updates
  useEffect(() => {
    getPIndex();
  }, [timings, getPIndex]);
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
  // PDF data updates
  useEffect(() => {
    if (pickP) {
      getAllTiming();
    }
  }, [pickP, cMonth, cYear, getAllTiming]);

  // Audio management
  useEffect(() => {
    if (tSound) {
      return () => {
        tSound.pause();
        tSound.currentTime = 0;
      };
    }
  }, [tSound]);

  //================= CONTEXT PROVIDERS =================

  const [rDikr, setRDikr] = useState({ Object: null, Index: null });
  const [rHadith, setRHadith] = useState({ Object: null, Index: null });
  const [cities] = useState(Cities);
  // Add this useEffect
useEffect(() => {
  const getRandomObject = (array) => {
    const Index = Math.floor(Math.random() * array.length);
    return { Object: array[Index], Index };
  };
  
  setRDikr(getRandomObject(adkar));
  setRHadith(getRandomObject(hadith));
}, [nDate,cLoad]);
// Add this function
const getAlarm = useCallback(async () => {
  if (aTime && moment.duration(aTime).asMilliseconds() < 1000) {
    const sound = new Audio(prayers[aprayerIndex].alarm || takbirFiles[0]);
    await sound.play();
    if (
      alert(
        `حان موعد آذان ${prayers[aprayerIndex].name}`
      )== null
    ) {
      sound.currentTime = 0;
      sound.pause();
    }
  }
}, [aTime, prayers, aprayerIndex]);

// Add this effect
useEffect(() => {
  if (prayers[aprayerIndex]?.not) {
    getAlarm();
  }
}, [aTime, getAlarm, prayers, aprayerIndex]);
  const prayerValues = useMemo(() => ({
    timings, setTimings,
    hijri, setHijri,
    nDate, nTime,
    aTime, bTime,
      seCitie, 
  setSeCitie: handleCityChange,
  prayers,
  setPrayers: (newPrayers) => {
    setPrayers(newPrayers);
    persistUserData('prayerNotifications', newPrayers);
  },
    aprayerIndex, setAprayerIndex,
    bprayerIndex, setBprayerIndex,
    cities,
    getTiming,
    getPIndex,
    countTimer,
    pNotClick,
    cYear, setCYear,
    cMonth, setCMonth,
    rDikr,
    setRDikr,
    rHadith,
    setRHadith
  }), [seCitie, timings, hijri, nDate, nTime, aTime, bTime, prayers, 
      aprayerIndex, bprayerIndex, pNotClick, cYear, cMonth,rDikr,
      setRDikr,
      rHadith,
      setRHadith,handleCityChange,cities]);

  const adkarValues = useMemo(() => ({
    adkar,
    aType,
    seAType, setSeAType,
    rAType, setRAType,
    currI, setCurrI,
    faAdkar, setFaAdkar,
    fAdkar: adkar.filter(fdikr => 
      seAType.key === "favorie" ? fdikr.favorie : fdikr.category === seAType.key
    ),
    AFavorite
  }), [adkar, seAType,rAType, currI, faAdkar, AFavorite]);

  const hadithValues = useMemo(() => ({
    hadith,
    hType,
    seHType, setSeHType,
    rHType, setRHType,
    currH, setCurrH,
    faHadith, setFaHadith,
    fHadith: hadith.filter(fhadith => 
      seHType.key === "favorie" ? fhadith.favorie : fhadith.category === seHType.key
    ),
    HFavorite
  }), [hadith, seHType,rHType, currH, faHadith, HFavorite]);

  // Update alarm effect
useEffect(() => {
  if (tSound) {
    splay ? tSound.play() : tSound.pause();
    return () => tSound.pause();
  }
}, [splay, tSound]);

useEffect(() => {
    if (seAlarmk.sound) {
      setTSound(new Audio(seAlarmk.sound));
      pAlarmClick(alarmI, seAlarmk.sound);
      setSPlay(true);
    } else {
      setSPlay(false);
    }
  }, [seAlarmk]);
  const alarmValues = useMemo(() => ({
    alarmk,
    seAlarmk, setSeAlarmk,
    alarmI, setAlarmI,
    splay, setSPlay,
    tSound, setTSound,
    PModel,
    NotModl
  }), [alarmk, seAlarmk, alarmI, splay, tSound,PModel,NotModl]);

  const uiStateValues = useMemo(() => ({
    ciOpen, setCiOpen,
    ciValue, setCiValue,
    pick, setPick,
    pickP, setPickP,
    alOpen, setAlOpen,
    share, setShare,
    shareText
  }), [ciOpen, ciValue, pick, pickP, alOpen, share, shareText]);

  const pdfValues = useMemo(() => ({
    refPdf,
    allPTimings,
    getPrint
  }), [allPTimings, getPrint]);
 

// Add this useEffect to check auth status on load
useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) setUser(data.user);
      } catch (error) {
        console.error('Auth check failed', error);
      }
    }
  };
  checkAuth();
}, []);
useEffect(() => {
  const interval = setInterval(() => {
    const currentData = {
      city: seCitie,
      prayerNotifications: prayers,
      favorites,
      chatHistory
    };
    persistUserData('autoSave', currentData);
  }, 30000); // Auto-save every 30 seconds

  return () => clearInterval(interval);
}, [seCitie, prayers, favorites, chatHistory]);
// Update the UserContext provider
const userValues = useMemo(() => ({
  user,
  setUser: (newUser) => {
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  },
  logout: () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  }
}), [user]);
  //================= RENDER =================
  return (
    <PrayerContext.Provider value={prayerValues}>
      <AdkarContext.Provider value={adkarValues}>
        <HadithContext.Provider value={hadithValues}>
          <AlarmContext.Provider value={alarmValues}>
            <UIStateContext.Provider value={uiStateValues}>
              <PDFContext.Provider value={pdfValues}>
                <UserContext.Provider value={userValues}>
                <div className="static w-screen ml-20 mt-12 bg-body-brown h-full select-none p-4">
                  {children}
                </div>
              </UserContext.Provider>
              </PDFContext.Provider>
            </UIStateContext.Provider>
          </AlarmContext.Provider>
        </HadithContext.Provider>
      </AdkarContext.Provider>
    </PrayerContext.Provider>
  );
};

export default Main;