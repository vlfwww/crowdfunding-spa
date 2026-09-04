import { createSlice, createSelector } from "@reduxjs/toolkit";

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
  userDataByUser: loadLocalStorage("userDataByUser", {}),
  notification: null,
};

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem(
      "userDataByUser",
      JSON.stringify(state.userDataByUser),
    );
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }
};

export const userPlotsSlice = createSlice({
  name: "userPlots",
  initialState,
  reducers: {
    toggleReserve: (state, action) => {
      const { userId, fieldId } = action.payload;
      if (!userId) return;

      if (!state.userDataByUser[userId]) {
        state.userDataByUser[userId] = { reservedIds: [], investedIds: [] };
      }

      const userPlots = state.userDataByUser[userId];

      if (userPlots.reservedIds.includes(fieldId)) {
        userPlots.reservedIds = userPlots.reservedIds.filter(
          (id) => id !== fieldId,
        );
      } else {
        userPlots.reservedIds.push(fieldId);
      }
      saveToLocalStorage(state);
    },

    removeReservation: (state, action) => {
      const { userId, fieldId } = action.payload;
      if (!userId) return;

      if (!state.userDataByUser[userId]) return;
      const userPlots = state.userDataByUser[userId];

      userPlots.reservedIds = userPlots.reservedIds.filter(
        (id) => id !== fieldId,
      );
      saveToLocalStorage(state);
    },

    investPlot: (state, action) => {
      const { userId, fieldId } = action.payload;
      if (!userId) return;

      if (!state.userDataByUser[userId]) {
        state.userDataByUser[userId] = { reservedIds: [], investedIds: [] };
      }
      const userPlots = state.userDataByUser[userId];

      userPlots.reservedIds = userPlots.reservedIds.filter(
        (id) => id !== fieldId,
      );
      if (!userPlots.investedIds.includes(fieldId)) {
        userPlots.investedIds.push(fieldId);
      }
      saveToLocalStorage(state);
    },

    checkoutCart: (state, action) => {
      const userId = action.payload;
      if (!userId) return;

      if (!state.userDataByUser[userId]) return;
      const userPlots = state.userDataByUser[userId];

      userPlots.reservedIds.forEach((fieldId) => {
        if (!userPlots.investedIds.includes(fieldId)) {
          userPlots.investedIds.push(fieldId);
        }
      });
      userPlots.reservedIds = [];
      saveToLocalStorage(state);
    },
  },
});

const selectUserDataByUser = (state) => state.userPlots.userDataByUser;

export const makeSelectUserPlots = (userId) =>
  createSelector([selectUserDataByUser], (userDataByUser) => {
    if (!userId || !userDataByUser[userId]) {
      return { reservedIds: [], investedIds: [] };
    }
    return userDataByUser[userId];
  });

export const { toggleReserve, removeReservation, investPlot, checkoutCart } =
  userPlotsSlice.actions;

export default userPlotsSlice.reducer;
