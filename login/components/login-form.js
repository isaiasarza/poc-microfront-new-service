import { authUser } from "@/services/auth.helper";
import useLoginStore from "@/store/store";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Input,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import globalStore from "shell/globalStore";

const LoginForm = () => {
  const setCurrentUser = useLoginStore((state) => state.setCurrentUser);

  const setAccountInfo = globalStore((state) => state.setAccountInfo);

  const setNewServiceState = globalStore((state) => state.setNewServiceState);

  const formik = useFormik({
    initialValues: {
      email: "mestebanquito@gmail.com",
      password: "1234",
    },
    onSubmit: async (values) => {
      try {
        const accountInfo = await authUser({
          email: values.email,
          password: values.password,
        });
        console.log("🚀 ~ file: login-form.js:28 ~ LoginForm ~ user:", accountInfo);

        setAccountInfo(accountInfo);

        const newServiceState = {
          currentStep: "login",
          nextStep: "home",
          payload: accountInfo,
        };

        setNewServiceState(newServiceState);
      } catch (error) {
        console.error(
          "🚀 ~ file: login-form.js:43 ~ onSubmit: ~ error:",
          error
        );
        toast(error, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
          position: "bottom-right",
        });
      }
    },
  });
  return (
    <Card className="w-[30rem]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Mi TV</p>
          <p className="text-small text-default-500">Iniciar Sesión</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-4">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Ingrese su email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Input
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <Button type="submit" className="w-8" color="primary">
              Ingresar
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
