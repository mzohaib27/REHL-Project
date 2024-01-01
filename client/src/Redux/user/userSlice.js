import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  admin: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart(state) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailed(state, action) {
      (state.error = action.payload), (state.loading = false);
    },
    signOutStart(state) {
      state.loading = true;
    },
    signOutSuccess(state, action) {
      (state.currentUser = null), (state.loading = false);
    },
    signOutFailed(state, action) {
      (state.error = true), (state.loading = false);
    },
    deleteUserStart(state) {
      state.loading = true;
    },
    deleteUserSuccess(state, action) {
      (state.currentUser = null), (state.loading = false);
      state.error = null;
    },
    deleteUserFailed(state, action) {
      (state.loading = true), (state.error = action.payload);
    },
    adminAuth(state, action) {
      (state.admin = action.payload), (state.loading = false);
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailed,
  updateUserFailed,
  updateUserSuccess,
  updateUserStart,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  adminAuth,
} = userSlice.actions;
export default userSlice.reducer;
