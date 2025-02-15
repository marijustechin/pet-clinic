export interface IAppointment {
  id: string;
  pet_name: string;
  date: Date;
  notes: string;
  user_id: string;
  user: {
    first_name: string;
  };
  rating: number;
  status: string;
}

export interface IAppointmentsPaginated {
  items: IAppointment[];
  total: number;
}
