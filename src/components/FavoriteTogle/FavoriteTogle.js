import React from 'react';
import { useDispatch , useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
   FAVORITE_ACTION_ASYNC,
 } from "../../Redux/FavoriteSlicer.js";
const FavoriteTogle = ({favoriteID ,elementID }) => {
   const { data, loading } = useSelector((state) => state.products);
   const dispatch = useDispatch(); 
   const IsLiked = favoriteID?.some((item) => item.product._id === elementID)
   const handleFavorite = (_id) => {
      console.log(_id, "ID FROM handleFavorite");
      dispatch(FAVORITE_ACTION_ASYNC(_id));
    };
   return (
      <div onClick={() => handleFavorite(elementID)}
                  >
         {IsLiked? (
      <FavoriteIcon />
    ) : (
      <FavoriteBorderIcon />
    )}
      </div>
   );
};

export default FavoriteTogle;