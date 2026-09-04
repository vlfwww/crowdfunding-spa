import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "./api/shopApi";
import userPlotsReducer from "./userPlotsSlice";
import userWalletReducer from "./userWalletSlice";
import notificationReducer from "./notificationSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    userPlots: userPlotsReducer,
    userWallet: userWalletReducer,
    notifications: notificationReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});
