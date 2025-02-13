import $api from "../api";
import { IAppointment } from "../types/appointment";

export default class AppointmentService {
  static async newAppointment(
    pet_name: string,
    date: string,
    time: string,
    notes: string,
    user_id: number
  ) {
    return await $api.post("/appointment", {
      pet_name,
      date,
      time,
      user_id,
      notes,
    });
  }

  static async getUserAppointments(user_id: string) {
    return await $api.get<IAppointment[]>(`/appointment/${user_id}`);
  }

  static async getAllAppointments() {
    return await $api.get<IAppointment[]>(`/appointment`);
  }

  static async deleteAppointment(appointmentId: string) {
    return await $api.delete<string>(`/appointment/${appointmentId}`);
  }
}
