import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../src/http";
import { UserDataType } from "../src/components/ProfilePageWidgets/types";
interface UserState {
  user: UserDataType | null;
}

const initialState: UserState = {
  user: null,
};
export const saveUserData = createAsyncThunk(
  "user/saveUserData",
  async ({ fio, email, phone, userId }: UserDataType, { rejectWithValue }) => {
    try {
      const response = await $api.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/profile/date`,
        {
          fio,
          email,
          phone,
          userId,
        }
      );
      console.log("Данные успешно сохранены на сервере");
      return response.data; // Возвращаем данные, если нужно
    } catch (error) {
      console.error("Произошла ошибка при отправке данных на сервер:", error);
      return rejectWithValue("Ошибка при сохранении данных на сервере");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UserDataType>) {
      console.log("Updating user:", action.payload);
      state.user = action.payload; // Обновляем весь объект пользователя
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
