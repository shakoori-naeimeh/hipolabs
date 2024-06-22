import React from "react"
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import { useHipolabsDispatch } from "../HipolabsContext";
import { useHipolabsState } from "../HipolabsContext";

const Favourite = ({university}) => {
  const dispatch = useHipolabsDispatch();
  const { favourites } = useHipolabsState();

  const updateFavourites = () => {
    let newFavourites = []
    if (favourites?.find(fav => fav.name === university.name)) {
      newFavourites = [...favourites].filter(fav => fav.name !== university.name)
    } else {
      newFavourites = [...favourites, university]
    }

    window.localStorage.setItem("favourites", JSON.stringify(newFavourites))
    dispatch({ type: "SET_FAVOURITES", favourites: newFavourites });  
  }

  return (
    <IconButton onClick={updateFavourites}>
      {favourites?.find(fav => fav.name == university.name) ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  )
};

export default Favourite;