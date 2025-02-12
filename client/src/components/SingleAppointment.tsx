import { IAppointment } from "../types/appointment";

interface SingleAppointmentProps {
  item: IAppointment;
}

export const SingleAppointment = ({ item }: SingleAppointmentProps) => {
  return <div>{item.pet_name}</div>;
};
