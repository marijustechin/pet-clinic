import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { RegisterSchema } from '../../schemas/RegisterSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import UserService from '../../services/UserService';
import toast from 'react-hot-toast';

interface RegisterFormProps {
  onClose: () => void;
}

export const RegisterForm = ({ onClose }: RegisterFormProps) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    formData
  ) => {
    try {
      const { first_name, email, password } = formData;

      await UserService.userRegistration(first_name, email, password);

      toast.success('Registracija sėkminga. Prašome prisijungti');
      onClose();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message);
        return null;
      }

      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto my-6"
    >
      <h2>Registracija</h2>
      <div className="flex gap-3">
        <p>Ne pirmas kartas?</p>
        <div
          onClick={onClose}
          className="text-violet-700 underline underline-offset-8 cursor-pointer"
        >
          Prašome prisijungti
        </div>
      </div>
      <div className="h-10 mt-6">
        <p className="text-sm text-center text-rose-500">{error}</p>
      </div>
      {errors.first_name && (
        <span className="text-xs text-rose-500">
          {errors.first_name.message}
        </span>
      )}
      <fieldset className="border border-violet-300 px-1 rounded-lg flex flex-col gap-2">
        <legend
          className={`${
            errors.first_name ? 'text-rose-500' : 'text-violet-600'
          } ml-4 p-1`}
        >
          Vardas
        </legend>
        <input
          className="form-input focus:outline-none px-2 py-1"
          type="text"
          autoComplete="on"
          {...register('first_name')}
        />
      </fieldset>
      {errors.email && (
        <span className="text-xs text-rose-500">{errors.email.message}</span>
      )}
      <fieldset className="border border-violet-300 p-1 rounded-lg flex flex-col gap-2">
        <legend
          className={`${
            errors.email ? 'text-rose-500' : 'text-violet-600'
          } ml-4 p-1`}
        >
          El. paštas
        </legend>
        <input
          className="form-input focus:outline-none px-2 py-1"
          type="email"
          autoComplete="on"
          {...register('email')}
        />
      </fieldset>
      {errors.password && (
        <span className="text-xs text-rose-500">{errors.password.message}</span>
      )}
      <fieldset className="border border-violet-300 p-1 rounded-lg">
        <legend
          className={`${
            errors.password ? 'text-rose-500' : 'text-violet-600'
          } ml-4 p-1`}
        >
          Slaptažodis
        </legend>
        <input
          className="form-input focus:outline-none px-2 py-1"
          type="password"
          autoComplete="off"
          {...register('password')}
        />
      </fieldset>
      <div className="flex flex-col gap-2 mt-2">
        <button
          className="bg-violet-500 text-slate-50 rounded-lg p-2 hover:bg-violet-700 cursor-pointer"
          type="submit"
        >
          Užsiregistruoti
        </button>
      </div>
    </form>
  );
};
