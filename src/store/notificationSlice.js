import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
  },
  reducers: {
    addNotification: (state, action) => {
      const message =
        typeof action.payload === "string"
          ? action.payload
          : action.payload.text;
      const duration = action.payload.duration || 3000;

      const newNotification = {
        id: Date.now() + Math.random(),
        text: message,
        duration,
      };

      state.items.push(newNotification);
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
