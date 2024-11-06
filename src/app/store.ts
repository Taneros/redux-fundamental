import {configureStore} from '@reduxjs/toolkit';
import {countersReducer} from '../modules/counters/counters.slice';
import {usersSlice} from '../modules/users/users.slice';
import {extraArgument} from './extra-argument';

export const store = configureStore({
  reducer: {
    counters: countersReducer,
    [usersSlice.name]: usersSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});
