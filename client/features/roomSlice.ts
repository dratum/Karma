import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import $api from "../src/http";

export interface RoomType {
  id: number,
  user_id: number,
  bid_id: number,
  room_id: number,
  title: string
}

export interface RoomsState {
  list: RoomType[] | [],
  loading: boolean,
  error: null | string
}

const initialState: RoomsState = {
  list: [],
  loading: false,
  error: null,
}

const userId = localStorage.getItem('userId');

export const getRooms = createAsyncThunk('rooms/getRooms',
  async (_, {rejectWithValue}) => {
    try {
      const rooms = await $api(`${import.meta.env.VITE_REACT_APP_API_URL}/chat`, {params: {userId}})
      return rooms.data
    } catch (error) {
      return rejectWithValue(error)
    }
  })

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
        state.error = null
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})
export default roomsSlice.reducer