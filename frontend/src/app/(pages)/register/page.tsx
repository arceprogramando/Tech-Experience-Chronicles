import RegisterForm from "@/app/features/auth/ui/RegisterForm";
import { JSX } from "react";

export default function Register(): JSX.Element{
    return (
      <>
        <h3 className="text-center my-8">Sign Up</h3>
        <RegisterForm />
      </>
    );
}