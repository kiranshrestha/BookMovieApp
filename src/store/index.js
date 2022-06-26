import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoggedIn: false,
  showBookShowButton: false,
  showLoginSignupModal: false,
};
const loginSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    userLoggedIn(state) {
      state.userLoggedIn = true;
    },
    userLoggedOut(state) {
      state.userLoggedIn = false;
    },
    showBookShowButton(state) {
      state.showBookShowButton = true;
    },
    hideBookShowButton(state) {
      state.showBookShowButton = false;
    },
    showLoginSignupModal(state) {
      state.showLoginSignupModal = true;
    },
    hideLoginSignupModal(state) {
      state.showLoginSignupModal = false;
    },
  },
});

const store = configureStore({
  reducer: loginSlice.reducer,
});

export const loginAction = loginSlice.actions;

export default store;
