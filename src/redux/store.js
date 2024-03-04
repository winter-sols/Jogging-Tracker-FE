import {configureStore} from '@reduxjs/toolkit';
import auth from './reducers/auth';
import recordsReducer from './reducers/recordsReducer';
import paginationReducer from './reducers/paginationReducer';
import { AUTH_USER } from './reducers/auth';
import recordReducer from './reducers/recordReducer';

const persistedState=JSON.parse(localStorage.getItem('jogging_tracker_auth'));
const payload={
    data: persistedState,
    isAuthenticated: persistedState ? true : false
}

export const store = configureStore({
    reducer: {
        auth,
        records:recordsReducer,
        record:recordReducer,
        pagination:paginationReducer
    }
});

store.dispatch(AUTH_USER(payload));
store.subscribe(()=>console.log('The new state is', store.getState()));