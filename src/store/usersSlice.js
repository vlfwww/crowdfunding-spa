import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  currentUser: null,
  isAuth: false,
  notification: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { username, firstName, lastName, passwordHash } =
        action.payload || {};
      if (!username) return;

      const trimmedUsername = username.trim();
      const normalizedUsername = trimmedUsername.toLowerCase();

      const newUser = {
        username: trimmedUsername,
        passwordHash,
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
    },

    loginUser: (state, action) => {
      const { username } = action.payload || {};
      if (!username) return;

      const normalizedUsername = username.trim().toLowerCase();

      if (state.users[normalizedUsername]) {
        state.currentUser = state.users[normalizedUsername];
        state.isAuth = true;
      }
    },

    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuth = false;
    },

    updateUserProfile: (state, action) => {
      if (state.currentUser) {
        const oldKey = state.currentUser.id;
        const updatedUser = { ...state.currentUser, ...action.payload };

        if (action.payload.username) {
          updatedUser.username = action.payload.username.trim();
          updatedUser.id = updatedUser.username.toLowerCase();
        }

        state.currentUser = updatedUser;

        if (oldKey !== updatedUser.id) {
          delete state.users[oldKey];
        }
        state.users[updatedUser.id] = updatedUser;
      }
    },

    toggleReserve: (state, action) => {
      const { userId, fieldId } = action.payload || {};
      if (!userId || !state.users[userId]) return;

      const user = state.users[userId];
      if (user.reservedIds.includes(fieldId)) {
        user.reservedIds = user.reservedIds.filter((id) => id !== fieldId);
      } else {
        user.reservedIds.push(fieldId);
      }

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
      }
    },

    removeReservation: (state, action) => {
      const { userId, fieldId } = action.payload || {};
      if (!userId || !state.users[userId]) return;

      const user = state.users[userId];
      user.reservedIds = user.reservedIds.filter((id) => id !== fieldId);

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
      }
    },

    investPlot: (state, action) => {
      const { userId, fieldId } = action.payload || {};
      if (!userId || !state.users[userId]) return;

      const user = state.users[userId];
      user.reservedIds = user.reservedIds.filter((id) => id !== fieldId);
      if (!user.investedIds.includes(fieldId)) {
        user.investedIds.push(fieldId);
      }

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
      }
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
      }
    },

    addCard: (state, action) => {
      const { userId, card } = action.payload || {};
      if (!userId || !state.users[userId] || !card) return;

      const user = state.users[userId];
      user.cards.push(card);

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
      }
    },

    removeCard: (state, action) => {
      const { userId, cardId } = action.payload || {};
      if (!userId || !state.users[userId]) return;

      const user = state.users[userId];
      user.cards = user.cards.filter((c) => String(c.id) !== String(cardId));

      if (state.currentUser?.id === userId) {
        state.currentUser = { ...user };
      }
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
