import {
  getAllAppointmentsTotal,
  getAppointments,
  getAppointmentsByUserId,
  getAppointmentsCurrentPage,
  getAppointmentsPerPage,
  setCurrentPage,
} from "../store/appointments/appointmentsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/users/usersSlice";

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const total = useAppSelector(getAllAppointmentsTotal);
  const perPage = useAppSelector(getAppointmentsPerPage);
  const currentPage = useAppSelector(getAppointmentsCurrentPage);

  const pagesCount =
    total % perPage === 0
      ? Math.floor(total / perPage)
      : Math.floor(total / perPage) + 1;

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
    if (user && user.role === "USER") {
      dispatch(getAppointmentsByUserId({ id: user.id }));
    } else {
      dispatch(getAppointments());
    }
  };

  const handlePreviousPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
    if (user && user.role === "USER") {
      dispatch(getAppointmentsByUserId({ id: user.id }));
    } else {
      dispatch(getAppointments());
    }
  };

  const handlePageButtonClick = (page: number) => {
    dispatch(setCurrentPage(page));
    if (user && user.role === "USER") {
      dispatch(getAppointmentsByUserId({ id: user.id }));
    } else {
      dispatch(getAppointments());
    }
  };

  return (
    <div className="flex gap-1 items-center justify-center my-5">
      {currentPage > 1 && (
        <button onClick={handlePreviousPage} className="btn-generic">
          Ankstenis
        </button>
      )}

      <div className="flex gap-1">
        {[...Array(pagesCount)].map((x, i) => (
          <button
            onClick={() => handlePageButtonClick(Number(i + 1))}
            disabled={currentPage === i + 1}
            key={"page" + i + 1}
            className={`${
              currentPage === i + 1 && "bg-violet-300 cursor-default"
            } btn-generic px-2`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {currentPage < pagesCount && (
        <button onClick={handleNextPage} className="btn-generic">
          Kitas
        </button>
      )}
    </div>
  );
};
