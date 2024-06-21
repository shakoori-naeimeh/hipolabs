
import React, { createContext, useContext, useReducer } from 'react';

export const HiplabsStateContext = createContext(null);

export const HiplabsDispatchContext = createContext(null);

export function useHiplabsState() {
  return useContext(HiplabsStateContext);
}

export function useHiplabsDispatch() {
  return useContext(HiplabsDispatchContext);
}

export function HipLabsProvider({ children }) {
  const [state, dispatch] = useReducer(
    hiplabsReducer,
    initialState
  );

  return (
    <HiplabsStateContext.Provider value={state}>
      <HiplabsDispatchContext.Provider value={dispatch}>
        {children}
      </HiplabsDispatchContext.Provider>
    </HiplabsStateContext.Provider>
  );
}


const initialState = {
  data: [],
  isLoading: false,
  error: null,
  favourites: JSON.parse(localStorage.getItem('favourites')) || [],
  country: '',
  searchQuery: '',
  apiPerformance: { responseTime: null, responseCode: null },
};

function hiplabsReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING': {
      return { ...state, isLoading: action.isLoading, error: null };
    }
    case 'SET_DATA': {
      return { ...state, isLoading: false, error: null, data: action.data };
    }
    case 'SET_ERROR':{
      return { ...state, isLoading: false, data: [], error: action.error };
    }
    case 'SET_FAVOURITES': {
      // TODO: remove this from here
      // localStorage.setItem('favourites', JSON.stringify(action.payload));
      return { ...state, favourites: action.payload };
    }
    case 'SET_COUNTRY': {
      return { ...state, country: action.country };
    }
    case 'SET_SEARCH_QUERY': {
      return { ...state, searchQuery: action.payload };
    }
    case 'SET_API_PERFORMANCE': {
      return { ...state, apiPerformance: action.payload };
    }
    default:
      return state;
  }
};