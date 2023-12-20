import { fetchServiceType } from "@/services/service-type.helper";
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
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import globalStore from "shell/globalStore";

const SelectServiceTypeFormComponent = () => {
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
    type: Yup.string().required("El tipo de servicio es requerido"),
    subType: Yup.string().required("El subtipo de servicio es requerido"),
    price: Yup.number().required("El precio de servicio es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      subType: "",
      price: undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      const newServiceState = {
        currentStep: "select-service-type",
        nextStep: "select-payment-type",
        payload: values,
      };

      setNewServiceState(newServiceState);
    },
  });

  return (
    <Card  fullWidth={true}>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Nuevo Servicio</p>
          <p className="text-small text-default-500">
            Información del Servicio
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-4">
            <Select
              id="type"
              name="type"
              label="Tipo de Servicio"
              placeholder="Seleccione el tipo de servicio"
              className="max-w"
              onChange={formik.handleChange}
              value={formik.values.type}
            >
              {types.map((t) => (
                <SelectItem key={t.type} value={t.type}>
                  {t.type}
                </SelectItem>
              ))}
            </Select>
          </div>
          {formik?.values?.type && (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-4">
              <Select
                id="subType"
                name="subType"
                label="Subtipo de Servicio"
                placeholder="Seleccione el subtipo de servicio"
                className="max-w"
                onChange={async ({ target }) => {
                  console.log(
                    "🚀 ~ file: select-service-type.js:86 ~ SelectServiceTypeFormComponent ~ value:",
                    target.value
                  );
                  formik.setFieldValue("subType", target.value);
                  const { price } = getSubtype(target.value);
                  formik.setFieldValue("price", price);
                  console.log(
                    "🚀 ~ file: select-service-type.js:92 ~ SelectServiceTypeFormComponent ~ price:",
                    price
                  );
                }}
                value={formik.values.subType}
              >
                {getType(formik.values.type).subTypes.map((t) => (
                  <SelectItem
                    key={t.type}
                    value={t.type}
                    textValue={`${t.type}`}
                  >
                    {t.type} - ${t.price}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}

          {formik?.values?.price && (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-4">
              <Input
                isReadOnly
                id="price"
                name="price"
                type="string"
                label="Precio del servicio"
                variant="bordered"
                className="max-w"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.price}
                value={formik.values.price}
              />
            </div>
          )}
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

export default SelectServiceTypeFormComponent;
