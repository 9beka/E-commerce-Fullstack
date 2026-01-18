import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_HOST_API } from "../config";
const token = localStorage.getItem("token");
export const ADD_TO_CART = createAsyncThunk(
  "add-to-cart/ADD_TO_CART",
  async (id, { rejectWithValue, dispatch }) => {
    console.log(id, "FROM SLICER ADD_TO_CART");
    try {
      const res = await fetch(`${BACKEND_HOST_API}/cart/add-to-cart/${id}`, {
        method: "POST",
        headers: {
           "Content-Type": "application/json" ,
           Authorization: `Bearer ${token}`,
      },
      
         
      });
      const data = await res.json();
      dispatch(GET_CART_ASYNC()) 
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
);
export const DECREASE_CART = createAsyncThunk(
  "add-to-cart/DECREASE_CART",
  async (id, { rejectWithValue, dispatch }) => {
    console.log(id, "FROM SLICER DECREASE_CART");
    try {
      const res = await fetch(`${BACKEND_HOST_API}/cart/decrease-cart/${id}`, {
        method: "POST",
        headers: {
           "Content-Type": "application/json" ,
           Authorization: `Bearer ${token}`,
      },
      
         
      });
      const data = await res.json();
      dispatch(GET_CART_ASYNC()) 
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
);

  export const GET_CART_ASYNC = createAsyncThunk(
    "get-cart-products/GET_CART_ASYNC" ,
    async(_,{rejectWithValue})=>{
      try {
      const response = await fetch(`${BACKEND_HOST_API}/cart/get-cart-products`,{
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.json()
      return data
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
const initialState = {
  cartData :[],
  error: null,
  loading : false , 
};

const CartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ADD_TO_CART.fulfilled, (state, action) => {
      console.log("FULLFILLED", action.payload);
      state.loading = false
    });
    builder.addCase(DECREASE_CART.fulfilled, (state, action) => {
      console.log("FULLFILLED ,DECREASE_CART", action.payload);
      state.loading = false
    });
    builder.addCase(GET_CART_ASYNC.fulfilled, (state, action) => {
      console.log("FULLFILLED", action.payload);
      state.cartData = action.payload
      state.loading = false
    });

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null;
        state.loading = true
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
      }
    );
  },
});

export default CartSlicer.reducer;
