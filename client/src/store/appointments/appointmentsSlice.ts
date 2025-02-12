import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import AppointmentService from '../../services/AppointmentService';
import { IAppointment } from '../../types/appointment';
import HelperService from '../../services/HelperService';
import { string } from 'zod';

interface IUserId {
  id: string;
}

interface IInitState {
  items: IAppointment[];
  status: string;
  error: string | undefined;
  query: string;
}

const initialState: IInitState = {
  items: [],
  status: 'idle',
  error: undefined,
  query: '',
};

export const getAppointments = createAsyncThunk<IAppointment[]>(
  'appointments/getAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const res = await AppointmentService.getAllAppointments();

      return res.data;
    } catch (e: unknown) {
      return rejectWithValue(HelperService.errorToString(e));
    }
  }
);

export const getAppointmentsByUserId = createAsyncThunk<
  IAppointment[],
  IUserId
>(
  'appointments/getAppointmentsByUserId',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await AppointmentService.getUserAppointments(id);

      return res.data;
    } catch (e: unknown) {
      return rejectWithValue(HelperService.errorToString(e));
    }
  }
);

export const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAppointmentsByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAppointmentsByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [...action.payload];
      })
      .addCase(getAppointmentsByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [...action.payload];
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// export const { setUser, setAuth } = userSlice.actions;

export const selectAppointments = (state: RootState) =>
  state.appointments.items;
export const getAppointmentsStatus = (state: RootState) =>
  state.appointments.status;
export const getAppointmentsError = (state: RootState) =>
  state.appointments.error;

export default appointmentSlice.reducer;
