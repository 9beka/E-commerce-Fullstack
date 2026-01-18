import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_HOST_API } from "../config";
export const GET_PRODUCTS_ASYNC = createAsyncThunk(
   "product/get-all-products" , 
   async(curruntPage, {rejectWithValue, dispatch }) =>{
      try {
         const response = await fetch(
            `${BACKEND_HOST_API}/product/get-all-products?page=${curruntPage}` , 
            {
               method:"GET",
               headers: {
                  "Content-Type": "application/json",
                },
            }
         )
         const finalData = await response.json()
         return finalData
      } catch (error) {
         return rejectWithValue(error.message);
      }  
   }
)
const initialState = {
   data: [],
   error: null,
   loading : false , 
   pages:null,
   page:1,
 };

const ProductSlicer = createSlice({
   name:"product" ,
   initialState ,
   reducers :{
   },
   extraReducers: (builder) =>{
      builder.addCase(GET_PRODUCTS_ASYNC.fulfilled, (state, action) => {
         console.log("FULLFILLED", action.payload);
         state.data = action.payload.products;
         state.pages = action.payload.pages
         state.page = action.payload.page
         state.loading = false
       });
       builder.addCase(GET_PRODUCTS_ASYNC.rejected, (state, action) => {
         console.log("rejected", action);
       });
       builder.addCase(GET_PRODUCTS_ASYNC.pending, (state, action) => {
         console.log("pending", action);
         state.error = null;
         state.loading = true
       });
   }
})
export default ProductSlicer.reducer