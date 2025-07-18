import { createAsyncThunk } from "@reduxjs/toolkit";
import { MENU_API } from "../../helpers/consts";
import axios from "axios";

export const getMenu = createAsyncThunk(
  "menu/getMenu",
  async (_, { getState }) => {
    const { data } = await axios.get(`${MENU_API}/dishes`);
    return { data };
  }
);

export const getOneDishes = createAsyncThunk(
  "menu/getOneDishes",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${MENU_API}/dishes`);
      // ищем блюдо по id среди всех items
      let foundDish = null;
      for (const category of data) {
        const match = category.items.find((item) => item.id === Number(id));
        if (match) {
          foundDish = match;
          break;
        }
      }
      return foundDish;
    } catch (error) {
      // Если произошла ошибка, возвращаем отклоненное действие с ошибкой
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
