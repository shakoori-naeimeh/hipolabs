import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import Table from "./common/Table";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useHipolabs from "./hooks/useHipolabs";
import { options } from "./constants";
import { useHiplabsState } from "./reducers/hiplabsReducer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`

const ResponsiveAutocomplete = styled(Autocomplete)`
  width: 50%;
  margin-bottom: 2rem;
  @media (min-width: 600px) {
    width: 15%;
  }
`;

const Home =  () => {
  const [country, setCountry] = useState(options[0]);
  const [inputValue, setInputValue] = useState(options[0]);
  const { getUniversitiesForCountry } = useHipolabs({ country: country })

  const { isLoading, error, data } = useHiplabsState();
  
  useEffect(() => {
    if (!country || country == "") return;

    getUniversitiesForCountry(country)
  }, [country])

  return (
    <Container>
      <ResponsiveAutocomplete
        value={country}
        onChange={(_event, newValue) => {
          setCountry(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        renderInput={(params) => <TextField {...params} label="Choose a country" />}
      />
      {isLoading && "Loading..."}
      {error && "Error fetching data"}
      {data && <Table data={data} />}
    </Container>
  );
};

export default Home;