import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/users/usersSlice";
import { useNavigate } from "react-router";
import { AppointmentListFilter } from "../components/AppointmentListFilter";
import { AppointmentList } from "../components/AppointmentList";
import {
  getAppointments,
  selectAppointments,
} from "../store/appointments/appointmentsSlice";
import { Pagination } from "../components/Pagination";

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const appointments = useAppSelector(selectAppointments);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user && user.role !== "ADMIN") {
      navigate("/naudotojo-profilis");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  return (
    <main>
      {appointments.length > 0 ? (
        <section>
          <AppointmentListFilter />
          <AppointmentList items={appointments} />
          <Pagination />
        </section>
      ) : (
        <h3>Paskirtų viszitų nėra</h3>
      )}
    </main>
  );
};
