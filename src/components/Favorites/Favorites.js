import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FAVORITE_GET_ASYNC } from "../../Redux/FavoriteSlicer.js";
import FavoriteTogle from "../FavoriteTogle/FavoriteTogle.js";
const Favorites = () => {
  const { favoriteData } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FAVORITE_GET_ASYNC());
  }, [dispatch]);
  return (
    <>
      <div className="row">
        {favoriteData?.items?.map((el) => {
          return (
            <div key={el._id} className="col-4">
              <div className="box">
                <img src={el.product.img} alt="" />
                <h3>{el.product.name}</h3>
               <div className="Favorite_Wrapper"> 
               <FavoriteTogle favoriteID ={favoriteData.items} elementID={el.product._id}/>
               </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Favorites;
