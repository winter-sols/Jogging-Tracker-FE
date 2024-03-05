import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  previous: null,
  next: null,
  page_size: 10,
  page: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    SET_PAGINATION: (state, action) => {
      console.log(action.payload, "????????????????????//");
      const { count, previous, next, page } = action.payload;
      return {
        ...state,
        count,
        previous,
        next,
        page,
      };
    },
  },
});

export const { SET_PAGINATION } = paginationSlice.actions;
export default paginationSlice.reducer;
