import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectUser } from '../store/users/usersSlice';
import { AppointmentSchema } from '../schemas/AppointmentSchema';
import AppointmentService from '../services/AppointmentService';
import toast from 'react-hot-toast';
import HelperService from '../services/HelperService';
import { addAppointment } from '../store/appointments/appointmentsSlice';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { lt } from 'date-fns/locale/lt';
import DatePicker from 'react-datepicker';
import { addMonths, setHours, setMinutes } from 'date-fns';

export const AppointmentForm = () => {
  registerLocale('lt', lt);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,

    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      pet_name: '',
      date: new Date(),
      notes: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof AppointmentSchema>> = async (
    formData
  ) => {
    if (user) {
      const { pet_name, date, notes } = formData;
      if (date === null) {
        setError('date', { message: 'Datos parinkimo problema' });
        return;
      }
      const user_id = user.id;
      try {
        const res = await AppointmentService.newAppointment(
          pet_name,
          date,
          notes,
          +user_id
        );
        dispatch(addAppointment(res.data));
        toast.success('Vizitas sėkmingai užregistruotas!');
        reset();
      } catch (e: unknown) {
        setError('root', { message: HelperService.errorToString(e) });
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="px-4">
      <div>
        {errors.root && <span>{errors.root.message}</span>}
        <div className="grid grid-cols-12 gap-2 items-center my-2">
          <label className="col-span-3 text-right" htmlFor="pet_name">
            <span>Gyvūno vardas</span>
          </label>

          <input
            id="pet_name"
            className="w-full col-span-9 border border-violet-300 rounded-lg px-2 py-1"
            type="text"
            placeholder="Gyvūno vardas"
            {...register('pet_name')}
          />
        </div>
        <div className="grid grid-cols-12 gap-2 items-center my-2">
          <label className="col-span-3 text-right" htmlFor="user_id">
            Savininkas
          </label>
          <input
            id="user_id"
            disabled
            className={`${
              user ? 'placeholder-emerald-500' : 'placeholder-rose-500'
            } w-full col-span-9 border border-violet-300 rounded-lg px-2 py-1`}
            type="text"
            placeholder={
              user
                ? `${user.first_name}, tel.nr.: ${
                    user.phone_number ? user.phone_number : '---'
                  }, adresas: ${user.address ? user.address : '---'}`
                : 'Norėdami užsiregistruoti vizitui, prašome prisijungti arba užsiregistruoti'
            }
          />
        </div>
        <div className="grid grid-cols-12 gap-2 items-center my-2">
          <label className="col-span-3 text-right" htmlFor="date">
            Data ir laikas
          </label>
          <div className="col-span-9 grid grid-cols-12 gap-2 items-center">
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  locale={lt}
                  selected={field.value}
                  showTimeSelect
                  onChange={(date) => field.onChange(date)}
                  timeIntervals={30}
                  timeCaption="Laikas"
                  timeFormat="HH:mm"
                  dateFormat="yyyy-MM-dd HH:mm"
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 3)}
                  minTime={setHours(setMinutes(new Date(), 0), 10)}
                  maxTime={setHours(setMinutes(new Date(), 0), 16)}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 items-start my-2">
          <label className="col-span-3 text-right" htmlFor="notes">
            Pastabos
          </label>
          <textarea
            disabled={user ? false : true}
            className="w-full col-span-9 border border-violet-300 rounded-lg px-2 py-1"
            id="notes"
            rows={4}
            {...register('notes')}
          />
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-10 text-sm text-rose-500">
          {errors.pet_name && <span>{errors.pet_name.message}</span>}
          {errors.date && <span>{errors.date.message}</span>}
        </div>
        <div className="col-span-2">
          <button className="btn-generic my-3" type="submit">
            Užregistruoti
          </button>
        </div>
      </div>
    </form>
  );
};
