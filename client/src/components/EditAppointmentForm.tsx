import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AppointmentSchema } from '../schemas/AppointmentSchema';
import { useAppDispatch, useAppSelector } from '../store/store';
import { updateAppointment } from '../store/appointments/appointmentsSlice';
import { selectUser } from '../store/users/usersSlice';
import AppointmentService from '../services/AppointmentService';
import toast from 'react-hot-toast';
import HelperService from '../services/HelperService';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { lt } from 'date-fns/locale/lt';
import DatePicker from 'react-datepicker';
import { addMonths, setHours, setMinutes } from 'date-fns';
import { IAppointment } from '../types/appointment';

interface EditAppointmentFormProps {
  item: IAppointment;
  onClose: () => void;
}

export const EditAppointmentForm = ({
  item,
  onClose,
}: EditAppointmentFormProps) => {
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
      pet_name: item.pet_name,
      date: item.date,
      notes: item.notes,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof AppointmentSchema>> = async (
    formData
  ) => {
    const { pet_name, date, notes } = formData;

    if (date === null) {
      setError('date', { message: 'Datos parinkimo problema' });
      return;
    }
    try {
      await AppointmentService.updateAppointment(item.id, {
        pet_name: pet_name,
        date: date,
        notes: notes,
      });
      dispatch(
        updateAppointment({
          id: item.id,
          pet_name: pet_name,
          date: new Date(),
          notes: notes,
        })
      );
      toast.success('Vizitas sėkmingai atnaujintas!');
      reset();
      onClose();
    } catch (e: unknown) {
      setError('root', { message: HelperService.errorToString(e) });
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
                  id="date"
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
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="min-w-[200px] border border-emerald-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
        >
          Taip
        </button>
        <button
          onClick={onClose}
          className="min-w-[200px] border border-rose-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
        >
          Ne
        </button>
      </div>
    </form>
  );
};
