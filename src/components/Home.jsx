import React, { useState, useEffect} from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Table from "./common/Table";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useHipolabs from "./hooks/useHipolabs";
import { options } from "./constants";
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
  
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState(options[0]);
  const { data, isLoading, error } = useHipolabs({ country: value })

  return (
    <Container>
      <ResponsiveAutocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        renderInput={(params) => <TextField {...params} label="Choose a country" />}
      />
      {isLoading && "Loading..."}
      {error && {error}}
      {data && <Table data={data} />}
    </Container>
  );
};

export default Home;