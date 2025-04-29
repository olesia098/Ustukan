import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menu/menuSlice";


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    dishes: menuSlice,
  },
  devTools:{
    name:''
  }
});