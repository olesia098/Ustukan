import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "./menu/menuSlice";
import barSlice from "./bar/barSlice";
import alcoholeSlice from "./alcohole/alcoSlice";

const reducers = combineReducers({
  dishes: menuSlice.reducer,
  drinks: barSlice.reducer,
  alcoholes: alcoholeSlice.reducer
}); //на случай если много редюсеров в проекте

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  reducer: reducers,

  devTools: {
    name: "",
  },
});

export default store;
