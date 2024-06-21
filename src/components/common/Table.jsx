import React, { useState, useEffect, useMemo} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import Link from "@mui/material/Link";
import { useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import Favourite from "./Favourite";


const DataContainer = styled.div`
  width: 90%;
  @media (min-width: 1800px) {
    width: 50%;
  }
`
const theme = createTheme();

const SchoolsTable = ({ data }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = useMemo(() => [
    {
      field: "favourite",
      renderHeader: () => null,
      renderCell: (cellValues) => {
        return <Favourite university={cellValues.row} />
      },
      width: isMobile ? 50 : 100,
    },
    {
      field: "name",
      headerName: "Name",
      width: isMobile ? 120 : 300,
      sx: { fontSize: 2 },
    },
    {
      field: "state_province",
      headerName: "State/Province",
      width: isMobile ? 120 : 300,
    },
    {
      field: "web_pages",
      headerName: "Website",
      width: isMobile ? 120 : 300,
      height: 300,
      renderCell: (params) =>  <Link href={params.value} underline="always"> {params.value} </Link>
    }
  ])

  return (
    <ThemeProvider theme={theme}>
      {data && 
        <DataContainer>
          <DataGrid
            autoHeight
            rows={data}
            columns={columns}
          />
        </DataContainer>
      }
    </ThemeProvider>
  )
};

export default SchoolsTable;