
import React, { createContext, useContext, useReducer } from "react";

export const HipolabsStateContext = createContext(null);

export const HipolabsDispatchContext = createContext(null);

export function useHipolabsState() {
  return useContext(HipolabsStateContext);
}

export function useHipolabsDispatch() {
  return useContext(HipolabsDispatchContext);
}

export function HipolabsProvider({ children }) {
  const [state, dispatch] = useReducer(
    hipolabsReducer,
    initialState
  );

  return (
    <HipolabsStateContext.Provider value={state}>
      <HipolabsDispatchContext.Provider value={dispatch}>
        {children}
      </HipolabsDispatchContext.Provider>
    </HipolabsStateContext.Provider>
  );
}

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  favourites: JSON.parse(localStorage.getItem("favourites")) || [],
  country: "Canada",
  filteredData: [],
  apiPerformance: { duration: null },
};

function hipolabsReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING": {
      return { ...state, isLoading: action.isLoading, error: null };
    }
    case "SET_DATA": {
      return { ...state, isLoading: false, error: null, data: action.data };
    }
    case "SET_ERROR":{
      return { ...state, isLoading: false, data: [], error: action.error };
    }
    case "SET_FAVOURITES": {
      return { ...state, favourites: action.favourites };
    }
    case "SET_COUNTRY": {
      return { ...state, country: action.country };
    }
    case "SET_API_PERFORMANCE": {
      return { 
        ...state,
        apiPerformance: { duration: action.duration },
      };
    }
    default:
      return state;
  }
};