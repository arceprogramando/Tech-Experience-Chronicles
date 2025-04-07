'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'El email ingresado no es válido.' }),
  password: z
    .string()
    .min(10, 'La contraseña deberia contener al menos 10 caracteres.'),
});

export type TSignUpSchema = z.infer<typeof loginSchema>;

export default function LoginForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TSignUpSchema): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(
            ([key, message]: [string, unknown]): void => {
              setError(key as keyof TSignUpSchema, {
                type: 'server',
                message: message as string,
              });
            }
          );
        } else {
          alert(errorData.message || 'Algo salió mal.');
        }
        return;
      }

      alert('Inicio de sesión exitoso');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Error al conectar con el servidor.');
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
