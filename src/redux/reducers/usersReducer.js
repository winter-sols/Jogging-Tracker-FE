import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userslist: [],
};

const usersSlice = createSlice({
  name: "userslist",
  initialState,
  reducers: {
    GET_USERS: (state, action) => {
      state.userslist = action.payload;
      console.log(state.userslist, "SSSSSSSSSSSSSSSSSSSSS");
    },
    DELETE_USER: (state, action) => {
      console.log(action.payload, "DELETEEEEEEEEEEEEE");
      state.userslist = state.userslist.filter(
        (record) => record.id !== action.payload
      );
    },
    CREATE_USER: (state, action) => {
      state.userslist.push(action.payload);
    },
    UPDATE_USER: (state, action) => {
      state.userslist.map((record) => {
        if (record.id === action.payload.id) record = action.payload;
        return record;
      });
    }
  },
});

export const { GET_USERS, DELETE_USER, CREATE_USER, UPDATE_USER } =
  usersSlice.actions;
export default usersSlice.reducer;
