import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_HOST_API } from "../config";
const token = localStorage.getItem("token");
export const FAVORITE_ACTION_ASYNC = createAsyncThunk(
  "favorite/toggle-favorite",
  async (id, { rejectedWithValue, dispatch }) => {
    console.log(id, "from  FAVORITE_ACTION_ASYNC");
    try {
      const response = await fetch(
        `${BACKEND_HOST_API}/favorite/toggle-favorite/${id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/Json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      dispatch(FAVORITE_GET_ASYNC());
      console.log(data);
      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
export const FAVORITE_GET_ASYNC = createAsyncThunk(
  "favorite/get-favorites",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await fetch(
        `${BACKEND_HOST_API}/favorite/get-favorites`,
        {
         method:"GET",
          headers: {
            "Content-type": "aplication/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
const initialState = {
  favoriteData: [],
  favoriteError: null,
  loading: false,
};

const FavoriteSlicer = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FAVORITE_GET_ASYNC.fulfilled, (state, action) => {
      // console.log("FULLFILLED FAVORITE_GET_ASYNC", action.payload);
      state.favoriteData = action.payload;
      state.loading = false;
    });
    builder.addCase(FAVORITE_ACTION_ASYNC.fulfilled, (state, action) => {
      // console.log("FULLFILLED FAVORITE_ACTION_ASYNC", action.payload);
      state.loading = false;
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.favoriteError = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        // console.log(action.payload);
        state.favoriteError = action.payload;
      }
    );
  },
});

export default FavoriteSlicer.reducer;
