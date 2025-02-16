import { useParams } from 'react-router';
import { EditAppointmentForm } from '../components/EditAppointmentForm';
import { useAppSelector } from '../store/store';
import { useDispatch } from 'react-redux';
import {
  getAppointmentById,
  selectSingleItem,
} from '../store/appointments/singleAppointmentSlice';
import { useEffect } from 'react';

export const EditAppointmentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useAppSelector(selectSingleItem);

  useEffect(() => {
    if (id) {
      dispatch(getAppointmentById({ id: id }));
    }
  }, [dispatch]);

  return (
    <main>
      {item && <EditAppointmentForm item={item} onClose={() => {}} />}
    </main>
  );
};
