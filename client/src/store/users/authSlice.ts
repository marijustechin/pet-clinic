import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "../../types/user";

interface IAuthUser {
  token: string | null;
  user: IUser | null;
}

const initialState: IAuthUser = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
