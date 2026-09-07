import { createSlice, createSelector } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error("Error reading localStorage", error);
    return fallback;
  }
};

const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }
};

const initialState = {
  users: loadFromLocalStorage("app_users", {}),
  currentUser: loadFromLocalStorage("app_current_user", null),
  isAuth: !!localStorage.getItem("app_current_user"),
  notification: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { username, firstName, lastName } = action.payload;
      const normalizedUsername = username.trim().toLowerCase();

      const newUser = {
        username: username.trim(),
        firstName: firstName?.trim() || "",
        lastName: lastName?.trim() || "",
        id: normalizedUsername,
        reservedIds: [],
        investedIds: [],
        cards: [],
      };

      state.users[normalizedUsername] = newUser;
      state.currentUser = newUser;
      state.isAuth = true;

      saveToLocalStorage("app_users", state.users);
      saveToLocalStorage("app_current_user", state.currentUser);
    },

    loginUser: (state, action) => {
      const { username } = action.payload;
      const normalizedUsername = username.trim().toLowerCase();

      if (state.users[normalizedUsername]) {
        state.currentUser = state.users[normalizedUsername];
        state.isAuth = true;
        saveToLocalStorage("app_current_user", state.currentUser);
      }
    },

    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuth = false;
      localStorage.removeItem("app_current_user");
    },

    updateUserProfile: (state, action) => {
      if (state.currentUser) {
        const usernameKey = state.currentUser.id;
        state.currentUser = { ...state.currentUser, ...action.payload };
        state.users[usernameKey] = state.currentUser;

        saveToLocalStorage("app_users", state.users);
        saveToLocalStorage("app_current_user", state.currentUser);
      }
    },

    toggleReserve: (state, action) => {
      const { userId, fieldId } = action.payload;
      if (!userId || !state.users[userId]) return;

      const user = state.users[userId];
      if (user.reservedIds.includes(fieldId)) {
        user.reservedIds = user.reservedIds.filter((id) => id !== fieldId);
      } else {
        user.reservedIds.push(fieldId);
      }

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
        saveToLocalStorage("app_current_user", state.currentUser);
      }
      saveToLocalStorage("app_users", state.users);
    },

    removeReservation: (state, action) => {
      const { userId, fieldId } = action.payload;
      if (!userId || !state.users[userId]) return;

      const user = state.users[userId];
      user.reservedIds = user.reservedIds.filter((id) => id !== fieldId);

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
        saveToLocalStorage("app_current_user", state.currentUser);
      }
      saveToLocalStorage("app_users", state.users);
    },

    investPlot: (state, action) => {
      const { userId, fieldId } = action.payload;
      if (!userId || !state.users[userId]) return;

      const user = state.users[userId];
      user.reservedIds = user.reservedIds.filter((id) => id !== fieldId);
      if (!user.investedIds.includes(fieldId)) {
        user.investedIds.push(fieldId);
      }

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
        saveToLocalStorage("app_current_user", state.currentUser);
      }
      saveToLocalStorage("app_users", state.users);
    },

    checkoutCart: (state, action) => {
      const userId = action.payload;
      if (!userId || !state.users[userId]) return;

      const user = state.users[userId];
      user.reservedIds.forEach((fieldId) => {
        if (!user.investedIds.includes(fieldId)) {
          user.investedIds.push(fieldId);
        }
      });
      user.reservedIds = [];

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
        saveToLocalStorage("app_current_user", state.currentUser);
      }
      saveToLocalStorage("app_users", state.users);
    },

    addCard: (state, action) => {
      const { userId, card } = action.payload;
      if (!userId || !state.users[userId]) return;

      const user = state.users[userId];
      user.cards.push(card);

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
        saveToLocalStorage("app_current_user", state.currentUser);
      }
      saveToLocalStorage("app_users", state.users);
    },

    removeCard: (state, action) => {
      const { userId, cardId } = action.payload;
      if (!userId || !state.users[userId]) return;

      const user = state.users[userId];
      user.cards = user.cards.filter((c) => String(c.id) !== String(cardId));

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
        saveToLocalStorage("app_current_user", state.currentUser);
      }
      saveToLocalStorage("app_users", state.users);
    },
  },
});

export const makeSelectUserPlots = (userId) =>
  createSelector([(state) => state.users.users], (users) => {
    if (!userId || !users[userId]) {
      return { reservedIds: [], investedIds: [] };
    }
    return {
      reservedIds: users[userId].reservedIds || [],
      investedIds: users[userId].investedIds || [],
    };
  });

export const {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  toggleReserve,
  removeReservation,
  investPlot,
  checkoutCart,
  addCard,
  removeCard,
} = usersSlice.actions;

export default usersSlice.reducer;
