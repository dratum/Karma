import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../src/shared/api/http";
import { UserDataType } from "../src/components/ProfilePageWidgets/types";
interface UserState {
  user: UserDataType;
}

const initialState: UserState = {
  user: {} as UserDataType,
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId: string | null, { rejectWithValue }) => {
    try {
      const user = await $api(
        `${import.meta.env.VITE_REACT_APP_API_URL}/profile`,
        {
          params: { userId },
        }
      );
      return user.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveUserData = createAsyncThunk(
  "user/saveUserData",
  async ({ fio, email, phone, userId }: UserDataType, { rejectWithValue }) => {
    try {
      await $api.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/profile/date`,
        {
          fio,
          email,
          phone,
          userId,
        }
      );
      return;
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
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
