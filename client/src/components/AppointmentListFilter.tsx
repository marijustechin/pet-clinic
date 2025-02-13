import { sortAppointments } from '../store/appointments/appointmentsSlice';
import { useAppDispatch } from '../store/store';

export const AppointmentListFilter = () => {
  const dispatch = useAppDispatch();

  const handleOnSelect = (value: string) => {
    dispatch(sortAppointments(value));
  };

  return (
    <div className="w-full flex items-center justify-center mt-4 ">
      <div className="flex border border-violet-300 rounded-lg">
        <input className="px-2 py-1" type="text" id="filter" />
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleOnSelect(e.target.value)
          }
          id="appointment_filter"
          className="bg-violet-300 rounded-r-lg"
        >
          <option value={''}>--Rikiuoti pagal--</option>
          <option value={'date'}>Data</option>
          <option value={'owner'}>Savininkas</option>
          <option disabled>-----------</option>
          <option value={'asc'}>Didėjančia tvarka</option>
          <option value={'desc'}>Mažėjančia tvarka</option>
        </select>
      </div>
    </div>
  );
};
