import React from "react"
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import { useHiplabsDispatch } from "../reducers/HiplabsContext";
import { useHiplabsState } from "../reducers/HiplabsContext";

const Favourite = ({university}) => {

  const dispatch = useHiplabsDispatch();
  const { favourites } = useHiplabsState();

  const updateFavourites = () => {
    let newFavourites = []
    if (favourites?.find(fav => fav.name === university.name)) {
      newFavourites = [...favourites].filter(fav => fav.name !== university.name)
    } else {
      newFavourites = [...favourites, university]
    }

    window.localStorage.setItem("favourites", JSON.stringify(newFavourites))
    dispatch({ type: 'SET_FAVOURITES', favourites: newFavourites });  
  }

  return (
    <IconButton onClick={updateFavourites}>
      {favourites?.find(fav => fav.name == university.name) ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  )
};

export default Favourite;