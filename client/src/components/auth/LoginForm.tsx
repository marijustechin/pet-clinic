import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema } from "../../schemas/LoginSchema";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";

export const LoginForm: FC = () => {
  const [error, setError] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    formData
  ) => {
    console.log(formData);
    setError("");
  };

  return (
    <form
      className="max-w-sm mx-auto my-6"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Prisijungimas</h2>
      <p>
        Pirmas kartas?{" "}
        <Link
          className="text-violet-700 underline underline-offset-8"
          to={"/registracija"}
        >
          Prašome užsiregistruoti
        </Link>
      </p>
      <div className="h-10">
        <p className="text-sm text-center text-rose-500">{error}</p>
      </div>
      {errors.email && (
        <span className="text-xs text-rose-500">{errors.email.message}</span>
      )}
      <fieldset className="border border-violet-300 p-1 rounded-lg flex flex-col gap-2">
        <legend
          className={`${
            errors.email ? "text-rose-500" : "text-violet-600"
          } ml-4 p-1`}
        >
          El. paštas
        </legend>
        <input
          className="form-input focus:outline-none px-2 py-1"
          type="email"
          autoComplete="on"
          {...register("email")}
        />
      </fieldset>
      {errors.password && (
        <span className="text-xs text-rose-500">{errors.password.message}</span>
      )}
      <fieldset className="border border-violet-300 p-1 rounded-lg">
        <legend
          className={`${
            errors.password ? "text-rose-500" : "text-violet-600"
          } ml-4 p-1`}
        >
          Slaptažodis
        </legend>
        <input
          className="form-input focus:outline-none px-2 py-1"
          type="password"
          autoComplete="off"
          {...register("password")}
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
