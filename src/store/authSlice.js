import { createSlice } from "@reduxjs/toolkit";

const savedProfile = localStorage.getItem("userProfile");
const initialUser = savedProfile ? JSON.parse(savedProfile) : null;
const initialIsAuth = localStorage.getItem("isAuth") === "true";

const initialState = {
  user: initialUser,
  isAuth: initialIsAuth,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;

      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;

      localStorage.removeItem("isAuth");
      localStorage.removeItem("userProfile");
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("userProfile", JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
