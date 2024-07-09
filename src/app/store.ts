import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../shared/api";
import { router } from "./router";
import { initialUsers, usersSlice } from "../modules/users/model/users.slice";
import { rootReducer } from "../shared/redux";

export const extraArgument = {
  router,
};

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(
      baseApi.middleware
    ),
});

store.dispatch(usersSlice.actions.stored({ users: initialUsers }));
