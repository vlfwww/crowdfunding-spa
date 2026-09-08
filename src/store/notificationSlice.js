import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
  },
  reducers: {
    addNotification: (state, action) => {
      const payload = action.payload;

      const text =
        typeof payload === "string" ? payload : (payload?.text ?? "");
      const duration =
        typeof payload === "object" && payload?.duration !== undefined
          ? payload.duration
          : 3000;

      const newNotification = {
        id: Date.now() + Math.random(),
        text,
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
