import { fetchPaymentType } from "@/services/payment-type.helper";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ErrorMessage, useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import globalStore from "shell/globalStore";

const SelectPaymentTypeFormComponent = () => {
  const [types, setTypes] = useState([]);
  const newServiceState = globalStore((state) => state.newServiceState);
  const setNewServiceState = globalStore((state) => state.setNewServiceState);

  useEffect(() => {
    const fetchData = async () => setTypes(await fetchPaymentType());
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    cardType: Yup.string().required("El método de pago es requerido"),
    cardNumber: Yup.string()
      .required("El número de tarjeta es requerido")
      .matches(/^[0-9]+$/, "Debe contener únicamente números")
      .min(13, "Debe contener al menos 13 dígitos")
      .max(16, "Debe contener como máximo 16 dígitos"),
    cardSecurityCode: Yup.string()
      .required("El código de seguridad es requerido")
      .matches(/^[0-9]+$/, "Debe contener únicamente números")
      .min(3, "Debe contener al menos 3 dígitos")
      .max(6, "Debe contener como máximo 6 dígitos"),
    cardName: Yup.string()
      .required("El precio de servicio es requerido")
      .min(5, "Debe contener al menos 5 caracteres")
      .max(80, "Debe contener como máximo 80 caracteres"),
    cardAddress: Yup.string()
      .required("El precio de servicio es requerido")
      .min(5, "Debe contener al menos 5 caracteres")
      .max(80, "Debe contener como máximo 80 caracteres"),
  });

  const formik = useFormik({
    initialValues: {
      cardType: "",
      cardNumber: "",
      cardSecurityCode: "",
      cardName: "",
      cardAddress: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = { ...newServiceState.payload, ...values };

      const _newServiceState = {
        currentStep: "select-payment-type",
        nextStep: "confirm-service-subscription",
        payload,
      };

      setNewServiceState(_newServiceState);
    },
  });

  const isInvalid = (prop) => {
    return (
      !!formik.getFieldMeta(prop).error && formik.getFieldMeta(prop).touched
    );
  };

  const getError = (prop) => {
    return formik.getFieldMeta(prop).touched
      ? formik.getFieldMeta(prop).error
      : "";
  };

  return (
    <Card className="w-[60rem]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Nuevo Servicio</p>
          <p className="text-small text-default-500">Métodos de Pago</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-4">
            <Select
              id="cardType"
              name="cardType"
              label="Método de pago"
              placeholder="Seleccione el método de pago"
              className="max-w"
              onChange={formik.handleChange}
              value={formik.values.cardType}
            >
              {types.map((t) => (
                <SelectItem key={t.type} value={t.type}>
                  {t.type}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-4">
            <div className="grid grid-cols-3 w-full gap-4">
              <div className="col-span-2">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="Ingresa el número de tu tarjeta"
                  type="string"
                  label="Número de Tarjeta"
                  variant="bordered"
                  className="max-w"
                  minLength={13}
                  maxLength={16}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cardNumber}
                  isInvalid={isInvalid("cardNumber")}
                  errorMessage={getError("cardNumber")}
                />
              </div>
              <div>
                {" "}
                <Input
                  id="cardSecurityCode"
                  name="cardSecurityCode"
                  placeholder="Ingresa el código de seguridad"
                  type="string"
                  label="Código de seguridad"
                  variant="bordered"
                  className="max-w"
                  minLength={3}
                  maxLength={6}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cardSecurityCode}
                  isInvalid={isInvalid("cardSecurityCode")}
                  errorMessage={getError("cardSecurityCode")}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-4">
            <Input
              id="cardName"
              name="cardName"
              type="string"
              label="Nombre"
              placeholder="Ingresa el nombre tal cual aparece en la tarjeta"
              variant="bordered"
              className="max-w"
              onChange={formik.handleChange}
              value={formik.values.cardName}
              isInvalid={isInvalid("cardName")}
              errorMessage={getError("cardName")}
            />
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-4">
            <Input
              id="cardAddress"
              name="cardAddress"
              type="string"
              label="Domicilio"
              placeholder="Ingresa el domicilio de facturación de la tarjeta"
              variant="bordered"
              className="max-w"
              onChange={formik.handleChange}
              value={formik.values.cardAddress}
              isInvalid={isInvalid("cardAddress")}
              errorMessage={getError("cardAddress")}
            />
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

export default SelectPaymentTypeFormComponent;
