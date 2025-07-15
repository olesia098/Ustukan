import { createSlice } from "@reduxjs/toolkit";
import { getDrinks, getOneDrink } from "./barActions";

const initialState = {
    drinks: [],
  loading: false,
  error: null,
  oneDrink: null,
};

export const barSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDrinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDrinks.fulfilled, (state, action) => {
        state.loading = false;
        state.drinks = action.payload.data; // <-- твои данные
        // console.log(state.dishes);
      })
      .addCase(getDrinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOneDrink.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneDrink.fulfilled, (state, action) => {
        state.loading = false;
        state.oneDrink = action.payload;
        console.log(state.oneDrink)
      })
      .addCase(getOneDrink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default barSlice;