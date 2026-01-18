import React, { useEffect,useRef } from "react";
import "./Product.scss";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCTS_ASYNC } from "../../Redux/productSlicer";
import { ADD_TO_CART } from "../../Redux/CartSlicer.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "antd";
import Loader from "../../Loader/Loader.js";
import {
  FAVORITE_GET_ASYNC,
} from "../../Redux/FavoriteSlicer.js";
import FavoriteTogle from "../FavoriteTogle/FavoriteTogle.js";
import CustomPagination from "../CustomPagination/CustomPagination.js";
import {UseParamsHandler} from "../../CustomHook/UseParamsHandler"
const Product = () => {
  const dispatch = useDispatch();
  const {curruntPage , setPage} = UseParamsHandler()
  const loader = useRef(null);
  useEffect(() => {
    dispatch(GET_PRODUCTS_ASYNC());
    dispatch(FAVORITE_GET_ASYNC());
  }, [dispatch]);
  const { data, loading ,pages} = useSelector((state) => state.products);
  const { favoriteData } = useSelector((state) => state.favorite);
  const handleAddToCart = (id) => {
    dispatch(ADD_TO_CART(id));
  };
  

  return (
    <div className="container">
      <div className="row">
        {data?.map((el) => {
          return (
            <div key={el._id} className="col-4">
              <div className="box">
                <LazyLoadImage
                  alt={el.name}
                  effect="blur"
                  height="270px"
                  src={el.img}
                />
                <h3>{el.name}</h3>
                <p>{el.description}</p>
                <div className="wrapperForPriceAndCart">
                  <div className="boxForPriceAndCart">
                    <h4>{el.price} $</h4>
                  </div>
                     <FavoriteTogle favoriteID ={favoriteData.items} elementID={el._id}/>
                  <Button
                    htmlType={"submit"}
                    onClick={() => handleAddToCart(el._id)}
                  >
                    В корзину
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        {loading && <Loader />}
      </div>
      <div className="Produc__pagination"> <CustomPagination pages={pages}/></div>

    </div>
  );
};

export default Product;
