import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../store/store';
import { selectUser } from '../store/users/usersSlice';
import { AppointmentSchema } from '../schemas/AppointmentSchema';
import AppointmentService from '../services/AppointmentService';
import toast from 'react-hot-toast';
import { useState } from 'react';
import HelperService from '../services/HelperService';

export const AppointmentForm = () => {
  const user = useAppSelector(selectUser);
  const [error, setError] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      pet_name: '',
      date: '',
      time: '',
      notes: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof AppointmentSchema>> = async (
    formData
  ) => {
    if (user) {
      const { pet_name, date, time, notes } = formData;
      const user_id = user.id;
      try {
        await AppointmentService.newAppointment(
          pet_name,
          date,
          time,
          notes,
          +user_id
        );
        toast.success('Vizitas sėkmingai užregistruotas!');
        reset();
      } catch (e: unknown) {
        setError(HelperService.errorToString(e));
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="px-4">
      <div>
        {error && <span>{error}</span>}
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
            Data
          </label>
          <div className="col-span-9 grid grid-cols-12 gap-2 items-center">
            <input
              id="date"
              disabled={user ? false : true}
              className="w-full col-span-4 border border-violet-300 rounded-lg px-2 py-1"
              type="date"
              {...register('date')}
            />
            <label htmlFor="time" className="col-span-4 text-right">
              Laikas
            </label>
            <input
              id="time"
              disabled={user ? false : true}
              className="w-full col-span-4 border border-violet-300 rounded-lg px-2 py-1"
              type="time"
              {...register('time')}
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
          {errors.time && <span>{errors.time.message}</span>}
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
