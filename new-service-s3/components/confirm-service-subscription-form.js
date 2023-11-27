import { fetchServiceType } from "@/services/service-type.helper";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import globalStore from "shell/globalStore";

const ConfirmServiceSubscriptionFormComponent = () => {
  const [types, setTypes] = useState([]);

  const setNewServiceState = globalStore((state) => state.setNewServiceState);
  
  useEffect(() => {
    const fetchData = async () => setTypes(await fetchServiceType());
    fetchData();
  }, []);

  const getType = (_type) => types.find(({ type }) => type === _type);

  const getSubtype = (_subType) =>
    getType(formik.values.type).subTypes.find(({ type }) => type === _subType);

  const validationSchema = Yup.object().shape({
    confirm: Yup.bool().oneOf(
      [true],
      "Debe confirmar para finalizar la operación."
    ),
  });

  const formik = useFormik({
    initialValues: {
      confirm: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);

      const newServiceState = {
        currentStep: "confirm-service-subscription",
        nextStep: "home",
        payload: values,
      };

      setNewServiceState(newServiceState);
    },
  });

  return (
    <Card className="w-[60rem]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Nuevo Servicio</p>
          <p className="text-small text-default-500">
            Confirmación de Subscripción
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 pb-4">
            <p className="text-md">
              Servicio a Contratar:{" "}
              <span className="font-bold">Pepito 123</span>
            </p>

            <p className="text-md">
              Precio: <span className="font-bold">$100</span>
            </p>

            <p className="text-md">
              Método de Pago:{" "}
              <span className="font-bold">Tarjeta de Crédito</span>
            </p>

            <p className="text-md">
              Datos de tarjeta: <span className="font-bold">12341234/333</span>
            </p>

            <p className="text-md">
              Titular de tarjeta:{" "}
              <span className="font-bold">Daniel Isaías Arza</span>
            </p>

            <p className="text-md">
              Domicilio de facturación ingresado:{" "}
              <span className="font-bold">Entre Ríos 749</span>
            </p>
          </div>

          <div className="flex flex-col flex-wrap md:flex-nowrap pb-4">
            <Checkbox
              id="confirm"
              name="confirm"
              onChange={formik.handleChange}
              value={formik.values.confirm}
            >
              Acepto los terminos y condiciones
            </Checkbox>

            <p className="text-xs text-default-500">
              Por favor, verifique que los datos ingresados sean correctos antes
              de confirmar.
            </p>
          </div>

          <div className="flex flex-col justify-center items-end">
            <Button
              type="submit"
              className="w-8"
              color="primary"
              isDisabled={!formik.isValid || !formik.dirty}
            >
              Continuar
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default ConfirmServiceSubscriptionFormComponent;
