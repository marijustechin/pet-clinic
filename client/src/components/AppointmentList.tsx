import { useAppSelector } from '../store/store';
import { selectUser } from '../store/users/usersSlice';
import { IAppointment } from '../types/appointment';
import { SingleAppointment } from './SingleAppointment';

interface AppointmentListProps {
  items: IAppointment[];
}

export const AppointmentList = ({ items }: AppointmentListProps) => {
  const user = useAppSelector(selectUser);

  return (
    <div>
      {items &&
        items.map((item) => (
          <div
            key={item.id}
            className="max-w-3xl mx-auto border-b border-violet-200 last:border-b-0 my-5"
          >
            {user && <SingleAppointment item={item} user={user} />}
          </div>
        ))}
    </div>
  );
};
