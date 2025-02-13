import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import AppointmentService from '../../services/AppointmentService';
import { IAppointment } from '../../types/appointment';
import HelperService from '../../services/HelperService';

interface IUserId {
  id: string;
}

interface IInitState {
  items: IAppointment[];
  status: string;
  error: string | undefined;
  query: string;
  sort: {
    opt1: string;
    opt2: string;
  };
}

const initialState: IInitState = {
  items: [],
  status: 'idle',
  error: undefined,
  query: '',
  sort: {
    opt1: 'date',
    opt2: 'asc',
  },
};

export const deleteAppointment = createAsyncThunk<string, IUserId>(
  'appointments/deleteAppointment',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await AppointmentService.deleteAppointment(id);
      return res.data;
    } catch (e) {
      return rejectWithValue(HelperService.errorToString(e));
    }
  }
);

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
  reducers: {
    addAppointment: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    sortAppointments: (state, action) => {
      switch (action.payload) {
        case 'date':
          state.sort = { ...state.sort, opt1: action.payload };
          // rikiuojam pagal data
          if (state.sort.opt2 === 'asc') {
            state.items.sort((a, b) => a.date.localeCompare(b.date));
          } else {
            state.items.sort((a, b) => b.date.localeCompare(a.date));
          }
          break;
        case 'owner':
          state.sort = { ...state.sort, opt1: action.payload };
          // rikiuojam pagal savininka
          if (state.sort.opt2 === 'asc') {
            state.items.sort((a, b) =>
              a.user.first_name.localeCompare(b.user.first_name)
            );
          } else {
            state.items.sort((a, b) =>
              b.user.first_name.localeCompare(a.user.first_name)
            );
          }
          break;
        case 'asc':
          state.sort = { ...state.sort, opt2: action.payload };
          break;
        case 'desc':
          state.sort = { ...state.sort, opt2: action.payload };
          break;
      }
    },
  },
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

export const { addAppointment, sortAppointments } = appointmentSlice.actions;

export const selectAppointments = (state: RootState) =>
  state.appointments.items;
export const getAppointmentsStatus = (state: RootState) =>
  state.appointments.status;
export const getAppointmentsError = (state: RootState) =>
  state.appointments.error;

export default appointmentSlice.reducer;
