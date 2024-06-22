
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
  filteredData: [],
  filters: { name: "", country: "" },
  isLoading: false,
  error: null,
  favourites: JSON.parse(localStorage.getItem("favourites")) || [],
  apiPerformance: { duration: null },
};

function hipolabsReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING": {
      return { ...state, isLoading: action.isLoading, error: null };
    }
    case "SET_DATA": {
      let newFilteredData = action.data;
      if (state.filters.name !== "") {
        newFilteredData = filterData([...action.data], state);
      }

      return { ...state, isLoading: false, error: null, data: action.data, filteredData: newFilteredData };
    }
    case "SET_ERROR":{
      return { ...state, isLoading: false, data: [], error: action.error };
    }
    case "FILTER_BY_NAME": {
      let newFilteredData = [...state.filteredData]
      if (action.name === "") {
        newFilteredData = [...state.data];
      } else {
        newFilteredData = filterData([...state.data], state);
      }
      return { ...state, filters: {...state.filters, name: action.name}, filteredData: newFilteredData };
    }
    case "SET_FAVOURITES": {
      return { ...state, favourites: action.favourites };
    }
    case "FILTER_BY_COUNTRY": {
      return { ...state, filters: {...state.filters, country: action.country} };
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

const filterData = (data, state) => {
  return data.filter(university => university.name.toLowerCase().includes(state.filters.name.toLowerCase()))
}