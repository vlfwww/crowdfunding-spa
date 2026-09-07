import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "./api/shopApi";
import notificationReducer from "./notificationSlice";
import usersReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    users: usersReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});
