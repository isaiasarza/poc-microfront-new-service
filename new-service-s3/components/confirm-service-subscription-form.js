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
import { update } from "lodash";
import dayjs from "dayjs";

const ConfirmServiceSubscriptionFormComponent = () => {
  const [types, setTypes] = useState([]);
  const accountInfo = globalStore((state) => state.accountInfo);
  const setAccountInfo = globalStore((state) => state.setAccountInfo);

  const state = globalStore((state) => state);

  console.log("New Service S3 Microfrontend - global state:", state);

  const { payload } = globalStore((state) => state.newServiceState) ?? {
    payload: {
      type: '',
      subType: '',
      price: 0,
      cardType: '',
      cardNumber: '',
      cardSecurityCode: '',
      cardName: '',
      cardAddress: '',
    },
  };
  const {
    type,
    subType,
    price,
    cardType,
    cardNumber,
    cardSecurityCode,
    cardName,
    cardAddress,
  } = payload;
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

  const updateAccountInfo = ({ type, subType }) => {
    const service = `${type} - ${subType}`;

    const now = new Date();
    const expiry =
      now.getMonth() == 11
        ? new Date(now.getFullYear() + 1, 0, 1)
        : new Date(now.getFullYear(), now.getMonth() + 1, 1);

    accountInfo.account.services.push(service);
    accountInfo.account.expiration = dayjs(expiry).format("DD/MM/YYYY");

    setAccountInfo(accountInfo);
  };

  const formik = useFormik({
    initialValues: {
      confirm: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const _payload = { ...payload, ...values };
      if (values.confirm) {
        updateAccountInfo(_payload);
      }

      const _newServiceState = {
        currentStep: "confirm-service-subscription",
        nextStep: "home",
        payload: _payload,
      };

      setNewServiceState(_newServiceState);
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
              <span className="font-bold">{`${type} - ${subType}`}</span>
            </p>

            <p className="text-md">
              Precio: <span className="font-bold">{`$${price}`}</span>
            </p>

            <p className="text-md">
              Método de Pago: <span className="font-bold">{cardType}</span>
            </p>

            <p className="text-md">
              Datos de tarjeta:{" "}
              <span className="font-bold">{`${cardNumber} / ${cardSecurityCode}`}</span>
            </p>

            <p className="text-md">
              Titular de tarjeta:{" "}
              <span className="font-bold"> {cardName} </span>
            </p>

            <p className="text-md">
              Domicilio de facturación ingresado:{" "}
              <span className="font-bold">{cardAddress}</span>
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
