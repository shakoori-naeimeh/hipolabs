import React, { useCallback } from "react";
import axios from "axios";
import { useHiplabsDispatch } from "../HiplabsContext";

const useHipolabs = () => {
  const dispatch = useHiplabsDispatch();
  
  const getUniversitiesForCountry = useCallback(async (country) => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    dispatch({ type: 'SET_ERROR', error: null });
    dispatch({ type: 'SET_COUNTRY', country: country });

    axios.get(`http://universities.hipolabs.com/search?country=${country}`)
    .then((response) => {
      const apiData = response.data.map((item, index) => {
        return {
          id: index,
          name: item.name,
          'state_province': item['state-province'],
          'web_pages': item.web_pages[0],
        }
      })
      dispatch({ type: 'SET_DATA', data: apiData });
    })
    .catch((error) => {
      dispatch({ type: 'SET_ERROR', error: error });

    })
    .finally(() => {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    })
  }, []);
  
  return { getUniversitiesForCountry }
}

export default useHipolabs;