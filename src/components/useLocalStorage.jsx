import { useState, useEffect } from 'react';

// Custom hook for local storage
const useLocalStorage = (key, initialValue) => {
//   // State to store the current value
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       // Get from local storage by key
//       const item = window.localStorage.getItem(key);
//       // Parse and return stored json or, if undefined, return initialValue
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });

//   // Set the value in state and local storage
//   const setValue = (value) => {
//     try {
//       // Allow value to be a function so we have the same API as useState
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
//       // Save state
//       setStoredValue(valueToStore);
//       // Save to local storage
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Remove the value from local storage
//   const removeValue = () => {
//     try {
//       window.localStorage.removeItem(key);
//       setStoredValue(undefined);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return [storedValue, setValue, removeValue];

const useLocalStorage = (key) => {  
    const setItem = (value) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getItem = () => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      } catch (error) {
        console.log(error);
      }
    };
  
    const removeItem = () => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.log(error);
      }
    };
  
    return { setItem, getItem, removeItem };
  };



};

export default useLocalStorage;