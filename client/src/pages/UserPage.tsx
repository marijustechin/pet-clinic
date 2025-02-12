import { FaMinus, FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/users/usersSlice";
import { AppointmentForm } from "../components/AppointmentForm";
import { AppointmentListFilter } from "../components/AppointmentListFilter";
import { AppointmentList } from "../components/AppointmentList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getAppointments,
  selectAppointments,
} from "../store/appointments/appointmentsSlice";

export const UserPage = () => {
  const user = useAppSelector(selectUser);
  const appointments = useAppSelector(selectAppointments);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role === "ADMIN") {
      navigate("/administratorius");
    } else {
      dispatch(getAppointments({ id: user.id }));
    }
  }, [user, navigate, dispatch]);

  return (
    <main className="max-w-6xl mx-auto px-1 md:px-2 lg:px-3">
      <div className="border border-violet-300 rounded-lg  mt-4">
        <h3
          onClick={() => setShowForm(!showForm)}
          className="bg-violet-300 rounded-t-lg p-3 flex gap-2 items-center justify-center text-violet-800 text-xl cursor-pointer"
        >
          {showForm ? <FaMinus /> : <FaPlus />}
          <span className="font-semibold">Registruotis vizitui</span>
        </h3>
        {showForm && <AppointmentForm />}
      </div>
      <AppointmentListFilter />
      <AppointmentList items={appointments} />
    </main>
  );
};
