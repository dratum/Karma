import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../src/http";

export interface userActivityState {
  totalOrders: number;
  completedOrders: number;
}

const initialState: userActivityState = {
  totalOrders: 0,
  completedOrders: 0,
};
export const getOrders = createAsyncThunk(
  "userActivity/getOrders",
  async (userId: string | null) => {
    try {
      const orders = await $api(
        `${import.meta.env.VITE_REACT_APP_API_URL}/profile/bio`,
        {
          params: { userId },
        }
      );
      return orders.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const userActivitySlice = createSlice({
  name: "userActivity",
  initialState,
  reducers: {
    setTotalOrders(state, action) {
      state.totalOrders = action.payload;
    },
    setCompletedOrders(state, action) {
      state.completedOrders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.completedOrders = action.payload.completedOrders;
      state.totalOrders = action.payload.totalOrders;
    });
  },
});

export const { setTotalOrders, setCompletedOrders } = userActivitySlice.actions;

export default userActivitySlice.reducer;
