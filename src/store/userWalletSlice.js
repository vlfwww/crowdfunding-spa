import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}
};

const initialState = {
  walletDataByUser: loadFromLocalStorage("user_wallet_data_by_user", {}),
  notification: null,
};

const userWalletSlice = createSlice({
  name: "userWallet",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { userId, card } = action.payload;
      if (!userId) return;

      if (!state.walletDataByUser[userId]) {
        state.walletDataByUser[userId] = { cards: [] };
      }

      state.walletDataByUser[userId].cards.push(card);
      saveToLocalStorage("user_wallet_data_by_user", state.walletDataByUser);
    },
    removeCard: (state, action) => {
      const { userId, cardId } = action.payload;
      if (!userId || !state.walletDataByUser[userId]) return;

      state.walletDataByUser[userId].cards = state.walletDataByUser[
        userId
      ].cards.filter((c) => String(c.id) !== String(cardId));

      saveToLocalStorage("user_wallet_data_by_user", state.walletDataByUser);
    },
  },
});

export const { addCard, removeCard } = userWalletSlice.actions;
export default userWalletSlice.reducer;
