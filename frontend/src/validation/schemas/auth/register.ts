import { z } from "zod";

const signUpSchema = z.object({
    email: z.string().email({ message: 'El email ingresado no es válido.' }),
    password: z
      .string()
      .min(10, 'La contraseña debería contener al menos 10 caracteres.'),
    confirmPassword: z.string(),
  })
  .refine((data): boolean => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export default signUpSchema;
export type TSignUpSchema = z.infer<typeof signUpSchema>;