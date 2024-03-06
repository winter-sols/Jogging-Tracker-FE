import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AUTH_USER: (state, action) => {
      const { data, isAuthenticated } = action.payload;
      state.data = data;
      state.isAuthenticated = isAuthenticated;
    },
    LOG_OUT: (state,action)=>{
        const { data, isAuthenticated } = action.payload;
      state.data = data;
      state.isAuthenticated = isAuthenticated;
    }
  },
});

export const { AUTH_USER, LOG_OUT } = authSlice.actions;
export default authSlice.reducer;
