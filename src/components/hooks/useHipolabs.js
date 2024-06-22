import React, { useCallback } from "react";
import axios from "axios";
import { useHipolabsDispatch } from "../contexts/HipolabsContext";

const BASE_URL = "http://universities.hipolabs.com";

const useHipolabs = () => {
  const dispatch = useHipolabsDispatch();
  
  const getUniversitiesForCountry = useCallback(async (country) => {
    dispatch({ type: "SET_LOADING", isLoading: true });
    dispatch({ type: "SET_ERROR", error: null });
    dispatch({ type: "FILTER_BY_COUNTRY", country: country });

    window.performance.mark("myMeasureStart");
    
    axios.get(`${BASE_URL}/search?country=${country}`)
    .then((response) => {
      window.performance.mark("myMeasureEnd");
      const apiData = response.data.map((item, index) => {
        return {
          id: index,
          name: item.name,
          "state_province": item["state-province"],
          "web_pages": item.web_pages[0],
        }
      })

      dispatch({ type: "SET_DATA", data: apiData });
    })
    .catch((error) => {
      dispatch({ type: "SET_ERROR", error: error });
    })
    .finally(() => {
      dispatch({ type: "SET_LOADING", isLoading: false });

      window.performance.measure("myMeasure", "myMeasureStart", "myMeasureEnd");
      dispatch({ type: "SET_API_PERFORMANCE", duration: window.performance.getEntriesByType("measure")[0].duration })
    })
  }, []);
  
  return { getUniversitiesForCountry }
}

export default useHipolabs;