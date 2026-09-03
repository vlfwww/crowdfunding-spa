import { createSlice } from "@reduxjs/toolkit";

const loadLocalStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error("Error reading localStorage", error);
    return fallback;
  }
};

const initialState = {
  reservedIds: loadLocalStorage("reservedIds", []),
  investedIds: loadLocalStorage("investedIds", []),
  notification: null,
};

export const userPlotsSlice = createSlice({
  name: "userPlots",
  initialState,
  reducers: {
    toggleReserve: (state, action) => {
      const id = action.payload;
      if (state.reservedIds.includes(id)) {
        state.reservedIds = state.reservedIds.filter((item) => item !== id);
        state.notification = "Plot reservation canceled.";
      } else {
        state.reservedIds.push(id);
        state.notification = "Plot reserved successfully!";
      }
      localStorage.setItem("reservedIds", JSON.stringify(state.reservedIds));
    },
    investPlot: (state, action) => {
      const id = action.payload;
      if (!state.investedIds.includes(id)) {
        state.investedIds.push(id);
        localStorage.setItem("investedIds", JSON.stringify(state.investedIds));
      }
      state.reservedIds = state.reservedIds.filter((item) => item !== id);
      localStorage.setItem("reservedIds", JSON.stringify(state.reservedIds));
      state.notification = "Investment successfully completed!";
    },
    removeReservation: (state, action) => {
      state.reservedIds = state.reservedIds.filter(
        (item) => item !== action.payload,
      );
      localStorage.setItem("reservedIds", JSON.stringify(state.reservedIds));
      state.notification = "Reservation canceled";
    },
    checkoutCart: (state) => {
      state.reservedIds.forEach((id) => {
        if (!state.investedIds.includes(id)) {
          state.investedIds.push(id);
        }
      });
      state.reservedIds = [];
      localStorage.setItem("reservedIds", JSON.stringify(state.reservedIds));
      localStorage.setItem("investedIds", JSON.stringify(state.investedIds));
      state.notification =
        "Payment completed successfully! Plots added to your investments.";
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  toggleReserve,
  investPlot,
  removeReservation,
  checkoutCart,
  clearNotification,
} = userPlotsSlice.actions;
export default userPlotsSlice.reducer;
