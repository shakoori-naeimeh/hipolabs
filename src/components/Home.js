import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Table from "./common/Table";
import useHipolabs from "./hooks/useHipolabs";
import { options } from "../constants";
import { useHiplabsState } from "./HiplabsContext";
import { TextField, Button, Autocomplete } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 2rem;
  @media (min-width: 600px) {
    justify-content: flex-start;
    flex-direction: row;
  }
  @media (min-width: 1800px) {
      width: 50%;
  }
`;

const CountryFilter = styled(Autocomplete)`
  padding-bottom: 0.5rem;
  @media (min-width: 600px) {
    width: 30%;
    padding-right: 2rem;
  }
`;

const ClearButton = styled(Button)`
  width: fit-content;
  @media (min-width: 600px) {
    padding-left: 2rem;
  }
`

const Performance = styled.div`
  padding: 1rem 0;
  align-self: center;
  font-size: 0.75rem;
`
const Home =  () => {
  const { isLoading, error, data, country: currentCountry, apiPerformance } = useHiplabsState();

  const [selectedCountry, setSelectedCountry] = useState(options[0]);
  const [inputValue, setInputValue] = useState(options[0]);
  const [searchInput, setSearchInput] = useState("");
  const [universitiesToShow, setUniversitiesToShow] = useState([]);
  const { getUniversitiesForCountry } = useHipolabs({ country: selectedCountry })

  const clearAllFilters = () => {
    setSelectedCountry(options[0]);
    setInputValue(options[0]);
    setSearchInput("");
  }

  useEffect(() => {
    if (selectedCountry === currentCountry && data?.length > 0) return;
    getUniversitiesForCountry(selectedCountry)
  }, [selectedCountry])

  useEffect(() => {
    if (searchInput && searchInput !== "") {
      setUniversitiesToShow(data?.filter(university => university.name.toLowerCase().includes(searchInput.toLowerCase())))
    }else {
      setUniversitiesToShow(data)
    }
  }, [searchInput, data])


  return (
      <Container>
        <FiltersContainer>
          <CountryFilter
            value={selectedCountry}
            onChange={(_event, newValue) => {
              setSelectedCountry(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(_event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={options}
            renderInput={(params) => <TextField {...params} label="Choose a country" />}
          />
          <TextField
            id="outlined-controlled"
            label="Search by name"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          />
          <ClearButton variant="text" onClick={clearAllFilters}>Clear All Filters</ClearButton>
        </FiltersContainer>
        {isLoading && "Loading..."}
        {error && "Error fetching data"}
        {universitiesToShow && <Table data={universitiesToShow} />}
        {apiPerformance.duration && <Performance>{`API call duration: ${apiPerformance.duration}`}, {`Status: ${error || "Success"}` }</Performance> }
      </Container>
  );
};

export default Home;