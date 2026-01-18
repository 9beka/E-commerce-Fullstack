import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {useSelector } from "react-redux"
import Wrapper from "./components/Layout/Wrapper"
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Product from "./components/Product/Product";
import Favorites from "./components/Favorites/Favorites";
const Views = () => {
   const {token} = useSelector(state=>state.login)


   return (
      <Routes>
        <Route path="/" element={token?<Wrapper/>:<Navigate to="/login" replace />} >
          <Route index element={<Product/>} />
          <Route path="/favorites" element={<Favorites/>} />
        </Route>
        <Route path="/login" element={token?<Navigate to="/" replace />:<Login/>}/>
        <Route path="/register" element={token?<Navigate to="/" replace />:<Registration/>}/>
      </Routes> 
  );
};

export default Views;
