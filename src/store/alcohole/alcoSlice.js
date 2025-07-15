import { createSlice } from "@reduxjs/toolkit";
import { getAlcoholes } from "./alcoActions";

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
        state.alcoholes = action.payload.data; // <-- твои данные
        // console.log(state.dishes);
      })
      .addCase(getAlcoholes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    //   .addCase(getOneDrink.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getOneDrink.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.oneDrink = action.payload;
    //     console.log(state.oneDrink)
    //   })
    //   .addCase(getOneDrink.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   });
  },
});

export default alcoholeSlice;