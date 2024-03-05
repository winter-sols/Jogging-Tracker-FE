import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    GET_USER: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { GET_USER } = userSlice.actions;
export default userSlice.reducer;
