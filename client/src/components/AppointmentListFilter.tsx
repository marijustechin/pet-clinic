import {
  getAllAppointmentsTotal,
  getAppointments,
  getAppointmentsByUserId,
  setPerPage,
  sortAppointments,
} from "../store/appointments/appointmentsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/users/usersSlice";

export const AppointmentListFilter = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const total = useAppSelector(getAllAppointmentsTotal);

  const handleOnSelect = (value: string) => {
    dispatch(sortAppointments(value));
  };

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(setPerPage(+value));
    if (user && user.role === "USER") {
      dispatch(getAppointmentsByUserId({ id: user.id }));
    } else {
      dispatch(getAppointments());
    }
  };

  return (
    <div className="w-full flex gap-3 items-center justify-center mt-4 ">
      <div className="flex gap-3 items-center">
        <p>
          Viso: <span className="font-semibold">{total}</span>
        </p>
        <div>
          <label htmlFor="per_page">Rodoma puslapyje:</label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handlePerPage(e)
            }
            id="per_page"
            className="bg-violet-300 rounded-lg"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>
      </div>
      <div className="flex border border-violet-300 rounded-lg">
        <input className="px-2 py-1" type="text" id="filter" />
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleOnSelect(e.target.value)
          }
          id="appointment_filter"
          className="bg-violet-300 rounded-r-lg"
        >
          <option value={""}>--Rikiuoti pagal--</option>
          <option value={"date"}>Data</option>
          <option value={"owner"}>Savininkas</option>
          <option disabled>-----------</option>
          <option value={"asc"}>Didėjančia tvarka</option>
          <option value={"desc"}>Mažėjančia tvarka</option>
        </select>
      </div>
    </div>
  );
};
