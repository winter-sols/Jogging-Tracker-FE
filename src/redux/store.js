import {configureStore} from '@reduxjs/toolkit';
import auth from './reducers/auth';
import recordsReducer from './reducers/recordsReducer';

export const store = configureStore({
    reducer: {
        auth,
        recordsReducer
    }
});