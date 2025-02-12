import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginSchema } from '../../schemas/LoginSchema';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import {
  getUserError,
  getUserStatus,
  selectUser,
  setError,
  userLogin,
} from '../../store/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';

interface LoginFormProps {
  onClose: () => void;
}

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const userStatus = useSelector(getUserStatus);
  const userError = useSelector(getUserError);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') {
        navigate('/administratorius');
      } else {
        navigate('/naudotojo-profilis');
      }
    }
  }, [user, navigate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleContinue = () => {
    dispatch(setError(undefined));
  };

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    formData
  ) => {
    const { email, password } = formData;
    if (userStatus === 'idle' || userStatus === 'failed') {
      dispatch(userLogin({ email, password }));
    }
  };

  return (
    <form
      className="max-w-sm mx-auto my-6"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Prisijungimas</h2>
      <div className="flex gap-3">
        <p>Pirmas kartas?</p>
        <div
          onClick={onClose}
          className="text-violet-700 underline underline-offset-8 cursor-pointer"
        >
          Prašome užsiregistruoti
        </div>
      </div>
      <div className="h-10 my-3">
        <p className="text-sm text-center text-rose-500">{userError}</p>
      </div>
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
          onKeyUp={() => handleContinue()}
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
          onKeyUp={() => handleContinue()}
          {...register('password')}
        />
      </fieldset>
      <div className="flex flex-col gap-2 mt-2">
        <button
          className="btn-generic bg-violet-500 text-violet-50 rounded-lg p-2 hover:bg-violet-700 cursor-pointer"
          type="submit"
        >
          Prisijungti
        </button>
      </div>
    </form>
  );
};
