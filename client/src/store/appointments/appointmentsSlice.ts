import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AppointmentService from "../../services/AppointmentService";
import { IAppointment, IAppointmentsPaginated } from "../../types/appointment";
import HelperService from "../../services/HelperService";

interface IUserId {
  id: string;
}

interface IInitState {
  items: IAppointment[];
  status: string;
  error: string | undefined;
  currentPage: number;
  perPage: number;
  total: number;
  sort: {
    opt1: string;
    opt2: string;
  };
}

const initialState: IInitState = {
  items: [],
  status: "idle",
  error: undefined,
  currentPage: 1,
  perPage: 3,
  total: 0,
  sort: {
    opt1: "date",
    opt2: "asc",
  },
};

export const deleteAppointment = createAsyncThunk<string, IUserId>(
  "appointments/deleteAppointment",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await AppointmentService.deleteAppointment(id);
      return res.data;
    } catch (e) {
      return rejectWithValue(HelperService.errorToString(e));
    }
  }
);

export const getAppointments = createAsyncThunk<
  IAppointmentsPaginated,
  void,
  { state: RootState }
>("appointments/getAppointments", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const currentPage = state.appointments.currentPage;
    const perPage = state.appointments.perPage;
    const query = "?page=" + currentPage + "&per_page=" + perPage;

    const res = await AppointmentService.getAllAppointments(query);

    return res.data;
  } catch (e: unknown) {
    return rejectWithValue(HelperService.errorToString(e));
  }
});

export const getAppointmentsByUserId = createAsyncThunk<
  IAppointmentsPaginated,
  IUserId,
  { state: RootState }
>(
  "appointments/getAppointmentsByUserId",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentPage = state.appointments.currentPage;
      const perPage = state.appointments.perPage;
      const query = "?page=" + currentPage + "&per_page=" + perPage;
      const res = await AppointmentService.getUserAppointments(id, query);

      return res.data;
    } catch (e: unknown) {
      return rejectWithValue(HelperService.errorToString(e));
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    updateState: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const { id, status } = action.payload;
      const appointment = state.items.find((item) => item.id === id);
      if (appointment) {
        appointment.status = status;
      }
    },
    removeAppointment: (state, action: PayloadAction<string>) => {
      state.items = [
        ...state.items.filter((item) => item.id !== action.payload),
      ];
    },
    sortAppointments: (state, action) => {
      switch (action.payload) {
        case "date":
          state.sort = { ...state.sort, opt1: action.payload };
          // rikiuojam pagal data
          if (state.sort.opt2 === "asc") {
            state.items.sort((a, b) => a.date.localeCompare(b.date));
          } else {
            state.items.sort((a, b) => b.date.localeCompare(a.date));
          }
          break;
        case "owner":
          state.sort = { ...state.sort, opt1: action.payload };
          // rikiuojam pagal savininka
          if (state.sort.opt2 === "asc") {
            state.items.sort((a, b) =>
              a.user.first_name.localeCompare(b.user.first_name)
            );
          } else {
            state.items.sort((a, b) =>
              b.user.first_name.localeCompare(a.user.first_name)
            );
          }
          break;
        case "asc":
          state.sort = { ...state.sort, opt2: action.payload };
          break;
        case "desc":
          state.sort = { ...state.sort, opt2: action.payload };
          break;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAppointmentsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAppointmentsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...action.payload.items];
        state.total = action.payload.total;
      })
      .addCase(getAppointmentsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...action.payload.items];
        state.total = action.payload.total;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  addAppointment,
  sortAppointments,
  removeAppointment,
  setCurrentPage,
  setPerPage,
  updateState,
} = appointmentSlice.actions;

export const selectAppointments = (state: RootState) =>
  state.appointments.items;
export const getAppointmentsStatus = (state: RootState) =>
  state.appointments.status;
export const getAppointmentsCurrentPage = (state: RootState) =>
  state.appointments.currentPage;

export const getAppointmentsPerPage = (state: RootState) =>
  state.appointments.perPage;

export const getAppointmentsError = (state: RootState) =>
  state.appointments.error;

export const getAllAppointmentsTotal = (state: RootState) =>
  state.appointments.total;

export default appointmentSlice.reducer;
