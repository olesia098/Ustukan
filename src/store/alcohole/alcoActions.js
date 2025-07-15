import { createAsyncThunk } from "@reduxjs/toolkit";
import { MENU_API } from "../../helpers/consts";
import axios from "axios";

export const getAlcoholes = createAsyncThunk(
  "alcoholes/getAlcoholes",
  async (_, { getState }) => {
    const { data } = await axios.get(`${MENU_API}/alcohol`);
    return { data };
  }
);

// export const getOneDrink = createAsyncThunk(
//   "alcoholes/getOneDrink",
//   async ({ id }, thunkAPI) => {
//     try {
//       const { data } = await axios.get(`${MENU_API}/drinks`);
//       // ищем блюдо по id среди всех items
//       let foundDrink = null;
//       for (const category of data) {
//         const match = category.items.find((item) => item.id === Number(id));
//         if (match) {
//             foundDrink = match;
//           break;
//         }
//       }
//       return foundDrink;
//     } catch (error) {
//       // Если произошла ошибка, возвращаем отклоненное действие с ошибкой
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
