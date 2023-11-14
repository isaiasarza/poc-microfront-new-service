import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Input
} from "@nextui-org/react";
import { Form, Formik } from "formik";

const LoginForm = () => (
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
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={() => {}}
      >
        <Form>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-4">
            
            <Input type="email" label="Email" placeholder="Ingrese su email" />
            <Input type="password" label="Contraseña" placeholder="Ingrese su contraseña"/>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Button className="w-8" color="primary">
              Ingresar
            </Button>
          </div>
        </Form>
      </Formik>
    </CardBody>
  </Card>
);

export default LoginForm;
