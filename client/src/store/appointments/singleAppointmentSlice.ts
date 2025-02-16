import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppointment } from '../../types/appointment';
import HelperService from '../../services/HelperService';
import AppointmentService from '../../services/AppointmentService';
import { RootState } from '../store';

interface IAppointmentId {
  id: string;
}

interface IInitialState {
  item: IAppointment | undefined;
  status: string;
  error: string | unknown;
}

const initialState: IInitialState = {
  item: undefined,
  status: 'idle',
  error: '',
};

export const getAppointmentById = createAsyncThunk<
  IAppointment,
  IAppointmentId
>(
  'singleAppointment/getAppointmentById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await AppointmentService.getAppointmentById(id);
      return res.data;
    } catch (e: unknown) {
      return rejectWithValue(HelperService.errorToString(e));
    }
  }
);

export const singleAppointmentSlice = createSlice({
  name: 'singleAppointment',
  initialState,
  reducers: {},
  extraReducers(bulder) {
    bulder
      .addCase(getAppointmentById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getAppointmentById.fulfilled,
        (state, action: PayloadAction<IAppointment>) => {
          state.status = 'idle';
          state.item = action.payload;
          state.error = '';
        }
      )
      .addCase(
        getAppointmentById.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.status = 'idle';
          state.error = action.payload;
        }
      );
  },
});

export const selectSingleItem = (state: RootState) =>
  state.singleAppointment.item;

export default singleAppointmentSlice.reducer;
