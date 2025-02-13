import AppointmentService from '../services/AppointmentService';
import HelperService from '../services/HelperService';
import {
  getAppointments,
  getAppointmentsByUserId,
} from '../store/appointments/appointmentsSlice';
import { useAppDispatch } from '../store/store';
import { IAppointment } from '../types/appointment';
import { IUser } from '../types/user';
import { Rating } from './rating/Rating';
import { RatingMain } from './rating/RatingMain';

interface SingleAppointmentProps {
  item: IAppointment;
  user: IUser;
}

export const SingleAppointment = ({ item, user }: SingleAppointmentProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await AppointmentService.deleteAppointment(item.id);
      if (user.role === 'ADMIN') {
        dispatch(getAppointments());
      } else {
        dispatch(getAppointmentsByUserId({ id: user.id }));
      }
    } catch (e: unknown) {
      console.log(HelperService.errorToString(e));
    }
  };

  return (
    <div className="flex gap-3 justify-between">
      <div className="flex flex-col gap-1">
        <div
          onClick={() => handleDelete()}
          className="w-8 h-8 border border-violet-300 hover:bg-violet-200 rounded-md flex items-center justify-center cursor-pointer"
        >
          ❌
        </div>
        <div
          onClick={() => {}}
          className="w-8 h-8 border border-violet-300 hover:bg-violet-200 rounded-md flex items-center justify-center cursor-pointer"
        >
          ✍️
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <p className="text-violet-800 font-semibold text-lg">{item.pet_name}</p>
        <p>
          <span className="text-slate-400 font-semibold">Savininkas</span>:{' '}
          {item.user.first_name}
        </p>
        <p>{item.notes ? item.notes : '-----'}</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex gap-2 items-center">
          <div className="bg-slate-200 p-1 rounded-lg text-slate-500">
            {item.status}
          </div>
          <div>{HelperService.datetimeToString(item.date, item.time)}</div>
        </div>
        <div>
          <RatingMain
            enabled={user.role === 'USER' ? true : false}
            itemId={item.id}
            currRating={item.rating}
          />
        </div>
      </div>
    </div>
  );
};
