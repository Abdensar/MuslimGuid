import { combineReducers } from 'redux';
import cities from "../jsonFiles/Cities.json";
import Fajr from "../imgs/Fajr.png";
import Dhuhr from "../imgs/Dhuhr.png";
import Asr from "../imgs/Asr.png";
import Maghrib from "../imgs/Maghrib.png";
import Isha from "../imgs/Isha.png";
const initialPrayerState = {
    timings: {
        Fajr: "",
        Dhuhr: "",
        Asr: "",
        Maghrib: "",
        Isha: "",
      },
    prayers:[
      { key: "Fajr", img: Fajr, name: "الفجر"},
      { key: "Dhuhr", img: Dhuhr, name: "الظهر"},
      { key: "Asr", img: Asr, name: "العصر"},
      { key: "Maghrib", img: Maghrib, name: "المغرب"},
      { key: "Isha", img: Isha, name: "العشاء"},
    ] ,
    isLoading: false,
    error: null,
  };
  const prayerReducer = (state = initialPrayerState, action) => {
    switch (action.type) {
      case "FETCH_PRAYER_TIMINGS_REQUEST":
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case "FETCH_PRAYER_TIMINGS_SUCCESS":
        const updatedPrayers = state.prayers.map(prayer => {
          return {
              ...prayer,
              time: state.timings[prayer.key] // Assuming timings object contains timing for each prayer key
          };
      });
        return {
          ...state,
          isLoading: false,
          timings: action.payload,
          prayers:updatedPrayers,
        };
      case "FETCH_PRAYER_TIMINGS_FAILURE":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        }; 
      default:
        return state;
    }
  };
const initialCityState = {
  Cities:cities,
  seCitie: { name:"", arabicName:""},
  };
  const cityReducer = (state = initialCityState, action) => {
    switch (action.type) {
      case "SELECT_CITY":
        return {
          ...state,
          seCitie: action.payload,
        };
      default:
        return state;
    }
  };
  export default combineReducers({
    PTimings: prayerReducer,
    Cities: cityReducer,
  });