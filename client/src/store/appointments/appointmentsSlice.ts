import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AppointmentService from "../../services/AppointmentService";
import axios from "axios";
import { IAppointment } from "../../types/appointment";

interface IUserId {
  id: string;
}

interface IInitState {
  items: IAppointment[];
  status: string;
  error: string | undefined;
}

const initialState: IInitState = {
  items: [],
  status: "idle",
  error: undefined,
};

export const getAppointments = createAsyncThunk<IAppointment[], IUserId>(
  "appointments/getAppointments",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await AppointmentService.getUserAppointments(id);

      return res.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e))
        return rejectWithValue(e.response?.data.message);

      if (e instanceof Error) return rejectWithValue(e.message);

      return rejectWithValue(e);
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...action.payload];
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message as string;
      });
  },
});

// export const { setUser, setAuth } = userSlice.actions;

export const selectAppointments = (state: RootState) =>
  state.appointments.items;
// export const getUserStatus = (state: RootState) => state.user.status;
// export const getUserError = (state: RootState) => state.user.error;

export default appointmentSlice.reducer;
