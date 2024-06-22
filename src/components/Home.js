import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Table from "./common/Table";
import { TextField, Button, Autocomplete } from "@mui/material";
import useHipolabs from "./hooks/useHipolabs";
import { options, defaultCountry } from "../constants";
import { useHipolabsState } from "./HipolabsContext";
import { useHipolabsDispatch } from "./HipolabsContext";

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
    margin-left: 2rem;
    height: fit-content;
    align-self: center;
  }
`

const Performance = styled.div`
  padding: 1rem 0;
  align-self: center;
  font-size: 0.75rem;
`

const Home =  () => {
  const { isLoading, error, apiPerformance, filteredData, filters } = useHipolabsState();
  const dispatch = useHipolabsDispatch();

  const { getUniversitiesForCountry } = useHipolabs()

  const clearAllFilters = () => {
    getUniversitiesForCountry(defaultCountry)
    dispatch({ type: "FILTER_BY_NAME", name: "" })
  }

  const filterByCountry = (country) => {
    getUniversitiesForCountry(country)
  }

  const filterByName = (value) => {
    dispatch({ type: "FILTER_BY_NAME", name: value })
  }

  useEffect(() => {
    if (filters.country === "") {
      getUniversitiesForCountry(defaultCountry)
    }
  }, [])

  return (
      <Container>
        <FiltersContainer>
          <CountryFilter
            value={filters.country || defaultCountry}
            onChange={(_event, newValue) => {
              filterByCountry(newValue);
            }}
            options={options}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            id="outlined-controlled"
            label="Search by name"
            value={filters.name}
            onChange={(event) => {
              filterByName(event.target.value);
            }}
          />
          <ClearButton variant="text" onClick={clearAllFilters}>Clear All Filters</ClearButton>
        </FiltersContainer>

        {isLoading && "Loading..."}
        {error && "Error fetching data"}
        {filteredData && <Table data={filteredData} />}
        {apiPerformance.duration && <Performance>{`API call duration: ${apiPerformance.duration}`}, {`Status: ${error || "Success"}` }</Performance> }
      </Container>
  );
};

export default Home;