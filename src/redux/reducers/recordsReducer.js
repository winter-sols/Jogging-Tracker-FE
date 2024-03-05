import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recordslist: [],
};

const recordsSlice = createSlice({
  name: "recordslist",
  initialState,
  reducers: {
    GET_RECORDS: (state, action) => {
      state.recordslist = action.payload;
      console.log({ state });
    },
    DELETE_RECORD: (state, action) => {
      console.log(action.payload, "DELETEEEEEEEEEEEEE");
      state.recordslist = state.recordslist.filter(
        (record) => record.id !== action.payload
      );
    },
    CREATE_RECORD: (state, action) => {
      state.recordslist.push(action.payload);
    },
    UPDATE_RECORD: (state, action) => {
      state.recordslist.map((record) => {
        if (record.id === action.payload.id) record = action.payload;
        return record;
      });
    }
  },
});

export const { GET_RECORDS, DELETE_RECORD, CREATE_RECORD, UPDATE_RECORD } =
  recordsSlice.actions;
export default recordsSlice.reducer;
