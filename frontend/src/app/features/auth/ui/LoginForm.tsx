'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {JSX} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z
  .object({
    email: z.string().email({ message: 'El email ingresado no es válido.' }),
    password: z
      .string()
      .min(10, 'La contraseña deberia contener al menos 10 caracteres.'),
  });

export type TSignUpSchema = z.infer<typeof loginSchema>;

export default function LoginForm() :JSX.Element{
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TSignUpSchema):Promise<void> => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      alert('La respuesta del formulario fallo.');
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.email) {
        setError('email', {
          type: 'server',
          message: errors.email,
        });
      } else if (errors.password) {
        setError('password', {
          type: 'server',
          message: errors.password,
        });
      } else {
        alert('Algo salio mal');
      }
    }

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto flex flex-col gap-y-2 [&>input]:border [&>input]:border-gray-200 [&>input]:px-4 [&>input]:py-2 [&>input]:rounded"
    >
      <input {...register('email')} type="email" placeholder="Email" />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <input
        {...register('password')}
        type="password"
        placeholder="Contraseña"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}

      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Enviar
      </button>
    </form>
  );
}
