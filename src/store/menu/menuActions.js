import { createAsyncThunk } from "@reduxjs/toolkit";
import { MENU_API } from "../../helpers/consts";
import axios from 'axios';

export const getMenu = createAsyncThunk(
  "menu/getMenu",
  async (_, {getState}) => {
    const {data} = await axios.get(
        `${MENU_API}`
    )
    return {data}
  }
);

export const getOneDishes = createAsyncThunk(
  "menu/getOneDishes",
  async ({ id }) => {
    const { data } = await axios.get(MENU_API);
    // ищем блюдо по id среди всех items
    let foundDish = null;
    for (const category of data) {
      const match = category.items.find(item => item.id === Number(id));
      if (match) {
        foundDish = match;
        break;
      }
    }
    return foundDish;
  }
);

