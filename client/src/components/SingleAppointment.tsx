import AppointmentService from '../services/AppointmentService';
import HelperService from '../services/HelperService';
import {
  removeAppointment,
  updateState,
} from '../store/appointments/appointmentsSlice';
import { useAppDispatch } from '../store/store';
import { IAppointment } from '../types/appointment';
import { IUser } from '../types/user';
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
      dispatch(removeAppointment(item.id));
    } catch (e: unknown) {
      console.log(HelperService.errorToString(e));
    }
  };

  const changeStatus = async (id: string) => {
    if (item.status === 'Nepatvirtintas') {
      //set status "Patvirtintas"
      await AppointmentService.updateAppointment(id, {
        status: 'Patvirtintas',
      });
      dispatch(updateState({ id: id, status: 'Patvirtintas' }));
    } else {
      // set status "Nepatvirtintas"
      await AppointmentService.updateAppointment(id, {
        status: 'Nepatvirtintas',
      });
      dispatch(updateState({ id: id, status: 'Nepatvirtintas' }));
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
          <button
            onClick={() => changeStatus(item.id)}
            disabled={user.role === 'USER'}
            className={`${
              user.role === 'ADMIN' ? 'cursor-pointer' : 'cursor-default'
            } ${
              item.status === 'Nepatvirtintas'
                ? 'bg-slate-200 text-slate-500'
                : 'bg-emerald-200'
            }  p-1 rounded-lg`}
          >
            {item.status}
          </button>
          <div>{HelperService.datetimeToString(item.date)}</div>
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
