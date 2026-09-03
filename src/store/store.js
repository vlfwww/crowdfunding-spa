import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "./api/shopApi";
import userPlotsReducer from "./userPlotsSlice";

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    userPlots: userPlotsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});
