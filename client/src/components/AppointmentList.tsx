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
          <div
            key={item.id}
            className="max-w-3xl mx-auto border-b border-violet-200 last:border-b-0 mb-2"
          >
            <SingleAppointment item={item} />
          </div>
        ))}
    </div>
  );
};
