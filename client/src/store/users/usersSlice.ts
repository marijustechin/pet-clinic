import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuthResponse, IUser } from '../../types/user';
import { RootState } from '../store';
import $api from '../../api';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import HelperService from '../../services/HelperService';

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
  status: 'idle', // `idle` || `failed` || `pending` || `succeeded`
  error: undefined,
};

const token = localStorage.getItem('petToken');

if (token) {
  const decoded: IUser = jwtDecode(token);
  initialState.user = {
    id: decoded.id,
    first_name: decoded.first_name,
    email: decoded.email,
    address: decoded.address,
    role: decoded.role,
    phone_number: decoded.phone_number,
  };
  initialState.isAuth = true;
}

export const userLogin = createAsyncThunk<IAuthResponse, LoginCredentials>(
  'user/userLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await $api.post<IAuthResponse>('/users/login', {
        email,
        password,
      });

      return response.data;
    } catch (e: unknown) {
      return rejectWithValue(HelperService.errorToString(e));
    }
  }
);

export const userLogout = createAsyncThunk<IAuthResponse>(
  'user/userLogout',
  async () => {
    try {
      const response = await $api.post<IAuthResponse>('/users/logout');

      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) return e.response?.data;
      if (e instanceof Error) return e.message;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = undefined;
        state.user = action.payload.user;
        state.isAuth = true;
        localStorage.setItem('petToken', action.payload.accessToken);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(userLogout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.status = 'idle';
        state.user = undefined;
        state.isAuth = false;
        localStorage.removeItem('petToken');
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setAuth, setError } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const getUserStatus = (state: RootState) => state.user.status;
export const getUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
