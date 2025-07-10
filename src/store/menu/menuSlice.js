import { createSlice } from "@reduxjs/toolkit";
import { getMenu, getOneDishes } from "./menuActions"; // путь подставь свой

const initialState = {
  dishes: [],
  loading: false,
  error: null,
  oneDishes: null,
};

const menuSlice = createSlice({
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
        state.dishes = action.payload.data; // <-- твои данные
        // console.log(state.dishes);
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
        console.log(state.oneDishes)
      })
      .addCase(getOneDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
