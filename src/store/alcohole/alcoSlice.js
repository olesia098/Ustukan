import { createSlice } from "@reduxjs/toolkit";
import {
  getAlcoholes,
  addNewAlco,
  deleteAlco,
  updateAlco,
} from "./alcoActions";

const initialState = {
  alcoholes: [],
  loading: false,
  error: null,
  //   oneDrink: null,
};

export const alcoholeSlice = createSlice({
  name: "alcoholes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlcoholes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAlcoholes.fulfilled, (state, action) => {
        state.loading = false;
        state.alcoholes = action.payload; // <-- твои данные
        // console.log(state.alcoholes);
      })
      .addCase(getAlcoholes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewAlco.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewAlco.fulfilled, (state, action) => {
        state.loading = false;
        state.alcoholes = action.payload;
      })
      .addCase(addNewAlco.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAlco.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAlco.fulfilled, (state, action) => {
        state.loading = false;
        state.alcoholes = action.payload;
      })
      .addCase(deleteAlco.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateAlco.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAlco.fulfilled, (state, action) => {
        state.loading = false;
        state.alcoholes = action.payload;
      })
      .addCase(updateAlco.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default alcoholeSlice;
