import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/usersSlice";
import authSlice from "./users/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = ReturnType<AppStore["dispatch"]>;
