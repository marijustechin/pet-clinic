export interface IAppointment {
  id: string;
  pet_name: string;
  date: string;
  time: string;
  notes: string;
  user_id: string;
  user: {
    first_name: string;
  };
  rating: number;
  status: string;
}
