import $api from '../api';
import { IAppointment, IAppointmentsPaginated } from '../types/appointment';

export default class AppointmentService {
  static async newAppointment(
    pet_name: string,
    date: Date | null,
    notes: string,
    user_id: number
  ) {
    return await $api.post<IAppointment>('/appointment', {
      pet_name,
      date,
      user_id,
      notes,
    });
  }

  static async getUserAppointments(user_id: string, query: string) {
    return await $api.get<IAppointmentsPaginated>(
      `/appointment/${user_id + query}`
    );
  }

  static async getAllAppointments(query: string) {
    return await $api.get<IAppointmentsPaginated>(`/appointment${query}`);
  }

  static async deleteAppointment(appointmentId: string) {
    return await $api.delete<string>(`/appointment/${appointmentId}`);
  }

  static async updateAppointment(
    appointmentId: string,
    updateData: { rating?: number; status?: string }
  ) {
    return await $api.patch(`/appointment/${appointmentId}`, updateData);
  }
}
