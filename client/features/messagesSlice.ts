import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../src/http";

export interface MessageType {
  id: number,
  room_id: number,
  user_id: number,
  text_message: string,
  is_read: boolean,
  createdAt: Date,
}

export interface MessagesState {
  list: MessageType[] | [],
  loading: boolean,
  error: null | string
}

const initialState: MessagesState = {
  list: [],
  loading: false,
  error: null,
}

// const userId = localStorage.getItem('userId');

export const getMessages = createAsyncThunk('messages/getMessages',
  async (_, {rejectWithValue}) => {
  try {
    const messages = await $api(`${import.meta.env.VITE_REACT_APP_API_URL}/chat/:roomId`)
    return messages.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
        state.error = null
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})
export default messagesSlice.reducer