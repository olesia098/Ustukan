import { createSlice } from "@reduxjs/toolkit";
import {
  getDrinks,
  getOneDrink,
  addNewDrink,
  deleteDrink,
  updateDrink,
} from "./barActions";

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
        state.drinks = action.payload; // <-- твои данные
        // console.log(state.drinks);
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
        console.log(state.oneDrink);
      })
      .addCase(getOneDrink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewDrink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewDrink.fulfilled, (state, action) => {
        state.loading = false;
        state.drinks = action.payload;
      })
      .addCase(addNewDrink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDrink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDrink.fulfilled, (state, action) => {
        state.loading = false;
        state.drinks = action.payload;
      })
      .addCase(deleteDrink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateDrink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDrink.fulfilled, (state, action) => {
        state.loading = false;
        state.drinks = action.payload;
      })
      .addCase(updateDrink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default barSlice;
