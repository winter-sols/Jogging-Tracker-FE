import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  report: []
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    GET_USER_REPORT: (state, action) => {
      state.report = action.payload;
    }
  },
});

export const { GET_USER_REPORT } = reportSlice.actions;
export default reportSlice.reducer;
