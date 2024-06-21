import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Table from "./common/Table";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useHipolabs from "./hooks/useHipolabs";
import { options } from "./constants";
import { useHiplabsState } from "./HiplabsContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 2rem;
  @media (min-width: 600px) {
      justify-content: center;
  }
`;

const ResponsiveAutocomplete = styled(Autocomplete)`
  width: 43%;
  @media (min-width: 600px) {
    width: 20%;
    padding-right: 2rem;
  }
`;

const Home =  () => {
  const [country, setCountry] = useState(options[0]);
  const [inputValue, setInputValue] = useState(options[0]);
  const [searchInput, setSearchInput] = useState("");
  const [universitiesToShow, setUniversitiesToShow] = useState([]);
  const { getUniversitiesForCountry } = useHipolabs({ country: country })

  const { isLoading, error, data, country: currentCountry } = useHiplabsState();
  
  useEffect(() => {
    if (country === currentCountry && data?.length > 0) return;

    getUniversitiesForCountry(country)
  }, [country])

  useEffect(() => {
    if (searchInput && searchInput !== "") {
      setUniversitiesToShow(data?.filter(university => university.name.toLowerCase().includes(searchInput.toLowerCase())))
    }else {
      setUniversitiesToShow(data)
    }
  }, [searchInput, data])
  
  return (
    <Container>
      <InputContainer>
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
        <TextField
          id="outlined-controlled"
          label="Search by name"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />
      </InputContainer>
      {isLoading && "Loading..."}
      {error && "Error fetching data"}
      {universitiesToShow && <Table data={universitiesToShow} />}
    </Container>
  );
};

export default Home;