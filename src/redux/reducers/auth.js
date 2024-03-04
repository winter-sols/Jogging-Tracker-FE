import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    info: {},
    isAuthenticated: false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        AUTH_USER: (state, action) => {
            state.info = action.payload;
            state.isAuthenticated = true;
        }
    }
});

export const {AUTH_USER} = authSlice.actions;
export default authSlice.reducer;