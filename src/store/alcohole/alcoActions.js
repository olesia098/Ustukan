import { createAsyncThunk } from "@reduxjs/toolkit";
import { MENU_API } from "../../helpers/consts";
import axios from "axios";

export const getAlcoholes = createAsyncThunk(
  "alcoholes/getAlcoholes",
  async (_, { getState }) => {
    const { data } = await axios.get(`${MENU_API}/alcohol`);
    return data;
  }
);

export const addNewAlco = createAsyncThunk(
  "alcoholes/addNewAlco",
  async ({ category, newAlco }, thunkAPI) => {
    try {
      // Получаем текущие данные
      const { data: currentData } = await axios.get(`${MENU_API}/alcohol`);

      // Находим категорию и добавляем новый алкогольный напиток
      const categoryToUpdate = currentData.find((c) => c.category === category);

      if (!categoryToUpdate) {
        throw new Error("Категория не найдена");
      }

      const updatedCategory = {
        ...categoryToUpdate,
        items: [...categoryToUpdate.items, newAlco],
      };

      // Обновляем конкретную категорию по ID
      await axios.patch(
        `${MENU_API}/alcohol/${categoryToUpdate.id}`,
        updatedCategory
      );

      // Возвращаем обновленные данные
      const { data: updatedData } = await axios.get(`${MENU_API}/alcohol`);
      return updatedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAlco = createAsyncThunk(
  "alcoholes/deleteAlco",
  async ({ category, itemId }, thunkAPI) => {
    try {
      // 1. Получаем все категории
      const { data: alcoholes } = await axios.get(`${MENU_API}/alcohol`);

      // 2. Находим категорию
      const categoryToUpdate = alcoholes.find((c) => c.category === category);

      if (!categoryToUpdate) {
        throw new Error("Категория не найдена");
      }

      // 3. Удаляем алкогольный напиток из массива
      const updatedCategory = {
        ...categoryToUpdate,
        items: categoryToUpdate.items.filter((item) => item.id !== itemId),
      };

      // 4. Обновляем конкретную категорию по ID
      await axios.patch(
        `${MENU_API}/alcohol/${categoryToUpdate.id}`,
        updatedCategory
      );

      // 5. Возвращаем обновленные данные
      const { data: updatedAlcoholes } = await axios.get(`${MENU_API}/alcohol`);
      return updatedAlcoholes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAlco = createAsyncThunk(
  "alcoholes/updateAlco",
  async ({ category, itemId, updatedAlco }, thunkAPI) => {
    try {
      // 1. Получаем все категории
      const { data: alcoholes } = await axios.get(`${MENU_API}/alcohol`);

      // 2. Находим категорию
      const categoryToUpdate = alcoholes.find((c) => c.category === category);

      if (!categoryToUpdate) {
        throw new Error("Категория не найдена");
      }

      // 3. Обновляем алкогольный напиток в массиве
      const updatedCategory = {
        ...categoryToUpdate,
        items: categoryToUpdate.items.map((item) =>
          item.id === itemId ? { ...item, ...updatedAlco } : item
        ),
      };

      // 4. Обновляем конкретную категорию по ID
      await axios.patch(
        `${MENU_API}/alcohol/${categoryToUpdate.id}`,
        updatedCategory
      );

      // 5. Возвращаем обновленные данные
      const { data: updatedAlcoholes } = await axios.get(`${MENU_API}/alcohol`);
      return updatedAlcoholes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
