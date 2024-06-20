import React, { useState, useEffect} from "react";
import axios from "axios";

const useHipolabs = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [country, setCountry] = useState()

  useEffect(() => {
    if (!country) return
    
    setIsLoading(true)

    axios.get(`http://universities.hipolabs.com/search?country=${country}`)
    .then((response) => {
      const data = response.data.map((item, index) => {
        return {
          id: index,
          name: item.name,
          'state_province': item['state-province'],
          'web_pages': item.web_pages[0],
        }
      })
      setData(data)
    })
    .catch((error) => {
      setError(error)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [country])
  
  return { data, isLoading, error, getListFor: setCountry }
}

export default useHipolabs;