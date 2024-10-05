import { combineReducers } from "redux";
import bidsSlice from "../../features/bidsSlice";
import  userBidsSlice  from "../../features/bidsUserSlice.ts";
import userResponseSlice from "../../features/userResponseSlice.ts";
import likeBidsSlice from "../../features/likeBidsSlice.ts";
import roomsSlice from "../../features/roomSlice.ts";
import  useReducer from "../../features/userEditProfileSlice";
import userActivitySlice from "../../features/userActivitySlice.ts"


export const rootReducer = combineReducers({
  bids: bidsSlice,
  userBids: userBidsSlice,
  responseBid: userResponseSlice,
  likes: likeBidsSlice,
  user: useReducer,
  rooms: roomsSlice,
  activity: userActivitySlice,
})