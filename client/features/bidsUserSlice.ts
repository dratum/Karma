import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Bid {
  id: number;
  title: string;
  description: string;
  address: string;
}

export interface UserBid {
  userId: string | null;
  bidId: number;
}

export interface BidsState {
  list: Bid[] | [];
  loading: boolean;
  error: null | string;
}

const initialState: BidsState = {
  list: [],
  loading: false,
  error: null,
};

const userId = localStorage.getItem("userId");

export const getUserBids = createAsyncThunk(
  "userBids/getUserBids",
  async (_, { rejectWithValue }) => {
    try {
      const userBids = await axios(
        `${import.meta.env.VITE_REACT_APP_API_URL}/profile/bids/active`,
        { params: { userId } }
      );
      return userBids.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserBidsProgress = createAsyncThunk(
  "userBids/getUserBidsProgress",
  async (_, { rejectWithValue }) => {
    try {
      const userBids = await axios(
        `${import.meta.env.VITE_REACT_APP_API_URL}/profile/bids/progress`,
        { params: { userId } }
      );
      return userBids.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const completeUserBids = createAsyncThunk(
  "userBids/completeUserBids",
  async ({ bidId, userId }: UserBid, { rejectWithValue }) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/bids/${bidId}`,
        { status: "complete" }
      );
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/responses/complete`,
        {
          data: {
            user_id: userId,
            bid_id: bidId,
          },
        }
      );
      return { bidId };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteUserBid = createAsyncThunk(
  "userBids/deleteUserBids",
  async ({ bidId, userId }: UserBid) => {
    await axios.delete(
      `${import.meta.env.VITE_REACT_APP_API_URL}/profile/bids/${bidId}}`,
      {
        data: {
          user_id: userId,
          bid_id: bidId,
        },
      }
    );
    return { bidId };
  }
);

export const editUserBid = createAsyncThunk(
  "userBids/editUserBids",
  async ({ id, title, description, address }: Bid) => {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/profile/bids/${id}`,
      {
        id,
        title,
        description,
        address,
      }
    );
    return response.data;
  }
);

export const userBidsSlice = createSlice({
  name: "userBids",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBids.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(getUserBids.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteUserBid.fulfilled, (state, action) => {
        const { bidId } = action.payload;
        state.list = state.list.filter((bid) => bid.id !== bidId);
      })
      .addCase(editUserBid.fulfilled, (state, action: PayloadAction<Bid>) => {
        const index = state.list.findIndex(
          (bid) => bid.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(getUserBidsProgress.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(
        completeUserBids.fulfilled,
        (state, action: PayloadAction<{ bidId: number } | undefined>) => {
          if (action.payload) {
            const { bidId } = action.payload;
            state.list = state.list.filter((bid) => bid.id !== bidId);
          }
        }
      );
  },
});

export default userBidsSlice.reducer;
