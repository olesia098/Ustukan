import { createSlice } from "@reduxjs/toolkit";
import {
  addNewDish,
  deleteDish,
  getMenu,
  getOneDishes,
  updateDish,
} from "./menuActions";

const initialState = {
  dishes: [],
  loading: false,
  error: null,
  oneDishes: null,
};

export const menuSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload || []; // <-- твои данные
        console.log("getMenu.fulfilled payload:", action.payload);
        console.log("state.dishes:", state.dishes);
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOneDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.oneDishes = action.payload;
        console.log(state.oneDishes);
      })
      .addCase(getOneDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewDish.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload || state.dishes; // обновляем весь массив dishes
      })
      .addCase(addNewDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload || state.dishes;
      })
      .addCase(deleteDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload || state.dishes;
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default menuSlice;
