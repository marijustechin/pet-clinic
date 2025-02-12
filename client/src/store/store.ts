import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/usersSlice";
import appointmentsReducer from "./appointments/appointmentsSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    appointments: appointmentsReducer,
  },
});

// export type AppStore = typeof store;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = ReturnType<AppStore["dispatch"]>;

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// jei programoje nenori naudoti nuogus `useDispatch` ir `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
