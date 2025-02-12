import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectUser } from '../store/users/usersSlice';
import { useNavigate } from 'react-router';
import { AppointmentListFilter } from '../components/AppointmentListFilter';
import { AppointmentList } from '../components/AppointmentList';
import {
  getAppointments,
  getAppointmentsError,
  getAppointmentsStatus,
  selectAppointments,
} from '../store/appointments/appointmentsSlice';

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const appointments = useAppSelector(selectAppointments);
  const appointmentsStatus = useAppSelector(getAppointmentsStatus);
  const appointmentsError = useAppSelector(getAppointmentsError);
  const navigate = useNavigate();

  console.log('status: ', appointmentsStatus);
  console.log('user ', user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (user && user.role !== 'ADMIN') {
      navigate('/naudotojo-profilis');
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log(appointmentsStatus);
    if (appointmentsStatus === 'idle') {
      dispatch(getAppointments());
    }
  }, [appointmentsStatus, dispatch]);

  return (
    <main>
      {appointments && appointments.map((item) => <p>{item.pet_name}</p>)}
      {appointmentsStatus === 'succeeded' ? (
        <section>
          <AppointmentListFilter />
          <AppointmentList items={appointments} />
        </section>
      ) : (
        <h3>Paskirtų viszitų nėra</h3>
      )}
    </main>
  );
};
