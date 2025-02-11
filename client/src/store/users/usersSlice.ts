import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthResponse, IUser } from "../../types/user";
import { RootState } from "../store";
import $api from "../../api";
import axios from "axios";

//const token = localStorage.getItem("resToken");

interface IUserData {
  user: IUser | undefined;
  isAuth: boolean;
  status: string;
  error: string | undefined;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const initialState: IUserData = {
  user: undefined,
  isAuth: false,
  status: "idle", // `idle` || `failed` || `pending` || `succeeded`
  error: undefined,
};

export const userLogin = createAsyncThunk<IAuthResponse, LoginCredentials>(
  "user/userLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await $api.post<IAuthResponse>("/users/login", {
        email,
        password,
      });

      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) return rejectWithValue(e.response?.data);
      if (e instanceof Error) return rejectWithValue(e.message);
      return rejectWithValue(e);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuth = true;
        localStorage.setItem("petToken", action.payload.accessToken);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message as string;
      });
  },
});

export const { setUser, setAuth } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const getUserStatus = (state: RootState) => state.user.status;
export const getUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
