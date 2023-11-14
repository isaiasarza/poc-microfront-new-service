import LoginForm from "@/components/login-form";

const LoginPage = ({ loaded }) => {
  return (
      <div className="flex flex-1 justify-center justify-items-center w-100 h-100 items-center">
        <LoginForm />
      </div>
  );
};

export default LoginPage;
