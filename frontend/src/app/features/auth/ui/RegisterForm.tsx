'use client';

import signUpSchema, { TSignUpSchema } from '@/validation/schemas/auth/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';


export default function RegisterForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema): Promise<void> => {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      alert('No anduvo la conexión con la API');
      return;
    }

    const responseData = await response.json();
    if (!response.ok) {
      alert('Hubo un error al enviar el formulario.');
      return;
    }

    if (responseData.errors) {
      const { email, password, confirmPassword } = responseData.errors;

      if (email) {
        setError('email', { type: 'server', message: email });
      } else if (password) {
        setError('password', { type: 'server', message: password });
      } else if (confirmPassword) {
        setError('confirmPassword', {
          type: 'server',
          message: confirmPassword,
        });
      } else {
        alert('Algo salió mal, por favor intenta de nuevo.');
      }
    } else {
      alert('Registro exitoso');
      reset();
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

      <input
        {...register('confirmPassword')}
        type="password"
        placeholder="Confirme la Contraseña"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
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
