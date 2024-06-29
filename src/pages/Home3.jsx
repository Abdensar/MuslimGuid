// import React, { useContext, useEffect, useState } from "react";
// import moment from "moment";
// import "moment/locale/ar-ma";
// import "moment-timezone";
// import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";
// import { AiOutlineSearch } from "react-icons/ai";
// import { PrayerContext } from "../components/Main";
// import { FaPlayCircle, FaShareAlt, FaStar, FaStopCircle } from "react-icons/fa";
// import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
// import axios from "axios";
// moment.locale("ar-ma");
// const Home = () => {
//   const {
//     seCitie,
//     setSeCitie,
//     ciOpen,
//     setCiOpen,
//     ciValue,
//     setCiValue,
//     prayers,
//     setPrayers,
//     aprayerIndex,
//     bprayerIndex,
//     cities,
//     nDate,
//     aTime,
//     bTime,
//     nTime,
//     hijri,
//     aType,
//     seAType,
//     hType,
//     seHType,
//     shareText,
//     share,
//     setShare,
//     rDikr,
//     rHadith,
//     pNot,
//     setPNot,
//     alarmk,
//     alValue,
//     setAlValue,
//     seAlarmk,
//     setSeAlarmk,
//     nYear,
//     setNYear,
//     nMonth,
//     setNMonth,
//   } = useContext(PrayerContext);
//   // const [allTimings, setAllTimings] = useState({
//   //   timings: {
//   //     Fajr: "",
//   //     Dhuhr: "",
//   //     Asr: "",
//   //     Maghrib: "",
//   //     Isha: "",
//   //   },
//   //   date: {
//   //     gregorian: {
//   //       date: "01-06-2024",
//   //     },
//   //     hijri: {
//   //       day: 24,
//   //       weekday: {
//   //         ar: "السبت",
//   //       },
//   //       month: {
//   //         ar: "ذوالقعدة",
//   //       },
//   //       year: 1445,
//   //     },
//   //   },
//   // });
//   // const getAllTiming = async () => {
//   //   const response = await axios.get(
//   //     `http://api.aladhan.com/v1/calendarByCity/${cYear&&nYear}/${cMonth&&nMonth}?city=${
//   //       seCitie.name === "" ? "Tan-Tan" : seCitie.name
//   //     }&country=Morocco`
//   //   );
//   //   setAllTimings({timings:response.data.data.timings,date:response.data.data.date});
//   //   // setAllTimings(response.data.data);
//   // };
//   useEffect(() => {
//     // getAllTiming();
//     // console.log(allTimings);
//   }, [seCitie, cYear, cMonth]);
//   const [cYear, setCYear] = useState(nYear); 
//   const [cMonth, setCMonth] = useState(nMonth);
//   const [date,setDate]= moment()
//     .year(cYear)
//     .month(cMonth - 1);
//   return (
//     <>
//       <div
//         className={`fixed inset-0 flex justify-center items-center transition-colors ${
//           pick ? "visible bg-black/20" : "invisible"
//         }`}
//       >
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className={`bg-red rounded-xl shadow p-6 transition-all ${
//             pick ? "scale-100 opacity-100" : "scale-125 opacity-0"
//           }`}
//         > 
//           <div>
//             <div className="grid grid-cols-3">
//               <BiChevronLeft
//                 className="text-5xl cursor-pointer justify-self-end text-dark-yellow m-0 hover:text-white font-semibold "
//                 onClick={() =>
//                   cMonth === 1
//                     ? setCMonth(12) && setCYear(cYear - 1)
//                     : setCMonth(cMonth - 1)
//                 }
//               />
//               <h2 className=" inline text-2xl text-center place-content-center text-white font-semibold">
//                 {date.format("MMMM YYYY")}
//               </h2>
//               <BiChevronRight
//                 className="text-5xl  justify-self-start cursor-pointer text-dark-yellow m-0 hover:text-white font-semibold"
//                 onClick={() =>
//                   cMonth === 12
//                     ? setCMonth(1) && setCYear(cYear + 1)
//                     : setCMonth(cMonth + 1)
//                 }
//               />
//             </div>
//             <div className="bg-red-800 w-full">

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;






//    const [allTimings, setAllTimings] = useState({
//     timings: {
//       Fajr: "",
//       Dhuhr: "",
//       Asr: "",
//       Maghrib: "",
//       Isha: "",
//     },
//     date: {
//       gregorian: {
//         date: "01-06-2024",
//       },
//       hijri: {
//         day: 24,
//         weekday: {
//           ar: "السبت",
//         },
//         month: {
//           ar: "ذوالقعدة",
//         },
//         year: 1445,
//       },
//     },
//   });


//   const formattedDataArray = apiData.map(data => ({
//     timings: {
//       Fajr: data.timings.Fajr,
//       Dhuhr: data.timings.Dhuhr,
//       Asr: data.timings.Asr,
//       Maghrib: data.timings.Maghrib,
//       Isha: data.timings.Isha
//     },
//     date: {
//       gregorian: {
//         date: data.date.gregorian.date
//       },
//       hijri: {
//         day: data.date.hijri.day,
//         weekday: {
//           ar: data.date.hijri.weekday.ar
//         },
//         month: {
//           ar: data.date.hijri.month.ar
//         },
//         year: data.date.hijri.year
//       }
//     }
//   }));
//   setAllTimings(formattedDataArray);




//   const currentDateData = response.data.data[0]; // Assuming you need the first entry for the specified date
//       setAllTimings({
//         timings: currentDateData.timings,
//         date: currentDateData.date,
//       });





//       const getAllTiming = async () => {
//         const response = await axios.get(
//           `http://api.aladhan.com/v1/calendarByCity/${cYear&&nYear}/${cMonth&&nMonth}?city=${
//             seCitie.name === "" ? "Tan-Tan" : seCitie.name
//           }&country=Morocco`
//         );
//         const apiData = response.data.data;
//         const formattedDataArray = apiData.map((data,index )=>({
//           setAllTimings({timings:data[timings] , date:data[date]})
//         }));
//         setAllTimings(formattedDataArray);
//         setAllTimings({timings:response.data.data.timings,date:response.data.data.date});
//         // setAllTimings(response.data.data);
//       };