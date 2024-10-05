import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../src/http";

export interface BidType {
  id: number,
  title: string,
  description: string,
  address: string,
  author_id: number,
  status: string,
  coords: Array<[number, number]> | []
}

export interface BidsState {
  list: BidType[] | [],
  filteredBids: BidType[] | [],
  loading: boolean,
  error: null | string
}

const initialState: BidsState = {
  list: [],
  filteredBids: [],
  loading: false,
  error: null,
}

const userId = localStorage.getItem('userId');


export const getBids = createAsyncThunk('bids/getBids', async (_, {rejectWithValue}) => {
  try {
    const bids = await $api(`${import.meta.env.VITE_REACT_APP_API_URL}/bids`, {params: {userId}})
    return bids.data
  } catch (error) {
    console.log({error})
    return rejectWithValue
  }
})

export const bidsSlice = createSlice({
    name: 'bids',
    initialState,
    reducers: {
      filterBids(state, action: PayloadAction<string>) {
        const searchTitle = action.payload.toLowerCase();
        state.filteredBids = state.list.filter(bid => bid.title.toLowerCase().includes((searchTitle)))
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getBids.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(getBids.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          state.list = action.payload
          state.filteredBids = action.payload
        })
        .addCase(getBids.rejected, (state, action) => {
          state.error = action.payload as string
        })
    }
  }
)
export const { filterBids } = bidsSlice.actions;
export default bidsSlice.reducer