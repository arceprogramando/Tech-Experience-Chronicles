
import LoginForm from "@/app/features/auth/ui/LoginForm";
import { JSX } from "react";

export default function Login(): JSX.Element{
    return (
      <>
        <h3 className="text-center my-8">Login</h3>
        <LoginForm />
      </>
    );
}