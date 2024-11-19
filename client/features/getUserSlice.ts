import { UserDataType } from "../src/components/ProfilePageWidgets/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../src/shared/api/http";

interface userState {
  user: UserDataType;
}
const initialState: userState = {
  user: {
    fio: "",
    email: "",
    phone: "",
  },
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export default userSlice.reducer;
