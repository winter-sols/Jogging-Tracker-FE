import { createSlice } from "@reduxjs/toolkit";

const initialState={
    recordslist: []
}

const recordsSlice=createSlice({
    name: 'record',
    initialState,
    reducers: {
        GET_RECORDS: (state, action)=>{
            state.recordslist= action.payload;
        }
    }
})

export const {GET_RECORDS}=recordsSlice.actions;
export default recordsSlice.reducer;