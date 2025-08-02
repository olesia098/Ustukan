import { createAsyncThunk } from "@reduxjs/toolkit";
import { MENU_API } from "../../helpers/consts";
import axios from "axios";

export const getMenu = createAsyncThunk(
  "menu/getMenu",
  async (_, { getState }) => {
    const { data } = await axios.get(`${MENU_API}/dishes`);
    return data;
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
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// payload: { category: string, newDish: object }
export const addNewDish = createAsyncThunk(
  "menu/addNewDish",
  async ({ category, newDish }, thunkAPI) => {
    try {
      // 1. Получаем все категории
      const { data: dishes } = await axios.get(`${MENU_API}/dishes`);

      // 2. Находим категорию, в которую будем добавлять блюдо
      const categoryToUpdate = dishes.find((c) => c.category === category);

      if (!categoryToUpdate) {
        throw new Error("Категория не найдена");
      }

      // 3. Обновляем массив блюд
      const updatedCategory = {
        ...categoryToUpdate,
        items: [...categoryToUpdate.items, newDish],
      };

      // 4. Обновляем конкретную категорию по ID
      await axios.patch(
        `${MENU_API}/dishes/${categoryToUpdate.id}`,
        updatedCategory
      );

      // 5. Возвращаем обновленные данные
      const { data: updatedDishes } = await axios.get(`${MENU_API}/dishes`);
      return updatedDishes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteDish = createAsyncThunk(
  "menu/deleteDish",
  async ({ category, itemId }, thunkAPI) => {
    try {
      // 1. Получаем все категории
      const { data: dishes } = await axios.get(`${MENU_API}/dishes`);

      // 2. Находим категорию
      const categoryToUpdate = dishes.find((c) => c.category === category);

      if (!categoryToUpdate) {
        throw new Error("Категория не найдена");
      }

      // 3. Удаляем блюдо из массива
      const updatedCategory = {
        ...categoryToUpdate,
        items: categoryToUpdate.items.filter((item) => item.id !== itemId),
      };

      // 4. Обновляем конкретную категорию по ID
      await axios.patch(
        `${MENU_API}/dishes/${categoryToUpdate.id}`,
        updatedCategory
      );

      // 5. Возвращаем обновленные данные
      const { data: updatedDishes } = await axios.get(`${MENU_API}/dishes`);
      return updatedDishes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateDish = createAsyncThunk(
  "menu/updateDish",
  async ({ category, itemId, updatedDish }, thunkAPI) => {
    try {
      // 1. Получаем все категории
      const { data: dishes } = await axios.get(`${MENU_API}/dishes`);

      // 2. Находим категорию
      const categoryToUpdate = dishes.find((c) => c.category === category);

      if (!categoryToUpdate) {
        throw new Error("Категория не найдена");
      }

      // 3. Обновляем блюдо в массиве
      const updatedCategory = {
        ...categoryToUpdate,
        items: categoryToUpdate.items.map((item) =>
          item.id === itemId ? { ...item, ...updatedDish } : item
        ),
      };

      // 4. Обновляем конкретную категорию по ID
      await axios.patch(
        `${MENU_API}/dishes/${categoryToUpdate.id}`,
        updatedCategory
      );

      // 5. Возвращаем обновленные данные
      const { data: updatedDishes } = await axios.get(`${MENU_API}/dishes`);
      return updatedDishes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
