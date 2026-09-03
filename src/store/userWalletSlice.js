import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage`, error);
    return fallback;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
};

const initialState = {
  cards: loadFromLocalStorage("user_wallet_cards", []),
  notification: null,
};

const userWalletSlice = createSlice({
  name: "userWallet",
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload);
      saveToLocalStorage("user_wallet_cards", state.cards);
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
      saveToLocalStorage("user_wallet_cards", state.cards);
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { addCard, removeCard, setNotification, clearNotification } =
  userWalletSlice.actions;
export default userWalletSlice.reducer;
