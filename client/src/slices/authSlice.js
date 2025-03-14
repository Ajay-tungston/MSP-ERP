import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.userName = null;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
