import { combineReducers } from "redux";
import bidsSlice from "../..//src/pages/BidsListPage/store/feature/bidsSlice.ts";
import userBidsSlice from "../../features/bidsUserSlice.ts";
import userResponseSlice from "../../features/userResponseSlice.ts";
import likeBidsSlice from "../../src/modules/BidList/store/features/likeBidsSlice.ts";
import roomsSlice from "../../features/roomSlice.ts";
import userEditReducer from "../../features/userEditProfileSlice";
import userActivitySlice from "../../features/userActivitySlice.ts";
import userSlice from "../../features/getUserSlice.ts";

export const rootReducer = combineReducers({
  bids: bidsSlice,
  userBids: userBidsSlice,
  responseBid: userResponseSlice,
  likes: likeBidsSlice,
  user: userSlice,
  userEdit: userEditReducer,
  rooms: roomsSlice,
  activity: userActivitySlice,
});
