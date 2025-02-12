import { IAppointment } from "../types/appointment";
import { SingleAppointment } from "./SingleAppointment";

interface AppointmentListProps {
  items: IAppointment[];
}

export const AppointmentList = ({ items }: AppointmentListProps) => {
  return (
    <div>
      {items &&
        items.map((item) => (
          <div key={item.id}>
            <SingleAppointment item={item} />
          </div>
        ))}
    </div>
  );
};
