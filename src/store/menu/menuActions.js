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

export const addNewDish = createAsyncThunk(
  "menu/addNewDish",
  async ({ category, newDish }, thunkAPI) => {
    try {
      // 1. Получаем все категории
      const { data: dishes } = await axios.get(`${MENU_API}/dishes`);

      // 2. Ищем нужную категорию
      const categoryObj = dishes.find((cat) => cat.category === category);
      if (!categoryObj) {
        throw new Error("Категория не найдена");
      }

      // 3. Добавляем id для нового блюда
      const newId =
        categoryObj.items.length > 0
          ? Math.max(...categoryObj.items.map((i) => i.id)) + 1
          : 1;

      const updatedItems = [...categoryObj.items, { id: newId, ...newDish }];

      // 4. Обновляем эту категорию на сервере
      await axios.put(`${MENU_API}/dishes/${categoryObj.id}`, {
        items: updatedItems,
      });

      // 5. Возвращаем обновленные данные
      return { category: categoryObj.category, items: updatedItems };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);