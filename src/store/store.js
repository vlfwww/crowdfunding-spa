import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "./api/shopApi";
import notificationReducer from "./notificationSlice";
import usersReducer from "./usersSlice";

const loadUsersState = () => {
  try {
    const users = JSON.parse(localStorage.getItem("app_users") || "{}");
    const currentUser = JSON.parse(
      localStorage.getItem("app_current_user") || "null",
    );
    return { users, currentUser, isAuth: Boolean(currentUser) };
  } catch (error) {
    console.error("Error reading persisted user state", error);
    return undefined;
  }
};

const usersPersistenceMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);

    if (action.type.startsWith("users/")) {
      const { users, currentUser } = getState().users;
      try {
        if (action.type === "users/logoutUser") {
          localStorage.removeItem("app_current_user");
        } else {
          localStorage.setItem("app_users", JSON.stringify(users));
          localStorage.setItem("app_current_user", JSON.stringify(currentUser));
        }
      } catch (error) {
        console.error("Error persisting user state", error);
      }
    }

    return result;
  };

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    users: usersReducer,
    notifications: notificationReducer,
  },
  preloadedState: { users: loadUsersState() },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(usersPersistenceMiddleware),
});
