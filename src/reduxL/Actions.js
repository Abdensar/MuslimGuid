import axios from "axios";
export const fetchTimingsRequest = () => ({
    type: "FETCH_PRAYER_TIMINGS_REQUEST",
  });
  
  export const fetchTimingsSuccess = (timings) => ({
    type: "FETCH_PRAYER_TIMINGS_SUCCESS",
    payload: timings,
  });
  
  export const fetchTimingsFailure = (error) => ({
    type: "FETCH_PRAYER_TIMINGS_FAILURE",
    payload: error,
  });
  
export const fetchTimings = (seCitie) => {
  return async (dispatch) => {
    dispatch(fetchTimingsRequest());
    try {
       const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${
        seCitie.name === "" ? "Tan-Tan" : seCitie.name
      }&country=Morocco`
    );
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      dispatch(fetchTimingsSuccess(data.data.timings));
    } catch (error) {
      dispatch(fetchTimingsFailure(error.message));
    }
  };
};
export const seCity = ({name,arabicName}) => ({
    type: "SELECT_CITY",
    payload:{name:name,arabicName:arabicName},
  });