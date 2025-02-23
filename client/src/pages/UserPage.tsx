import { FaMinus, FaPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectUser } from '../store/users/usersSlice';
import { AppointmentForm } from '../components/AppointmentForm';
import { AppointmentListFilter } from '../components/AppointmentListFilter';
import { AppointmentList } from '../components/AppointmentList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  getAppointmentsByUserId,
  selectAppointments,
} from '../store/appointments/appointmentsSlice';
import { Pagination } from '../components/Pagination';

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const appointments = useAppSelector(selectAppointments);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (user.role === 'ADMIN') {
      navigate('/administratorius');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      dispatch(getAppointmentsByUserId({ id: user.id }));
    }
  }, [dispatch, user]);

  return (
    <main className="max-w-6xl mx-auto px-1 md:px-2 lg:px-3">
      <div className="flex flex-col items-center justify-items-start w-full border border-violet-300 rounded-lg  mt-4">
        <div
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-violet-300 rounded-t-lg p-3 flex gap-2 items-center justify-center text-violet-800 text-xl cursor-pointer"
        >
          {showForm ? <FaMinus /> : <FaPlus />}
          <span className="font-semibold">Registruoti vizitą</span>
        </div>
        {showForm && <AppointmentForm />}
      </div>
      {appointments.length > 0 ? (
        <section>
          <AppointmentListFilter />
          <AppointmentList items={appointments} />
          <Pagination />
        </section>
      ) : (
        <h3>Paskirtų vizitų nėra</h3>
      )}
    </main>
  );
};
