import { createAsyncThunk } from "@reduxjs/toolkit";
import { MENU_API } from "../../helpers/consts";
import axios from "axios";

export const getDrinks = createAsyncThunk(
  "drinks/getDrinks",
  async (_, { getState }) => {
    const { data } = await axios.get(`${MENU_API}/drinks`);
    return data;
  }
);

export const addNewDrink = createAsyncThunk(
  "drinks/addNewDrink",
  async ({ category, newDrink }, thunkAPI) => {
    try {
      // Получаем текущие данные
      const { data: currentData } = await axios.get(`${MENU_API}/drinks`);

      // Находим категорию и добавляем новый напиток
      const categoryToUpdate = currentData.find((c) => c.category === category);

      if (!categoryToUpdate) {
        throw new Error("Категория не найдена");
      }

      const updatedCategory = {
        ...categoryToUpdate,
        items: [...categoryToUpdate.items, newDrink],
      };

      // Обновляем конкретную категорию по ID
      await axios.patch(
        `${MENU_API}/drinks/${categoryToUpdate.id}`,
        updatedCategory
      );

      // Возвращаем обновленные данные
      const { data: updatedData } = await axios.get(`${MENU_API}/drinks`);
      return updatedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOneDrink = createAsyncThunk(
  "drinks/getOneDrink",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${MENU_API}/drinks`);
      // ищем блюдо по id среди всех items
      let foundDrink = null;
      for (const category of data) {
        const match = category.items.find((item) => item.id === Number(id));
        if (match) {
          foundDrink = match;
          break;
        }
      }
      return foundDrink;
    } catch (error) {
      // Если произошла ошибка, возвращаем отклоненное действие с ошибкой
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteDrink = createAsyncThunk(
  "drinks/deleteDrink",
  async ({ category, itemId }, thunkAPI) => {
    try {
      // 1. Получаем все категории
      const { data: drinks } = await axios.get(`${MENU_API}/drinks`);

      // 2. Находим категорию
      const categoryToUpdate = drinks.find((c) => c.category === category);

      if (!categoryToUpdate) {
        throw new Error("Категория не найдена");
      }

      // 3. Удаляем напиток из массива
      const updatedCategory = {
        ...categoryToUpdate,
        items: categoryToUpdate.items.filter((item) => item.id !== itemId),
      };

      // 4. Обновляем конкретную категорию по ID
      await axios.patch(
        `${MENU_API}/drinks/${categoryToUpdate.id}`,
        updatedCategory
      );

      // 5. Возвращаем обновленные данные
      const { data: updatedDrinks } = await axios.get(`${MENU_API}/drinks`);
      return updatedDrinks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateDrink = createAsyncThunk(
  "drinks/updateDrink",
  async ({ category, itemId, updatedDrink }, thunkAPI) => {
    try {
      // 1. Получаем все категории
      const { data: drinks } = await axios.get(`${MENU_API}/drinks`);

      // 2. Находим категорию
      const categoryToUpdate = drinks.find((c) => c.category === category);

      if (!categoryToUpdate) {
        throw new Error("Категория не найдена");
      }

      // 3. Обновляем напиток в массиве
      const updatedCategory = {
        ...categoryToUpdate,
        items: categoryToUpdate.items.map((item) =>
          item.id === itemId ? { ...item, ...updatedDrink } : item
        ),
      };

      // 4. Обновляем конкретную категорию по ID
      await axios.patch(
        `${MENU_API}/drinks/${categoryToUpdate.id}`,
        updatedCategory
      );

      // 5. Возвращаем обновленные данные
      const { data: updatedDrinks } = await axios.get(`${MENU_API}/drinks`);
      return updatedDrinks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
