import "../styles/Login.module.css";
import { NextUIProvider } from "@nextui-org/react";

import LoginForm from "@/components/login-form";

const LoginPage = ({ loaded }) => {
  return (
    <NextUIProvider>
      <div className="flex flex-1 justify-center justify-items-center w-100 h-100 items-center">
        <LoginForm />
      </div>
    </NextUIProvider>
  );
};

export default LoginPage;
