import { createSlice } from "@reduxjs/toolkit";

const initialState={
    record: {}
}

const recordsSlice=createSlice({
    name: 'record',
    initialState,
    reducers: {       
        GET_RECORD: (state, action)=> {
            state.record=action.payload;
        },
        UPDATE_RECORD: (state, action)=>[
            state.record=action.payload
        ]
    }
})

export const {GET_RECORD, UPDATE_RECORD}=recordsSlice.actions;
export default recordsSlice.reducer;