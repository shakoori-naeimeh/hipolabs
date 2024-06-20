import React, { useState, useEffect, useMemo} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import Link from "@mui/material/Link";
import { useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";



const DataContainer = styled.div`
  width: 90%;
  @media (min-width: 1800px) {
    width: 50%;
  }
`
const theme = createTheme();

const SchoolsTable = ({ data }) => {
  const [favourites, setFavourites] = useState(() => JSON.parse(window.localStorage.getItem("favourites")) || []);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const updateFavourites = (row) => {
    let tempFavorites = [...favourites]
    if (favourites.find(fav => fav.name === row.name)) {
      setFavourites([...tempFavorites].filter(fav => fav.name !== row.name))
    } else {
      setFavourites([...tempFavorites, row])
    }
  }

  useEffect(() => {
    if (!favourites) return;

    window.localStorage.setItem("favourites", JSON.stringify(favourites))
  }, [favourites])

 
  const columns = useMemo(() => [
    {
      field: "favourite",
      renderHeader: () => null,
      renderCell: (cellValues) => {
        return (
          <IconButton onClick={() => updateFavourites(cellValues.row)}>
           {favourites && favourites.find(fav => fav.name == cellValues.row.name) ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        )
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
      {(data || favourites) && 
        <DataContainer>
          <DataGrid
            autoHeight
            rows={data || favourites}
            columns={columns}
          />
        </DataContainer>
      }
    </ThemeProvider>
  )
};

export default SchoolsTable;