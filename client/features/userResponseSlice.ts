import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface BidType {
  id: number;
  title: string;
  description: string;
  address: string;
  author_id: number;
  status: string;
  coords: Array<[number, number]> | [];
}

export interface BidsState {
  bids: BidType[] | [];
}

const initialState: BidsState = {
  bids: [],
};

export type ResponseType = {
  title: string;
  authorId: number;
  userId: string | null;
  bidId: number;
};
const userId = localStorage.getItem("userId");

export const responseUserBid = createAsyncThunk(
  "responses/changeBidStatus",
  async ({ userId, bidId, authorId, title }: ResponseType) => {
    await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/bids/${bidId}`, {
      status: "response",
    });
    await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/responses`, {
      user_id: userId,
      bid_id: bidId,
      author_id: authorId,
      title: title,
    });
    window.location.assign("/profile/responses");
    return { bidId };
  }
);

export const getResponses = createAsyncThunk(
  "responses/getResponses",
  async (_, { rejectWithValue }) => {
    try {
      const responses = await axios(
        `${import.meta.env.VITE_REACT_APP_API_URL}/my-responses`,
        { params: { userId } }
      );
      return responses.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
);

export const cancelResponse = createAsyncThunk(
  "responses/cancelResponse",
  async ({ userId, bidId }: { userId: string | null; bidId: number }) => {
    await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/responses/complete`, {
      data: { user_id: userId, bid_id: bidId },
    });
    await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/bids/${bidId}`, {
      status: "create",
    });
    return { bidId };
  }
);

const responseSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        responseUserBid.fulfilled,
        (state, action: PayloadAction<{ bidId: number }>) => {
          const { bidId } = action.payload;
          const bid = state.bids.find((bid) => bid.id === bidId);
          if (bid) {
            bid.status = "create";
          }
          return;
        }
      )
      .addCase(getResponses.fulfilled, (state, action) => {
        state.bids = action.payload;
      })
      .addCase(cancelResponse.fulfilled, (state, action) => {
        const { bidId } = action.payload;
        state.bids = state.bids.filter((bid) => bid.id !== bidId);
      });
  },
});

export default responseSlice.reducer;
