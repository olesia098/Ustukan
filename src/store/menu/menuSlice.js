import { createSlice } from "@reduxjs/toolkit";
import { getMenu, getOneDishes } from "./menuActions"; // путь подставь свой

const initialState = {
  dishes: [],
  isLoading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dishes = action.payload.data; // <-- твои данные
        // console.log(state.dishes);
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOneDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.oneProduct = action.payload;
        console.log(state.dishes)
      })
      .addCase(getOneDishes.rejected, (state) => {
        state.loading = true;
      });
  },
});

export default menuSlice.reducer;
